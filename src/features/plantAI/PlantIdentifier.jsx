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

  // const API_BASE_URL = '/api'; // Deploy URL
  const API_BASE_URL = 'http://localhost:3000'; // Uncomment for local development

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

    // Check file size (1MB = 1,048,576 bytes)
    if (file.size > 1048576) {
      alert("File is too large! Please select an image under 1MB.");
      return;
    }
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
              Spot a Plant in <span className="text-orange-500">Kuala Lumpur</span>? 
              <br />Identify It Instantly 🤳🍀
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
            <div className="mb-12" id="upload-section">
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
            
            {/* Prediction Result Section */}
{/* Prediction Result Section */}
{predictionId && (
  <div className="mt-12 rounded-xl shadow-lg overflow-hidden border border-gray-200">
    {/* Header */}
    <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">
          {predictionConf > 40 ? "Plant Identified!" : "Oops! We couldn't identify this plant."}
        </h2>
      </div>
      {/* Confidence Badge */}
      {predictionConf && (
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          predictionConf > 85 ? 'bg-green-100 text-green-800' : 
          predictionConf > 60 ? 'bg-yellow-100 text-yellow-800' : 
          predictionConf > 40 ? 'bg-orange-100 text-orange-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {predictionConf > 85 ? 'High Confidence' : 
          predictionConf > 60 ? 'Medium Confidence' : 
          predictionConf > 40 ? 'Low Confidence' : 
          'Very Low Confidence'}
        </div>
      )}
    </div>
    
    <div className="p-0 bg-white">
      {predictionConf > 40 ? (
        // Show plant identification results if confidence > 40
        <>
          {/* Main Content Area */}
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Plant Image */}
            <div className="w-full md:w-1/3 p-6 bg-white flex justify-center items-center">
              <div className="relative">
                {selectedImage && (
                  <img 
                    src={selectedImage} 
                    alt="Selected plant" 
                    className="h-40 w-40 object-cover rounded-lg shadow-md border-2 border-green-100"
                  />
                )}
                <div className="absolute -bottom-3 -right-3 bg-green-500 text-white rounded-full p-2 shadow-md">
                  <Leaf className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            {/* Right Column - Plant Details */}
            <div className="w-full md:w-2/3 p-6">
              {/* Plant Name and Taxonomy */}
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {plantDetails ? plantDetails.plant_name : predictionId}
                </h3>
                
                {/* Plant Taxonomy Information */}
                {plantDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                    {plantDetails.plant_family && (
                      <div className="bg-green-50 p-2 rounded-lg">
                        <span className="text-xs text-green-600 uppercase font-semibold">Family</span>
                        <div className="text-gray-700 italic">{plantDetails.plant_family}</div>
                      </div>
                    )}
                    {plantDetails.plant_genus && (
                      <div className="bg-green-50 p-2 rounded-lg">
                        <span className="text-xs text-green-600 uppercase font-semibold">Genus</span>
                        <div className="text-gray-700 italic">{plantDetails.plant_genus}</div>
                      </div>
                    )}
                    {plantDetails.plant_species && (
                      <div className="bg-green-50 p-2 rounded-lg">
                        <span className="text-xs text-green-600 uppercase font-semibold">Species</span>
                        <div className="text-gray-700 italic">{plantDetails.plant_species}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Confidence Meter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">AI Confidence Level:</span>
                  <span className={`text-lg font-bold ${
                    predictionConf > 85 ? 'text-green-600' : 
                    predictionConf > 60 ? 'text-yellow-600' : 
                    'text-orange-600'
                  }`}>
                    {predictionConf}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      predictionConf > 85 ? 'bg-green-500' : 
                      predictionConf > 60 ? 'bg-yellow-500' : 
                      'bg-orange-500'
                    }`}
                    style={{ width: `${predictionConf}%` }}
                  ></div>
                </div>
                
                {/* Confidence Explanation */}
                <div className="mt-3 p-3 rounded-lg text-sm bg-gray-50 border border-gray-200">
                  {predictionConf > 85 ? (
                    <p>
                      <span className="font-semibold text-green-600">High confidence:</span> The model is very confident.
                      <br />It's very likely that the prediction is correct.
                    </p>
                  ) : predictionConf > 60 ? (
                    <p>
                      <span className="font-semibold text-yellow-600">Medium confidence:</span> The model is confident, but there is a margin of error. 
                      <br />We recommend double-checking the result.
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold text-orange-600">Low confidence:</span> The model is moderately confident. 
                      <br />This could be due to the plant not being in our database or poor image quality.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="px-6 pb-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                to={`/plants/${predictionId}`} 
                onClick={handlePlantClick}
                className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100 text-green-700 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-14 h-14 mb-3 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <CircleHelp size={28} className="text-green-600" />
                </div>
                <span className="font-medium text-center text-lg">Curious about this plant?</span>
                <span className="text-sm text-green-600 font-semibold mt-1 flex items-center">
                  Tap to explore
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                to={`/care-guides/${predictionId}`} 
                className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-14 h-14 mb-3 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Droplet size={28} className="text-blue-600" />
                </div>
                <span className="font-medium text-center text-lg">Want to grow this beauty at home?</span>
                <span className="text-sm text-blue-600 font-semibold mt-1 flex items-center">
                  Get your care guide
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </>
      ) : (
        // Show message when confidence is low (≤ 40%)
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <MessageCircleWarning className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">We couldn't identify this plant with confidence</h3>
            <p className="text-gray-600 max-w-lg">
              The image quality or angle might be making it difficult for our AI to correctly identify this plant.
              The current confidence level is only <span className="font-semibold text-red-600">{predictionConf}%</span>, 
              which is too low for a reliable identification.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                resetImage();
                // Scroll to upload section
                document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Try Again with a New Photo
            </button>
          </div>
        </div>
      )}
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