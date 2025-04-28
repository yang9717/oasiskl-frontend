import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, Leaf, Home, MapPin, BookOpen, Users } from 'lucide-react';

const HomePage = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/assets/homepage/homepagehero55.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-100"></div>
        {/* Simplified container structure */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-7xl md:text-7xl font-bold mb-8">
            <span className="whitespace-nowrap">Reconnect With Green Spaces</span>
            <span className="block text-orange-500 mt-3">in Kuala Lumpur</span>
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <Link
                to="/map"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition duration-300">
                Discover Green Space
              </Link>
              <div className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition duration-300">
                More to come...
              </div>
            </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-1 bg-white -mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Mission Text */}
            <div className="md:w-1/2 pl-20">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-3xl font-medium mb-6">
                "Empower <span className="text-orange-500">Kuala Lumpur</span> Residents To Reconnect With Nature."
              </p>
              <div className="space-y-2 mb-8 text-gray-600">
                <p className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  Discover urban green spaces or grow your own garden
                </p>
                <p className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  Making our city greener, one step at a time
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-24 mt-8">
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
            <div className="md:w-1/2 mt-8 md:mt-0">
                <img 
                  src="/assets/homepage/kl-map.png"
                  alt="Map of Kuala Lumpur regions" 
                  className="w-full h-auto scale-70"
                />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 -mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-12 text-center">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Discover Green Space */}
            <div className="bg-gray-700 text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Discover Green Space</h3>
                <p className="mb-6 text-gray-200">
                  Explore an interactive map and discover parks, gardens, and natural spots in KL.
                </p>
                <Link to="/map" className="mt-auto inline-flex items-center text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-700 transition-colors duration-300">
                  VIEW DETAILS
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Grow Your Own Space */}
            <div className="bg-gray-600 text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Grow Your Own Space</h3>
                <p className="mb-6 text-gray-200">
                  Get KL-tailored recommendations, care guides, and DIY tips to create your personal green oasis.
                </p>
                <Link to="/care-guides" className="mt-auto inline-flex items-center text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-700 transition-colors duration-300">
                  VIEW DETAILS
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Plant Gallery */}
            <div className="bg-gray-600 text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Plant Gallery</h3>
                <p className="mb-6 text-gray-200">
                  Explore our curated plant library and discover what thrives best in KL's climate.
                </p>
                <Link to="/gallery" className="mt-auto inline-flex items-center text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-700 transition-colors duration-300">
                  VIEW DETAILS
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Community */}
            <div className="bg-gray-500 text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="mb-6 text-gray-200">
                  Share your green space experience, share your gardening tips, or ask for help—connect with fellow enthusiasts.
                </p>
                {/* <Link to="/community" className="mt-auto inline-flex items-center text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-700 transition-colors duration-300">
                  VIEW DETAILS
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;