export const SERVICES = [
  { id: 'agent', label: 'Build an AI Agent', value: 'AI Agent Development' },
  { id: 'automation', label: 'Automation for my business', value: 'Automation Workflows' },
  { id: 'chatbot', label: 'Custom chatbot', value: 'Custom Chatbots for Businesses' },
  { id: 'ml', label: 'ML model', value: 'ML Model Development' },
  { id: 'tryon', label: 'Virtual try-on', value: 'Virtual Try-On & Computer Vision AI' },
  { id: 'other', label: 'Something else', value: 'Other' }
];

export const STEPS = {
  GREETING: 'GREETING',
  IDENTIFY_SERVICE: 'IDENTIFY_SERVICE',
  REQUIREMENT_DEEP_DIVE: 'REQUIREMENT_DEEP_DIVE',
  COLLECT_INFO: 'COLLECT_INFO',
  SUMMARY: 'SUMMARY',
  COMPLETED: 'COMPLETED'
};

export const INITIAL_MESSAGE = {
  id: 1,
  text: "Hello 👋 I’m your AI Assistant! I help you explore Vaibhav’s AI services and choose the perfect solution for your business. What would you like help with today?",
  sender: 'bot',
  type: 'options',
  options: SERVICES
};

export const getNextStep = (currentStep, userInput, state) => {
  switch (currentStep) {
    case STEPS.GREETING:
      return {
        nextStep: STEPS.IDENTIFY_SERVICE,
        messages: [
          {
            id: Date.now(),
            text: "Great! Can you describe what you’re looking to build or automate?",
            sender: 'bot',
            type: 'text'
          }
        ]
      };

    case STEPS.IDENTIFY_SERVICE:
      return {
        nextStep: STEPS.REQUIREMENT_DEEP_DIVE,
        messages: [
          {
            id: Date.now(),
            text: "I see. To help me understand better, who will primarily use this system?",
            sender: 'bot',
            type: 'text'
          }
        ]
      };

    case STEPS.REQUIREMENT_DEEP_DIVE:
      // This is a multi-question step. We can track sub-steps in the component state or simplify here.
      // For simplicity, let's assume we ask a series of questions.
      // In a real complex agent, this would be more dynamic.
      // Here we will just return the next question based on what we have collected so far?
      // Or we can simplify and ask them all or just move to contact info after one detailed input.
      // The prompt asks for specific questions:
      // 1. Who will use? (Asked above)
      // 2. Output expected?
      // 3. Existing data?
      // 4. Web app/backend/agent?
      // 5. Timeline/Urgency?
      // 6. Budget?
      
      // We'll handle this logic in the component to keep track of which question we are on.
      return {
        nextStep: STEPS.REQUIREMENT_DEEP_DIVE, // Stay in this step until all questions done
        messages: [] // Logic will be handled in component
      };

    case STEPS.COLLECT_INFO:
      return {
        nextStep: STEPS.SUMMARY,
        messages: [
          {
            id: Date.now(),
            text: "Perfect! Could you share your Name, Email, and Phone Number so Vaibhav can contact you with a proposal?",
            sender: 'bot',
            type: 'form',
            fields: ['name', 'email', 'phone']
          }
        ]
      };

    default:
      return null;
  }
};
