import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Ticket, ArrowRight, Filter, Users, Accessibility, Dog, CircleArrowLeft, ChevronLeft, ChevronRight} from 'lucide-react';
import useTitle from '../../hooks/useTitle';

const GreenMap = () => {

  useTitle('OasisKL - Green Map');
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // State for filters
  const [districts, setDistricts] = useState([]);
  const [greenSpaces, setGreenSpaces] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isFree, setIsFree] = useState(null); // null = any, true = free, false = paid
  const [showResults, setShowResults] = useState(false);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [displayedDistrict, setDisplayedDistrict] = useState('');
  const [interactiveMap, setInteractiveMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapMarkersRef = useRef([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const spacesPerPage = 5;

  // API base URL
  // const API_BASE_URL = '/api'; // Deployed URL
  const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/spaces`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch spaces: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        if (mapRef.current && !mapRef.current._leaflet_id) {
          import('leaflet').then(L => {
            const map = L.map(mapRef.current).setView(
              [3.1390, 101.6869], 11
            );
            setInteractiveMap(map);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
    
            mapRef.current = map;

            populateDistricts(data);
            populateGreenSpaces(data, map);
          }
        )};
      } catch (err) {
        console.error('Error fetching spaces:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSpaces();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [API_BASE_URL]);

  const populateDistricts = (data) => {
    const districtList = data.map((row) => row['space_district']);
    const uniqueDistricts = [...new Set(districtList)];
    setDistricts(uniqueDistricts);
  };

  const populateGreenSpaces = (data, map) => {
    const greenSpacesList = data.map((row) => ({
      id: row["space_id"],
      name: row["space_name"],
      district: row["space_district"],
      address: row["space_address"],
      description: row["space_description_content"],
      isFree: row["space_free"] === "TRUE" || row["space_free"] === true,
      fee: row["space_fee"],
      operationTime: row["space_business_hours"],
      isFamilyFriendly: row["space_family"] === "TRUE" || row["space_family"] === true,
      familyContent: row["space_family_content"],
      hasAmenities: row["space_amenities"] === "TRUE" || row["space_amenities"] === true,
      features: row["space_amenities_content"] ? row["space_amenities_content"].split(', ') : [],
      isAccessible: row["space_accessible"] === "TRUE" || row["space_accessible"] === true,
      accessibleContent: row["space_accessible_content"],
      isPetFriendly: row["space_pet"] === "TRUE" || row["space_pet"] === true,
      petContent: row["space_pet_content"],
      latitude: parseFloat(row["space_latitude"]),
      longitude: parseFloat(row["space_longitude"]) 
    }));
    setGreenSpaces(greenSpacesList);
    addMarkers(greenSpacesList, map);
  };

  const addMarkers = (greenSpaces, map) => {
    mapMarkersRef.current.forEach((m) => m.remove());
    mapMarkersRef.current = [];
  
    greenSpaces.forEach(gs => {
      const lat = parseFloat(gs.latitude);
      const lng = parseFloat(gs.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        import('leaflet').then(L => {
          const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<strong>${gs.name}</strong><br>${gs.address}`)
          .on('click', () => {
            // Zoom to location when marker is clicked, zoom level 16 for detailed view
            map.setView([lat, lng], 16);
          });
          mapMarkersRef.current.push(marker);
        });
      };
    });
  };

  // Features (Five categories)
  const features = [
    { id: 'family', name: 'Family-Friendly', icon: <Users size={16} /> },
    { id: 'accessible', name: 'Accessible', icon: <Accessibility size={16} /> },
    { id: 'pet', name: 'Pet-Friendly', icon: <Dog size={16} /> },
  ];

  // Search function
  const handleSearch = () => {
    const filtered = greenSpaces.filter(space => {
      // Filter by district
      if (selectedDistrict && space.district !== selectedDistrict) {
        return false;
      }
      
      // Filter by features
      if (selectedFeatures.length > 0) {
        const hasAllSelectedFeatures = selectedFeatures.every(feature => {
          if (feature === 'family') return space.isFamilyFriendly;
          if (feature === 'accessible') return space.isAccessible;
          if (feature === 'pet') return space.isPetFriendly;
          return false;
        });
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
    if (interactiveMap) {
      addMarkers(filtered, interactiveMap);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedDistrict('');
    setSelectedFeatures([]);
    setIsFree(null);
    setShowResults(false);
    setDisplayedDistrict('');
    setCurrentPage(1);
    if (interactiveMap){
      addMarkers(greenSpaces, interactiveMap);
    }
  };

  // Feature toggle function
  const toggleFeature = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredSpaces.length / spacesPerPage);
  
  // Get current spaces
  const indexOfLastSpace = currentPage * spacesPerPage;
  const indexOfFirstSpace = indexOfLastSpace - spacesPerPage;
  const currentSpaces = filteredSpaces.slice(indexOfFirstSpace, indexOfLastSpace);

  return (
    <>
      {/* Hero Section */}
      <div className="w-full">
      <section className="relative bg-gray-800 bg-opacity-80 bg-blend-overlay bg-cover bg-center" style={{ 
        backgroundImage: "url('/assets/careguides/herosection3.jpg')" 
      }}>
          <div ref={mapRef} className="w-full h-full"></div>
          <div className="container mx-auto py-20 px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold text-white mb-4">
                <span className="whitespace-nowrap">Discover Green Spaces in <span className="text-orange-500">Kuala&nbsp;Lumpur</span></span>
                <br />
                <span className="whitespace-nowrap">- Find, Explore, and Enjoy!</span>
              </h1>
              <p className="text-white text-lg max-w-2xl">
                Use OasisKL's interactive map to search for parks, nature
                reserves, and recreational spaces near you. Get detailed
                information and plan your outdoor activities easily!
              </p>
              {/* Navigation */}
              <div className="mb-6 mt-6">
                <Link 
                  to="/"
                  className="flex items-center text-green-500 hover:text-green-700 transition-colors">
                  <CircleArrowLeft className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Perfect Green Space Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold">
            Let's Find Your <span className="text-orange-500">Perfect Green Space</span>
            <span role="img" aria-label="Trees"> 🌳🌳🌳</span>
          </h2>  
          {/* Map interface */}
          <div className="h-96 bg-gray-200 rounded-lg mt-8">
            <div className="h-full flex items-center justify-center">
              <div ref={mapRef} className="w-full h-full">
              </div>
            </div>
          </div>  
        </div>
      </section>

       {/* Filter Section*/}
       <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-6 border-b pb-4">
                <Filter className="w-5 h-5 mr-2 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Filter Green Spaces</h2>
              </div>

              {/* Filter layout */}
              <div className="flex flex-col space-y-6">
                {/* First row - District and Entry Fee */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                {/* Second row - Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Optional Features (Select any that apply)
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`cursor-pointer px-4 py-3 rounded-lg text-sm flex items-center transition-all duration-200 ${
                          selectedFeatures.includes(feature.id)
                            ? "bg-green-600 text-white shadow-md transform scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="mr-2">{feature.icon}</span>
                        {feature.name}
                      </div>
                    ))}
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
                  {currentSpaces.map((space) => (
                    <div
                      key={space.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
                    >
                      <div className="md:w-1/4 h-48 md:h-auto bg-gray-200">
                        <img
                          src={`/assets/space_images/${space.id}.jpg`}
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
                                  : `Entry Fee: RM ${space.fee}`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center flex-wrap">
                            <div className="text-sm text-gray-500 mr-3">Available Features:</div>
                            <div className="flex flex-wrap gap-2">
                            {features.map((feature) => {
                              let isAvailable = false;
                              
                              // Check if this feature is available for this space
                              if (feature.id === 'family' && space.isFamilyFriendly) isAvailable = true;
                              if (feature.id === 'accessible' && space.isAccessible) isAvailable = true;
                              if (feature.id === 'pet' && space.isPetFriendly) isAvailable = true;
                              
                              // Only show the feature if it's available
                              return isAvailable ? (
                                <span
                                  key={feature.id}
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
                            to={`/spaces/${space.id}`}
                            className="inline-flex items-center px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
                          >
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
                        >
                          <ChevronLeft size={20} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(num => {
                            return num === 1 ||
                                  num === totalPages ||
                                  (num >= currentPage - 1 && num <= currentPage + 1);
                          })
                          .map((number, index, array) => {
                            const showEllipsisBefore = index > 0 && array[index - 1] !== number - 1;
                            const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== number + 1;

                            return (
                              <React.Fragment key={number}>
                                {showEllipsisBefore && <span className="px-3 py-1 text-gray-500">...</span>}
                                <button
                                  onClick={() => paginate(number)}
                                  className={`px-3 py-1 rounded-md ${
                                    currentPage === number
                                      ? 'bg-green-600 text-white'
                                      : 'text-gray-700 hover:bg-green-50'
                                  }`}
                                >
                                  {number}
                                </button>
                                {showEllipsisAfter && <span className="px-3 py-1 text-gray-500">...</span>}
                              </React.Fragment>
                            );
                          })}

                        <button
                          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default GreenMap;