import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CircleArrowLeft, Leaf, MapPin, SearchCheck, Info, BookOpen, Droplet, Sun, Scissors } from 'lucide-react';
import useTitle from '../../hooks/useTitle';
import { getNavigationContext } from '../../hooks/navigationContext';

const PlantDetails = () => {
  useTitle('OasisKL - Plant Details');

  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [otherSpaces, setOtherSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const context = getNavigationContext();

  const API_BASE_URL = '/api'; // Deploy URL
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

  // Render propagation information based on the plant's propagation method(s)
  const renderPropagationInfo = (propagationMethodString) => {
    // Split the propagation methods by comma and trim whitespace
    const propagationMethods = propagationMethodString.split(',').map(method => method.trim());
    
    // Map of propagation methods and their descriptions
    const propagationInfoMap = {
      'Division': (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Division</h3>
          <p className="text-gray-700 leading-relaxed">
            In division, a plant's root system or clump is divided into smaller sections, each containing a portion of its original root.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            It is a common and effective technique used to propagate various types of plants, particularly those that form clumps or have spreading root systems.
          </p>
        </div>
      ),
      'Seeds': (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Seeds</h3>
          <p className="text-gray-700 leading-relaxed">
            Seed propagation involves using seeds to grow new plants. Seeds are plants' reproductive structures that contain the genetic information necessary for plant growth and development. It is a versatile and cost-effective method of propagating plants, suitable for a wide range of plant species, including flowers, vegetables, and trees.
          </p>
        </div>
      ),
      'Tissue Culture': (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Tissue Culture</h3>
          <p className="text-gray-700 leading-relaxed">
            Tissue culture, also known as micropropagation or vitro propagation, refers to the process of using tissue culture techniques to propagate plants in a controlled laboratory environment. It involves the cultivation of plant cells, tissues, or organs in a nutrient-rich medium under sterile conditions.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Tissue culture offers several advantages in plant propagation. It allows the rapid production of uniform plants exhibiting specific traits. It also enables the propagation of plants that are difficult to propagate through traditional methods, such as those with sterile seeds or low seed viability.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Tissue culture is widely used in commercial nurseries, agricultural research, and conservation efforts to propagate and preserve plant species.
          </p>
        </div>
      ),
      'Cuttings': (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Root Cutting</h3>
          <p className="text-gray-700 leading-relaxed">
            Root cutting involves using a section of a root system to grow a new plant. It is a form of asexual reproduction where a portion of the root is taken from a parent plant and placed under suitable conditions to stimulate new roots and shoots.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Asexual reproduction is a propagation method without the need for seeds or two parent plants. It's a method where a single-parent plant produces genetically identical offspring. The parent plant creates new plants using its own cells or plant parts. Two common asexual reproductions are vegetative and suckers propagation.
          </p>
        </div>
      ),
      'Grafting': (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Grafting</h3>
          <p className="text-gray-700 leading-relaxed">
            Splice grafting is a propagation technique that involves joining two plant parts together to form a successful graft union. It is a common method used to combine the desirable traits of two plants into a single plant. This method is often used on fruit trees, ornamental trees, and woody shrubs.
          </p>
        </div>
      )
    };

    // Render information for each propagation method
    const propagationElements = propagationMethods.map(method => {
      // Check if we have information for this method
      if (propagationInfoMap[method]) {
        return (
          <React.Fragment key={method}>
            {propagationInfoMap[method]}
          </React.Fragment>
        );
      }
      
      // Default case if method is not recognized
      return (
        <div key={method} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{method}</h3>
          <p className="text-gray-700 leading-relaxed">
            This is a propagation method for {plant.plant_name}. Specific information about this method is not available. Please consult a gardening expert for details on how to propagate using this method.
          </p>
        </div>
      );
    });

    // Return all propagation methods or a fallback if none
    return propagationElements.length > 0 ? 
      propagationElements : 
      (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Propagation Information</h3>
          <p className="text-gray-700 leading-relaxed">
            Specific propagation information for this plant is not available. Please consult a gardening expert for advice on how to propagate this plant.
          </p>
        </div>
      );
  };

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
  };

  // When going to care page, preserve the original navigation context
  const handleCareClick = () => {
  };
  
  // Function to handle back navigation based on context
  const handleBackClick = (e) => {
    e.preventDefault();
    
    if (!context) {
      // Fallback if no context exists
      navigate('/spaces');
      return;
    }
    
    switch (context.sourceType) {
      case 'space':
        navigate(`/spaces/${context.sourceId}`);
        break;
      case 'gallery':
        navigate('/gallery');
        break;
      case 'identify':
        navigate('/identify');
        break;
      case 'care':
        // If we came from care, we should go back to the original source
        // The context would still have the original 'space' or 'gallery' value
        if (context.sourceType === 'space') {
          navigate(`/spaces/${context.sourceId}`);
        } else {
          navigate('/gallery');
        }
        break;
      default:
        navigate('/');
    }
  };
  
  // Determine back button text based on navigation context
  const getBackButtonText = () => {
    if (!context) return 'Back to Green Spaces';
    
    switch (context.sourceType) {
      case 'space':
        return 'Back to Green Space';
      case 'gallery':
        return 'Back to Gallery';
      case 'identify':
        return 'Back to Plant Identifier';
      default:
        return 'Back';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <a 
          href="#" 
          onClick={handleBackClick}
          className="flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          {getBackButtonText()}
        </a>
      </div>
      
      {/* Hero Banner */}
      <div className="mb-10 flex flex-col md:flex-row gap-6">
        {/* Plant image in a circular frame - Left side */}
        <div className="md:w-1/3 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full flex-shrink-0 p-2 shadow-xl overflow-hidden">
            <img 
              src={`/assets/plants_images/${id}.jpg`}
              alt={plant.plant_name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400?text=Plant+Image';
              }}
            />
          </div>
        </div>
        
        {/* Text content in green block - Right side */}
        <div className="md:w-2/3">
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
                  {plant.plant_category}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{plant.plant_name}</h1>
                <p className="text-green-100 text-lg max-w-xl">
                  Explore the beauty and characteristics of this fascinating plant found in Kuala Lumpur's green spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Description Section */}
        <div className="flex flex-col justify-between bg-white p-6 border border-gray-100 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {plant.plant_description}
          </p>
        </div>

        {/* Taxonomy Information */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-green-600" />
            Taxonomy Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Family</p>
              <p className="text-gray-700 font-medium">{plant.plant_family}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Genus</p>
              <p className="text-gray-700 font-medium">{plant.plant_genus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Species</p>
              <p className="text-gray-700 font-medium">{plant.plant_species}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Propagation Method</p>
              <p className="text-gray-700 font-medium">{plant.plant_propagation}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Propagation Section */}
      <div className="mt-10">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-5">
              <h2 className="text-2xl font-bold text-gray-800">About {plant.plant_name} Propagation</h2>
              <p className="text-gray-700 mt-1">Information on how this plant is typically propagated and cultivated.</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          {renderPropagationInfo(plant.plant_propagation)}
        </div>
      </div>

      {/* Care Details Link Banner */}
      <div className="mt-10 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
            <Leaf className="w-8 h-8 text-orange-600" />
          </div>
          <div className="ml-5 flex-grow">
            <h2 className="text-2xl font-bold text-gray-800">Want to plant {plant.plant_name} in your own garden?</h2>
            <p className="text-gray-700 mt-1">Learn how to properly care for this plant with our detailed guide!</p>
          </div>
          <Link 
            to={`/care-guides/${plant.plant_id}`}
            onClick={handleCareClick}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            View Care Guide
          </Link>
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
                    src={`/assets/space_images/${space.space_id}.jpg`}
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