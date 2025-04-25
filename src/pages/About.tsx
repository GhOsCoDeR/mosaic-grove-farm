
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Leaf, TreeDeciduous } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-mosaic-green-dark text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About Mosaic Grove
          </h1>
          <p className="text-xl">
            Our journey, mission, and the dedicated team behind our sustainable agriculture initiative
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-200 h-96 rounded-lg">
              {/* Placeholder for Dr. Wright's image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Dr. Kaadze Wright Image
              </div>
            </div>
            <div>
              <h2 className="section-heading">Our Story</h2>
              <p className="mb-4">
                Mosaic Grove's journey began with Dr. Kaadze Wright, who left Ghana at the age of 17. The images of poverty in rural communities remained with her, fueling a passion to make a difference.
              </p>
              <p className="mb-4">
                In 2018, motivated by projections that Africa's working-age population would reach 1.1 billion by 2035, Dr. Wright recognized the urgent need to create jobs and ensure food security.
              </p>
              <p className="mb-4">
                That year, she initiated a groundbreaking project: a 100-acre organic cashew farm in Ghana aimed at empowering local women farmers. Today, 40 acres have been successfully cultivated, with harvesting already underway.
              </p>
              <p>
                In 2020, Dr. Wright expanded the vision by launching the only tiger nut cooperative farm in Ghana, located in the eastern Kwahu region. Under a subsidiary called Not Nuts, Mosaic Grove now produces organic tiger nut flour and is developing various plant-based products.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-mosaic-earth-light">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-mosaic-green rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-mosaic-green-dark">Our Vision</h3>
              </div>
              <p>
                To create a sustainable agricultural ecosystem that transforms rural communities in Ghana through innovation, empowerment, and environmental stewardship.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-mosaic-green rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <TreeDeciduous className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-mosaic-green-dark">Our Mission</h3>
              </div>
              <p>
                To cultivate organic, sustainable crops while providing economic opportunities for women and youth in rural Ghana, and to develop innovative plant-based products that bring the nutritional benefits of our harvests to consumers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12">Our Team</h2>
          
          <div className="space-y-12">
            {/* Founder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-200 h-64 rounded-lg md:col-span-1">
                {/* Placeholder for Dr. Wright's image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Dr. Kaadze Wright Image
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="section-subheading">Dr. Kaadze Wright</h3>
                <p className="font-medium text-mosaic-green mb-2">Founder</p>
                <p>
                  Dr. Wright founded Mosaic Grove with a vision to transform rural Ghanaian communities through sustainable agriculture. After leaving Ghana at 17, she returned with the mission to create jobs and ensure food security through innovative agricultural practices and community empowerment.
                </p>
              </div>
            </div>
            
            {/* COO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-200 h-64 rounded-lg md:col-span-1">
                {/* Placeholder for Rhoda's image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Rhoda Awo Korkoi Ogunu Image
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="section-subheading">Rhoda Awo Korkoi Ogunu</h3>
                <p className="font-medium text-mosaic-green mb-2">Chief Operations Officer</p>
                <p>
                  Rhoda holds a bachelor's degree in Agricultural Science from KNUST and oversees all farm operations and overall management at Mosaic Grove. For the past three years, she has collaborated closely with horticulturists and farmers each planting season, worked with technical officers to optimize farmhand performance, and supervised the cultivation and harvesting of organic tiger nuts and cashews.
                </p>
              </div>
            </div>
            
            {/* Horticulturist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-200 h-64 rounded-lg md:col-span-1">
                {/* Placeholder for Michael's image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Michael Akuamoah-Boateng Image
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="section-subheading">Mr. Michael Akuamoah-Boateng</h3>
                <p className="font-medium text-mosaic-green mb-2">Expert Horticulturist</p>
                <p>
                  Mr. Akuamoah-Boateng is an Agricultural Scientist and Researcher specializing in medicinal plants and horticulture. He holds an M.Phil. in Crop Science from the University of Ghana and a B.Sc. in Agriculture from the University of Cape Coast. As the Head of the Plant Development Department at the Centre for Plant Medicine Research and an expert Horticulturist for Mosaic Grove, he provides technical guidance on crop management, organic production, and farmer training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-16 px-4 bg-mosaic-earth-light">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-heading text-center mb-12">Our Journey</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <div className="bg-mosaic-green text-white text-xl font-bold rounded-lg p-4 text-center md:mr-6">
                  2018
                </div>
              </div>
              <div className="md:w-3/4 pt-4 md:pt-0">
                <h3 className="text-xl font-serif font-bold mb-2">Cashew Farm Inception</h3>
                <p>
                  Dr. Wright initiated a 100-acre organic cashew farm project in Ghana's Eastern Afram Plains, with a focus on empowering local women farmers.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <div className="bg-mosaic-green text-white text-xl font-bold rounded-lg p-4 text-center md:mr-6">
                  2020
                </div>
              </div>
              <div className="md:w-3/4 pt-4 md:pt-0">
                <h3 className="text-xl font-serif font-bold mb-2">Tiger Nut Farm Launch</h3>
                <p>
                  Launched the only tiger nut cooperative farm in Ghana, located in the eastern Kwahu region, establishing the Not Nuts subsidiary for tiger nut products.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <div className="bg-mosaic-green text-white text-xl font-bold rounded-lg p-4 text-center md:mr-6">
                  2022
                </div>
              </div>
              <div className="md:w-3/4 pt-4 md:pt-0">
                <h3 className="text-xl font-serif font-bold mb-2">First Cashew Harvest</h3>
                <p>
                  Successfully harvested the first crop from 40 acres of cultivated cashew farmland, marking a significant milestone in our journey.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <div className="bg-mosaic-green text-white text-xl font-bold rounded-lg p-4 text-center md:mr-6">
                  2024
                </div>
              </div>
              <div className="md:w-3/4 pt-4 md:pt-0">
                <h3 className="text-xl font-serif font-bold mb-2">Product Expansion</h3>
                <p>
                  Began cultivation of dragon fruits and Wambugu apples sourced from Kenya, further diversifying our sustainable agriculture portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
