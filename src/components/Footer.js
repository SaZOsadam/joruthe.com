import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-xl font-light mb-2">Joruthe LLC</h3>
            <p className=" mb-2 font-extralight text-sm">Transforming homes with expert services since 2020. Your vision, our passion.</p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-secondary transition duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-secondary transition duration-300" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-secondary transition duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/in/joseph-oladiran-03908979" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition duration-300" aria-label="LinkedIn">
              <Linkedin size={20} />
              </a>
            </div>
          </div>
          <nav aria-label="Quick links">
            <h3 className="text-xl font-light mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#home" className="hover:text-secondary transition duration-300">Home</a></li>
              <li><a href="#services" className="hover:text-secondary transition duration-300">Services</a></li>
              <li><a href="#about" className="hover:text-secondary transition duration-300">About Us</a></li>
              <li><a href="#contact" className="hover:text-secondary transition duration-300">Contact</a></li>
              <li><a href="#projects" className="hover:text-secondary transition duration-300">Projects</a></li>
              <li><a href="#testimonials" className="hover:text-secondary transition duration-300">Testimonials</a></li>
            </ul>
          </nav>
          <nav aria-label="Our services">
            <h3 className="text-xl font-light mb-2">Our Services</h3>
            <ul className="space-y-1 font-extralight text-sm">
              <li><a href="#plumbing" className="hover:text-secondary transition duration-300">Plumbing</a></li>
              <li><a href="#electrical" className="hover:text-secondary transition duration-300">Electrical</a></li>
              <li><a href="#carpentry" className="hover:text-secondary transition duration-300">Carpentry</a></li>
              <li><a href="#renovation" className="hover:text-secondary transition duration-300">Renovation</a></li>
              <li><a href="#remodeling" className="hover:text-secondary transition duration-300">Remodeling</a></li>
            </ul>
          </nav>
          <div>
            <h3 className="text-xl font-light mb-2">Contact Us</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" aria-hidden="true" />
                <a href="mailto:joseph@joruthe.com" className="hover:text-secondary transition duration-300">joseph@joruthe.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" aria-hidden="true" />
                <a href="tel:+17656315540" className="hover:text-secondary transition duration-300">+1 (765) 631 5540</a>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" aria-hidden="true" />
                <address className="not-italic">2680 E Main Street Plainfield, IN 46168</address>              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-sm">
          <p>&copy; {currentYear} Osadam. All Rights Reserved.</p>
          <p className="mt-1">
            <a href="/privacy-policy" className="hover:text-secondary transition duration-300">Privacy Policy</a>
            {' | '}
            <a href="/terms-of-service" className="hover:text-secondary transition duration-300">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;