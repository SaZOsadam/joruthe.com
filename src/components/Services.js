import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Plumbing1 from '../assets/images/Plumbing1.jpg';
import Plumbing2 from '../assets/images/Plumbing2.jpg';
import Plumbing3 from '../assets/images/Plumbing3.jpg';
import Electrical1 from '../assets/images/Electrical1.jpg';
import Electrical2 from '../assets/images/Electrical2.jpg';
import Carpentry1 from '../assets/images/Carpentry1.jpg';
import Carpentry2 from '../assets/images/Carpentry2.jpg';
import Carpentry3 from '../assets/images/Carpentry3.jpg';
import Renovation1 from '../assets/images/Renovation1.jpg';
import Renovation2 from '../assets/images/Renovation2.jpg';
import Renovation3 from '../assets/images/Renovation3.jpg';
import LawnCare1 from '../assets/images/LawnCare1.jpg';
import LawnCare2 from '../assets/images/LawnCare2.jpg';
import Landscaping1 from '../assets/images/Landscaping1.jpg';
import Landscaping2 from '../assets/images/Landscaping2.jpg';
import Landscaping3 from '../assets/images/Landscaping3.jpg';
import Fencing1 from '../assets/images/Fencing1.jpg';
import Fencing2 from '../assets/images/Fencing3.jpg';
import Fencing3 from '../assets/images/Fencing3.jpg';


const ServiceCategory = ({ title, images, description }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        <h3 className="text-2xl font-extralight mb-4 text-primary">{title}</h3>
        <div className="relative w-full h-64 mb-4 group">
          <img
            src={images[currentImage]}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={prevImage} className="p-2 bg-black bg-opacity-50 text-white rounded-full ml-2">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="p-2 bg-black bg-opacity-50 text-white rounded-full mr-2">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {currentImage + 1} / {images.length}
          </div>
        </div>
        <p className="text-neutral-dark">{description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Plumbing',
      description: 'Leak fixes, installations, and everything in between.',
      images: [Plumbing1, Plumbing2, Plumbing3]
    },
    {
      title: 'Electrical',
      description: 'Safe and reliable electrical solutions.',
      images: [Electrical1, Electrical2]
    },
    {
      title: 'Carpentry',
      description: 'Custom woodwork and repairs.',
      images: [Carpentry1, Carpentry2, Carpentry3]
    },
    {
      title: 'Renovation/Remodeling',
      description: 'Transform your space with our expert remodeling services.',
      images: [Renovation1, Renovation2, Renovation3]
    },
    {
      title: 'Lawn Care',
      description: 'Professional lawn maintenance and care services.',
      images: [LawnCare1, LawnCare2]
    },
    {
      title: 'Landscaping',
      description: 'Creative landscaping solutions to enhance your outdoor spaces.',
      images: [Landscaping1, Landscaping2, Landscaping3]
    
    },
    {
      title: 'Fencing',
      description: 'Quality fencing installation and repair services.',
      images: [Fencing1, Fencing2, Fencing3]
    }
  ];

  return (
    <section className="py-16 bg-neutral-light" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-8 font-light text-primary-dark">Our Services</h2>
        <p className="text-center mb-10 max-w-2xl mx-auto font-extralight text-lg text-neutral-dark">
          Trust us to deliver not just services, but solutions that make your space work for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCategory key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;