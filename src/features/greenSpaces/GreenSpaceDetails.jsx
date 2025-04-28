import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Ticket, ListChecks, Users, Accessibility, Dog, Sprout, CircleArrowLeft, Info, Leaf } from 'lucide-react';
import useTitle from '../../hooks/useTitle';

const GreenSpaceDetail = () => {
  useTitle('OasisKL - Green Space Details');

  const { id } = useParams();
  const mapRef = useRef(null);
  const [plants, setPlants] = useState([]);
  const [greenSpace, setGreenSpace] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle back navigation
  const handleBackToSearch = () => {
    // Navigate back to the search page
    window.history.back();
    
    // Add a small delay to ensure navigation begins before scrolling
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };
  
  // const API_BASE_URL = '/api'; // Deploy URL
  const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Fetch space details and plants data from the backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/plants/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch plants: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setPlants(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching plants:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchGreenSpace = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/spaces/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch space: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setGreenSpace(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching space:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPlants();
    fetchGreenSpace();
  }, [id, API_BASE_URL]);

  const scrollToMap = () => {
    document.getElementById('location-map').scrollIntoView({ behavior: 'smooth' });
  };

  // Leaflet map initialization
  useEffect(() => {
    // Check if greenSpace data and coordinates are available
    if (!greenSpace || !greenSpace.space_latitude || !greenSpace.space_longitude) {
      return;
    }
    
    // Check if the mapRef is available and the container exists
    if (mapRef.current && !mapRef.current._leaflet_id) {
      // Dynamically import Leaflet to avoid SSR issues
      import('leaflet').then(L => {
        // Initialize the map
        const map = L.map(mapRef.current).setView(
          [parseFloat(greenSpace.space_latitude), parseFloat(greenSpace.space_longitude)], 
          15 // zoom level
        );

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add a marker for the green space location
        const marker = L.marker([
          parseFloat(greenSpace.space_latitude), 
          parseFloat(greenSpace.space_longitude)
        ]).addTo(map);

        // Add a popup to the marker
        marker.bindPopup(`
          <strong>${greenSpace.space_name}</strong><br>
          ${greenSpace.space_address}
        `).openPopup();

        // Cleanup function to avoid memory leaks
        return () => {
          map.remove();
        };
      });
    }
  }, [greenSpace]);

  // Helper function to check if a feature is enabled
  const isFeatureEnabled = (value) => {
    return value === "TRUE" || value === true;
  };

  // Function to safely split comma-separated strings
  const safeSplit = (str) => {
    if (!str) return [];
    return str.split(', ');
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center text-red-500 p-6 bg-red-50 rounded-lg">
          <p>Failed to load details: {error}</p>
          <button 
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <button 
          onClick={handleBackToSearch} 
          className="flex items-center text-green-500 hover:text-green-700 transition-colors">
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </button>
      </div>
      {/* Hero Banner for Green Space Detail Page */}
      <div className="mb-10 flex flex-col md:flex-row gap-6">
        {/* Text content in green block - Right side */}
        <div className="md:w-3/3">
          <div className="h-full rounded-2xl shadow-xl overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-emerald-900"></div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'white\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: '15px 15px'
                }}></div>
              </div>
              
              {/* Text content */}
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-3 w-fit">
                  Green Space
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{greenSpace.space_name || 'Green Space'}</h1>
                <div className="flex items-center text-green-100 text-lg mb-6">
                  <MapPin className="w-6 h-6 mr-2" />
                  <span>{greenSpace.space_address || 'Location information unavailable'}</span>
                </div>
                <button 
                  className="bg-white text-green-800 px-6 py-3 rounded-full hover:bg-green-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-md font-medium w-fit"
                  onClick={scrollToMap}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Show on Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Image */}
      <div className="mb-10 rounded-xl overflow-hidden h-96 shadow-lg">
        <img 
          src={`/assets/space_images/${id}.jpg`} 
          alt={greenSpace.space_name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400?text=Green+Space+Image';
          }}
        />
      </div>

      {/* About Section */}
      <div className="mb-10">
        {/* About Section Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                <Info className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">About this green space</h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* About Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="min-h-0 h-auto">
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {greenSpace.space_description_content || 'No description available.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Opening Hours */}
            <div className="flex items-start bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100">
              <Clock className="w-6 h-6 mr-4 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800 text-lg">Opening Hours</h3>
                {greenSpace.space_business_hours ? (
                  greenSpace.space_business_hours.includes(',') ? (
                    // If hours contain commas, split and display on multiple lines
                    greenSpace.space_business_hours.split(',').map((hours, index) => (
                      <p key={index} className="text-gray-600 mt-1">
                        {hours.trim()}
                      </p>
                    ))
                  ) : (
                    // If it's a single line, display as is
                    <p className="text-gray-600 mt-1">{greenSpace.space_business_hours}</p>
                  )
                ) : (
                  <p className="text-gray-600 mt-1">Not specified</p>
                )}
              </div>
            </div>
            
            {/* Entrance Fee */}
            <div className="flex items-start bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100">
              <Ticket className="w-6 h-6 mr-4 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800 text-lg">Entrance Fee</h3>
                {isFeatureEnabled(greenSpace.space_free) ? (
                  <p className="text-green-600 font-medium mt-1">Free</p>
                ) : (
                  <p className="text-gray-600 mt-1">
                    {greenSpace.space_fee ? `RM ${parseFloat(greenSpace.space_fee).toFixed(2)}` : 'Paid entry'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features/Amenities */}
      <div className="mb-10">
        {/* Amenities & Features Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                <ListChecks className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Amenities & Features</h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {/* General Amenities */}
          {isFeatureEnabled(greenSpace.space_amenities) && (
            <div className="mb-8">
              <div className="flex items-center mb-4 bg-green-50 p-3 rounded-lg">
                <ListChecks className="w-6 h-6 mr-3 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-800">General Amenities</h3>
              </div>
              <div className="ml-12">
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {safeSplit(greenSpace.space_amenities_content).map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Feature Cards */}
          <div className="mt-8">
            <div className="flex items-center mb-4 bg-green-50 p-3 rounded-lg">
              <ListChecks className="w-6 h-6 mr-3 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Special Features</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Family-Friendly Card */}
              {isFeatureEnabled(greenSpace.space_family) && (
                    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform">
                      <div className="bg-gradient-to-r from-red-200 to-red-300 p-4 flex flex-col items-center">
                        <div className="bg-white p-3 rounded-full mb-2">
                          <Users className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="font-bold text-red-700 text-lg">Family-Friendly</h3>
                      </div>
                      <div className="p-5">
                        <ul className="space-y-3">
                          {safeSplit(greenSpace.space_family_content).map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-red-300 rounded-full mr-3 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Accessible Card */}
                  {isFeatureEnabled(greenSpace.space_accessible) && (
                    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform">
                      <div className="bg-gradient-to-r from-indigo-200 to-indigo-300 p-4 flex flex-col items-center">
                        <div className="bg-white p-3 rounded-full mb-2">
                          <Accessibility className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="font-bold text-indigo-700 text-lg">Accessibility</h3>
                      </div>
                      <div className="p-5">
                        <ul className="space-y-3">
                          {safeSplit(greenSpace.space_accessible_content).map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-indigo-300 rounded-full mr-3 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Pet-Friendly Card */}
                  {isFeatureEnabled(greenSpace.space_pet) && (
                    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform">
                      <div className="bg-gradient-to-r from-amber-200 to-amber-300 p-4 flex flex-col items-center">
                        <div className="bg-white p-3 rounded-full mb-2">
                          <Dog className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="font-bold text-amber-700 text-lg">Pet-Friendly</h3>
                      </div>
                      <div className="p-5">
                        <ul className="space-y-3">
                          {safeSplit(greenSpace.space_pet_content).map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-amber-300 rounded-full mr-3 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-10">
        {/* Location Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Location</h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Content */}
        <div id="location-map" className="bg-white p-6 rounded-lg shadow-sm scroll-mt-4">
          <div className="h-96 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
            {/* Leaflet map container */}
            <div ref={mapRef} className="w-full h-full"></div>
          </div>
        </div>
      </div>

      {/* Plants Section */}
      <div className="mb-10">
        {/* Plants Section Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Most Observed Plants in {greenSpace.space_name || 'This Area'}</h2>
              </div>
            </div>
          </div>
        </div>
  
      {/* Plants Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {/* Plants content here */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            <p>Failed to load plants: {error}</p>
            <button 
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* First row: 3 plants */}
            <div className="flex flex-wrap justify-center gap-8 mb-8 w-full">
              {plants.slice(0, 3).map((plant) => (
                <div 
                  key={plant.plant_id} 
                  className="w-64 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Plant Image */}
                  <div className="h-52 bg-gray-200 overflow-hidden">
                    <img 
                      src={`/assets/plants_images/${plant.plant_id}.jpg`}
                      alt={plant.plant_name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=Plant+Image';
                      }}
                    />
                  </div>
                  
                  {/* Plant Info - Simplified */}
                  <div className="p-4">
                    <div className="flex items-center justify-center mb-4">
                      <Sprout className="w-5 h-5 mr-2 text-green-500" />
                      <h3 className="text-lg font-semibold text-gray-800">{plant.plant_name}</h3>
                    </div>
                    
                    <Link
                      to={`/plants/${plant.plant_id}?fromSpace=${id}`}
                      className="block w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium">
                      Learn more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Second row: 2 plants */}
            <div className="flex flex-wrap justify-center gap-8 w-full">
              {plants.slice(3, 5).map((plant) => (
                <div 
                  key={plant.plant_id} 
                  className="w-64 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Plant Image */}
                  <div className="h-52 bg-gray-200 overflow-hidden">
                    <img 
                      src={`/assets/plants_images/${plant.plant_id}.jpg`}
                      alt={plant.plant_name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=Plant+Image';
                      }}
                    />
                  </div>
                  
                  {/* Plant Info - Simplified */}
                  <div className="p-4">
                    <div className="flex items-center justify-center mb-4">
                      <Sprout className="w-5 h-5 mr-2 text-green-500" />
                      <h3 className="text-lg font-semibold text-gray-800">{plant.plant_name}</h3>
                    </div>
                    
                    <Link
                      to={`/plants/${plant.plant_id}?fromSpace=${id}`}
                      className="block w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium">
                      Learn more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Show message if no plants found */}
        {!loading && !error && plants.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <Sprout className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No plants have been recorded for this green space yet.</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default GreenSpaceDetail;