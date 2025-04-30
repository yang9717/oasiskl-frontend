import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, Leaf, Home, MapPin, BookOpen, Users, Camera, HelpCircle } from 'lucide-react';

const HomePage = () => {
  const [plantData, setPlantData] = useState({});
  
  // const API_BASE_URL = '/api'; // Deploy URL
  const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development
  
  // Scroll to top when the component mounts
  useEffect(() => {
    // Add smooth scrolling behavior to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    window.scrollTo(0, 0);
    
    return () => {
      // Clean up when component unmounts
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  // Fetch plant data from API
  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const featuredPlantIds = [26, 49, 19, 30, 40];
        const plantDataObj = {};
        
        await Promise.all(featuredPlantIds.map(async (id) => {
          const response = await fetch(`${API_BASE_URL}/plant/${id}`);
          if (!response.ok) throw new Error(`Failed to fetch plant ${id}`);
          const data = await response.json();
          plantDataObj[id] = data.plantDetails;
        }));
        
        setPlantData(plantDataObj);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };
    
    fetchPlantData();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/assets/homepage/homepagehero55.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-100"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-4xl text-[4.125rem] font-bold mb-8">
            <span className="block">Embrace</span>
            <span className="block mt-2 relative">
              <span className="bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent">Urban Oasis</span>
              <span className="mx-2">&</span>
              <span className="bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent">Vibrant Biodiversity</span>
            </span>
            <span className="block text-orange-500 mt-3">in Kuala Lumpur</span>
          </h1>
          <div className="mt-8">
            <button 
              onClick={() => {
                const whatWeOfferSection = document.getElementById('what-we-offer');
                if (whatWeOfferSection) {
                  whatWeOfferSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="animate-bounce bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/50 transition-all duration-300 group"
              aria-label="Scroll down to explore"
            >
              <svg 
                className="w-8 h-8 text-white group-hover:text-green-600 transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section id="what-we-offer" className="py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-orange-50 rounded-full opacity-80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover tools and resources to embrace urban oases and explore biodiversity in KL
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* GREEN SPACES COLUMN */}
            <div className="relative">
              {/* Category Header with Icon Background */}
              <div className="relative mb-8">
                <div className="absolute -left-4 -top-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Map className="w-8 h-8 text-green-600" />
                </div>
                <div className="pl-14">
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">Green Spaces</h3>
                  <div className="w-16 h-1 bg-green-500 mb-4"></div>
                  <p className="text-gray-600">
                    Find and nurture green environments within the concrete jungle
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Discover Green Space - Card with image */}
                <div className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-green-200">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img src="/assets/careguides/herosection3.jpg" alt="Green Space Map" className="w-full h-full object-cover transition-transform duration-500" />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 text-green-500 mr-2" />
                          <h4 className="text-xl font-bold text-gray-800">Discover Green Space</h4>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Interactive map of parks, gardens, and natural spots throughout Kuala Lumpur
                        </p>
                      </div>
                      <Link
                        to="/map"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 w-fit"
                      >
                        Explore Map
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Grow Your Green Corner */}
                <div className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-green-200">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img src="/assets/careguides/herosection4.jpg" alt="Urban Gardening" className="w-full h-full object-cover transition-transform duration-500" />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <Leaf className="w-5 h-5 text-green-500 mr-2" />
                          <h4 className="text-xl font-bold text-gray-800">Grow Your Green Corner</h4>
                          <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">New</span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Tailored guides and DIY tips for creating your personal urban oasis in KL
                        </p>
                      </div>
                      <Link
                        to="/care-guides"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 w-fit"
                      >
                        View Guides
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PLANT BIODIVERSITY COLUMN */}
            <div className="relative">
              {/* Category Header with Icon Background */}
              <div className="relative mb-8">
                <div className="absolute -left-4 -top-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <div className="pl-14">
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">Plant Biodiversity</h3>
                  <div className="w-16 h-1 bg-green-500 mb-4"></div>
                  <p className="text-gray-600">
                    Explore Malaysia's rich tropical plant diversity
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Plant Gallery */}
                <div className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-green-200">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img src="/assets//careguides/herosection2.jpg" alt="Plant Gallery" className="w-full h-full object-cover transition-transform duration-500" />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <BookOpen className="w-5 h-5 text-green-500 mr-2" />
                          <h4 className="text-xl font-bold text-gray-800">Plant Gallery</h4>
                          <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">New</span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Browse our curated collection of plants that thrive in KL's unique climate
                        </p>
                      </div>
                      <Link
                        to="/gallery"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 w-fit"
                      >
                        Explore Gallery
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Plant Recommender Feature - Coming Soon */}
                <div className="group bg-gray-50 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-green-100">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 bg-green-50 opacity-30"></div>
                      <img src="/assets/careguides/galleryguide.jpg" alt="Plant Recommender" className="w-full h-full object-cover opacity-40" />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <HelpCircle className="w-5 h-5 text-green-400 mr-2" />
                          <h4 className="text-xl font-bold text-gray-700">Plant Recommender</h4>
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Coming Soon</span>
                        </div>
                        <p className="text-gray-500 mb-4">
                          Answer 3 simple questions and discover the perfect indoor plants for your space
                        </p>
                      </div>
                      <span className="inline-flex items-center text-green-400 font-medium">
                        STAY TUNED
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Plant Identifier */}
          <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-64 md:h-auto relative overflow-hidden">
                <img src="/assets/careguides/herosection1.jpg" alt="Plant Identifier Tool" className="w-full h-full object-cover transition-transform duration-500" />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-grow">
                  <div className="flex items-center mb-3">
                    <Camera className="w-6 h-6 text-green-500 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">AI Plant Identifier</h3>
                    <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">New</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Identify plants from our curated collection of 89 species that thrive in KL's climate.
                  </p>
                  
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Identify plants from our gallery of local Malaysian species
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Access basic information and care guides for identified plants
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 md:mt-0 md:ml-6">
                  <Link to="/plant-identifier" className="inline-flex items-center px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300">
                    Try Plant Identifier
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plants Section with API data */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50 -mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">Our Selection</span>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Featured Plants for KL</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mb-2">
              Discover these beautiful plants that are perfectly suited for KL's tropical climate and urban spaces
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500 mt-3">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Swipe left or right to see more plants</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
          
          {/* Plants carousel - simplified with smaller cards */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div 
              id="featured-plants-container"
              className="flex flex-nowrap overflow-x-auto gap-4 pb-6 pt-2 px-2 hide-scrollbar"
            >
              {[26, 49, 19, 30, 40].map((id) => (
                <div 
                  key={id} 
                  className="flex-none w-64 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  {/* Card content without hover scale effect */}
                  <div className="relative h-48 overflow-hidden bg-green-100">
                    <img 
                      src={`/assets/plants_images/${id}.jpg`} 
                      alt={plantData[id]?.plant_name || `Plant ${id}`} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-xl font-bold text-white drop-shadow-sm">
                        {plantData[id]?.plant_name || "Loading..."}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {/* Plant type tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {plantData[id]?.plant_type && (
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                          {plantData[id]?.plant_type}
                        </span>
                      )}
                      {plantData[id]?.light_preference && (
                        <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
                          {plantData[id]?.light_preference}
                        </span>
                      )}
                    </div>
                    
                    {/* Plant description */}
                    <p className="text-gray-600 mt-2 mb-3 line-clamp-3 text-sm">
                      {plantData[id]?.plant_description?.substring(0, 100) + "..." || "Loading plant details..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <Link 
              to="/gallery" 
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition duration-300"
            >
              Explore All Plants
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* hide scrollbar but allow scrolling */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .line-clamp-3 {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .snap-x {
                scroll-snap-type: x mandatory;
              }
              .snap-center {
                scroll-snap-align: center;
              }
            `
          }} />
        </div>
      </section>

      {/* Mission Section (moved to the end) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Mission Text */}
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-2xl font-medium mb-6">
                "Empowering <span className="text-orange-500">Kuala Lumpur</span> residents to reconnect with nature in meaningful ways."
              </p>
              <div className="space-y-4 mb-8 text-gray-600">
                <p className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Help urban dwellers discover existing green spaces around the city
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Provide resources for creating personal green spaces at home
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Educate about local plant biodiversity and sustainable practices
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Foster a greener, more sustainable urban environment in KL
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-8">
                {/* Green Spaces */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    <Map className="w-10 h-10 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-orange-500">26</p>
                  <p className="text-sm text-center text-gray-600 mt-2">Green Spaces<br />Mapped</p>
                </div>

                {/* Plant Species */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    <Leaf className="w-10 h-10 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-orange-500">89</p>
                  <p className="text-sm text-center text-gray-600 mt-2">Plant Species<br />Documented</p>
                </div>

                {/* Residents */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    <Home className="w-10 h-10 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-orange-500">8.8 million</p>
                  <p className="text-sm text-center text-gray-600 mt-2">Residents<br />in Kuala Lumpur</p>
                </div>
              </div>
            </div>
            
            {/* Map Image */}
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <img 
                src="/assets/homepage/kl-map.png"
                alt="Map of Kuala Lumpur regions" 
                className="w-4/5 h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;