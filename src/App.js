import React from 'react';
import Header from './components/Header';
import FeaturedServices from './components/FeaturedServices';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App font-sans">
      <Header />
      <main>
        <FeaturedServices />
        <Services />
        <AboutUs />
        <ContactForm />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;