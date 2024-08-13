import React, { useState } from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import profileImage from '../assets/images/profile.jpg';
import profile2Image from '../assets/images/profile21.jpg';

const AboutUs = () => {
  const [showFullTeam, setShowFullTeam] = useState(false);

  const teamMembers = [
    { name: "Joseph Oladiran", role: "Founder & CEO", image: profileImage },
    { name: "Senjour Marley", role: "Lead Plumber", image: profile2Image },
    //{ name: "Dave Gudmann", role: "Senior Electrician", image: profileImage },
    //{ name: "Carlos Melendez", role: "Head of Carpentry", image: profileImage },
    //{ name: "Charles Parker", role: "Garage Door Specialist", image: profileImage },
    //{ name: "Joy Tjesnimi", role: "Interior Designer", image: profileImage },
  ];

  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-4 text-primary-dark">ABOUT US</h2>
        <h3 className="text-2xl font-normal text-center mb-2 text-dark">Discover Our Team's Story</h3>
        <p className="text-center font-extralight mb-4 text-sm text-neutral-dark">Crafting Comfort & Confidence in Every Home</p>
        
        <div className="bg-neutral-light p-6 rounded-lg font-normal shadow-lg mb-12">
          <p className="mb-4 text-neutral-dark">
            Founded in April 2020 by Joseph Oladiran, Joruthe LLC began as a small, passionate endeavor to bring quality and reliability into the home repair and renovation industry. With a background in building technology and civil engineering, Joseph saw an opportunity to blend technical expertise with a personal touch, transforming houses into homes that not only look beautiful but feel right.
          </p>
          <p className="mb-4 text-neutral-dark">
            Over the years, we've grown from a one-person operation into a thriving team of skilled professionals, each of us dedicated to making your home renovation dreams come true. Our journey has been built on a foundation of trust, craftsmanship, and a deep understanding of our clients' needs.
          </p>
          <p className="text-neutral-dark">
            We believe in not just meeting expectations but exceeding them, ensuring every project, big or small, is completed with the utmost care and precision. At Joruthe LLC, we're more than just builders, we're creators of comfort and confidence, transforming spaces into personalized sanctuaries where life's best moments happen.
          </p>
        </div>
        
        <div className="text-center mb-12">
          <button 
            onClick={() => setShowFullTeam(!showFullTeam)}
            className="bg-secondary hover:bg-secondary-dark text-white font-light px-6 py-3 rounded transition duration-300"
          >
            {showFullTeam ? 'Show Less' : 'Meet Our Team'}
          </button>
        </div>

        {showFullTeam && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-light text-primary">{member.name}</h4>
                  <p className="text-neutral-dark">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <h4 className="text-2xl font-light mb-4 text-primary">Connect With Us</h4>
          <div className="flex justify-center space-x-4">
            <a href="#top" className="text-primary hover:text-secondary transition duration-300" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="#top" className="text-primary hover:text-secondary transition duration-300" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#top" className="text-primary hover:text-secondary transition duration-300" aria-label="Instagram">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;