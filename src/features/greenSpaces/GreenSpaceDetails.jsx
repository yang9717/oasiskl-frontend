import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Ticket, ListChecks, Users, Accessibility, Dog, Sprout, CircleArrowLeft } from 'lucide-react';

const GreenSpaceDetail = () => {
  const { id } = useParams();
  const mapRef = useRef(null);
  const [plants, setPlants] = useState([]);
  const [greenSpace, setGreenSpace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = 'http://165.22.96.250:3000';
  // const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Fetch plants data from the backend
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
  
  // Mock data for the green space
  // const greenSpace = {
  //   space_id: id,
  //   space_name: "Lake Gardens (Taman Tasik Perdana)",
  //   space_district: "Kuala Lumpur",
  //   space_address: "Jalan Kebun Bunga, Tasik Perdana, 55100 Kuala Lumpur",
  //   space_description_content: "Lake Gardens is a 92-hectare park established in 1888, featuring scenic landscapes, a deer park, butterfly park, and bird park. Visitors can enjoy jogging tracks, picnic areas, and beautifully maintained gardens with exotic plants. Perfect for families and nature lovers looking for a peaceful retreat in the heart of Kuala Lumpur.",
  //   space_free: "FALSE",
  //   space_fee: 12,
  //   space_business_hours: "Daily: 7:00 - 20:00",
  //   space_family: "TRUE",
  //   space_family_content: "Playground, Picnic Areas, Child-friendly Pathways, Family Restrooms",
  //   space_amenities: "TRUE",
  //   space_amenities_content: "Public Restrooms, Drinking Fountains, Sheltered Rest Areas, Information Boards, Trash Bins",
  //   space_accessible: "TRUE",
  //   space_accessible_content: "Wheelchair Accessible Paths, Disabled Parking, Accessible Restrooms",
  //   space_pet: "TRUE",
  //   space_pet_content: "Dog-Friendly Areas, Pet Waste Stations, Leash-Free Zones",
  //   space_latitude: 3.1478,
  //   space_longitude: 101.6881
  // };

  const scrollToMap = () => {
    document.getElementById('location-map').scrollIntoView({ behavior: 'smooth' });
  };

  // Leaflet map initialization
  useEffect(() => {
    // Check if the mapRef is available and the container exists
    if (mapRef.current && !mapRef.current._leaflet_id) {
      // Dynamically import Leaflet to avoid SSR issues
      import('leaflet').then(L => {
        // Initialize the map
        const map = L.map(mapRef.current).setView(
          [greenSpace.space_latitude, greenSpace.space_longitude], 
          15 // zoom level
        );

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add a marker for the green space location
        const marker = L.marker([
          greenSpace.space_latitude, 
          greenSpace.space_longitude
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
  }, [greenSpace.space_latitude, greenSpace.space_longitude, greenSpace.space_name, greenSpace.space_address]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link to={-1} className="flex items-center text-green-600 hover:text-green-700 transition-colors">
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </ Link>
      </div>
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{greenSpace.space_name}</h1>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2 text-green-600" />
          <span className="text-lg">{greenSpace.space_address}</span>
        </div>
        <button 
          className="mt-4 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-md"
          onClick={scrollToMap}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Show on Map
        </button>
      </div>

      {/* Main Image */}
      <div className="mb-10 rounded-xl overflow-hidden h-96 shadow-lg">
        <img 
          src={`/src/assets/space_images/${id}.jpg`} 
          alt={greenSpace.space_name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400?text=Green+Space+Image';
          }}
        />
      </div>

      {/* About Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">About this green space</h2>
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">{greenSpace.space_description_content}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Opening Hours */}
          <div className="flex items-start bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100">
            <Clock className="w-6 h-6 mr-4 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 text-lg">Opening Hours</h3>
              <p className="text-gray-600 mt-1">{greenSpace.space_business_hours}</p>
            </div>
          </div>
          
          {/* Entrance Fee */}
          <div className="flex items-start bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100">
            <Ticket className="w-6 h-6 mr-4 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 text-lg">Entrance Fee</h3>
              {greenSpace.space_free === "TRUE" ? (
                <p className="text-green-600 font-medium mt-1">Free</p>
              ) : (
                <p className="text-gray-600 mt-1">RM {greenSpace.space_fee.toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features/Amenities */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2">Amenities & Features</h2>
        
        {/* General Amenities */}
        {greenSpace.space_amentities === "TRUE" && (
          <div className="mb-8">
            <div className="flex items-center mb-4 bg-green-50 p-3 rounded-lg">
              <ListChecks className="w-6 h-6 mr-3 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">General Amenities</h3>
            </div>
            <div className="ml-12">
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {greenSpace.space_amentities_content.split(', ').map((item, index) => (
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
            {greenSpace.space_family === "TRUE" && (
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform">
                <div className="bg-gradient-to-r from-red-200 to-red-300 p-4 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-full mb-2">
                    <Users className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="font-bold text-red-700 text-lg">Family-Friendly</h3>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {greenSpace.space_family_content.split(', ').map((item, index) => (
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
            {greenSpace.space_accessible === "TRUE" && (
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform">
                <div className="bg-gradient-to-r from-indigo-200 to-indigo-300 p-4 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-full mb-2">
                    <Accessibility className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-indigo-700 text-lg">Accessibility</h3>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {greenSpace.space_accessible_content.split(', ').map((item, index) => (
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
            {greenSpace.space_pet === "TRUE" && (
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform">
                <div className="bg-gradient-to-r from-amber-200 to-amber-300 p-4 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-full mb-2">
                    <Dog className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="font-bold text-amber-700 text-lg">Pet-Friendly</h3>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {greenSpace.space_pet_content.split(', ').map((item, index) => (
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
      
      {/* Map */}
      <div id="location-map" className="bg-white p-6 rounded-lg shadow-sm scroll-mt-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">Location</h2>
        <div className="h-96 bg-gray-100 rounded-lg overflow-hidden shadow-inner mt-4">
          {/* Leaflet map container */}
          <div ref={mapRef} className="w-full h-full"></div>
        </div>
      </div>

      {/* Plants Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm mt-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-8 text-center">
          Most Observed Plants in {greenSpace.space_name}
        </h2>
        
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
                      src={`/src/assets/plants_images/${plant.plant_id}.jpg`}
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
                      to={`/plants/${plant.plant_id}`}
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
                      src={`/src/assets/plants_images/${plant.plant_id}.jpg`}
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
                      to={`/plants/${plant.plant_id}`}
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
  );
};

export default GreenSpaceDetail;