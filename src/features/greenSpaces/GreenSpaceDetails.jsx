import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  Clock,
  Ticket,
  ListChecks,
  Users,
  Calendar,
  Accessibility,
  Dog,
  Dumbbell,
  Sprout,
  CircleArrowLeft,
} from 'lucide-react';

const GreenSpaceDetail = () => {
  const { id } = useParams();
  const mapRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Mock data for the green space
  const greenSpace = {
    id: id,
    name: "Lake Gardens (Taman Tasik Perdana)",
    address: "Jalan Kebun Bunga, Tasik Perdana, 55100 Kuala Lumpur",
    description: "Lake Gardens is a 92-hectare park established in 1888, featuring scenic landscapes, a deer park, butterfly park, and bird park. Visitors can enjoy jogging tracks, picnic areas, and beautifully maintained gardens with exotic plants. Perfect for families and nature lovers looking for a peaceful retreat in the heart of Kuala Lumpur.",
    openingHours: "Daily: 7:00 - 20:00",
    space_free: false,
    space_fee: 12, // in ringgit, only used if space_free is false
    space_family: true,
    space_family_content: ["Playground", "Picnic Areas", "Child-friendly Pathways", "Family Restrooms"],
    // space_event: true,
    // space_event_content: ["Open Event Spaces", "Pavilions", "Educational Programs"],
    space_accessible: true,
    space_accessible_content: ["Wheelchair Accessible Paths", "Disabled Parking", "Accessible Restrooms"],
    space_pet: true,
    space_pet_content: ["Dog-Friendly Areas", "Pet Waste Stations", "Leash-Free Zones"],
    space_fitness: true,
    space_fitness_content: ["Jogging Paths", "Exercise Stations", "Yoga Area", "Bicycle Lanes"],
    space_amenities: true,
    space_amenities_content: ["Public Restrooms", "Drinking Fountains", "Sheltered Rest Areas", "Information Boards", "Trash Bins"],
    topPlants: [
      {
        id: 1,
        name: "Bougainvillea",
      },
      {
        id: 2,
        name: "Heliconia",
      },
      {
        id: 3,
        name: "Hibiscus",
      },
      {
        id: 4,
        name: "Plumeria",
      }
    ],
    mapCoordinates: {
      lat: 3.1478,
      lng: 101.6881
    }
  };

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
          [greenSpace.mapCoordinates.lat, greenSpace.mapCoordinates.lng], 
          15 // zoom level
        );

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add a marker for the green space location
        const marker = L.marker([
          greenSpace.mapCoordinates.lat, 
          greenSpace.mapCoordinates.lng
        ]).addTo(map);

        // Add a popup to the marker
        marker.bindPopup(`
          <strong>${greenSpace.name}</strong><br>
          ${greenSpace.address}
        `).openPopup();

        // Cleanup function to avoid memory leaks
        return () => {
          map.remove();
        };
      });
    }
  }, [greenSpace.mapCoordinates, greenSpace.name, greenSpace.address]);

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
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{greenSpace.name}</h1>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2 text-green-600" />
          <span className="text-lg">{greenSpace.address}</span>
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
          alt={greenSpace.name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400?text=Green+Space+Image';
          }}
        />
      </div>

      {/* About Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">About this green space</h2>
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">{greenSpace.description}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Opening Hours */}
          <div className="flex items-start bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100">
            <Clock className="w-6 h-6 mr-4 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 text-lg">Opening Hours</h3>
              <p className="text-gray-600 mt-1">{greenSpace.openingHours}</p>
            </div>
          </div>
          
          {/* Entrance Fee */}
          <div className="flex items-start bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100">
            <Ticket className="w-6 h-6 mr-4 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 text-lg">Entrance Fee</h3>
              {greenSpace.space_free ? (
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
        {greenSpace.space_amenities && (
          <div className="mb-8">
            <div className="flex items-center mb-4 bg-green-50 p-3 rounded-lg">
              <ListChecks className="w-6 h-6 mr-3 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">General Amenities</h3>
            </div>
            <div className="ml-12">
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {greenSpace.space_amenities_content.map((item, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Family-Friendly Card */}
          {greenSpace.space_family && (
            <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Family-Friendly</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {greenSpace.space_family_content.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Event-Friendly Card */}
          {greenSpace.space_event && (
            <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-purple-50 p-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                <h3 className="font-semibold text-gray-800">Event-Friendly</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {greenSpace.space_event_content.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Accessible Card */}
          {greenSpace.space_accessible && (
            <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-50 p-3 flex items-center">
                <Accessibility className="w-5 h-5 mr-2 text-indigo-600" />
                <h3 className="font-semibold text-gray-800">Accessible</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {greenSpace.space_accessible_content.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Fitness & Sports Card */}
          {greenSpace.space_fitness && (
            <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-red-50 p-3 flex items-center">
                <Dumbbell className="w-5 h-5 mr-2 text-red-600" />
                <h3 className="font-semibold text-gray-800">Fitness & Sports</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {greenSpace.space_fitness_content.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Pet-Friendly Card - only shown if applicable */}
          {greenSpace.space_pet && (
            <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-yellow-50 p-3 flex items-center">
                <Dog className="w-5 h-5 mr-2 text-yellow-600" />
                <h3 className="font-semibold text-gray-800">Pet-Friendly</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {greenSpace.space_pet_content.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
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

      {/* Top Plants Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm mt-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-6">
          Most Observed Plants in {greenSpace.name}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {greenSpace.topPlants.map((plant) => (
            <div key={plant.id} className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg group">
              {/* Plant Image */}
              <div className="h-48 bg-gray-200">
                <img 
                  src={`/src/assets/plants_images/${plant.id}.jpg`}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400?text=Plant+Image';
                  }}
                />
              </div>
              
              {/* Plant Info */}
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Sprout className="w-6 h-6 mr-2 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-100">{plant.name}</h3>
                </div>
                <Link
                  to={`/plants/${plant.id}`}
                  className="mt-4 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center">
                  Learn more
                </ Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GreenSpaceDetail;