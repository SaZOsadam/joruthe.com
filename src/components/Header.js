import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/images/logo.png';
import background1 from '../assets/images/background1.jpg';
import background2 from '../assets/images/background2.jpg';
import background3 from '../assets/images/background3.jpg';
import Plumbing2 from '../assets/images/Plumbing2.jpg';

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  const images = [background1, background2, background3, Plumbing2];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="relative h-screen font-sans">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{backgroundImage: `url(${images[currentImage]})`}}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <img className="w-10 h-10 md:w-28 md:h-28" src={Logo} alt="Joruthe LLC Logo" />
        {isLargeScreen ? (
          <div className="flex space-x-4 md:space-x-6">
            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white hover:text-secondary transition duration-300 font-normal text-lg">
                {item}
              </a>
            ))}
          </div>
        ) : (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>
      {!isLargeScreen && isMenuOpen && (
        <div className="absolute top-24 right-4 bg-white rounded-md shadow-lg p-4 z-20">
          {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="block py-2 px-4 text-primary-dark hover:bg-neutral-light transition duration-300 font-normal"
            >
              {item}
            </a>
          ))}
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-light leading-tight">
          Transform Your Home with Expert Service
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl font-extralight">
          Bringing your vision to life with precision and care, from minor repairs to major renovations.
        </p>
        <div className="flex space-x-4">
          <button className="bg-secondary hover:bg-secondary-dark text-white font-normal px-6 py-3 rounded transition duration-300 text-lg">
            Projects
          </button>
          <button className="bg-white hover:bg-neutral-light text-primary-dark font-normal px-6 py-3 rounded transition duration-300 text-lg">
            Read More
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;