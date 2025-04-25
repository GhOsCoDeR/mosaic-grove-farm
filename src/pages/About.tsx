import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Leaf, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-mosaic-green-dark text-white py-20 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/farm-hero.jpg')] bg-cover opacity-20 scale-110 animate-scale-in"></div>
        <div className="container mx-auto text-center max-w-3xl relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About Mosaic Grove
          </h1>
          <p className="text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Our mission is to cultivate sustainable agriculture and empower local communities in Ghana.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12 animate-fade-in">Our Story</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="mb-6">
                Mosaic Grove was founded in 2018 with a vision to transform agriculture in Ghana through sustainable and ethical practices. We started with a small team of passionate individuals committed to making a positive impact on local communities.
              </p>
              <p className="mb-6">
                Today, we operate several farms and cooperatives across the country, growing organic cashews, tiger nuts, and other crops. Our commitment to sustainability extends beyond our farms to include eco-friendly packaging and responsible sourcing.
              </p>
              <p className="mb-6">
                We believe that agriculture can be a force for good, creating economic opportunities, promoting environmental stewardship, and providing healthy, nutritious food for all.
              </p>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg overflow-hidden animate-scale-in">
              <img
                src="https://images.unsplash.com/photo-1562813730-a39a7102b644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhcm1lcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="Our Farm"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 bg-mosaic-earth-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843')] bg-cover opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="section-heading animate-fade-in">Our Mission</h2>
          <p className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            We are dedicated to cultivating sustainable agriculture and empowering local communities in Ghana.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Sustainable Farming</h3>
              <p className="text-sm">
                We employ farming practices that preserve soil health and protect local ecosystems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Ethical Sourcing</h3>
              <p className="text-sm">
                We ensure fair wages and safe working conditions for all our farmers and workers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Community Empowerment</h3>
              <p className="text-sm">
                We invest in education, healthcare, and infrastructure to improve the quality of life in our communities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Organic Products</h3>
              <p className="text-sm">
                We provide healthy, nutritious food grown without synthetic pesticides or fertilizers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-heading text-center mb-12 animate-fade-in">Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dr. Wright */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
              <div className="h-64 overflow-hidden">
                <img
                  src="public/lovable-uploads/f91a00f6-d650-4774-a54e-9d66af7e4d9b.png"
                  alt="Dr. Wright"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-mosaic-green-dark mb-2">Dr. Wright</h3>
                <p className="text-sm text-gray-600">Chief Agronomist</p>
                <p className="text-xs text-gray-500 mt-2">
                  Dr. Wright is an expert in sustainable agriculture with over 20 years of experience.
                </p>
              </div>
            </div>

            {/* Rhoda */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="h-64 overflow-hidden">
                <img
                  src="public/lovable-uploads/eba3e283-d702-43ea-82cd-c8a23031f384.png"
                  alt="Rhoda"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-mosaic-green-dark mb-2">Rhoda</h3>
                <p className="text-sm text-gray-600">Community Liaison</p>
                <p className="text-xs text-gray-500 mt-2">
                  Rhoda is passionate about empowering local communities and ensuring fair trade practices.
                </p>
              </div>
            </div>

            {/* Emmanuel */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="h-64 overflow-hidden">
                <img
                  src="public/lovable-uploads/5030a9ef-4b97-42e5-a600-b00599a1beb7.png"
                  alt="Emmanuel"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-mosaic-green-dark mb-2">Emmanuel</h3>
                <p className="text-sm text-gray-600">Farm Manager</p>
                <p className="text-xs text-gray-500 mt-2">
                  Emmanuel oversees the day-to-day operations of our farms, ensuring quality and efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-mosaic-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mosaic-green-dark to-mosaic-green opacity-50"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-fade-in">
            Join Our Mission
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Learn more about our sustainable farming practices and how you can support our mission.
          </p>
          <a href="/contact" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
