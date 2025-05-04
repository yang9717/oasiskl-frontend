import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircleArrowLeft, Camera, X, CircleHelp, Upload, MessageCircleWarning, Zap, Leaf, Droplet, UserX } from 'lucide-react';
import useTitle from '../../hooks/useTitle';
import { saveNavigationContext } from '../../hooks/navigationContext';

const PlantIdentifier = () => {
  useTitle('OasisKL - Plant Identifier');

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionId, setPredictionId] = useState(null);
  const [predictionConf, setPredictionConf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plantDetails, setPlantDetails] = useState(null);

  const API_BASE_URL = '/api'; // Deploy URL
  // const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Only fetch plant details if we have a prediction ID
    if (predictionId) {
      const fetchPlantDetails = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/plant/${predictionId}`);
          const data = await response.json();
          setPlantDetails(data.plantDetails);
        } catch (error) {
          console.error('Error fetching plant details:', error);
        }
      };
      
      fetchPlantDetails();
    } else {
      // Reset plant details when no prediction is available
      setPlantDetails(null);
    }
  }, [predictionId, API_BASE_URL]); // Re-run when predictionId changes

  const identifyPlant = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }
    
    setLoading(true);
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await fetch(`${API_BASE_URL}/identify`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setPredictionId(data.prediction.class);
      setPredictionConf(data.prediction.confidence);
    } catch (error) {
      console.error('Error identifying plant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setPredictionId(null); 
    setPredictionConf(null);
  };

  const handlePlantClick = () => {
    saveNavigationContext('identify');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-800 bg-opacity-80 bg-blend-overlay bg-cover bg-center" style={{ 
        backgroundImage: "url('/assets/careguides/herosection1.jpg')" 
      }}>
        <div className="container mx-auto py-20 px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Instant Plant Identification
              <br />
              During <span className="text-orange-500">Green Visit in KL</span>
            </h1>
            <p className="text-white text-lg max-w-2xl">
              Simply snap or upload a photo of any plant you see. Our AI 
              will instantly name the species, and offer more information.
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

      {/* Plant Identification Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Spot a Plant in <span className="text-orange-500">Kuala Lumpur</span>? Identify It Instantly 🤳🍀
            </h2>

            <br />

            {/* Photo Suggestion */}
            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-400 mb-8 text-left shadow-md">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-orange-100 rounded-full">
                  <MessageCircleWarning className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">Photo Suggestion</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span>Frame the plant in the center of the view</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span>Hold your phone steady about 10-15 cm away</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span>Ensure bright, even light (no harsh shadows)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span>Use a plain background and fill the frame with just the plant detail</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="mb-12">
              <div className="relative border-3 border-dashed border-green-500 rounded-2xl p-8 bg-gradient-to-b from-green-50 to-white mb-6 shadow-lg">
                {selectedImage ? (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Selected plant" 
                      className="max-h-96 mx-auto rounded-lg shadow-md"
                    />
                    <button 
                      onClick={resetImage}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                    >
                      <X className="h-6 w-6 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="h-72 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Camera className="h-10 w-10 text-green-600" />
                    </div>
                    <p className="text-gray-600 text-lg mb-8 max-w-md">Upload a clear photo of the plant you want to identify</p>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                      <label className="inline-block">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                        />
                        <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-full flex items-center cursor-pointer transition-all shadow-md hover:shadow-lg font-medium">
                          <Upload className="h-5 w-5 mr-3" />
                          Upload Photo
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Start Identify Button */}
            <button 
              onClick={identifyPlant}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-12 rounded-full text-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none"
              disabled={!selectedImage || loading}
            >
              {loading ? "Identifying...." : "Identify Now! 🔍"}
            </button>
            
            {/* Prediction Result */}
            {predictionId && (
              <div className="mt-8 rounded-lg shadow-md overflow-hidden border border-gray-200 mt-12">
                <div className="bg-green-600 px-4 py-3 text-white flex items-center">
                  <Leaf className="mr-2" size={24} />
                  <h2 className="text-xl font-bold">Plant Identified</h2>
                </div>
                
                <div className="p-6 bg-white">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800">{plantDetails ? plantDetails.plant_name : predictionId}
                    </h3>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center mb-2">
                      <span className="text-gray-700 font-medium">Confidence Level:</span>
                      <span className="ml-2 text-lg font-bold">{predictionConf}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                      <div 
                        className="h-4 rounded-full bg-green-600" 
                        style={{ width: `${predictionConf}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link 
                      to={`/plants/${predictionId}`} 
                      onClick={handlePlantClick}
                      className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                    >
                      <CircleHelp size={20} className="mr-2" />
                      <span className="font-medium">Want to know more about this plant? Click here!</span>
                    </Link>
                    
                    <Link 
                      to={`/care-guides/${predictionId}`} 
                      className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <Droplet size={20} className="mr-2" />
                      <span className="font-medium">Want to keep this plant in your house? Click here!</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-green-800">Why Use Our Plant Identifier?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3">Fast & Mobile-Friendly</h3>
                  <p className="text-gray-600 text-sm">Get on-the-go identifications in under 5 seconds, perfect for exploring KL's parks.</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3">Local Species Focus</h3>
                  <p className="text-gray-600 text-sm">Accurately recognizes 89 common Kuala Lumpur plants found in our curated database.</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Droplet className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3">Built-In Care Tips</h3>
                  <p className="text-gray-600 text-sm">Delivers basic watering, light, and soil advice tailored to KL's tropical humidity.</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <UserX className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3">No Account Needed</h3>
                  <p className="text-gray-600 text-sm">Identify your first 10 plants each month for free—no login, no hassle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlantIdentifier;