import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CircleArrowLeft, Droplet, Sun, Scissors, MapPin, Fence, SearchCheck } from 'lucide-react';

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [otherSpaces, setOtherSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://oasiskl.tech:3000';
  // const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

  // Fetch plant data from backend
  useEffect(() => {
    // Scroll to top when the component mounts
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
        setOtherSpaces(data.otherSpaces || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching plant data:', err);
        setError('Failed to load plant details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPlantData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading plant details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }
  
  if (!plant) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-xl">Plant not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link to={-1} className="flex items-center text-green-600 hover:text-green-700 transition-colors">
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Green Space
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plant Image Section */}
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={`/src/assets/plants_images/${id}.jpg`}
            alt={plant.plant_name} 
            className="w-full h-[400px] object-contain p-4"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400?text=Plant+Image';
            }}
          />
        </div>
        
        {/* Plant Details Section */}
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">
              {plant.plant_name}
            </h1>
          </div>
          
          {/* Description */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {plant.plant_description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Garden Tips Banner */}
      <div className="mt-10 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
            <Fence className="w-8 h-8 text-green-600" />
          </div>
          <div className="ml-5">
            <h2 className="text-2xl font-bold text-gray-800">Want to plant in your own garden?</h2>
            <p className="text-gray-700 mt-1">Follow these care tips below to help your {plant.plant_name} thrive!</p>
          </div>
        </div>
      </div>
      
      {/* Care Guide Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sunlight Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full">
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Sun className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Sunlight</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {plant.plant_sunlight}
            </p>
          </div>
        </div>
        
        {/* Watering Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full">
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Droplet className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Watering</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {plant.plant_watering}
            </p>
          </div>
        </div>
        
        {/* Pruning Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full">
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Scissors className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Pruning</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {plant.plant_pruning}
            </p>
          </div>
        </div>
      </div>

      {/* Where to Find This Plant Section */}
      {otherSpaces && otherSpaces.length > 0 && (
        <div className="mt-12">
          <div className="mt-10 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                <SearchCheck className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-5">
                <h2 className="text-2xl font-bold text-gray-800">Where to Find {plant.plant_name} in Kuala Lumpur?</h2>
                <p className="text-gray-700 mt-1">These green spaces host this plant, visit them to see it up close!</p>
              </div>
            </div>
          </div>
          {/* Green Spaces List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {otherSpaces.map((space) => (
              <Link 
                key={space.space_id} 
                to={`/spaces/${space.space_id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 bg-gray-100">
                  <img 
                    src={`/src/assets/space_images/${space.space_id}.jpg`}
                    alt={`Green Space ${space.space_id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x400?text=Green+Space';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">{space.space_name}</h3>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    Kuala Lumpur
                  </p>
                  <div className="mt-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Commonly observed here
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetails;