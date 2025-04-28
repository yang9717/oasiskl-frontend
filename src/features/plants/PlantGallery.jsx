import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, CircleArrowLeft, Search, Filter, Leaf, AlertCircle } from 'lucide-react';
import { saveNavigationContext } from '../../hooks/navigationContext';
import { useTitle } from '../../hooks/useTitle';

const API_BASE_URL = '/api'; // Deploy URL
// const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

const PlantGallery = () => {

  useTitle('OasisKL - Plant Gallery');
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    plantSuitability: [],
    gardeningType: [],
    plantCategory: [],
    careLevel: [],
    sunExposure: [],
    harvestTime: [],
    wateringNeeds: []
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);

    const newFilters = { ...filters };
    
    // Check for suitability filter in URL
    const suitability = searchParams.get('suitability');
    if (suitability) {
      newFilters.plantSuitability = suitability.split(',');
    }
    
    // Only update if there are actual URL params
    if (suitability) {
      setFilters(newFilters);
    }
  }, [searchParams]);

  const handlePlantClick = () => {
    saveNavigationContext('gallery');
  };

  useEffect(() => {
    // Don't update URL on initial render
    if (Object.values(filters).every(arr => arr.length === 0)) return;
    
    const params = new URLSearchParams();
    
    if (filters.plantSuitability.length > 0) {
      params.set('suitability', filters.plantSuitability.join(','));
    }
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
  
  // Mobile filter visibility
  const [showFilters, setShowFilters] = useState(false);
  
  // State for plants data and UI states
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 9;
  
  // Fetch plants from API
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/plants`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setPlants(data);
        setFilteredPlants(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching plants:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlants();
  }, []);
  
  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };
  
  // Function to handle filter changes
  const handleFilterChange = (category, option) => {
    setCurrentPage(1); // Reset to first page when filters change
    
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      
      // If option already exists, remove it (toggle functionality)
      if (updatedFilters[category].includes(option)) {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== option);
      } else {
        // Add the option
        updatedFilters[category] = [...updatedFilters[category], option];
      }
      
      // Special case: if we're removing 'Indoor friendly' from plantSuitability,
      // also clear gardeningType since it's dependent on 'Indoor friendly'
      if (category === 'plantSuitability' && option === 'Indoor friendly' && 
        !updatedFilters.plantSuitability.includes('Indoor friendly')) {
      updatedFilters.gardeningType = [];
    }
      
      return updatedFilters;
    });
  };
  
  // Function to clear all filters and search
  const clearFilters = () => {
    setCurrentPage(1); // Reset to first page when filters are cleared
    setSearchTerm('');
    setFilters({
      plantSuitability: [],
      gardeningType: [],
      plantCategory: [],
      careLevel: [],
      sunExposure: [],
      harvestTime: [],
      wateringNeeds: []
    });
  };
  
  // Get total number of active filters for badge
  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };
  
  // Apply filters and search whenever filters or search state changes
  useEffect(() => {
    if (plants.length === 0) return;
    
    const filtered = plants.filter(plant => {
      // Apply search term filter
      if (searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = plant.plant_name?.toLowerCase().includes(searchLower);
        const descriptionMatch = plant.plant_description?.toLowerCase().includes(searchLower);
        const familyMatch = plant.plant_family?.toLowerCase().includes(searchLower);
        const genusMatch = plant.plant_genus?.toLowerCase().includes(searchLower);
        
        if (!(nameMatch || descriptionMatch || familyMatch || genusMatch)) {
          return false;
        }
      }
      
      // Map API field names to our filter categories
      const plantData = {
        plantSuitability: plant.plant_suitability,
        gardeningType: plant.gardening_type,
        plantCategory: plant.plant_category,
        careLevel: plant.care_level,
        sunExposure: plant.sun_exposure,
        harvestTime: plant.harvest_time,
        wateringNeeds: plant.watering_needs
      };
      
      // Plant Suitability filter
      if (filters.plantSuitability.length > 0 && 
          !filters.plantSuitability.includes(plantData.plantSuitability)) {
        return false;
      }
  
      // Gardening Type filter - special handling for "both" value
      if (filters.gardeningType.length > 0) {
        // If plant has no gardening type, exclude it
        if (!plantData.gardeningType) {
          return false;
        }
        
        const plantType = plantData.gardeningType;
        const selectedTypes = filters.gardeningType;
        
        // Check if this plant's type matches any selected filter
        const matchesDirectly = selectedTypes.includes(plantType);
        
        // Special case: "both" type plants match either Hydroponic or Soil-based filters
        const isBothTypeMatchingSpecific = 
          plantType === "Both" && 
          (selectedTypes.includes("Hydroponic") || selectedTypes.includes("Soil-based"));
        
        // If no match, exclude the plant
        if (!matchesDirectly && !isBothTypeMatchingSpecific) {
          return false;
        }
      }
      
      // Gardening Type filter (only apply if 'Indoor friendly' is selected)
      if (filters.plantSuitability.includes('Indoor friendly') && 
          filters.gardeningType.length > 0 && 
          !filters.gardeningType.includes(plantData.gardeningType)) {
        return false;
      }
      
      // Plant Category filter
      if (filters.plantCategory.length > 0 && 
          !filters.plantCategory.includes(plantData.plantCategory)) {
        return false;
      }
      
      // Care Level filter - exclude plants with null values when filter is active
      if (filters.careLevel.length > 0) {
        if (!plantData.careLevel || !filters.careLevel.includes(plantData.careLevel)) {
          return false;
        }
      }
      
      // Sun Exposure filter - exclude plants with null values when filter is active
      if (filters.sunExposure.length > 0) {
        if (!plantData.sunExposure || !filters.sunExposure.includes(plantData.sunExposure)) {
          return false;
        }
      }
      
      // Harvest Time filter - exclude plants with null values when filter is active
      if (filters.harvestTime.length > 0) {
        if (!plantData.harvestTime || !filters.harvestTime.includes(plantData.harvestTime)) {
          return false;
        }
      }
      
      // Watering Needs filter - exclude plants with null values when filter is active
      if (filters.wateringNeeds.length > 0) {
        if (!plantData.wateringNeeds || !filters.wateringNeeds.includes(plantData.wateringNeeds)) {
          return false;
        }
      }
      
      // If it passed all filters, include it
      return true;
    });
    
    setFilteredPlants(filtered);
  }, [filters, plants, searchTerm]);
  
  // Calculate pagination
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant);
  const totalPages = Math.ceil(filteredPlants.length / plantsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Filter options
  const filterOptions = {
    plantSuitability: ['Indoor friendly', 'Outdoor only'],
    gardeningType: ['Hydroponic', 'Soil-based', 'Both'],
    plantCategory: ['Leafy Greens', 'Herbs & Spices', 'Fruiting Vegetables', 'Flower & Ornamentals'],
    careLevel: ['Beginner-Friendly', 'Intermediate', 'Advanced'],
    sunExposure: ['Part Shade', 'Sun-Part Shade', 'Full Sun'],
    harvestTime: ['Quick (under 4 weeks)', 'Medium (1–2 months)', 'Long (3+ months)'],
    wateringNeeds: ['Frequent (every 1–2 days)', 'Average (every 3–5 days)']
  };
  
  // Function to render a filter category
  const renderFilterCategory = (title, category, options) => {
    // All filter categories should be displayed
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <div className="space-y-2">
          {options.map(option => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                id={`${category}-${option}`}
                checked={filters[category].includes(option)}
                onChange={() => handleFilterChange(category, option)}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor={`${category}-${option}`} className="text-sm cursor-pointer hover:text-green-700 transition-colors">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Function to display active filters
  const renderActiveFilters = () => {
    const allActiveFilters = Object.entries(filters)
      .flatMap(([category, options]) => 
        options.map(option => ({ category, option }))
      );
      
    if (allActiveFilters.length === 0 && !searchTerm) return null;
    
    return (
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium text-gray-700 mb-2">Active Filters</h3>
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm">
              Search: {searchTerm}
              <button 
                onClick={() => setSearchTerm('')}
                className="ml-1.5 text-blue-600 hover:text-blue-800"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          {allActiveFilters.map(({ category, option }) => (
            <div 
              key={`${category}-${option}`}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center text-sm"
            >
              {option}
              <button 
                onClick={() => handleFilterChange(category, option)}
                className="ml-1.5 text-green-600 hover:text-green-800"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          
          {(allActiveFilters.length > 0 || searchTerm) && (
            <button 
              onClick={clearFilters}
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    );
  };

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  // Plant Card Component
  const PlantCard = ({ plant }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <div className="h-48 overflow-hidden relative group">
          <img 
            src={`/assets/plants_images/${plant.plant_id}.jpg`}
            alt={plant.plant_name}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105" 
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 text-gray-800">{plant.plant_name}</h3>
          <p className="text-sm text-gray-600 mb-2">{plant.plant_category}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {plant.plant_suitability && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {plant.plant_suitability}
              </span>
            )}
            {plant.care_level && (
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                {plant.care_level}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {plant.plant_description.substring(0, 120)}...
          </p>
          <Link 
            to={`/plants/${plant.plant_id}`}
            onClick={handlePlantClick}
            className="block text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  };
  
  // Pagination Component
  const Pagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(num => {
            // Show first, last, current, and numbers close to current
            return num === 1 || 
                  num === totalPages || 
                  (num >= currentPage - 1 && num <= currentPage + 1);
          })
          .map((number, index, array) => {
            // Add ellipsis if there are gaps
            const showEllipsisBefore = index > 0 && array[index - 1] !== number - 1;
            const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== number + 1;
            
            return (
              <React.Fragment key={number}>
                {showEllipsisBefore && <span className="px-3 py-1 text-gray-500">...</span>}
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md transition-colors ${
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
          onClick={nextPage} 
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };
  
  return (
    <>
    {/* Hero Section */}
    <section className="relative bg-gray-800 bg-opacity-80 bg-blend-overlay bg-cover bg-center" style={{ 
      backgroundImage: "url('/assets/careguides/herosection2.jpg')" 
    }}>
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover the Ideal Plant for Your Space
            <br />
            in <span className="text-orange-500">Kuala Lumpur</span>
          </h1>
          <p className="text-white text-lg max-w-2xl">
          Explore our curated plant library and discover what thrives best in KL's climate. Select your preferences to find plants that match your gardening style.
          </p>
          
          {/* Navigation */}
          <div className="mb-6 mt-6">
            <Link to="/" className="flex items-center text-green-500 hover:text-green-700 transition-colors">
              <CircleArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
    
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Filter size={18} className="mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'} 
          {getActiveFiltersCount() > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-white text-green-700 rounded-full text-xs">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="sticky top-4">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <Filter size={20} className="mr-2 text-green-600" /> 
                Filter Plants
              </h2>
              
              {/* Search Box */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-lg font-semibold mb-2 text-gray-800">
                  Search Plants
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by plant name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              {renderFilterCategory('Plant Suitability', 'plantSuitability', filterOptions.plantSuitability)}
              {renderFilterCategory('Gardening Type', 'gardeningType', filterOptions.gardeningType)}
              {renderFilterCategory('Plant Category', 'plantCategory', filterOptions.plantCategory)}
              {/* Reminder Note */}
              <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
                <p className="text-sm text-blue-800 flex items-center">
                  ⚠️ The filters below only apply to plants marked as "Indoor friendly".
                </p>
              </div>
              {renderFilterCategory('Care Level', 'careLevel', filterOptions.careLevel)}
              {renderFilterCategory('Sun Exposure', 'sunExposure', filterOptions.sunExposure)}
              {renderFilterCategory('Harvest Time', 'harvestTime', filterOptions.harvestTime)}
              {renderFilterCategory('Watering Needs', 'wateringNeeds', filterOptions.wateringNeeds)}
              
              <button 
                onClick={clearFilters}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-4 flex items-center justify-center"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Plants display area */}
        <div className="md:w-3/4">
          {/* Active filters display */}
          {renderActiveFilters()}
          
          {/* Results count */}
          <div className="mb-4 bg-green-50 p-3 rounded-lg border border-green-100 flex items-center">
            <Leaf className="text-green-600 mr-2" size={20} />
            <p className="text-gray-700">
              Showing <span className="font-medium">{filteredPlants.length}</span> of <span className="font-medium">{plants.length}</span> plants
              {filteredPlants.length > 0 && currentPage && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>
          
          {/* Loading, error, or plants grid */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-6 rounded-lg flex items-center">
              <AlertCircle className="mr-2" size={20} />
              <p>Error loading plants: {error}</p>
            </div>
          ) : filteredPlants.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700 text-lg font-medium mb-2">No plants match your search criteria</p>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
              <button 
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <X size={16} className="mr-2" />
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPlants.map(plant => (
                  <PlantCard key={plant.plant_id} plant={plant} />
                ))}
              </div>
              <Pagination />
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default PlantGallery;