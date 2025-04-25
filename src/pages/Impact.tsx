import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Earth, Leaf, Handshake } from 'lucide-react';

const Impact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-mosaic-green-dark text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Community Impact
          </h1>
          <p className="text-xl">
            How our work empowers women and youth while promoting sustainable practices in rural Ghana
          </p>
        </div>
      </section>
      
      {/* Impact Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-6">Creating Positive Change</h2>
          <p className="text-lg text-center mb-16 max-w-3xl mx-auto">
            At Mosaic Grove, our goal extends beyond sustainable agriculture. We're committed to transforming communities, empowering women and youth, and fostering economic growth in rural Ghana.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-mosaic-earth-light p-8 rounded-lg text-center">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Employment Creation</h3>
              <p>
                Providing sustainable jobs and income for women and youth in rural communities where opportunities are scarce.
              </p>
            </div>
            
            <div className="bg-mosaic-earth-light p-8 rounded-lg text-center">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Earth className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Environmental Stewardship</h3>
              <p>
                Implementing sustainable farming practices that preserve soil health, protect biodiversity, and mitigate climate change.
              </p>
            </div>
            
            <div className="bg-mosaic-earth-light p-8 rounded-lg text-center">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Community Development</h3>
              <p>
                Reinvesting in local infrastructure, education, and healthcare to improve overall quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Farmer Stories */}
      <section className="py-16 px-4 bg-mosaic-earth-light">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12">Farmer Stories</h2>
          
          <div className="space-y-12">
            {/* Farmer 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="bg-gray-200 h-full min-h-[200px]">
                  {/* Placeholder for farmer image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Farmer Image
                  </div>
                </div>
                <div className="p-6 md:col-span-2">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Ama Mensah</h3>
                  <p className="text-sm text-mosaic-green mb-4">Cashew Farmer, Eastern Afram Plains</p>
                  <p className="mb-4">
                    "Before joining Mosaic Grove, I struggled to provide for my three children as a single mother. Now, I have stable income from our cashew farm and have learned sustainable farming techniques that will benefit our land for generations to come."
                  </p>
                  <p>
                    Ama has been with Mosaic Grove since 2018 and has become a leader among our female farmers, mentoring newcomers and helping implement best practices.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Farmer 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="bg-gray-200 h-full min-h-[200px]">
                  {/* Placeholder for farmer image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Farmer Image
                  </div>
                </div>
                <div className="p-6 md:col-span-2">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Kwame Osei</h3>
                  <p className="text-sm text-mosaic-green mb-4">Tiger Nut Farmer, Kwahu Region</p>
                  <p className="mb-4">
                    "As a young man in rural Kwahu, I had limited options for employment. Joining the tiger nut cooperative has given me not just a job, but valuable skills and a sense of purpose. I'm proud to be part of a company that cares about our community's future."
                  </p>
                  <p>
                    Kwame joined our tiger nut cooperative in 2020 and has quickly become an essential team member, helping to improve cultivation methods and processing techniques.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Farmer 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="bg-gray-200 h-full min-h-[200px]">
                  {/* Placeholder for farmer image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Farmer Image
                  </div>
                </div>
                <div className="p-6 md:col-span-2">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Abena Nyarko</h3>
                  <p className="text-sm text-mosaic-green mb-4">Production Manager, Not Nuts Subsidiary</p>
                  <p className="mb-4">
                    "Working with Mosaic Grove has transformed my life. I started as a farmer and now manage our tiger nut flour production. The company has invested in my professional development and leadership skills, allowing me to grow while helping others in my community."
                  </p>
                  <p>
                    Abena oversees our tiger nut processing facility and has been instrumental in developing our flour production standards and quality control processes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact by Numbers */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12">Our Impact by Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-mosaic-green mb-2">40+</div>
              <p className="font-serif">Acres of Cashews Cultivated</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-mosaic-green mb-2">50+</div>
              <p className="font-serif">Women Employed</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-mosaic-green mb-2">30+</div>
              <p className="font-serif">Youth Employed</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-mosaic-green mb-2">2</div>
              <p className="font-serif">Communities Transformed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sustainability Practices */}
      <section className="py-16 px-4 bg-mosaic-earth-light">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-6">Sustainable Practices</h2>
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
            Our commitment to environmental stewardship is reflected in everything we do, from field to final product.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-mosaic-green rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Organic Farming</h3>
                  <p>
                    We use natural fertilizers, companion planting, and biological pest control instead of synthetic chemicals, preserving soil health and biodiversity.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-mosaic-green rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Earth className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Water Conservation</h3>
                  <p>
                    Our drip irrigation systems and rainwater harvesting techniques minimize water usage while maximizing crop yields.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-mosaic-green rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Crop Rotation</h3>
                  <p>
                    We implement strategic crop rotation to maintain soil fertility, prevent pest buildup, and enhance overall farm health.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-mosaic-green rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Earth className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Minimal Processing</h3>
                  <p>
                    Our products undergo minimal processing to preserve nutrients and reduce energy consumption in production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Programs */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12">Community Programs</h2>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-200 h-64 rounded-lg md:col-span-1">
                {/* Placeholder for training program image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Training Program Image
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="section-subheading">Farmer Training & Education</h3>
                <p className="mb-4">
                  We provide comprehensive training to our farmers, focusing on sustainable agricultural practices, organic farming techniques, and business management skills. This empowers them to maximize yields while preserving the environment.
                </p>
                <p>
                  Regular workshops, hands-on demonstrations, and one-on-one mentoring ensure that best practices are consistently implemented across our farms.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-200 h-64 rounded-lg md:col-span-1 md:order-2">
                {/* Placeholder for community investment image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Community Investment Image
                </div>
              </div>
              <div className="md:col-span-2 md:order-1">
                <h3 className="section-subheading">Community Investment</h3>
                <p className="mb-4">
                  A portion of our profits is reinvested directly into the communities where we operate, supporting local infrastructure, healthcare initiatives, and educational programs.
                </p>
                <p>
                  By addressing these fundamental needs, we help create an environment where entire communities can thrive alongside our business, fostering holistic development.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-200 h-64 rounded-lg md:col-span-1">
                {/* Placeholder for youth development image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Youth Development Image
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="section-subheading">Youth Entrepreneurship</h3>
                <p className="mb-4">
                  Our youth entrepreneurship program identifies promising young individuals and provides them with the skills, mentorship, and resources needed to develop their own agricultural enterprises.
                </p>
                <p>
                  This initiative helps stem rural-urban migration by showing youth that there are viable, profitable opportunities within their own communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-mosaic-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're interested in becoming a partner, a volunteer, or exploring ways to support our community work, we'd love to connect with you.
          </p>
          <a href="/contact" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300">
            Get Involved
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Impact;
