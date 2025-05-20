import { useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Flower2, Droplets, CircleArrowLeft } from 'lucide-react';
import { getNavigationContext } from '../../hooks/navigationContext';


const GeneralCare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = getNavigationContext();
  
  // Redirect to potted-soil by default if we're just at /guides
  useEffect(() => {
    // Scroll to top when the components mount
    window.scrollTo(0, 0);

    if (location.pathname === '/guides') {
      navigate('/guides/potted-soil', { replace: true });
    }
  }, [location, navigate]);

  // Function to handle back navigation based on context
  const handleBackClick = (e) => {
    e.preventDefault();
    
    if (!context) {
      // Fallback if no context exists
      navigate('/');
      return;
    }
    
    switch (context.sourceType) {
      case 'plant':
        navigate(`/care-guides/${context.sourceId}`);
        break;
      case 'grow':
        navigate('/care-guides');
        break;
      case 'recommender':
        navigate('/plant-recommender');
        break;
      default:
        navigate('/');
    }
  };
  
  // Determine back button text based on navigation context
  const getBackButtonText = () => {
    if (!context) return 'Back to Homepage';
    
    switch (context.sourceType) {
      case 'plant':
        return 'Back to Plant Care Guides Detail';
      case 'grow':
        return 'Back to Care Guides';
      case 'recommender':
        return 'Back to Plant Recommender';
      default:
        return 'Back to Homepage';
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-lg mb-10 overflow-hidden">
        <div className="md:flex">
          <div className="p-8 md:p-12 md:w-3/5">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Start to Sprout: 
              <br />A Complete Guide for Indoor Seed Success</h1>
            <p className="text-green-100 text-lg mb-6">
              Everything you need to know about starting seeds and growing plants successfully in your home,
              whether you're using traditional soil methods or hydroponics.
            </p>
          </div>
          <div className="hidden md:block md:w-2/5 relative">
            <img
              src="/assets/careguides/planhero.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Tabs Navigation */}
      <div className="mb-8">
        <div className="flex justify-center space-x-6">
          <NavLink 
            to="/guides/potted-soil" 
            className={({ isActive }) => 
              `flex flex-col items-center px-8 py-5 rounded-xl transition-all duration-200 ease-in-out transform shadow-lg
              ${isActive 
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white scale-105 shadow-xl' 
                : 'bg-white text-gray-600 hover:text-green-600 hover:bg-green-50 hover:scale-105'}`
            }
          >
            <div className={`p-3 rounded-full mb-2 ${isActive => isActive ? 'bg-white/20' : 'bg-green-100'}`}>
              <Flower2 className="h-6 w-6" />
            </div>
            <span className="font-bold">Potted Soil</span>
            <span className="text-xs mt-1 opacity-80">Traditional soil gardening</span>
          </NavLink>
          
          <NavLink 
            to="/guides/hydroponics" 
            className={({ isActive }) => 
              `flex flex-col items-center px-8 py-5 rounded-xl transition-all duration-200 ease-in-out transform shadow-lg
              ${isActive 
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white scale-105 shadow-xl' 
                : 'bg-white text-gray-600 hover:text-green-600 hover:bg-green-50 hover:scale-105'}`
            }
          >
            <div className={`p-3 rounded-full mb-2 ${isActive => isActive ? 'bg-white/20' : 'bg-blue-100'}`}>
              <Droplets className="h-6 w-6" />
            </div>
            <span className="font-bold">Hydroponics</span>
            <span className="text-xs mt-1 opacity-80">Soil-free growing method</span>
          </NavLink>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default GeneralCare;