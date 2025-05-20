import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { CircleArrowLeft, Leaf, Heart, Flower, Clock, Sprout, Apple, ArrowRight, Scissors, BookOpen,
         ArrowLeft, Sun, CloudAlert, CheckCircle2, AlertCircle, Home, HelpCircle, LampCeiling } from "lucide-react";
import { saveNavigationContext } from '../../hooks/navigationContext';
import useTitle from '../../hooks/useTitle';

const PlantRecommender = () => {

  useTitle('OasisKL - Plant Recommender');

  // State for tracking current question, answers, and results
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    location: null,
    careLevel: null,
    plantType: null
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState('next'); // 'next' or 'prev' for animations

  // const API_BASE_URL = '/api'; // Deploy URL
  const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

  const handleCareClick = () => {
    saveNavigationContext('recommender');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

  // Plant recommendation logic based on the table data
  const getRecommendedPlants = () => {
    const { location, careLevel, plantType } = answers;
    
    // Return early if any answer is missing
    if (!location || !careLevel || !plantType) return [];

    // Plant ID mappings based on user selections
    const recommendations = {
      // Sunny location (a)
      a: {
        // Care level a (beginner) + plant types
        a: {
          a: [89, 4, 87], // Herbs & Leafy Greens
          b: [], // Fruiting Vegetables (null in table)
          c: [21, 70, 50, 40, 79] // Flower & Ornamentals
        },
        // Care level b (intermediate) + plant types
        b: {
          a: [], // Herbs & Leafy Greens (null in table)
          b: [84, 42, 39], // Fruiting Vegetables
          c: [77, 83, 7, 29, 34] // Flower & Ornamentals
        },
        // Care level c (advanced) + plant types
        c: {
          a: [], // Herbs & Leafy Greens (null in table)
          b: [], // Fruiting Vegetables (null in table)
          c: [19] // Flower & Ornamentals (only have this one)
        }
      },
      // Indirect light location (b)
      b: {
        // Care level a (beginner) + plant types
        a: {
          a: [], // Herbs & Leafy Greens (null in table)
          b: [], // Fruiting Vegetables (null in table)
          c: [21, 70, 50, 40, 79] // Flower & Ornamentals (using same as above for demo)
        },
        // Care level b (intermediate) + plant types
        b: {
          a: [], // Herbs & Leafy Greens (null in table)
          b: [84, 42, 39], // Fruiting Vegetables (using same as above for demo)
          c: [77, 83, 7, 29, 34] // Flower & Ornamentals (using same as above for demo)
        },
        // Care level c (advanced) + plant types
        c: {
          a: [], // Herbs & Leafy Greens (null in table)
          b: [], // Fruiting Vegetables (null in table)
          c: [19] // Flower & Ornamentals (only have this one)
        }
      }
    };

    // Get IDs based on user selections
    const ids = recommendations[location][careLevel][plantType] || [];
    
    return ids;
  };

  // Fetch plant details when recommendations are generated
  useEffect(() => {
    const fetchPlants = async () => {
      // Only fetch if all questions are answered
      if (currentStep < 3) return;
      
      try {
        setLoading(true);
        setError(null);

        // Get plant IDs based on answers
        const plantIds = getRecommendedPlants();
        
        if (plantIds.length === 0) {
          // No matches found
          setRecommendations([]);
          setLoading(false);
          return;
        }

        // Fetch details for each recommended plant
        const fetchedPlants = await Promise.all(
          plantIds.slice(0, 3).map(async (id) => {
            try {
              const response = await fetch(`${API_BASE_URL}/plant/${id}`);
              
              if (!response.ok) {
                throw new Error(`Failed to fetch plant ${id}`);
              }
              
              // Process API response
              const data = await response.json();
              return data;
            } catch (error) {
              console.error(`Error fetching plant ${id}:`, error);
              throw error;
            }
          })
        );

        setRecommendations(fetchedPlants);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to load recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [currentStep, answers]);

  // Handle answer selection
  const handleAnswerSelect = (questionKey, answer) => {
    setAnswers({
      ...answers,
      [questionKey]: answer
    });
    
    // Set transition direction
    setTransitionDirection('next');
    
    // Move to next question after a short delay for animation
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 300);
  };

  // Go back to previous question
  const handlePrevious = () => {
    if (currentStep > 0) {
      setTransitionDirection('prev');
      setCurrentStep(currentStep - 1);
    }
  };

  // Reset the recommender
  const handleReset = () => {
    setTransitionDirection('prev');
    setCurrentStep(0);
    setAnswers({
      location: null,
      careLevel: null,
      plantType: null
    });
    setRecommendations([]);
  };

  // Question content
  const questions = [
    {
      key: 'location',
      question: 'Where do you plan to place the plant?',
      subtext: 'Choose the lighting condition that best matches your space',
      options: [
        {
          id: 'a',
          icon: <Sun className="w-12 h-12 text-orange-500 mb-4" />,
          title: 'Sunny balcony or large windows',
          description: 'You have access to 6+ hours of direct sunlight daily'
        },
        {
          id: 'b',
          icon: <LampCeiling className="w-12 h-12 text-green-500 mb-4" />,
          title: 'Cozy corner or shelf with indirect light',
          description: 'You have bright ambient light but limited direct sun'
        }
      ]
    },
    {
      key: 'careLevel',
      question: 'How much time can you spend on plant care?',
      subtext: 'Be honest about your care routine for best results',
      options: [
        {
          id: 'a',
          icon: <Sprout className="w-12 h-12 text-green-500 mb-4" />,
          title: 'I\'m just getting started',
          description: 'I\'d love something easy and low-maintenance'
        },
        {
          id: 'b',
          icon: <Scissors className="w-12 h-12 text-blue-500 mb-4" />,
          title: 'I\'m comfortable with some care',
          description: 'I can handle regular watering and basic plant needs'
        },
        {
          id: 'c',
          icon: <Heart className="w-12 h-12 text-red-500 mb-4" />,
          title: 'I enjoy challenges',
          description: 'I\'m up for looking after sensitive or picky plants'
        }
      ]
    },
    {
      key: 'plantType',
      question: 'What kind of plant are you looking for?',
      subtext: 'Choose what you want to grow in your space',
      options: [
        {
          id: 'a',
          icon: <Leaf className="w-12 h-12 text-green-600 mb-4" />,
          title: 'Herbs & Leafy Greens',
          description: 'Great for cooking and fresh flavor on your kitchen counter!'
        },
        {
          id: 'b',
          icon: <Apple className="w-12 h-12 text-orange-500 mb-4" />,
          title: 'Fruiting Vegetables',
          description: 'Perfect for growing your own tomatoes, chilies, and more'
        },
        {
          id: 'c',
          icon: <Flower className="w-12 h-12 text-pink-500 mb-4" />,
          title: 'Flower & Ornamentals',
          description: 'Brighten your space with blooms or beautiful foliage'
        }
      ]
    }
  ];

  // Render function for results section
  const renderResults = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="ml-4 text-lg font-medium text-gray-600">Finding perfect matches...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center bg-red-50 my-8 p-8 rounded-xl border border-red-100 shadow-sm">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-red-700">{error}</h3>
          <p className="text-red-600 mb-6">
            We encountered a problem connecting to our plant database. Please try again later.
          </p>
          <button 
            onClick={handleReset}
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md"
          >
            Start Over
          </button>
        </div>
      );
    }
    
    if (recommendations.length === 0) {
      return (
        <div className="text-center my-8 p-10 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
          <CloudAlert className="w-20 h-20 text-orange-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Sorry, We Couldn't Find a Perfect Match</h3>
          <p className="text-gray-700 mb-2 max-w-2xl mx-auto">
            We didn't find any plants that fit all your preferences, but don't worry!
            <br />Indoor gardening in KL offers lots of possibilities.
          </p>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm">
            Try adjusting your selections or browse our full collection of indoor-friendly plants.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleReset}
              className="inline-flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors shadow-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Different Answers
            </button>
            <Link 
              to="/gallery?suitability=Indoor%20friendly" 
              className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
            >
              Browse All Indoor Plants
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      );
    }

  const handlePlantClick = () => {
    saveNavigationContext('recommender');
  };
    
    return (
      <div>
        {/* User selections summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-600 mb-3">Your Selections:</h4>
          <div className="flex flex-wrap gap-3">
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
              <Home className="w-3 h-3 mr-1" />
              {answers.location === 'a' ? 'Sunny Location' : 'Indirect Light'}
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {answers.careLevel === 'a' ? 'Beginner Friendly' : 
                answers.careLevel === 'b' ? 'Regular Care' : 'Advanced Care'}
            </span>
            <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full flex items-center">
              <Leaf className="w-3 h-3 mr-1" />
              {answers.plantType === 'a' ? 'Herbs & Greens' : 
                answers.plantType === 'b' ? 'Fruiting Vegetables' : 'Flowers & Ornamentals'}
            </span>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {recommendations.map((plantData, index) => {
            // Extract plantDetails from the response
            const plant = plantData.plantDetails;
            
            return (
              <div key={plant.plant_id} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="h-52 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30 z-10"></div>
                  <img 
                    src={`/assets/plants_images/${plant.plant_id}.jpg`}
                    alt={plant.plant_name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                    {plant.care_level && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium text-center ${
                        plant.care_level.includes("Beginner") 
                          ? "bg-green-100 text-green-800" 
                          : plant.care_level.includes("Intermediate") 
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {plant.care_level}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                      #{index + 1} Recommended
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{plant.plant_name}</h3> 
                  
                  <div className="border-t border-gray-100 pt-3 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Gardening Style:</span>
                        <div className="flex gap-2">
                        {plant.gardening_type === "Both" ? (
                            // When gardening_type is "Both", show two separate labels
                            <>
                            <span className="text-xs font-medium bg-orange-50 text-orange-700 px-2 py-1 rounded">
                                Soil-based / Hydroponic
                            </span>
                            </>
                        ) : (
                            // Otherwise show the original gardening_type value
                            <span className="text-xs font-medium bg-orange-50 text-orange-700 px-2 py-1 rounded">
                            {plant.gardening_type}
                            </span>
                        )}
                        </div>
                    </div>
                    </div>
                  
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <Link 
                            to={`/plants/${plant.plant_id}`}
                            onClick={handlePlantClick}
                            className="flex-1 text-[0.95rem] text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center"
                        >
                            Plant Details
                        </Link>
                        
                        <Link 
                            to={`/care-guides/${plant.plant_id}`}
                            className="flex-1 text-[0.95rem] text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center"
                        >
                            Care Guide
                        </Link>
                    </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button 
            onClick={handleReset}
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </button>
          
          <Link 
            to="/gallery?suitability=Indoor%20friendly" 
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-md"
          >
            Browse All Indoor Plants
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-800 bg-opacity-80 bg-blend-overlay bg-cover bg-center" style={{ 
        backgroundImage: "url('/assets/careguides/herosection5.jpg')" 
      }}>
        <div className="container mx-auto py-20 px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              Find Your Perfect Homegrown Plant
              <br />in <span className="text-orange-500">Kuala Lumpur</span>
            </h1>
            <p className="text-white text-lg max-w-2xl">
              Answer 3 quick questions about your home and routine, and we'll recommend the TOP 3 plants that thrive in KL's unique light and humidity.
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

      {/* Recommender Section */}
      <section className="py-16 px-4 bg-gray-50 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-green-500">
            <path fill="currentColor" d="M45.3,-60.8C56.9,-55.9,63.3,-39.5,69.7,-22.7C76.1,-5.9,82.5,11.3,76.5,23.4C70.5,35.5,52.1,42.5,35.9,51.1C19.7,59.7,5.8,69.9,-7.2,69.5C-20.3,69.1,-32.4,58.1,-42.7,46.5C-53,34.9,-61.5,22.7,-65.4,8.3C-69.3,-6.2,-68.5,-22.8,-59.7,-33.6C-50.9,-44.4,-34.2,-49.5,-19.7,-54.9C-5.2,-60.4,7.1,-66.1,20.7,-68.1C34.3,-70.1,49.1,-68.4,61.6,-71.2" />
          </svg>
        </div>
        <div className="absolute bottom-20 left-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-orange-500">
            <path fill="currentColor" d="M42.7,-57.2C54.8,-45.2,63.8,-31.1,68.2,-15.2C72.7,0.6,72.5,18.3,65.5,32.3C58.6,46.3,44.9,56.6,30.1,64C15.2,71.4,-0.9,75.9,-18,74.2C-35.1,72.6,-53.1,64.7,-62.7,50.9C-72.4,37.1,-73.7,17.5,-71.1,0.2C-68.6,-17.2,-62.2,-32.2,-51.1,-44.4C-40,-56.5,-24.3,-65.8,-7.4,-67.5C9.5,-69.3,30.6,-69.2,42.7,-57.2Z" />
          </svg>
        </div>
      
        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Find Your Perfect <span className="text-orange-500">Green Companion</span> 🪴🪴🪴
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Let's match you with plants that will thrive in KL's tropical climate and fit your lifestyle
            </p>
          </div>
        
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep === step 
                      ? 'bg-orange-500 text-white scale-110 shadow-lg shadow-orange-200' 
                      : currentStep > step 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < 3 ? (
                    currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step + 1
                  ) : (
                    <Heart className="w-6 h-6" />
                  )}
                </div>
                <div className={`text-sm mt-2 text-center font-medium transition-all duration-300 ${
                  currentStep === step ? 'text-orange-500' : 'text-gray-500'
                }`}>
                  {step === 0 && "Location"}
                  {step === 1 && "Care Level"}
                  {step === 2 && "Plant Type"}
                  {step === 3 && "Results"}
                </div>
              </div>
            ))}
            
            {/* Progress Line */}
            <div className="absolute top-6 left-0 h-0.5 bg-gray-200 w-full -z-0">
              <div 
                className="h-full bg-green-500 transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

        {/* Questions or Results */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transition-all duration-500 relative overflow-hidden">
        {currentStep < 3 ? (
            // Questions
            <div className={`transition-all duration-500 transform ${
            transitionDirection === 'next' 
                ? currentStep === 0 ? 'translate-x-0' : 'translate-x-0'
                : 'translate-x-0'
            }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-800">
                {questions[currentStep].question}
            </h2>
            <p className="text-center text-gray-600 mb-10">
                {questions[currentStep].subtext}
            </p>

            {/* Grid layout for first question to always be 2 columns */}
            <div className={`grid ${
                currentStep === 0 ? 'grid-cols-1 md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            } gap-6 mb-10`}>
                {questions[currentStep].options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(questions[currentStep].key, option.id)}
                    className={`group bg-white border-2 rounded-xl p-6 text-center transition-all duration-300 
                    flex flex-col items-center hover:shadow-md transform hover:-translate-y-1 
                    ${answers[questions[currentStep].key] === option.id 
                        ? 'border-orange-500 shadow-md bg-orange-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`
                    }
                >
                    <div className="mb-4">
                    {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                </button>
                ))}
            </div>

            <div className="flex justify-between items-center mt-8">
                {currentStep > 0 ? (
                <button 
                    onClick={handlePrevious}
                    className="flex items-center px-5 py-2 text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                </button>
                ) : (
                <div></div>
                )}
                
                <div className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <HelpCircle className="w-4 h-4 mr-2" />
                Question {currentStep + 1} of {questions.length}
                </div>
            </div>
            </div>
        ) : (
            // Results
            <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
                Your <span className="text-orange-500">Perfect Plant</span> Matches
            </h2>
            <p className="text-gray-600 text-center mb-10">
                Based on your answers, here are our top recommendations for your indoor garden in Kuala Lumpur
            </p>

            {renderResults()}
            </div>
        )}
        </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl overflow-hidden shadow-lg relative">
            <div className="md:flex relative z-10">
              <div className="md:w-2/5 p-6">
                <div className="rounded-xl overflow-hidden h-64 shadow-md">
                  <img 
                    src="/assets/careguides/planhero.jpg" 
                    alt="Indoor plants in apartment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-3">
                  Need More <span className="text-orange-500">Home Gardening Guidance</span>?
                </h2>
                <p className="text-gray-700 mb-6">
                  Explore our detailed care guides for potted soil and hydroponics gardening, perfect for your Kuala Lumpur apartment or home.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    onClick={handleCareClick}
                    to="/guides/potted-soil" 
                    className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition-colors shadow-md"
                  >
                    Soil Gardening Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link 
                    onClick={handleCareClick}
                    to="/guides/hydroponics" 
                    className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors shadow-md"
                  >
                    Hydroponics Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantRecommender;