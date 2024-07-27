import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Carpentry1 from '../assets/images/Carpentry1.jpg';
import Plumbing1 from '../assets/images/Plumbing1.jpg';
import Electrical1 from '../assets/images/Electrical1.jpg';

const FeaturedServices = () => {
  const [currentService, setCurrentService] = useState(0);
  const services = [
    { 
      title: "Plumbing Excellence",
      description: "From leak repairs to full system installations, our expert plumbers ensure your water systems run smoothly.",
      image: Plumbing1
    },
    { 
      title: "Electrical Solutions",
      description: "Upgrade your home's electrical systems with our safe, efficient, and innovative solutions.",
      image: Electrical1
    },
    { 
      title: "Carpentry Craftsmanship",
      description: "Transform your living spaces with our custom woodworking and precision carpentry services.",
      image: Carpentry1
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentService((prevService) => (prevService + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [services.length]);

  const nextService = () => {
    setCurrentService((prevService) => (prevService + 1) % services.length);
  };

  const prevService = () => {
    setCurrentService((prevService) => (prevService - 1 + services.length) % services.length);
  };

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-8 text-primary-dark">Featured Services</h2>
        <p className="text-center mb-10 max-w-2xl mx-auto text-neutral-700 font-extralight text-lx">
        Discover the difference expertise and dedication can make in transforming your home today.
        </p>
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-lg">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`transition-opacity duration-500 ${
                  index === currentService ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="relative h-96">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
                    <h3 className="text-2xl md:text-3xl font-normal text-white mb-2">{service.title}</h3>
                    <p className="text-lg text-white font-extralight">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={prevService}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition duration-300"
            aria-label="Previous service"
          >
            <ChevronLeft size={24} className="text-primary-dark" />
          </button>
          <button 
            onClick={nextService}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition duration-300"
            aria-label="Next service"
          >
            <ChevronRight size={24} className="text-primary-dark" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentService(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentService ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;