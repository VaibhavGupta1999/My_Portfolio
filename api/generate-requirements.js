module.exports = async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, contactInfo } = req.body;

        const extractionPrompt = `Based on the following conversation, extract and format a professional requirements document.

CONVERSATION:
${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

CONTACT INFO:
Name: ${contactInfo.name}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}

Create a well-structured requirements document with these sections:
1. CLIENT INFORMATION
2. PROJECT OVERVIEW
3. SELECTED SERVICE(S)
4. DETAILED REQUIREMENTS
5. TARGET USERS
6. EXPECTED OUTCOMES
7. TIMELINE & URGENCY
8. BUDGET RANGE (if mentioned)
9. ADDITIONAL NOTES

Format it professionally with clear headings and bullet points. Be comprehensive but concise.`;

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: extractionPrompt }],
                temperature: 0.3,
                max_tokens: 1024
            })
        });

        const data = await groqRes.json();

        if (data.error) {
            console.error("Groq API Error:", data.error);
            return res.status(500).json({ error: data.error.message || "Groq API failed" });
        }

        const requirementsDoc = data.choices?.[0]?.message?.content || "Failed to generate requirements";

        console.log('📧 NEW LEAD from:', contactInfo.name, '-', contactInfo.email);

        return res.status(200).json({
            success: true,
            message: 'Requirements document generated!',
            requirements: requirementsDoc
        });
    } catch (error) {
        console.error("Generate Requirements Error:", error);
        return res.status(500).json({ error: "Failed to generate requirements" });
    }
};
