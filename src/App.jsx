import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chatbot from './components/Chatbot/Chatbot';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import BookConsultation from './pages/BookConsultation';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/book" element={<BookConsultation />} />
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;
