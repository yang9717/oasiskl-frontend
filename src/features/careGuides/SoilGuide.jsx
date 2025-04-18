import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Thermometer, Flower2, Sun, 
  CloudRain, Shovel, Sprout, Calendar, Leaf, BookOpen, Info, X, Droplet } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const SoilGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set initial state based on URL hash or default to all steps closed
  const [openSteps, setOpenSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });
  
  // References to step elements for scrolling
  const stepRefs = {
    step1: useRef(null),
    step2: useRef(null),
    step3: useRef(null),
    step4: useRef(null)
  };

  // State for managing media info popups
  const [openPopup, setOpenPopup] = useState(null);

  // Reference for popup to detect outside clicks
  const popupRef = useRef(null);
  
  // Handle hash navigation on load and updates
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && stepRefs[hash]) {
      // Open the section and scroll to it
      setOpenSteps(prev => ({...prev, [hash]: true}));
      setTimeout(() => {
        stepRefs[hash].current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenPopup(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleStep = (step) => {
    setOpenSteps(prev => ({...prev, [step]: !prev[step]}));
  };
  
  const scrollToStep = (step) => {
    setOpenSteps(prev => ({...prev, [step]: true}));
    navigate(`#${step}`, { replace: true });
    setTimeout(() => {
      stepRefs[step].current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Growing media data with detailed information
  const mediaData = {
    cocoPeat: {
      title: "Coco Peat",
      subtitle: "Moisture-Retaining Medium",
      whatItIs: "Coco peat is made from coconut husks that have been processed into a fine, soil-like medium. It's a sustainable alternative to traditional peat moss.",
      whyItsGood: "It holds moisture well, making it great for herbs and plants in Malaysia's heat. It has excellent water retention while still allowing good aeration for roots. It's also sustainable and environmentally friendly.",
      howToUse: "Can be used alone or mixed with other media like perlite for improved drainage. Soak thoroughly before use, as dry coco peat can repel water initially. Ideal for seed starting and as a component in potting mixes."
    },
    perlite: {
      title: "Perlite",
      subtitle: "The Light & Airy Booster",
      whatItIs: "Perlite is a white, volcanic glass that is heated until it puffs up, becoming very lightweight and porous.",
      whyItsGood: "Boosts drainage — ideal for rainy seasons and wet soil. It prevents soil compaction, improves aeration, and helps prevent root rot in Malaysia's humid conditions.",
      howToUse: "Usually mixed with other media rather than used alone. Add 10-30% perlite to your soil mix for improved drainage. Ideal for plants that need well-draining soil and during Malaysia's rainy season."
    },
    vermiculite: {
      title: "Vermiculite",
      subtitle: "The Moisture Retainer",
      whatItIs: "Vermiculite is a naturally occurring mineral that expands when heated, forming flat, absorbent flakes.",
      whyItsGood: "Keeps roots moist — perfect for seedlings and humidity. It holds water and nutrients well, making it excellent for seed starting and young plants that need consistent moisture.",
      howToUse: "Mix with potting soil or coco peat to improve moisture retention. Use for seeds and seedlings that require consistent moisture. Good for plants that don't like to dry out between waterings."
    },
    compost: {
      title: "Compost",
      subtitle: "The Nutrient Powerhouse",
      whatItIs: "Compost is decomposed organic matter made from kitchen scraps, yard waste, and other organic materials.",
      whyItsGood: "Nutrient-rich — boosts soil fertility and improves structure. It enhances soil health, adds beneficial microorganisms, and provides slow-release nutrients for plants.",
      howToUse: "Mix into existing soil at a ratio of about 25-50%. Can be used as a top dressing around established plants. Make your own or source locally for best quality. In Malaysia's heat, compost breaks down quickly, so replenish regularly."
    },
    peatMoss: {
      title: "Peat Moss",
      subtitle: "The Classic Growing Medium",
      whatItIs: "Peat moss is partially decomposed sphagnum moss harvested from peat bogs. It's acidic and holds moisture well.",
      whyItsGood: "Moisture + air balance — best for acid-loving plants. It creates an excellent balance of water retention and aeration, and its acidity makes it perfect for plants that prefer lower pH.",
      howToUse: "Mix with other media as it can be too moisture-retentive alone. Pre-moisten before use as dry peat moss repels water. Good for acid-loving plants like blueberries, azaleas, and certain tropical plants."
    },
    riverSand: {
      title: "River Sand",
      subtitle: "The Drainage Enhancer",
      whatItIs: "River sand is coarse, washed sand that has smooth, rounded particles, unlike construction sand which is sharper.",
      whyItsGood: "Fast-draining — ideal for succulents and cacti. It creates excellent drainage, preventing water from pooling around roots, which is essential for drought-tolerant plants.",
      howToUse: "Mix with potting soil at a ratio of about 20-30% to improve drainage. Use for succulents, cacti, and other plants that require quick-draining soil. Make sure to use horticultural or river sand, not beach sand which contains salt."
    }
  };

  // Media Info Popup Component
  const MediaInfoPopup = ({ mediaKey }) => {
    if (!mediaKey || !mediaData[mediaKey]) return null;
    
    const media = mediaData[mediaKey];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div 
          ref={popupRef}
          className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
        >
          <div className="flex items-center justify-between bg-gray-100 p-4 border-b">
            <h3 className="text-xl font-bold">{media.title}</h3>
            <button 
              onClick={() => setOpenPopup(null)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-5">
            <h4 className="text-lg font-medium text-gray-800 mb-4">{media.subtitle}</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-1">What It Is:</h5>
                <p className="text-gray-600">{media.whatItIs}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Why It's Good:</h5>
                <p className="text-gray-600">{media.whyItsGood}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-1">How to Use:</h5>
                <p className="text-gray-600">{media.howToUse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col md:flex-row items-center gap-5">
        <div className="md:w-3/4">
          <h3 className="text-2xl font-bold text-green-600 mb-3 flex items-center">
            <Flower2 className="mr-3 h-6 w-6" />
            Potted Soil Gardening
          </h3>
          <p className="text-gray-600">
            Traditional soil-based container gardening for indoor plants. Perfect for beginners and those who want to 
            grow a wide variety of plants with minimal setup and maintenance requirements.
          </p>
        </div>
        <div className="md:w-1/4 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center shadow-md border-4 border-white">
            <Flower2 className="h-16 w-16 text-green-500" />
          </div>
        </div>
      </div>
      
      {/* Guide Progress Bar */}
      <div className="mb-10 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div className="bg-green-200 h-full" style={{width: '100%'}}></div>
      </div>
      
      {/* Quick Navigation */}
      <div className="mb-10">
        <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-green-600" />
          Guide Sections
        </h4>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => scrollToStep('step1')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Sprout className="mr-2 h-4 w-4" />
            Indoor Space
          </button>
          <button 
            onClick={() => scrollToStep('step2')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Flower2 className="mr-2 h-4 w-4" />
            Containers
          </button>
          <button 
            onClick={() => scrollToStep('step3')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Shovel className="mr-2 h-4 w-4" />
            Growing Media
          </button>
          <button 
            onClick={() => scrollToStep('step4')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Planting Schedule
          </button>
        </div>
      </div>
      
      {/* Step 1: Choose Your Indoor Space */}
      <div ref={stepRefs.step1} id="step1" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step1')}
        >
          <h3 className="text-xl font-semibold">Step 1: Choose Your Indoor Space</h3>
          {openSteps.step1 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step1 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <div className="mb-10">
              <h4 className="text-xl font-medium text-green-600 mb-4">Ideal Seed Starting <span className="text-green-500 font-semibold">Environment</span></h4>
              <div className="md:flex gap-8 items-center">
                <div className="md:w-1/2">
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Choose an indoor space that's safe from pets, high traffic, and temperature extremes. In Kuala Lumpur, use a balcony corner, utility area, or spare room that's warm, stable, and has enough space for trays and containers. Avoid tight or cluttered areas where spills might cause damage.
                  </p>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 mt-4">
                    <p className="text-green-800 text-sm">
                      <strong>Pro tip:</strong> In apartment living, consider using adjustable shelving units for vertical space—these maximize your growing area while minimizing floor footprint.
                    </p>
                  </div>
                </div>
                
                <div className="md:w-1/2 h-64 bg-gray-100 rounded-lg overflow-hidden shadow-sm mt-4 md:mt-0 flex items-center justify-center">
                  <img
                    src="/assets/careguides/soil-step1.jpg"
                    alt="Suitable locations"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h4 className="flex items-center text-lg font-medium text-green-600 mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Droplet className="h-5 w-5 text-blue-500" />
                </div>
                Water Considerations
              </h4>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Spills can happen, so pick a space where water, soil, or fertilizer won't damage your flooring. Choose an area with easy access to water, and avoid locations where leaks might cause issues—especially important in apartments. KL's humidity helps reduce drying, but overwatering indoors can still be a risk.
                </p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-300">
                  <p className="text-blue-800 text-sm">
                    <strong>Water management:</strong> Consider placing plant trays on waterproof mats or using saucers under pots to catch excess water and protect surfaces.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="flex items-center text-lg font-medium text-green-600 mb-4">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Sun className="h-5 w-5 text-amber-500" />
                </div>
                Light & Heat
              </h4>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Ensure consistent warmth and moisture for strong seed germination. Even in KL's generally warm climate, indoor spaces can have fluctuations. Use artificial lighting near your seedlings for steady growth, and plan for easy access to electrical outlets. Avoid windowsills, which can expose seeds to sudden temperature spikes or direct sunlight that may dry out the potting mix and cause leggy, weak seedlings.
                </p>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-yellow-800 text-sm">
                    <strong>Light tip:</strong> In Malaysia, east-facing windows often provide the perfect amount of morning light without the intense afternoon heat that can stress young plants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Step 2: Select Your Containers & Equipment */}
      <div ref={stepRefs.step2} id="step2" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step2')}
        >
          <h3 className="text-xl font-semibold">Step 2: Select Your Containers & Equipment</h3>
          {openSteps.step2 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step2 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <div className="mb-8">
              <h4 className="text-xl font-medium text-green-600 mb-4">Our <span className="text-green-500 font-semibold">Suggestion</span></h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                To start seeds successfully, choose small, individual containers with drainage holes. This ensures each plant grows strong roots without tangling with others and reduces the risk of disease.
              </p>
              <p className="text-gray-700 leading-relaxed">
                In Kuala Lumpur's humid climate, good airflow and drainage are essential to prevent mold and root rot. Avoid sowing many seeds in one large tray, as it makes transplanting difficult and damages roots.
              </p>
            </div>
            
            {/* Container types */}
            <div className="mb-10">
              <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-2">
                  <Flower2 className="h-5 w-5 text-green-600" />
                </div>
                Container Options
              </h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Plastic Seedling Cells */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      BEGINNER-FRIENDLY
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">Image: Plastic Seedling Cells</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="text-xl font-semibold mb-2">Plastic Seedling Cells</h5>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Best For</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Most vegetables and herbs</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="font-medium">Why use it</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Individual cells prevent root tangling, easy to label and move</p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h6 className="font-medium mb-2">Key Features</h6>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Drainage holes included</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Compact and clean for apartments</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Works well with humidity control domes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Small Plastic Pots */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      VERSATILE
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">Image: Small Plastic Pots</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="text-xl font-semibold mb-2">Small Plastic Pots</h5>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Best For</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Leafy greens, herbs, and balcony gardening</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="font-medium">Why use it</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Good airflow and sturdy for repeated use</p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h6 className="font-medium mb-2">Key Features</h6>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Lightweight and durable</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Drainage guaranteed</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Easy to clean and sterilize</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Biodegradable Fiber Pots */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      ECO-FRIENDLY
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">Image: Biodegradable Fiber Pots</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="text-xl font-semibold mb-2">Biodegradable Fiber Pots</h5>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Best For</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Cucumbers, squash, or plants that don't like transplanting</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="font-medium">Why use it</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Can be planted directly into soil—no root disturbance</p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h6 className="font-medium mb-2">Key Features</h6>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Compostable</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Ideal for delicate root systems</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Great for rooftop or mini-yard setups</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional equipment section */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-green-700 mb-4">Essential Equipment for Beginners</h4>
              <div className="grid md:grid-cols-3 gap-5">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Sprout className="h-5 w-5 text-green-600" />
                    </div>
                    <h5 className="font-medium">Seed Starting Tray</h5>
                  </div>
                  <p className="text-sm text-gray-600">
                    A waterproof tray to hold your containers and catch excess water. Choose one with a clear humidity dome for tropical seedlings.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Droplet className="h-5 w-5 text-blue-600" />
                    </div>
                    <h5 className="font-medium">Watering Can/Mister</h5>
                  </div>
                  <p className="text-sm text-gray-600">
                    A small watering can with a gentle sprinkler head or a spray mister to avoid disturbing seeds and damaging delicate seedlings.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <Sun className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h5 className="font-medium">Grow Light (Optional)</h5>
                  </div>
                  <p className="text-sm text-gray-600">
                    In Malaysia, natural light may be sufficient, but a small LED grow light can help during rainy periods or for indoor spaces away from windows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Step 3: Select Your Growing Media */}
      <div ref={stepRefs.step3} id="step3" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step3')}
        >
          <h3 className="text-xl font-semibold">Step 3: Select Your Growing Media</h3>
          {openSteps.step3 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step3 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <div className="mb-8">
              <div className="md:flex items-start gap-6 mb-6">
                <div className="md:w-2/3">
                  <h4 className="text-xl font-medium text-green-600 mb-4">Choosing the <span className="text-green-500 font-semibold">Right Soil Mix</span></h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The growing medium you select has a major impact on your plants' health, providing nutrients, 
                    water retention, and drainage. In Malaysia's hot and humid climate, a well-balanced growing 
                    medium is especially important.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Different plants have different soil preferences—some need moisture-retentive media, 
                    while others prefer fast-draining options. Here are the main components you can mix 
                    to create the perfect growing medium for your plants:
                  </p>
                </div>
                
                {/* Placeholder for featured image */}
                <div className="md:w-1/3 h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md mt-4 md:mt-0 flex items-center justify-center">
                  <span className="text-gray-400">Image: Different growing media types</span>
                </div>
              </div>
            </div>
            
            {/* Growing media grid */}
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {/* Coco Peat */}
              <div className="bg-green-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Image: Coco Peat</span>
                </div>
                <div className="p-4">
                <div className="mb-2">
                  <div className="flex items-center mb-2">
                    <h5 className="font-medium mr-2">Coco Peat</h5>
                    <button 
                      onClick={() => setOpenPopup('cocoPeat')}
                      className="p-1 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors"
                      aria-label="View more information about Coco Peat"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                  <p className="text-sm text-gray-600 mb-3">
                    🌱 Holds moisture well — great for herbs and Malaysia's heat.
                  </p>
                </div>
              </div>
              
              {/* Perlite */}
              <div className="bg-green-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Image: Perlite</span>
                </div>
                <div className="p-4">
                <div className="mb-2">
                  <div className="flex items-center mb-2">
                    <h5 className="font-medium mr-2">Perlite</h5>
                    <button 
                      onClick={() => setOpenPopup('perlite')}
                      className="p-1 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors"
                      aria-label="View more information about Perlite"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                  <p className="text-sm text-gray-600 mb-3">
                    💧 Boosts drainage — ideal for rainy seasons and wet soil.
                  </p>
                </div>
              </div>
              
              {/* Vermiculite */}
              <div className="bg-green-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Image: Vermiculite</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <h5 className="font-medium mr-2">Vermiculite</h5>
                    <button 
                      onClick={() => setOpenPopup('vermiculite')}
                      className="p-1 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors"
                      aria-label="View more information about Perlite"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    🌿 Keeps roots moist — perfect for seedlings and humidity.
                  </p>
                </div>
              </div>
              
              {/* Compost */}
              <div className="bg-green-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Image: Compost</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <h5 className="font-medium mr-2">Compost</h5>
                    <button 
                      onClick={() => setOpenPopup('compost')}
                      className="p-1 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors"
                      aria-label="View more information about Perlite"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    🌱 Nutrient-rich—boosts soil fertility and improves structure
                  </p>
                </div>
              </div>
              
              {/* Peat Moss */}
              <div className="bg-green-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Image: Peat Moss</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <h5 className="font-medium mr-2">Peat Moss</h5>
                    <button 
                      onClick={() => setOpenPopup('peatMoss')}
                      className="p-1 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors"
                      aria-label="View more information about Perlite"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    🌸 Moisture + air balance — best for acid-loving plants.
                  </p>
                </div>
              </div>
              
              {/* River Sand */}
              <div className="bg-green-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Image: River Sand</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <h5 className="font-medium mr-2">River Sand</h5>
                    <button 
                      onClick={() => setOpenPopup('riverSand')}
                      className="p-1 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors"
                      aria-label="View more information about Perlite"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    ♦️ Fast-draining — ideal for succulents and cacti.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Soil Preparation Steps */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h4 className="text-xl font-medium text-green-600 mb-5">Three Easy Steps for Growing Media Preparation</h4>
              
              <div className="md:flex gap-8">
                <div className="md:w-5/5">
                  <ol className="space-y-6">
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 shadow-sm">1</div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Clear out rocks and debris:</h5>
                        <p className="text-gray-600">To dig up grass, use a spade to cut the sod into small squares and pry from the planting area with the end of the spade.</p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 shadow-sm">2</div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Loosen the soil:</h5>
                        <p className="text-gray-600">If it's your very first garden, loosen the soil to a depth of at least 8 inches (12 is better) so that roots can reach down.</p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 shadow-sm">3</div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Add Organic Matter:</h5>
                        <p className="text-gray-600">Compost and aged manure not only feed the soil with nutrients but also drain well, loosen the soil to create more oxygen for plants, and stabilize and anchor plant roots. Spread at least 2 to 3 inches of compost or aged manure onto your soil (no more than 4 inches).</p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-300">
                    <p className="text-gray-700">
                      <strong># If it's your first garden and you need better soil</strong>, we recommend working in the compost. If your garden is established, we recommend a no-dig approach and leaving the compost on the surface. This exposes fewer weed seeds and does not disturb the soil structure. Let the worms do the digging in for you!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Soil Mix Recommendations */}
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
              <h4 className="font-medium text-lg text-green-700 mb-4 flex items-center">
                <Sprout className="mr-2 h-5 w-5 text-green-600" />
                Recommended Soil Mixes for Malaysian Gardeners
              </h4>
              
              <div className="grid md:grid-cols-3 gap-5">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-medium text-center p-2 bg-green-100 text-green-700 rounded-lg mb-3">
                    General Purpose Mix
                  </h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">50% Coco peat</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">25% Compost</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">15% Perlite</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">10% Vermiculite</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    Balanced mix for most vegetables and herbs in Malaysia's climate.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-medium text-center p-2 bg-blue-100 text-blue-700 rounded-lg mb-3">
                    Rainy Season Mix
                  </h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">40% Coco peat</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">25% Perlite</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">20% Compost</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">15% River sand</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    Extra drainage for wet periods (Oct-Mar) to prevent root rot.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-medium text-center p-2 bg-amber-100 text-amber-700 rounded-lg mb-3">
                    Seedling Mix
                  </h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">40% Coco peat</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">30% Vermiculite</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">20% Perlite</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">10% Fine compost</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    Light, sterile mix for starting seeds without disease issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Step 4: When to plant? */}
      <div ref={stepRefs.step4} id="step4" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step4')}
        >
          <h3 className="text-xl font-semibold">Step 4: When to plant?</h3>
          {openSteps.step4 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step4 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <p className="mb-6 text-gray-700">
              Since Kuala Lumpur's temperatures remain warm year-round (typically 25-35°C / 77-95°F) and there is ample humidity, many plants can be started indoors at any time—but rainfall patterns and specific plant requirements should be considered.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="flex items-center font-medium text-gray-800 mb-3">
                  <Leaf className="text-green-500 mr-2 h-5 w-5" />
                  <span className="text-green-600">Follow seed packet instructions</span>
                </h4>
                <p className="text-gray-700">for exact timing and germination requirements.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="flex items-center font-medium text-gray-800 mb-3">
                  <Thermometer className="text-red-500 mr-2 h-5 w-5" />
                  <span className="text-green-600">Hot & humid:</span> <span className="text-gray-800">Perfect for tropical and heat-loving vegetables</span>
                </h4>
                <p className="text-gray-700">(e.g., tomatoes, peppers, eggplants) and many annual flowers.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="flex items-center font-medium text-gray-800 mb-3">
                  <CloudRain className="text-blue-500 mr-2 h-5 w-5" />
                  <span className="text-green-600">Rainy season caution:</span>
                </h4>
                <p className="text-gray-700">Overwatering or fungus can occur, so ensure proper drainage and pest monitoring.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h4 className="flex items-center font-medium text-gray-800 mb-3">
                  <Calendar className="text-purple-500 mr-2 h-5 w-5" />
                  <span className="text-green-600">Writing projected planting and harvesting dates</span>
                </h4>
                <p className="text-gray-700">can know when an area will be harvested and planning another crop in that space</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <h4 className="font-medium text-lg text-green-700 mb-4">Year-Round Planting Calendar for Kuala Lumpur</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3 flex items-center text-amber-700">
                    <Sun className="mr-2 h-4 w-4 text-amber-500" />
                    Dry Season (Apr-Sep)
                  </h5>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h6 className="font-medium mb-2 text-amber-600">Recommended to Plant:</h6>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Tomatoes, chili peppers, eggplants</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Okra, long beans, cucumbers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Herbs like basil, mint, and rosemary</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Heat-loving flowers: Marigolds, sunflowers, zinnias</span>
                      </li>
                    </ul>
                    
                    <div className="mt-3 bg-amber-50 p-3 rounded text-sm text-amber-700">
                      <strong>Tip:</strong> Water consistently in morning hours to prevent heat stress during this period.
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3 flex items-center text-blue-700">
                    <CloudRain className="mr-2 h-4 w-4 text-blue-500" />
                    Rainy Season (Oct-Mar)
                  </h5>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h6 className="font-medium mb-2 text-blue-600">Recommended to Plant:</h6>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Leafy greens: Kangkung, bayam, choy sum</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Root vegetables in raised beds: Radishes, carrots</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Plants that tolerate high humidity: Ginger, turmeric</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Herbs like cilantro and parsley</span>
                      </li>
                    </ul>
                    
                    <div className="mt-3 bg-blue-50 p-3 rounded text-sm text-blue-700">
                      <strong>Tip:</strong> Use containers with excellent drainage and elevate pots to prevent waterlogging during heavy rains.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Switch to hydroponics guide */}
      <div className="mt-10 text-center p-8 bg-green-50 rounded-lg shadow-sm border border-gray-200">
        <p className="mb-4 text-gray-700">Interested in learning about hydroponic growing methods?</p>
        <a 
          href="/guides/hydroponics-plan" 
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
        >
          Switch to Hydroponics Guide
        </a>
      </div>
      
      {/* Floating navigation */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="flex flex-col gap-2">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors">
            <ChevronUp className="h-6 w-6" />
          </button>
          <div className="relative group">
            <button className="bg-white border border-green-200 text-green-600 p-3 rounded-full shadow-lg hover:bg-green-50 transition-colors">
              <BookOpen className="h-6 w-6" />
            </button>
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
              <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 w-48">
                <div className="flex flex-col gap-1">
                  {Object.keys(stepRefs).map((step, index) => (
                    <button 
                      key={step}
                      onClick={() => scrollToStep(step)}
                      className="text-left px-3 py-2 hover:bg-green-50 rounded text-sm text-gray-700 flex items-center"
                    >
                      <span className="w-5 h-5 bg-green-100 rounded-full text-green-700 flex items-center justify-center text-xs mr-2">{index+1}</span>
                      {step === 'step1' && 'Indoor Space'}
                      {step === 'step2' && 'Containers'}
                      {step === 'step3' && 'Growing Media'}
                      {step === 'step4' && 'Planting Schedule'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render the active popup if any */}
      {openPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            ref={popupRef}
            className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="flex items-center justify-between bg-gray-100 p-4 border-b">
              <h3 className="text-xl font-bold">{mediaData[openPopup]?.title}</h3>
              <button 
                onClick={() => setOpenPopup(null)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-5">
              <h4 className="text-lg font-medium text-gray-800 mb-4">{mediaData[openPopup]?.subtitle}</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">What It Is:</h5>
                  <p className="text-gray-600">{mediaData[openPopup]?.whatItIs}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">Why It's Good:</h5>
                  <p className="text-gray-600">{mediaData[openPopup]?.whyItsGood}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">How to Use:</h5>
                  <p className="text-gray-600">{mediaData[openPopup]?.howToUse}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilGuide;