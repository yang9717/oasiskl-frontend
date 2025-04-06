import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Ticket, ArrowRight, Filter, Users, Calendar, Accessibility, Dog, Dumbbell, CircleArrowLeft} from 'lucide-react';
import Papa from 'papaparse';

const GreenMap = () => {
  // State for filters
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isFree, setIsFree] = useState(null); // null = any, true = free, false = paid
  const [showResults, setShowResults] = useState(false);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [displayedDistrict, setDisplayedDistrict] = useState('');

  // Scroll to top when the component mounts
  useEffect(() => {
      window.scrollTo(0, 0);
      fetch('../../assets/datasets/space_info.csv')
        .then((response) => response.text())
        .then((parsedCsv) => {
          Papa.parse(parsedCsv, {
            complete: (result) => {
              const districtList = result.data.map((row) => row[0]);
              setDistricts(districtList);
            }
          })
        })
    }, []);

  // Districts
  // const districts = [
  //   'Kepong', 'Batu', 'Wangsa Maju', 'Setiawangsa', 'Segambut', 
  //   'Titiwangsa', 'Bukit Bintang', 'Lembah Pantai', 'Cheras', 
  //   'Bandar Tun Razak', 'Seputeh'
  // ];

  // Features (Five categories)
  const features = [
    { id: 'family', name: 'Family-Friendly', icon: <Users size={16} /> },
    { id: 'event', name: 'Event-Friendly', icon: <Calendar size={16} /> },
    { id: 'accessible', name: 'Accessible', icon: <Accessibility size={16} /> },
    { id: 'pet', name: 'Pet-Friendly', icon: <Dog size={16} /> },
    { id: 'fitness', name: 'Fitness & Sports', icon: <Dumbbell size={16} /> }
  ];

  // Mock data for green spaces
  const allGreenSpaces = [
    { 
      id: 16, 
      name: 'KLCC Park', 
      district: 'Bukit Bintang',
      image: '/src/assets/space_images/16.jpg',
      isFree: true,
      features: ['family', 'accessible', 'fitness'],
      operationTime: 'Daily: 7:00 - 22:00'
    },
    { 
      id: 17, 
      name: 'Perdana Botanical Gardens', 
      district: 'Titiwangsa',
      image: '/src/assets/space_images/17.jpg',
      isFree: true,
      features: ['family', 'event', 'accessible', 'fitness'],
      operationTime: 'Daily: 7:00 - 20:00'
    },
    { 
      id: 18, 
      name: 'Taman Tugu', 
      district: 'Segambut',
      image: '/src/assets/space_images/18.jpg',
      isFree: true,
      features: ['family', 'fitness', 'pet'],
      operationTime: 'Daily: 7:00 - 18:00'
    },
    { 
      id: 19, 
      name: 'Forest Research Institute Malaysia (FRIM)', 
      district: 'Kepong',
      image: '/src/assets/space_images/19.jpg',
      isFree: false,
      features: ['family', 'event', 'fitness'],
      operationTime: 'Tue-Sun: 8:00 - 17:00'
    },
    { 
      id: 20, 
      name: 'Bukit Kiara Park', 
      district: 'Segambut',
      image: '/src/assets/space_images/20.jpg',
      isFree: true,
      features: ['family', 'fitness', 'pet'],
      operationTime: 'Daily: 24 hours'
    }
  ];

  // Search function
  const handleSearch = () => {
    const filtered = allGreenSpaces.filter(space => {
      // Filter by district
      if (selectedDistrict && space.district !== selectedDistrict) {
        return false;
      }
      
      // Filter by features
      if (selectedFeatures.length > 0) {
        const hasAllSelectedFeatures = selectedFeatures.every(feature => 
          space.features.includes(feature)
        );
        if (!hasAllSelectedFeatures) {
          return false;
        }
      }
      
      // Filter by cost
      if (isFree !== null && space.isFree !== isFree) {
        return false;
      }
      
      return true;
    });
    
    setFilteredSpaces(filtered);
    setShowResults(true);
    setDisplayedDistrict(selectedDistrict);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedDistrict('');
    setSelectedFeatures([]);
    setIsFree(null);
    setShowResults(false);
    setDisplayedDistrict('');
  };

  // Feature toggle function
  const toggleFeature = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-600 bg-opacity-80 bg-blend-overlay bg-cover bg-center">
        <div className="container mx-auto py-20 px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              Discover Green Spaces in <span className="text-orange-500">Kuala Lumpur</span>
              <br />
              - Find, Explore, and Enjoy!
            </h1>
            <p className="text-white text-lg max-w-2xl">
              Use OasisKL's interactive map to search for parks, nature
              reserves, and recreational spaces near you. Get detailed
              information and plan your outdoor activities easily!
            </p>
            {/* Navigation */}
            <div className="mb-6 mt-6">
              <Link to={-1} className="flex items-center text-green-500 hover:text-green-700 transition-colors">
                <CircleArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </ Link>
            </div>
          </div>
        </div>
      </section>
      {/* Perfect Green Space Section */}
      <section className="py-16 bg-white -mt-12">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold">
            Let's Find Your <span className="text-orange-500">Perfect Green Space</span>
            <span role="img" aria-label="Trees"> 🌳🌳🌳</span>
          </h2>  
          {/* Map interface would go here */}
          <div className="h-96 bg-gray-200 rounded-lg mt-8">
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-6 border-b pb-4">
              <Filter className="w-5 h-5 mr-2 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Filter Green Spaces</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* District Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select District
                </label>
                <div className="relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                  >
                    <option value="">All Districts</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feature Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Optional Features (Select any that apply)
                </label>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`cursor-pointer px-3 py-2 rounded-lg text-sm flex items-center justify-center transition-all duration-200 ${
                        selectedFeatures.includes(feature.id)
                          ? "bg-green-600 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="mr-1">{feature.icon}</span>
                      {feature.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Fee
                </label>
                <div className="flex space-x-4">
                  <div
                    onClick={() => setIsFree(null)}
                    className={`cursor-pointer px-4 py-3 rounded-lg text-sm font-medium flex-1 text-center transition-all duration-200 ${
                      isFree === null
                        ? "bg-green-600 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Any
                  </div>
                  <div
                    onClick={() => setIsFree(true)}
                    className={`cursor-pointer px-4 py-3 rounded-lg text-sm font-medium flex-1 text-center transition-all duration-200 ${
                      isFree === true
                        ? "bg-green-600 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Free
                  </div>
                  <div
                    onClick={() => setIsFree(false)}
                    className={`cursor-pointer px-4 py-3 rounded-lg text-sm font-medium flex-1 text-center transition-all duration-200 ${
                      isFree === false
                        ? "bg-green-600 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Paid
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Reset Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
              >
                Reset Filters
              </button>
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                Search Green Spaces
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">
              Green Spaces in {displayedDistrict || "Kuala Lumpur"}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Found {filteredSpaces.length} green space{filteredSpaces.length !== 1 ? 's' : ''} matching your criteria.
              <br />
              Click on a green space to view more details and plan your visit!
            </p>
            
            {filteredSpaces.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <p className="text-xl text-gray-600">
                  No green spaces found matching your criteria.
                </p>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSpaces.map((space) => (
                  <div
                    key={space.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
                  >
                    <div className="md:w-1/4 h-48 md:h-auto bg-gray-200">
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x400?text=Green+Space';
                        }}
                      />
                    </div>
                    <div className="p-6 md:w-3/4 flex flex-col">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {space.name}
                        </h3>
                        <p className="text-gray-600 flex items-center mt-2">
                          <MapPin className="w-4 h-4 mr-2 text-green-600" />
                          {space.district}, Kuala Lumpur
                        </p>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-green-600" />
                            <span className="text-gray-700">
                              {space.operationTime}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <Ticket className="w-4 h-4 mr-2 text-green-600" />
                            <span className="text-gray-700">
                              {space.isFree 
                                ? "Free entry, facilities may require charges" 
                                : "Paid entry"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="text-sm text-gray-500 mb-2">Available Features:</div>
                          <div className="flex flex-wrap gap-2">
                            {space.features.map((featureId) => {
                              const feature = features.find(f => f.id === featureId);
                              return feature ? (
                                <span
                                  key={featureId}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {feature.icon}
                                  <span className="ml-1">{feature.name}</span>
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-5">
                        <Link
                          to={`/green-spaces/${space.id}`}
                          className="inline-flex items-center px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
                        >
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default GreenMap;