import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Chatbot from './components/Chatbot/Chatbot';
import Portfolio from './pages/Portfolio';
import BookConsultation from './pages/BookConsultation';

// Home Page Component
const HomePage = () => (
  <>
    <Hero />
    <About />
  </>
);

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/book" element={<BookConsultation />} />
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;
