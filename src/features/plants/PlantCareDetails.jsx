import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CircleArrowLeft, Droplet, Sun, Scissors, Home, Calendar, ThermometerSun, Leaf, SearchCheck, BadgeInfo, NotebookPen } from 'lucide-react';
import useTitle from '../../hooks/useTitle';
import { getNavigationContext, saveNavigationContext } from '../../hooks/navigationContext';


const PlantCareGuide = () => {
  useTitle('OasisKL - Plant Care Guide');
  
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const context = saveNavigationContext();
  
  // API URL
  const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development
  // const API_BASE_URL = '/api'; // Deploy URL
  
  // Fetch plant data
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const fetchPlantData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/plant/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch plant data');
        }
        
        const data = await response.json();
        setPlant(data.plantDetails);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching plant data:', err);
        setError('Failed to load plant details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPlantData();
  }, [id]);
  
  // Render care level badge with appropriate color
  const renderCareLevelBadge = (careLevel) => {
    if (!careLevel) return null;
    
    let bgColor = 'bg-green-100 text-green-800';
    
    if (careLevel === 'Intermediate') {
      bgColor = 'bg-yellow-100 text-yellow-800';
    } else if (careLevel === 'Advanced') {
      bgColor = 'bg-red-100 text-red-800';
    }
    
    return (
      <span className={`inline-block ${bgColor} text-sm px-3 py-1 rounded-full`}>
        {careLevel}
      </span>
    );
  };
  
  // State for accordion items
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  // Function to handle dropdown toggle for accordion items
  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading plant care guide...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }
  
  // Not found state
  if (!plant) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-xl">Plant care guide not found</p>
      </div>
    );
  }

  const handleCareClick = () => {
      saveNavigationContext('plant', id);
    };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Navigation back link */}
      <div className="mb-6">
        <Link 
          to={`/plants/${id}`}
          className="flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Plant Details
        </Link>
      </div>
      
      {/* Hero section */}
      <div className="mb-10">
        <div className="rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400"></div>
            <div className="absolute inset-0 opacity-10">
              {/* Background pattern */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'white\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '15px 15px'
              }}></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
              {/* Plant image */}
              <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-full p-2 shadow-xl overflow-hidden">
                <img 
                  src={`/assets/plants_images/${id}.jpg`} 
                  alt={plant.plant_name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400?text=Plant+Image';
                  }}
                />
              </div>
              
              {/* Text content */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  How to Care for {plant.plant_name}
                </h1>
                <p className="text-orange-100 text-lg max-w-xl mb-4">
                  Everything you need to know about growing and maintaining a healthy {plant.plant_name} plant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Plant characteristics section - Below hero but above care requirements */}
      <div className="mb-10">
        <div className="mt-10 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
              <ThermometerSun className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-5 flex-grow">
              <h2 className="text-2xl font-bold text-gray-800">Growing Specifications</h2>
              <p className="text-gray-700 mt-1">Key characteristics and requirements for {plant.plant_name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            {plant.plant_category && (
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <BadgeInfo className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-800 font-semibold">Category</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg px-4 py-3 flex-grow flex items-center justify-center text-center font-medium">
                  {plant.plant_category}
                </div>
              </div>
            )}

            {plant.plant_suitability && (
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Home className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-800 font-semibold">Suitability</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg px-4 py-3 flex-grow flex items-center justify-center text-center font-medium">
                  {plant.plant_suitability}
                </div>
              </div>
            )}
            
            {plant.gardening_type && (
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Leaf className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-800 font-semibold">Garden Type</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg px-4 py-3 flex-grow flex items-center justify-center text-center font-medium">
                  {plant.gardening_type === 'Both' ? 'Soil-based or Hydroponic' : plant.gardening_type}
                </div>
              </div>
            )}
            
            {plant.care_level && (
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <SearchCheck className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-800 font-semibold">Care Level</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg px-4 py-3 flex-grow flex items-center justify-center text-center font-medium">
                  {plant.care_level}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {plant.sun_exposure && (
              <div className="flex items-center bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Sun className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Sun Exposure</div>
                  <div className="font-semibold text-gray-800">{plant.sun_exposure}</div>
                </div>
              </div>
            )}

            {plant.watering_needs && (
              <div className="flex items-center bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Droplet className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Watering Needs</div>
                  <div className="font-semibold text-gray-800">{plant.watering_needs}</div>
                </div>
              </div>
            )}
            
            {plant.harvest_time && (
              <div className="flex items-center bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Harvest Time</div>
                  <div className="font-semibold text-gray-800">{plant.harvest_time}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Care information grid */}
      <div className="mb-10">
        <div className="mt-10 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
              <Leaf className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-5 flex-grow">
              <h2 className="text-2xl font-bold text-gray-800">Basic Care Requirements for {plant.plant_name}</h2>
              <p className="text-gray-700 mt-1">Everything you need to know about watering, sunlight, and maintenance.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Watering needs */}
          {plant.plant_watering && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Droplet className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Watering</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {plant.plant_watering}
              </p>
            </div>
          )}
          
          {/* Sunlight needs */}
          {plant.plant_sunlight && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Sun className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Sunlight</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {plant.plant_sunlight}
              </p>
            </div>
          )}
          
          {/* Pruning needs */}
          {plant.plant_pruning && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Scissors className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Pruning</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {plant.plant_pruning}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Gardening guides section - only show if plant is indoor friendly or both */}
      {(plant.plant_suitability === "Indoor friendly" || plant.plant_suitability === "Both") && (
        <>
          {/* Hydroponic steps */}
          {(plant.gardening_type === "Hydroponic" || plant.gardening_type === "Both") && (
            <div className="mt-12 mb-10">
              <div className="mt-10 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                    <NotebookPen className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="ml-5 flex-grow">
                    <h2 className="text-2xl font-bold text-gray-800">Hydroponic Growing Guide</h2>
                    <p className="text-gray-700 mt-1">Follow these steps to grow {plant.plant_name} using hydroponic methods.</p>
                  </div>
                </div>
              </div>
              
              {/* Hydroponic Step Cards - First row of 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {/* Step 1 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 1</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">System & Environment Selection</h3>
                    <Link
                      onClick={handleCareClick}
                      to="/guides/hydroponics#step1"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 2</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Hydroponic System Type Selection</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/hydroponics#step2"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 3</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Growing Media for Malaysian Gardeners</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/hydroponics#step3"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 4</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">When to Plant?</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/hydroponics#step4"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Hydroponic Step Cards - Second row of 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Step 5 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 5</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Handling Seeds and Seedlings</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/hydroponics#step5"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 6 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 6</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Nutrient Management for Hydroponics</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/hydroponics#step6"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 7 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 7</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Pest & Disease Management</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/hydroponics#step7"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Soil-based steps */}
          {(plant.gardening_type === "Soil-based" || plant.gardening_type === "Both") && (
            <div className="mt-12 mb-10">
              <div className="mt-10 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                    <NotebookPen className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="ml-5 flex-grow">
                    <h2 className="text-2xl font-bold text-gray-800">Soil-Based Growing Guide</h2>
                    <p className="text-gray-700 mt-1">Follow these steps to grow {plant.plant_name} using traditional soil methods.</p>
                  </div>
                </div>
              </div>
              
              {/* Soil-based Step Cards - First row of 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {/* Step 1 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 1</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Choose Your Indoor Space</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/potted-soil#step1"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 2</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Select Your Containers & Equipment</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/potted-soil#step2"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 3</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Select Your Growing Media</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/potted-soil#step3"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 4</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">When to Plant?</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/potted-soil#step4"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Soil-based Step Cards - Second row of 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Step 5 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 5</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Handling Seeds and Seedlings</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/potted-soil#step5"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 6 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 6</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Nutrient Solutions & Fertilizing</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/potted-soil#step6"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
                
                {/* Step 7 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-orange-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Step 7</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Pest & Disease Management</h3>
                    <Link 
                      onClick={handleCareClick}
                      to="/guides/potted-soil#step7"
                      className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlantCareGuide;