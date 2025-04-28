import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Droplet, Wind, Thermometer, Home, Zap, Layers, Calendar, Leaf, CloudRain, BookOpen, Droplets, Info, BadgeCheck, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const HydroponicGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set initial state based on URL hash or default to all steps closed
  const [openSteps, setOpenSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false
  });
  
  // References to step elements for scrolling
  const stepRefs = {
    step1: useRef(null),
    step2: useRef(null),
    step3: useRef(null),
    step4: useRef(null),
    step5: useRef(null),
    step6: useRef(null),
    step7: useRef(null)
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
    hydroton: {
      title: "Hydroton (Expanded Clay Pellets)",
      subtitle: "The Reusable Staple",
      whatItIs: "Hydroton is made from clay that's been heated in a kiln until it expands into lightweight, porous pellets. It's one of the most popular media for home hydroponics.",
      whyItsGood: "Hydroton provides excellent aeration and drainage, making it ideal for water-loving plants in Malaysia's humid climate. It's reusable, clean, and pH-neutral—perfect for beginners who want a low-maintenance option.",
      howToUse: "Rinse before first use to remove dust. Place pellets in net pots or containers to anchor plant roots. Can be reused after thorough cleaning and sterilizing between planting cycles."
    },
    rockwool: {
      title: "Rockwool Cubes",
      subtitle: "The Seed Starter's Best Friend",
      whatItIs: "Rockwool is spun from molten rock into fibrous cubes, which retain moisture and air efficiently.",
      whyItsGood: "Rockwool cubes provide excellent water retention while maintaining good aeration for root development. They're sterile, consistent, and ideal for starting seeds or cuttings.",
      howToUse: "Soak cubes in pH-balanced water before planting. Insert seeds or cuttings into the cubes, and place in a seedling tray or net cup."
    },
    cocoCoir: {
      title: "Coco Coir",
      subtitle: "The Eco-Friendly Medium",
      whatItIs: "Made from the husk of coconuts, coco coir is a natural, sustainable material used widely in soilless systems.",
      whyItsGood: "It holds water well and improves aeration—especially helpful in KL's hot, dry indoor spaces with air conditioning. It's biodegradable, safe, and easy to handle.",
      howToUse: "Rinse and buffer coir before use. Can be mixed with perlite or clay pellets to improve structure. Commonly used in drip or wick systems."
    },
    perlite: {
      title: "Perlite",
      subtitle: "The Light & Airy Booster",
      whatItIs: "Perlite is a white, volcanic glass that is heated until it puffs up, becoming very lightweight and porous.",
      whyItsGood: "Improves oxygen flow and drainage, ideal for Malaysia's high humidity. Prevents root rot by keeping the medium light and airy.",
      howToUse: "Often mixed with coco coir or vermiculite in home hydroponic blends. Best for systems where drainage is important, like drip or ebb & flow setups."
    },
    vermiculite: {
      title: "Vermiculite",
      subtitle: "The Moisture Retainer",
      whatItIs: "Vermiculite is a naturally occurring mineral that expands when heated, forming flat, absorbent flakes.",
      whyItsGood: "Excellent at holding moisture and nutrients. Helpful for growers in air-conditioned homes where dryness is an issue.",
      howToUse: "Often mixed with perlite or coco coir. Suitable for wick systems or early-stage seed germination."
    },
    growSponges: {
      title: "Grow Sponges / Seedling Plugs",
      subtitle: "The Convenient Starter",
      whatItIs: "Specially designed foam or biodegradable plugs made specifically for hydroponics seed starting.",
      whyItsGood: "Pre-formed with holes for seeds, sterile, and ready to use. Provides excellent moisture retention while allowing proper aeration for germination.",
      howToUse: "Simply insert seeds into the pre-made holes, keep moist, and place in proper lighting. Once seedlings develop, the entire plug can be transferred to your hydroponic system."
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
            <Droplets className="mr-3 h-6 w-6" />
            Hydroponics Gardening
          </h3>
          <p className="text-gray-600">
            Grow plants without soil using water-based nutrient solutions. Hydroponics is perfect for indoor growing, 
            allowing for faster growth, water efficiency, and year-round harvests regardless of outdoor conditions.
          </p>
        </div>
        <div className="md:w-1/4 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center shadow-md border-4 border-white">
            <Droplets className="h-16 w-16 text-green-500" />
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
            <Home className="mr-2 h-4 w-4" />
            System Selection
          </button>
          <button 
            onClick={() => scrollToStep('step2')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Droplet className="mr-2 h-4 w-4" />
            System Type
          </button>
          <button 
            onClick={() => scrollToStep('step3')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Layers className="mr-2 h-4 w-4" />
            Growing Media
          </button>
          <button 
            onClick={() => scrollToStep('step4')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Planting Schedule
          </button>
          <button 
            onClick={() => scrollToStep('step5')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Leaf className="mr-2 h-4 w-4" />
            Seeds & Seedlings
          </button>
          <button 
            onClick={() => scrollToStep('step6')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <Zap className="mr-2 h-4 w-4" />
            Nutrient Management
          </button>
          <button 
            onClick={() => scrollToStep('step7')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center"
          >
            <CloudRain className="mr-2 h-4 w-4" />
            Pest & Disease
          </button>
        </div>
      </div>
      
      {/* Step 1: System & Environment Selection */}
      <div ref={stepRefs.step1} id="step1" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step1')}
        >
          <h3 className="text-xl font-semibold">Step 1: System & Environment Selection</h3>
          {openSteps.step1 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step1 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <div className="mb-10">
              <h4 className="text-xl font-medium text-green-600 mb-4">Choose a <span className="text-green-500 font-semibold">Suitable Spot</span></h4>
              <div className="md:flex gap-8 items-center">
                <div className="md:w-1/2">
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Pick an indoor location that's convenient to access, sturdy enough to hold your hydroponic setup, and away from heavy foot traffic. 
                    Good airflow helps keep humidity in check—especially in Kuala Lumpur. A corner of a room, balcony nook, or utility area can work 
                    if there's enough space to place your reservoir and basic equipment.
                  </p>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 mt-4">
                    <p className="text-green-800 text-sm">
                      <strong>Pro tip:</strong> South or east-facing windows often provide the best natural light balance for hydroponic systems in Malaysian homes.
                    </p>
                  </div>
                </div>
                
                <div className="md:w-1/2 h-64 bg-gray-100 rounded-lg overflow-hidden shadow-sm mt-4 md:mt-0 flex items-center justify-center">
                  <img
                    src="/assets/careguides/hy-step1.jpg"
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
                Water & Spills
              </h4>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Plan for occasional water changes or overflows. Use a waterproof tray or mat underneath your system to prevent damage to floors. 
                  Keep a nearby drain or sink accessible—this makes it easier to fill and empty your reservoir without creating clutter or mess.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <h4 className="flex items-center text-lg font-medium text-green-600 mb-4">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <Wind className="h-5 w-5 text-gray-500" />
                </div>
                Ventilation
              </h4>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Indoor humidity in KL is generally high, so mild air circulation is helpful. A small fan or open window can reduce excess moisture 
                  and keep oxygen levels healthy. Make sure your chosen spot isn't prone to stagnant air or trapped heat.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="flex items-center text-lg font-medium text-green-600 mb-4">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Thermometer className="h-5 w-5 text-red-500" />
                </div>
                Light & Temperature
              </h4>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Most leafy greens and herbs thrive with 12-16 hours of light daily. Natural sunlight can be supplemented with an LED grow light if 
                  your chosen spot lacks bright windows. In Kuala Lumpur's climate, watch for overheating; keep the area around 20-26 °C to encourage steady growth.
                </p>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-yellow-800 text-sm">
                    <strong>Climate note:</strong> In Malaysia's equatorial climate, managing heat is often more important than providing additional light.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Step 2: Hydroponic System Type Selection */}
      <div ref={stepRefs.step2} id="step2" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step2')}
        >
          <h3 className="text-xl font-semibold">Step 2: Hydroponic System Type Selection</h3>
          {openSteps.step2 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step2 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <div className="mb-8">
              <div className="md:flex items-center gap-6 mb-6">
                <div className="md:w-3/3">
                  <h4 className="text-xl font-medium text-green-600 mb-4">Choose Your <span className="text-green-500 font-semibold">Ideal System</span></h4>
                  <p className="text-gray-700 leading-relaxed">
                    To start successfully, pick a beginner-friendly hydroponic system that matches your space, budget, and time commitment. 
                    Each system ensures good nutrient flow to roots without tangling or drowning.
                  </p>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    In Kuala Lumpur's warm climate, oxygenation and consistent water circulation are critical. Avoid starting 
                    too many plants in one container, which can lead to overcrowding and nutrient deficiencies.
                  </p>
                </div>
              </div>
            </div>
            
            {/* System comparison section */}
            <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-2">
                <Droplet className="h-5 w-5 text-green-600" />
              </div>
              Popular Hydroponic Systems
            </h4>
            
            {/* System cards with tabs */}
            <div className="mb-10">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Deep Water Culture */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      BEGINNER-FRIENDLY
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/assets/careguides/hydroponics/dwc.png" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="text-xl font-semibold mb-1">Deep Water Culture</h5>
                    <p className="text-sm text-gray-500 mb-4">(DWC)</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Best For</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Leafy greens (lettuce, spinach), herbs, small plants with shorter growth cycles</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="font-medium">Watch Out For</span>
                      </div>
                      <ul className="ml-5 text-sm space-y-1">
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Algae growth if reservoir is exposed to light</span>
                        </li>
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Pump maintenance (must run continuously)</span>
                        </li>
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Water temperature rising in KL's heat</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h6 className="font-medium mb-2">Key Features</h6>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Very beginner-friendly</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Minimal parts needed (reservoir, air pump, net pots)</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Roots hang in oxygenated nutrient solution</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Nutrient Film Technique */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      SPACE-SAVING
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/assets/careguides/hydroponics/nft.png" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="text-xl font-semibold mb-1">Nutrient Film Technique</h5>
                    <p className="text-sm text-gray-500 mb-4">(NFT)</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Best For</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Small, fast-growing plants with shallow root systems, vertical setups, limited spaces</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="font-medium">Watch Out For</span>
                      </div>
                      <ul className="ml-5 text-sm space-y-1">
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Pump failure can quickly stress plants</span>
                        </li>
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">May need precise leveling to ensure uniform water flow</span>
                        </li>
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Clogging issues in tropical conditions</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h6 className="font-medium mb-2">Key Features</h6>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Thin film of water flows over roots, giving them constant nutrient access and air</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Space-saving; can be set up vertically</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Uses less water than DWC systems</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Wick Systems */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      NO ELECTRICITY
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/assets/careguides/hydroponics/wick.png" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="text-xl font-semibold mb-1">Wick Systems</h5>
                    <p className="text-sm text-gray-500 mb-4">(Passive)</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Best For</span>
                      </div>
                      <p className="text-gray-700 ml-5 text-sm">Herbs, smaller indoor plants, beginners, power outage backup, quiet operations</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="font-medium">Watch Out For</span>
                      </div>
                      <ul className="ml-5 text-sm space-y-1">
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Slower growth rate (lower oxygenation)</span>
                        </li>
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Limited to smaller plants due to passive water flow</span>
                        </li>
                        <li className="flex items-baseline">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">Wick material can degrade over time</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h6 className="font-medium mb-2">Key Features</h6>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">No electricity needed; nutrient solution is drawn up via wicks</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Great for small spaces, simple, and quiet</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700">Ideal for areas with frequent power outages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* System comparison table */}
            <div className="mt-10">
              <h4 className="text-lg font-medium text-green-600 mb-4 flex items-center">
                <div className="p-2 bg-gray-100 rounded-full mr-2">
                  <Layers className="h-5 w-5 text-gray-600" />
                </div>
                Quick Comparison
              </h4>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Feature</th>
                      <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">DWC</th>
                      <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">NFT</th>
                      <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Wick System</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b border-gray-200 font-medium">Setup Complexity</td>
                      <td className="p-3 border-b border-gray-200">Easy</td>
                      <td className="p-3 border-b border-gray-200">Moderate</td>
                      <td className="p-3 border-b border-gray-200">Very Easy</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-gray-200 font-medium">Cost</td>
                      <td className="p-3 border-b border-gray-200">Low-Medium</td>
                      <td className="p-3 border-b border-gray-200">Medium</td>
                      <td className="p-3 border-b border-gray-200">Very Low</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-gray-200 font-medium">Maintenance</td>
                      <td className="p-3 border-b border-gray-200">Weekly</td>
                      <td className="p-3 border-b border-gray-200">Weekly</td>
                      <td className="p-3 border-b border-gray-200">Bi-weekly</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-gray-200 font-medium">Power Required</td>
                      <td className="p-3 border-b border-gray-200">Yes (Air Pump)</td>
                      <td className="p-3 border-b border-gray-200">Yes (Water Pump)</td>
                      <td className="p-3 border-b border-gray-200">No</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-gray-200 font-medium">Best For KL Beginners</td>
                      <td className="p-3 border-b border-gray-200 text-green-600">★★★★★</td>
                      <td className="p-3 border-b border-gray-200 text-green-600">★★★☆☆</td>
                      <td className="p-3 border-b border-gray-200 text-green-600">★★★★☆</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Recommendation for beginners */}
            <div className="mt-10 bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="flex flex-col md:flex-row gap-5 items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-green-700 mb-2">Our Recommendation for Malaysian Beginners</h4>
                  <p className="text-gray-700 mb-3">
                    For first-time hydroponic gardeners in Kuala Lumpur, we recommend starting with a simple Deep Water Culture (DWC) system 
                    using a small container and just 2-3 plants. This offers the best balance of ease, cost, and results while you learn the basics.
                  </p>
                  <p className="text-green-700 text-sm font-medium">
                    Once you're comfortable with the basics, you can experiment with other systems or expand your DWC setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Step 3: Growing Media for Malaysian Gardeners */}
      <div ref={stepRefs.step3} id="step3" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step3')}
        >
          <h3 className="text-xl font-semibold">Step 3: Different Growing Media for Malaysian Gardeners</h3>
          {openSteps.step3 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step3 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <div className="mb-8">
              <div className="md:flex items-start gap-6 mb-6">
                <div className="md:w-3/3">
                  <h4 className="text-xl font-medium text-green-600 mb-4">Selecting the <span className="text-green-500 font-semibold">Right Growing Medium</span></h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The growing medium provides support for plant roots and helps manage moisture in your hydroponic system. 
                    Unlike soil, these media don't provide nutrients (those come from your nutrient solution), but they do 
                    significantly impact root health, oxygenation, and moisture balance.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    In Malaysia's tropical climate, selecting the right medium is crucial for managing humidity and preventing 
                    root diseases. Here are the best options for local hydroponic gardeners:
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-300 mb-8">
                <h5 className="flex items-center text-green-800 font-medium mb-2">
                  <span className="mr-2">📋</span>
                  What to Look for in Growing Media
                </h5>
                <div className="grid md:grid-cols-4 gap-3 text-sm">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <span className="block font-medium text-green-700 mb-1">Water Retention</span>
                    <span className="text-gray-600">How much moisture it holds</span>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <span className="block font-medium text-green-700 mb-1">Aeration</span>
                    <span className="text-gray-600">Oxygen flow to the roots</span>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <span className="block font-medium text-green-700 mb-1">pH Neutrality</span>
                    <span className="text-gray-600">Won't affect nutrient solution</span>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <span className="block font-medium text-green-700 mb-1">Reusability</span>
                    <span className="text-gray-600">Environmental & cost factor</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Media category tabs */}
            <div className="mb-8">
              <div className="flex items-center mb-5">
                <div className="h-px bg-gray-200 flex-grow"></div>
                <h4 className="text-lg font-medium text-green-600 px-4">Popular Growing Media</h4>
                <div className="h-px bg-gray-200 flex-grow"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Coco Coir & Coco Chips */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md h-full">
                  <div className="h-48 bg-gray-100 relative">
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      ECO-FRIENDLY
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/assets/careguides/hydroponics/coco_coir.png" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                  <div className="mb-2">
                    <div className="flex items-center mb-3">
                      <h5 className="text-xl font-semibold group-hover:text-green-600 transition-colors mr-2">
                        Coco Coir
                      </h5>
                      <button 
                        onClick={() => setOpenPopup('cocoCoir')}
                        className="p-1 rounded-full hover:bg-gray-150 text-gray-500 hover:text-green-600 transition-colors"
                        aria-label="View more information about Coco Coir"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-8 h-1.5 bg-green-500 mr-0.5 rounded-full"></div>
                        ))}
                        <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Malaysian Favorite</span>
                    </div>
                    
                    <div className="space-y-4 mb-4">
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-1">Properties</h6>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Sustainable</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Water-retaining</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">pH neutral</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Locally available</span>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-1/2">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Pros</h6>
                          <ul className="ml-1 space-y-1">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Eco-friendly</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Excellent water retention</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Good for Malaysia's heat</span>
                            </li>
                          </ul>
                        </div>
                        <div className="w-1/2">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Cons</h6>
                          <ul className="ml-1 space-y-1">
                            <li className="flex items-start">
                              <span className="text-red-500 mr-1">✕</span>
                              <span className="text-sm text-gray-600">Can hold too much water</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-1">✕</span>
                              <span className="text-sm text-gray-600">Breaks down over time</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h6 className="text-sm font-medium text-gray-700 mb-1">Best For</h6>
                      <p className="text-sm text-gray-600">
                        DWC systems, herbs, seedlings, and plants that prefer consistent moisture.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Rockwool */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md h-full">
                  <div className="h-48 bg-gray-100 relative">
                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      MOISTURE CONTROL
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/assets/careguides/hydroponics/rockwool.png" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                  <div className="mb-2">
                    <div className="flex items-center mb-3">
                      <h5 className="text-xl font-semibold mr-2">Rockwool</h5>
                      <button 
                        onClick={() => setOpenPopup('rockwool')}
                        className="p-1 rounded-full hover:bg-gray-150 text-gray-500 hover:text-green-600 transition-colors"
                        aria-label="View more information about Rockwool"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="w-8 h-1.5 bg-green-500 mr-0.5 rounded-full"></div>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Professional Choice</span>
                    </div>
                    
                    <div className="space-y-4 mb-4">
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-1">Properties</h6>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Moisture-retaining</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Sterile</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Structured</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Uniform</span>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-1/2">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Pros</h6>
                          <ul className="ml-1 space-y-1">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Excellent for seed starting</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Uniform water distribution</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">No pest or disease issues</span>
                            </li>
                          </ul>
                        </div>
                        <div className="w-1/2">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Cons</h6>
                          <ul className="ml-1 space-y-1">
                            <li className="flex items-start">
                              <span className="text-red-500 mr-1">✕</span>
                              <span className="text-sm text-gray-600">Not environmentally friendly</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-1">✕</span>
                              <span className="text-sm text-gray-600">Needs pre-soaking to adjust pH</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h6 className="text-sm font-medium text-gray-700 mb-1">Best For</h6>
                      <p className="text-sm text-gray-600">
                        Seed starting, cuttings, and commercial systems. Ideal for NFT systems.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Clay Pellets (LECA) */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md h-full">
                  <div className="h-48 bg-gray-100 relative">
                    <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      REUSABLE
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/assets/careguides/hydroponics/clay_pellets.png" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                  <div className="mb-2">
                    <div className="flex items-center mb-3">
                      <h5 className="text-xl font-semibold mr-2">Expanded Clay Pellets</h5>
                      <button 
                        onClick={() => setOpenPopup('hydroton')}
                        className="p-1 rounded-full hover:bg-gray-150 text-gray-500 hover:text-green-600 transition-colors"
                        aria-label="View more information about Hydroton"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-8 h-1.5 bg-green-500 mr-0.5 rounded-full"></div>
                        ))}
                        <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Long-Term Value</span>
                    </div>
                    
                    <div className="space-y-4 mb-4">
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-1">Properties</h6>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Airy</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Reusable</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Stable</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">pH neutral</span>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-1/2">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Pros</h6>
                          <ul className="ml-1 space-y-1">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Excellent root aeration</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Can be reused indefinitely</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span className="text-sm text-gray-600">Prevents root rot</span>
                            </li>
                          </ul>
                        </div>
                        <div className="w-1/2">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Cons</h6>
                          <ul className="ml-1 space-y-1">
                            <li className="flex items-start">
                              <span className="text-red-500 mr-1">✕</span>
                              <span className="text-sm text-gray-600">Heavy when wet</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-1">✕</span>
                              <span className="text-sm text-gray-600">Higher initial cost</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-1">✕</span>
                              <span className="text-sm text-gray-600">Poor water retention</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h6 className="text-sm font-medium text-gray-700 mb-1">Best For</h6>
                      <p className="text-sm text-gray-600">
                        DWC systems, ebb and flow systems, and semi-hydroponics. Great in Malaysia's high humidity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary growing media section */}
            <div className="mb-10">
              <div className="flex items-center mb-5">
                <div className="h-px bg-gray-200 flex-grow"></div>
                <h4 className="text-lg font-medium text-green-600 px-4">Additional Options</h4>
                <div className="h-px bg-gray-200 flex-grow"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Perlite */}
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-24 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <img 
                        src="/assets/careguides/hydroponics/perlite.png"
                        className="w-22 h-22 object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h5 className="font-semibold mr-1">Perlite</h5>
                        <button 
                          onClick={() => setOpenPopup('perlite')}
                          className="p-1 rounded-full hover:bg-gray-150 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="View more information about Perlite"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div>
                          <span className="text-xs text-gray-500">Lightweight & Draining</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Volcanic glass that has been expanded with heat. Extremely lightweight and excellent for improving aeration.
                  </p>
                  
                  <div className="flex justify-between text-xs">
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Aeration</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Water Retention</div>
                      <div className="flex">
                        {[1, 2].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                        {[1, 2, 3].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Reusability</div>
                      <div className="flex">
                        {[1, 2, 3].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                        {[1, 2].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Grow Sponges / Seedling Plugs */}
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-24 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <img 
                        src="/assets/careguides/hydroponics/sponges.jpg"
                        className="w-22 h-22 object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h5 className="font-semibold mr-1">Grow Sponges</h5>
                        <button 
                          onClick={() => setOpenPopup('growSponges')}
                          className="p-1 rounded-full hover:bg-gray-150 text-gray-500 hover:text-green-600 transition-colors"
                          aria-label="View more information about Grow Sponges"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-300 rounded-full mr-1"></div>
                          <span className="text-xs text-gray-500">Clean & Convenient</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Ready-to-use plugs made from biodegradable materials. Perfect for starting seeds in hydroponic systems.
                  </p>
                  
                  <div className="flex justify-between text-xs">
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Ease of Use</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Water Retention</div>
                      <div className="flex">
                        {[1, 2, 3, 4].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                        {[1].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Reusability</div>
                      <div className="flex">
                        {[1].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                        {[1, 2, 3, 4].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Vermiculite */}
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-24 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <img 
                        src="/assets/careguides/hydroponics/vermiculite.png"
                        className="w-22 h-22 object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h5 className="font-semibold mr-1">Vermiculite</h5>
                        <button 
                          onClick={() => setOpenPopup('vermiculite')}
                          className="p-1 rounded-full hover:bg-gray-150 text-gray-500 hover:text-blue-600 transition-colors"
                          aria-label="View more information about Vermiculite"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-300 rounded-full mr-1"></div>
                          <span className="text-xs text-gray-500">Water-Locking</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Mineral that expands when heated. Excellent at retaining water and nutrients, making it ideal for dry conditions.
                  </p>
                  
                  <div className="flex justify-between text-xs">
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Aeration</div>
                      <div className="flex">
                        {[1, 2, 3].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                        {[1, 2].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Water Retention</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-medium text-gray-700">Reusability</div>
                      <div className="flex">
                        {[1, 2].map(i => (
                          <span key={i} className="text-green-500">★</span>
                        ))}
                        {[1, 2, 3].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Media comparison matrix */}
            <div className="mb-10">
              <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
                <div className="p-2 bg-gray-100 rounded-full mr-2">
                  <Layers className="h-5 w-5 text-gray-600" />
                </div>
                Choosing the Right Media For Your System
              </h4>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left font-medium text-gray-700">Growing Medium</th>
                        <th className="p-3 text-center font-medium text-gray-700">DWC</th>
                        <th className="p-3 text-center font-medium text-gray-700">NFT</th>
                        <th className="p-3 text-center font-medium text-gray-700">Wick</th>
                        <th className="p-3 text-center font-medium text-gray-700">Cost in Malaysia</th>
                        <th className="p-3 text-center font-medium text-gray-700">Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Coco Coir</td>
                        <td className="p-3 text-center text-green-600">Excellent</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center text-green-600">Excellent</td>
                        <td className="p-3 text-center">RM 8-15 / kg</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">
                            {[1, 2, 3, 4, 5].map(i => (
                              <span key={i} className="text-green-500">★</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Rockwool</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center text-green-600">Excellent</td>
                        <td className="p-3 text-center text-red-600">Poor</td>
                        <td className="p-3 text-center">RM 20-30 / pack</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">
                            {[1, 2, 3].map(i => (
                              <span key={i} className="text-green-500">★</span>
                            ))}
                            {[1, 2].map(i => (
                              <span key={i} className="text-gray-300">★</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Clay Pellets</td>
                        <td className="p-3 text-center text-green-600">Excellent</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center">RM 25-40 / L</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">
                            {[1, 2, 3, 4].map(i => (
                              <span key={i} className="text-green-500">★</span>
                            ))}
                            {[1].map(i => (
                              <span key={i} className="text-gray-300">★</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Perlite</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center text-red-600">Poor</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center">RM 15-25 / L</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">
                            {[1, 2, 3].map(i => (
                              <span key={i} className="text-green-500">★</span>
                            ))}
                            {[1, 2].map(i => (
                              <span key={i} className="text-gray-300">★</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Grow Sponges</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center text-green-600">Excellent</td>
                        <td className="p-3 text-center text-yellow-600">Good</td>
                        <td className="p-3 text-center">RM 10-20 / pack</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">
                            {[1, 2, 3].map(i => (
                              <span key={i} className="text-green-500">★</span>
                            ))}
                            {[1, 2].map(i => (
                              <span key={i} className="text-gray-300">★</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Setup steps section */}
            <div className="mb-8">
              <div className="bg-green-50 rounded-xl overflow-hidden border border-green-100 shadow-sm">
                <div className="p-6 border-b border-green-100 bg-green-100/50">
                  <h4 className="text-xl font-medium text-green-700 flex items-center">
                    <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 mr-3 shadow-sm">
                      <Droplet className="h-4 w-4" />
                    </span>
                    Setting Up Your Hydroponic System
                  </h4>
                  <p className="text-green-700 ml-11">Four simple steps to prepare your system with the right growing medium</p>
                </div>
                
                <div className="p-6">
                  <ol className="space-y-5">
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 shadow-sm">1</div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Clean & Prepare Your Containers</h5>
                        <p className="text-gray-600">Rinse thoroughly—clean gear prevents algae and harmful bacteria buildup, especially in KL's humid indoor climate.</p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 shadow-sm">2</div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Set Up the Water & Nutrient System</h5>
                        <p className="text-gray-600">Fill your tank or container with clean, filtered water. Mix well and check the pH—it should be between 5.5 and 6.5. In Kuala Lumpur's tap water, pH tends to be alkaline, so you may need a pH down solution.</p>
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg border-l-3 border-blue-200 text-sm text-blue-800">
                          <strong>Malaysia Water Tip:</strong> In KL, tap water averages pH 6.70 - 7.99 and can contain chlorine. Let it sit overnight before use or use a water conditioner.
                        </div>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 shadow-sm">3</div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Set Up the Nutrient System</h5>
                        <p className="text-gray-600">Add hydroponic nutrients according to the plant type and growth stage. For Malaysian conditions, use:</p>
                        <div className="mt-2 grid grid-cols-3 gap-3">
                          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <h6 className="font-medium text-sm text-green-700 mb-1">Leafy Greens</h6>
                            <p className="text-xs text-gray-600">Higher nitrogen (N) formula</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <h6 className="font-medium text-sm text-green-700 mb-1">Flowering/Fruiting</h6>
                            <p className="text-xs text-gray-600">Higher phosphorus (P) and potassium (K)</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <h6 className="font-medium text-sm text-green-700 mb-1">Tropical Herbs</h6>
                            <p className="text-xs text-gray-600">Balanced formula with micronutrients</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 shadow-sm">4</div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Add Growing Media & Plant Seedlings</h5>
                        <p className="text-gray-600">Place your chosen growing media in net pots or floating supports. Insert seedlings or germinated seeds gently into the media. Make sure roots can reach the water or wick system—but avoid drowning them. Good root exposure to oxygen is key in hydroponics!</p>
                        <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-xl">💡</span>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-800 mb-1">First time setting up?</h6>
                            <p className="text-sm text-gray-600">
                              Start with a simple Kratky system using LECA or rockwool, a clear container, and lettuce or herbs. 
                              It's low-maintenance and perfect for small kitchens or balconies in KL. Once confident, explore more 
                              active systems with air pumps or drip lines.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            
            {/* Recommended combinations */}
            <div>
              <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                Recommended Media Combinations for Malaysian Growers
              </h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-4 bg-green-700 text-white">
                    <h5 className="font-medium">Beginner Setup</h5>
                  </div>
                  <div className="p-5">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full mb-2">DWC System</span>
                      <h6 className="font-medium">Lettuce & Leafy Greens</h6>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Primary: Coco coir in net pots</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Seed starting: Grow sponges</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Optional: Layer of clay pellets on top</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 italic">
                      Perfect for beginners in Malaysia's climate - prevents algae growth while maintaining moisture.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-4 bg-blue-700 text-white">
                    <h5 className="font-medium">Hot Weather Setup</h5>
                  </div>
                  <div className="p-5">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-2">NFT System</span>
                      <h6 className="font-medium">Herbs & Small Vegetables</h6>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Primary: Rockwool cubes</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Support: Small clay pellets</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Optional: Perlite for extra aeration</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 italic">
                      Optimized for KL's hot seasons - provides good water retention while preventing root rot.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-4 bg-amber-700 text-white">
                    <h5 className="font-medium">Power-Saving Setup</h5>
                  </div>
                  <div className="p-5">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full mb-2">Wick System</span>
                      <h6 className="font-medium">Herbs & Small Plants</h6>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Primary: Coco coir/vermiculite mix (50/50)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Wick material: Cotton or nylon rope</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Optional: Perlite top layer to prevent algae</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 italic">
                      Electricity-free option that works well during power outages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step 4: When to plant? */}
      <div ref={stepRefs.step4} id="step4" className="mb-6">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step4')}
        >
          <h3 className="text-xl font-semibold">Step 4: When to plant?</h3>
          {openSteps.step4 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step4 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-6 bg-white">
            <p className="mb-6">
              Kuala Lumpur's consistently warm climate (25-35°C / 77-95°F) and high humidity make indoor hydroponic growing possible all year round, 
              without worrying about soil conditions or outdoor rainfall.
            </p>
            
            <div className="mb-6 bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <BadgeCheck className="text-green-600 mr-3 mt-1 h-5 w-5" />
                <p className="flex-1">
                  <span className="font-medium text-green-700">Year-round planting</span> is one of the biggest advantages of hydroponics for KL residents, 
                  especially for herbs and leafy greens.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-5 rounded-lg">
                <h4 className="flex items-center text-lg font-medium text-green-700 mb-3">
                  <Leaf className="mr-2 h-5 w-5 text-green-600" />
                  Ideal Crops to Start Anytime:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                    <span>Lettuce, basil, kangkung, mint</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                    <span>Spinach, choy sum, pak choy</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                    <span>Microgreens and salad mixes</span>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-green-800">
                  These crops don't require flowering or fruiting, and they thrive in stable indoor temperatures and controlled lighting.
                </p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="flex items-center text-lg font-medium text-gray-700 mb-3">
                  <Calendar className="mr-2 h-5 w-5 text-gray-600" />
                  Planning Your Hydroponic Cycles
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-baseline">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Track planting and expected harvest dates</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Clean and reset your system between cycles</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Consider planting new seedlings every 1-2 weeks for a continuous supply</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="flex items-center text-lg font-medium text-blue-700 mb-3">
                  <CloudRain className="mr-2 h-5 w-5 text-blue-600" />
                  Rainy season caution:
                </h4>
                <p className="mb-3 text-blue-700">
                  Although water isn't an issue in hydroponics, indoor humidity levels can spike during KL's rainy months (typically October-March).
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-baseline">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Use a small fan or dehumidifier to keep airflow healthy</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Monitor for mold, algae, or damping off in seedling stages</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-5 rounded-lg">
                <h4 className="flex items-center text-lg font-medium text-amber-700 mb-3">
                  <Zap className="mr-2 h-5 w-5 text-amber-600" />
                  Tip:
                </h4>
                <p className="text-amber-700">
                  Many KL residents grow hydroponically on kitchen counters, balconies, or even in shaded laundry areas. Just ensure there's airflow and access to light, and you can grow almost anytime!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step 5: Seeds and Seedlings */}
      <div ref={stepRefs.step5} id="step5" className="mb-8">
        <div 
          className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step5')}
        >
          <h3 className="text-xl font-semibold">Step 5: Handling Seeds and Seedlings</h3>
          {openSteps.step5 ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSteps.step5 && (
          <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
            <div className="mb-8">
              <div className="md:flex items-center gap-6 mb-6">
                <div className="md:w-3/3">
                  <h4 className="text-xl font-medium text-green-600 mb-4">Getting Started with <span className="text-green-500 font-semibold">Seeds</span></h4>
                  <p className="text-gray-700 leading-relaxed">
                    Unlike traditional gardening, hydroponics gives you precise control over the growing environment from day one. 
                    Properly starting your seeds ensures stronger plants and better harvests in your hydroponic system.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Seed Starting Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-green-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <h5 className="text-lg font-medium text-green-700">Select the Right Spot</h5>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Choose a bright, well-ventilated indoor space with <span className="font-medium">stable temperature</span> and access to electricity. Keep it away from pets or areas with potential spills. In KL's climate, ensure it's not overly humid or enclosed.
                  </p>
                  <div className="p-3 rounded-lg">
                    <h6 className="font-medium text-sm text-green-700 mb-1">Key Points:</h6>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Stable environment (22-28°C)</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Access to electricity for pumps/lights</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Protected from direct sunlight</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-green-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <h5 className="text-lg font-medium text-green-700">Sow with Care</h5>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Plant seeds in rockwool, coco plugs, or sponge cubes. Place them gently into pre-moistened media. No soil needed! Cover lightly with humidity domes or plastic to keep them moist during germination.
                  </p>
                  <div className="p-3 rounded-lg">
                    <h6 className="font-medium text-sm text-green-700 mb-1">Seed Placement:</h6>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Small seeds: place on surface</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Medium seeds: 2-3mm deep</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Label varieties and date planted</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-green-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <h5 className="text-lg font-medium text-green-700">Mist, Don't Drench</h5>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Use a spray bottle or mister to keep the growing medium moist—never soggy. Avoid pouring water directly over the seeds. KL's humidity helps, but don't let the medium dry out or sit in standing water.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-300">
                    <p className="text-sm text-yellow-800">
                      <strong>Warning:</strong> Overwatering is the No.1 cause of seed failure in hydroponics. In Malaysia's humid climate, you'll need less water than you might expect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-green-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">4</span>
                    </div>
                    <h5 className="text-lg font-medium text-green-700">Provide Light & Warmth</h5>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Use LED grow lights for 12-16 hours a day. Ensure a consistent temperature between 22-28°C. Avoid placing seed trays near windows where direct sun may overheat or dry out your seedlings.
                  </p>
                  <div className="p-3 rounded-lg">
                    <h6 className="font-medium text-sm text-green-700 mb-1">Light Distance:</h6>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>LED: 15-30cm above seedlings</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Fluorescent: 10-15cm above</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-green-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">5</span>
                    </div>
                    <h5 className="text-lg font-medium text-green-700">Transplant to Hydroponics</h5>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Once the roots emerge and the first true leaves appear, gently move seedlings (with the plug) into your chosen hydroponic system. Handle with care—don't disturb young roots.
                  </p>
                  <div className="p-3 rounded-lg">
                    <h6 className="font-medium text-sm text-green-700 mb-1">When to Transplant:</h6>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>2-3 sets of true leaves</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Roots visible through medium</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Plant height: 5-10cm</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-green-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">6</span>
                    </div>
                    <h5 className="text-lg font-medium text-green-700">Acclimate to Airflow</h5>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Before full setup, slowly introduce airflow (fans or open windows) to strengthen seedlings and prevent mold, especially in KL's humid climate.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-300">
                    <p className="text-sm text-blue-800">
                      <strong>Malaysian Tip:</strong> In KL's humidity, gentle air circulation is crucial for preventing damping-off disease, which commonly affects seedlings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      
      {/* Common Seedling Problems */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
        <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
                <div className="p-2 bg-gray-100 rounded-full mr-2">
                  <Layers className="h-5 w-5 text-gray-600" />
                </div>
                Common Seedling Issues in Malaysian Hydroponic Systems
              </h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Problem</th>
                <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Symptoms</th>
                <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Likely Cause</th>
                <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-200 font-medium">Leggy Seedlings</td>
                <td className="p-3 border-b border-gray-200">Tall, thin stems; weak structure</td>
                <td className="p-3 border-b border-gray-200">Insufficient light</td>
                <td className="p-3 border-b border-gray-200">Move lights closer; increase light duration</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 font-medium">Damping Off</td>
                <td className="p-3 border-b border-gray-200">Stems collapse at soil line; seedlings wilt</td>
                <td className="p-3 border-b border-gray-200">Fungal infection; poor ventilation</td>
                <td className="p-3 border-b border-gray-200">Improve airflow; use sterile media; reduce humidity</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 font-medium">Yellowing Leaves</td>
                <td className="p-3 border-b border-gray-200">Pale or yellow leaves</td>
                <td className="p-3 border-b border-gray-200">Nutrient deficiency or excess water</td>
                <td className="p-3 border-b border-gray-200">Check EC levels; ensure proper drainage</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 font-medium">Mold Growth</td>
                <td className="p-3 border-b border-gray-200">White or gray fuzzy patches on media or plants</td>
                <td className="p-3 border-b border-gray-200">High humidity; poor air circulation</td>
                <td className="p-3 border-b border-gray-200">Increase airflow; reduce watering; use fan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
          {/* Final tip box */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-100">
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="text-lg font-medium text-green-700 mb-2">Success Tip for Malaysian Growers</h4>
                <p className="text-gray-700 mb-3">
                  For first-time hydroponic gardeners in Malaysia, try starting with fast-growing Asian greens like kangkung (water spinach) 
                  or pak choi. They're well-adapted to our tropical climate and will give you quick satisfaction while you learn the system.
                </p>
                <p className="text-green-700 text-sm font-medium">
                  Most leafy greens will be ready to harvest just 30-45 days after transplanting seedlings to your hydroponic system!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Step 6: Nutrient Management */}
    <div ref={stepRefs.step6} id="step6" className="mb-8">
      <div 
        className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
        onClick={() => toggleStep('step6')}
      >
        <h3 className="text-xl font-semibold">Step 6: Nutrient Management for Hydroponics</h3>
        {openSteps.step6 ? <ChevronUp /> : <ChevronDown />}
      </div>
      
      {openSteps.step6 && (
        <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
          <div className="mb-8">
            <div className="md:flex items-center gap-6 mb-6">
              <div className="md:w-3/3">
                <h4 className="text-xl font-medium text-green-600 mb-4">Understanding <span className="text-green-500 font-semibold">Hydroponic Nutrients</span></h4>
                <p className="text-gray-700 leading-relaxed">
                  In hydroponics, plants rely completely on you for their nutrition. Unlike soil gardening, there's no natural ecosystem 
                  providing nutrients, so getting the mix right is crucial for healthy growth and abundant harvests.
                </p>
                <p className="text-gray-700 mt-3 leading-relaxed">
                  For Malaysian hydroponic gardeners, understanding the basics of plant nutrition and how to maintain the 
                  correct balance in our tropical climate will set you up for success.
                </p>
              </div>
            </div>
          </div>
          
          {/* Nutrient types */}
          <div className="mb-10">
            <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-2">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              Types of Hydroponic Nutrients
            </h4>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="p-5 bg-green-50 border-b border-gray-200">
                  <h5 className="text-xl font-semibold text-green-700">Organic Nutrients</h5>
                  <p className="text-sm text-gray-600 mt-1">Natural-based solutions</p>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h6 className="font-medium text-gray-700 mb-2">Main Features:</h6>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">Derived from natural sources (seaweed, fish, compost)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">Better for beneficial microbial life</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">Slower release; gentler on plants</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="font-medium text-gray-700 mb-2">Considerations in Malaysia:</h6>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">May break down faster in tropical heat</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">Can cause clogging in warmer systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">Requires more frequent monitoring of solution</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Best for:</strong> DWC systems with good filtration, wick systems, and growers preferring natural approaches.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="p-5 bg-blue-50 border-b border-gray-200">
                  <h5 className="text-xl font-semibold text-blue-700">Mineral/Chemical Nutrients</h5>
                  <p className="text-sm text-gray-600 mt-1">Synthesized for precision</p>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h6 className="font-medium text-gray-700 mb-2">Main Features:</h6>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">Precisely formulated for different growth stages</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">Immediately available to plants</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">More stable in solution over time</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="font-medium text-gray-700 mb-2">Considerations in Malaysia:</h6>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">Solution concentration changes faster with evaporation in heat</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">Risk of nutrient burn if not properly diluted</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">May require EC/TDS meter for precision</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Best for:</strong> Most commercial hydroponic systems, beginners who want reliable results, and precise growers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* NPK and nutrient measuring */}
          <div className="mb-10">
            <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
                <div className="p-2 bg-gray-100 rounded-full mr-2">
                  <Layers className="h-5 w-5 text-gray-600" />
                </div>
                Understanding N-P-K and Micronutrients
            </h4>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h5 className="font-medium text-gray-800 mb-3">The Big Three (N-P-K)</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h6 className="font-medium text-green-700">Nitrogen (N)</h6>
                      <p className="text-sm text-gray-600">For leaf growth and green color. High demand in leafy vegetables.</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <h6 className="font-medium text-amber-700">Phosphorus (P)</h6>
                      <p className="text-sm text-gray-600">For root development, flowering, and fruiting.</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h6 className="font-medium text-blue-700">Potassium (K)</h6>
                      <p className="text-sm text-gray-600">For overall plant health, disease resistance, and fruit quality.</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h5 className="font-medium text-gray-800 mb-3">Essential Micronutrients</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h6 className="font-medium text-gray-700">Calcium (Ca)</h6>
                      <p className="text-xs text-gray-600">Cell wall structure; prevents blossom-end rot</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h6 className="font-medium text-gray-700">Magnesium (Mg)</h6>
                      <p className="text-xs text-gray-600">Core component of chlorophyll; affects photosynthesis</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h6 className="font-medium text-gray-700">Iron (Fe)</h6>
                      <p className="text-xs text-gray-600">Chlorophyll production; often deficient in hydroponics</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h6 className="font-medium text-gray-700">Manganese (Mn)</h6>
                      <p className="text-xs text-gray-600">Enzyme activator; aids in photosynthesis</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h6 className="font-medium text-gray-700">Zinc (Zn)</h6>
                      <p className="text-xs text-gray-600">Growth hormone regulation; seed development</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h6 className="font-medium text-gray-700">Boron (B)</h6>
                      <p className="text-xs text-gray-600">Cell division; pollination; fruit development</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-300">
                    <p className="text-sm text-yellow-800">
                      <strong>Malaysian Tip:</strong> In our tropical climate with high humidity, calcium and magnesium are especially important. 
                      Consider supplementing these if using rainwater or RO water in your system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Measurement tools */}
          <div className="mb-10">
            <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-2">
                <Thermometer className="h-5 w-5 text-gray-600" />
              </div>
              Essential Measurement Tools
            </h4>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-500 font-bold">pH</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">pH Meter/Strips</h5>
                    <p className="text-xs text-gray-500">Measures acidity/alkalinity</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Aim for a pH between 5.5-6.5 for most plants. KL tap water tends to be slightly alkaline (pH 7-8), 
                  so you'll likely need pH down solution.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h6 className="text-sm font-medium text-blue-700 mb-1">Recommended Range:</h6>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li>Leafy greens: pH 5.5-6.5</li>
                    <li>Fruiting plants: pH 6.0-6.5</li>
                    <li>Herbs: pH 5.5-6.0</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-500 font-bold">EC</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">EC/TDS Meter</h5>
                    <p className="text-xs text-gray-500">Measures nutrient concentration</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Electrical Conductivity (EC) or Total Dissolved Solids (TDS) meters help you maintain the right 
                  nutrient strength. Critical in Malaysia's heat where water evaporates quickly.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h6 className="text-sm font-medium text-green-700 mb-1">Target EC Levels:</h6>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li>Seedlings: 0.8-1.0 mS/cm</li>
                    <li>Leafy greens: 1.0-1.4 mS/cm</li>
                    <li>Fruiting plants: 1.8-2.2 mS/cm</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-500 font-bold">°C</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Thermometer</h5>
                    <p className="text-xs text-gray-500">Monitors solution temperature</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Nutrient solution temperature affects oxygen levels and nutrient uptake. In KL's climate, 
                  keeping temperatures below 26°C is ideal but challenging.
                </p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h6 className="text-sm font-medium text-amber-700 mb-1">Temperature Management:</h6>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li>Ideal range: 18-24°C</li>
                    <li>Avoid exceeding: 28°C</li>
                    <li>Use shade cloth or insulation to reduce heat</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nutrient maintenance steps */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8">
            <div className="p-5 bg-green-50 border-b border-gray-200">
              <h4 className="text-lg font-medium text-green-700">6 Steps to Perfect Nutrient Management</h4>
              <p className="text-sm text-gray-600">A systematic approach for Malaysian hydroponic gardeners</p>
            </div>
            
            <div className="p-6">
              <ol className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-4 shadow-sm">1</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Assess your water quality</h5>
                    <p className="text-gray-600 text-sm">
                      Test your water source (tap, filtered, or rainwater) to understand its baseline pH and mineral content. 
                      KL tap water typically contains chlorine and has a pH around 7.5, which needs adjustment.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-4 shadow-sm">2</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Choose appropriate nutrients</h5>
                    <p className="text-gray-600 text-sm">
                      Select nutrients designed for hydroponics—not general garden fertilizers. For beginners, a two-part system 
                      (grow + bloom) or an all-purpose hydroponic nutrient is simplest. Look for formulations designed for tropical climates if available.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-4 shadow-sm">3</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Mix precisely and separately</h5>
                    <p className="text-gray-600 text-sm">
                      Always add nutrients to water (not water to nutrients). For multi-part systems, add each part separately 
                      with thorough mixing in between. Pre-dissolve powdered nutrients in a small amount of warm water first.
                    </p>
                    <div className="mt-2 p-3 bg-yellow-50 rounded-lg text-xs text-yellow-800 border-l-4 border-yellow-300">
                      <strong>Important:</strong> Never mix concentrated nutrient parts together before adding to water—this can cause nutrient lockout.
                    </div>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-4 shadow-sm">4</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Adjust pH after adding nutrients</h5>
                    <p className="text-gray-600 text-sm">
                      After mixing nutrients, check and adjust the pH using pH up/down solutions. Make small adjustments and 
                      wait 15-30 minutes before measuring again. pH affects nutrient availability dramatically.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-4 shadow-sm">5</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Monitor regularly in Malaysian climate</h5>
                    <p className="text-gray-600 text-sm">
                      In KL's heat, check your nutrient solution every 2-3 days. Water evaporates faster than nutrients, 
                      making the solution more concentrated over time. Top up with plain pH-adjusted water when levels drop.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-4 shadow-sm">6</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Change solution completely every 1-2 weeks</h5>
                    <p className="text-gray-600 text-sm">
                      Replace the entire nutrient solution regularly to prevent imbalances. In Malaysia's warm climate, 
                      do this every 7-10 days (rather than the 14 days often recommended in cooler climates).
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          {/* Malaysia-specific guidance */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-100 mb-6">
            <h4 className="text-lg font-medium text-green-700 mb-4">Special Considerations for Malaysian Hydroponics</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-red-500" />
                  Higher Ambient Temperatures
                </h5>
                <p className="text-sm text-gray-600">
                  Nutrient solutions warm up faster in Malaysia, reducing oxygen content and accelerating algae growth. 
                  Consider partially shading your reservoir or using reflective insulation. Add extra air stones for oxygenation.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Wind className="h-4 w-4 mr-2 text-blue-500" />
                  High Humidity Effects
                </h5>
                <p className="text-sm text-gray-600">
                  High humidity slows transpiration, reducing nutrient uptake. Use slightly lower nutrient concentrations 
                  (EC 0.2-0.4 lower than standard recommendations) to prevent buildup in the growing medium and leaves.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-amber-500" />
                  Shorter Shelf Life
                </h5>
                <p className="text-sm text-gray-600">
                  Nutrient concentrates degrade faster in tropical heat. Store in cool, dark places and use within 6 months 
                  of opening. Consider smaller bottles even if more expensive per liter.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Droplet className="h-4 w-4 mr-2 text-green-500" />
                  Seasonal Adaptations
                </h5>
                <p className="text-sm text-gray-600">
                  During rainy season, humidity is higher—reduce nutrient concentration slightly. 
                  During dry season, check solution levels daily as evaporation accelerates significantly.
                </p>
              </div>
            </div>
          </div>
          
          {/* Local nutrient shopping */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-lg font-medium text-green-600 mb-4">Finding Hydroponic Nutrients in Malaysia</h4>
            <p className="text-gray-700 mb-4">
              Hydroponic nutrients are increasingly available in Malaysia, both in physical stores and online.
              Here are some common options to consider:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">For Beginners</h5>
                <ul className="text-sm space-y-2">
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">A&B solutions (pre-mixed, two-part)</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">All-in-one hydroponic formulas</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Starter kits with nutrients included</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">For Intermediates</h5>
                <ul className="text-sm space-y-2">
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Grow/Bloom specific formulas</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">CalMag supplements</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">pH adjusters and buffer solutions</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">For Advanced</h5>
                <ul className="text-sm space-y-2">
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Individual nutrient salts for custom mixes</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Specialty supplements (silica, humic acid)</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Beneficial bacteria and enzyme products</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-300">
              <p className="text-sm text-blue-800">
                <strong>Shopping Tip:</strong> Popular hydroponic stores in KL include Hydro2Grow, CityFarm, and many 
                garden supply shops in SS2, Subang, and Kepong areas. Online platforms like Shopee and Lazada also have a wide selection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Step 7: Pest & Disease Management */}
    <div ref={stepRefs.step7} id="step7" className="mb-8">
      <div 
        className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
        onClick={() => toggleStep('step7')}
      >
        <h3 className="text-xl font-semibold">Step 7: Pest & Disease Management</h3>
        {openSteps.step7 ? <ChevronUp /> : <ChevronDown />}
      </div>
      
      {openSteps.step7 && (
        <div className="border border-gray-200 border-t-0 rounded-b-lg p-8 bg-white shadow-sm">
          <div className="mb-8">
            <div className="md:flex items-center gap-6 mb-6">
              <div className="md:w-3/3">
                <h4 className="text-xl font-medium text-green-600 mb-4">Protecting Your <span className="text-green-500 font-semibold">Hydroponic Garden</span></h4>
                <p className="text-gray-700 leading-relaxed">
                  While hydroponic systems generally have fewer pest problems than outdoor soil gardens, 
                  they're not immune—especially in Malaysia's tropical climate where insects thrive year-round.
                </p>
                <p className="text-gray-700 mt-3 leading-relaxed">
                  The enclosed, humid environment of an indoor hydroponic system can also create perfect conditions for fungal 
                  diseases if not properly managed. Let's look at prevention and treatment approaches that work well in Malaysia.
                </p>
              </div>
            </div>
          </div>
          
          {/* Three core principles */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-green-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <h5 className="text-lg font-medium text-green-700">Keep It Clean, Not Soaked</h5>
                </div>
              </div>
              <div className="p-5">
                <h6 className="font-medium text-gray-700 mb-3">Focus on Reservoir & System Hygiene:</h6>
                <p className="text-gray-600 mb-4 text-sm">
                  Regularly rinse and sanitize tanks, tubes, and net pots to avoid algae or bacterial growth. 
                  Clear debris from the system promptly.
                </p>
                
                <h6 className="font-medium text-gray-700 mb-3">Avoid Spraying Leaves Excessively:</h6>
                <p className="text-gray-600 text-sm">
                  Mist only when needed. Overly wet foliage in KL's humid indoor environment can invite fungal issues.
                </p>
                
                <div className="p-3 bg-green-50 rounded-lg mt-4 text-sm border-l-4 border-green-500">
                  <p className="text-green-700">
                    <strong>Pro tip:</strong> Use hydrogen peroxide (3%, food grade) at 2-3ml per liter of water to occasionally clean your system. 
                    It adds oxygen and helps control pathogens.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-green-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h5 className="text-lg font-medium text-green-700">Inspect and Act Early</h5>
                </div>
              </div>
              <div className="p-5">
                <h6 className="font-medium text-gray-700 mb-3">Check Weekly:</h6>
                <p className="text-gray-600 mb-4 text-sm">
                  Look under leaves and around the root zone for signs of pests (e.g., aphids, whiteflies, fungus gnats). 
                  Check for early warning signs like wilting, yellow specks, or fuzzy mold.
                </p>
                
                <h6 className="font-medium text-gray-700 mb-3">Root Health Matters:</h6>
                <p className="text-gray-600 text-sm">
                  Healthy roots should be white or cream-colored—watch out for browning or unpleasant odors.
                </p>
                
                <div className="p-3 bg-green-50 rounded-lg mt-4 text-sm border-l-4 border-green-500">
                  <p className="text-green-700">
                    <strong>Pro tip:</strong> Use yellow sticky traps near (but not touching) plants to monitor 
                    flying pest populations and catch them before they become a problem.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-green-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <h5 className="text-lg font-medium text-green-700">Opt for Gentle, Natural Solutions</h5>
                </div>
              </div>
              <div className="p-5">
                <h6 className="font-medium text-gray-700 mb-3">Use Mild Controls:</h6>
                <p className="text-gray-600 mb-4 text-sm">
                  Insecticidal soap, neem oil, or beneficial insects (like ladybugs) if pests become a problem.
                </p>
                
                <h6 className="font-medium text-gray-700 mb-3">Maintain pH & EC:</h6>
                <p className="text-gray-600 text-sm">
                  Stable nutrient levels discourage disease. Sudden pH swings can weaken plants.
                </p>
                
                <h6 className="font-medium text-gray-700 mb-3">Encourage Airflow:</h6>
                <p className="text-gray-600 text-sm">
                  A small fan helps reduce stagnant air, preventing mold or mildew in KL's humid climate.
                </p>
              </div>
            </div>
          </div>
          
          {/* Common pests in Malaysia section */}
          <div className="mb-10">
            <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
              <div className="p-2 bg-amber-100 rounded-full mr-2">
                <Leaf className="h-5 w-5 text-amber-600" />
              </div>
              Common Hydroponic Pests in Malaysia
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Pest</th>
                    <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Signs</th>
                    <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Malaysian Prevalence</th>
                    <th className="p-3 text-left text-gray-600 font-medium border-b border-gray-200">Natural Controls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b border-gray-200 font-medium">Aphids</td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Small green/black insects on new growth; sticky residue</p>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <div className="flex">
                        {[1, 2, 3, 4].map(i => (
                          <span key={i} className="text-amber-500">★</span>
                        ))}
                        <span className="text-gray-300">★</span>
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Neem oil spray, insecticidal soap, ladybugs</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 font-medium">Fungus Gnats</td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Small black flies around growing media; larvae in roots</p>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} className="text-amber-500">★</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Sticky traps, dry top layer of media, hydrogen peroxide flush</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 font-medium">Spider Mites</td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Fine webbing on leaves; tiny specks moving; yellowing leaves</p>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <div className="flex">
                        {[1, 2, 3].map(i => (
                          <span key={i} className="text-amber-500">★</span>
                        ))}
                        {[1, 2].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Neem oil, insecticidal soap, increasing humidity</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 font-medium">Whiteflies</td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Small white insects fly up when plants are disturbed</p>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <div className="flex">
                        {[1, 2, 3, 4].map(i => (
                          <span key={i} className="text-amber-500">★</span>
                        ))}
                        <span className="text-gray-300">★</span>
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Yellow sticky traps, neem oil spray, insecticidal soap</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 font-medium">Mealybugs</td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Cotton-like clusters on stems and leaf joints</p>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <div className="flex">
                        {[1, 2, 3].map(i => (
                          <span key={i} className="text-amber-500">★</span>
                        ))}
                        {[1, 2].map(i => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Alcohol-dipped cotton swab, neem oil, beneficial insects</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 font-medium">Thrips</td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Silvery streaks on leaves; tiny slender insects</p>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <div className="flex">
                        {[1, 2, 3, 4].map(i => (
                          <span key={i} className="text-amber-500">★</span>
                        ))}
                        <span className="text-gray-300">★</span>
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      <p className="text-sm">Blue sticky traps, neem oil, insecticidal soap</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Common diseases section */}
          <div className="mb-10">
            <h4 className="text-lg font-medium text-green-600 mb-5 flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-2">
                <Droplet className="h-5 w-5 text-blue-600" />
              </div>
              Common Hydroponic Diseases in Tropical Climates
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">1</span>
                  Root Rot (Pythium)
                </h5>
                <div className="space-y-3">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Symptoms:</h6>
                    <p className="text-sm text-gray-600">Brown, slimy roots; rotting smell; plant wilting despite wet media</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Causes in Malaysia:</h6>
                    <p className="text-sm text-gray-600">High water temperatures (above 26°C); poor oxygenation; high humidity</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Prevention & Treatment:</h6>
                    <ul className="ml-3 text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Add air stones for more oxygen</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Keep reservoir water cooler with insulation</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Use beneficial bacteria products</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">H₂O₂ treatment for infected systems</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-2 text-amber-600 text-xs font-bold">2</span>
                  Powdery Mildew
                </h5>
                <div className="space-y-3">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Symptoms:</h6>
                    <p className="text-sm text-gray-600">White powdery patches on leaves; spreads rapidly in humid conditions</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Causes in Malaysia:</h6>
                    <p className="text-sm text-gray-600">High humidity with poor air circulation; fluctuating temperatures</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Prevention & Treatment:</h6>
                    <ul className="ml-3 text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Maintain consistent airflow with fans</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Space plants properly for air movement</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Spray with diluted milk solution (40% milk, 60% water)</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Neem oil application (preventative)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600 text-xs font-bold">3</span>
                  Leaf Spot Diseases
                </h5>
                <div className="space-y-3">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Symptoms:</h6>
                    <p className="text-sm text-gray-600">Yellow/brown spots on leaves with yellow halos; leaves eventually die</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Causes in Malaysia:</h6>
                    <p className="text-sm text-gray-600">Water splashing on leaves; high humidity; poor air circulation</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Prevention & Treatment:</h6>
                    <ul className="ml-3 text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Avoid wetting leaves when watering</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Remove affected leaves immediately</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Apply copper-based fungicide for severe cases</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Increase spacing between plants</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-600 text-xs font-bold">4</span>
                  Algae Growth
                </h5>
                <div className="space-y-3">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Symptoms:</h6>
                    <p className="text-sm text-gray-600">Green slime in reservoir or on growing media; roots may become entangled</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Causes in Malaysia:</h6>
                    <p className="text-sm text-gray-600">Light exposure to nutrient solution; warm temperatures; stagnant water</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">Prevention & Treatment:</h6>
                    <ul className="ml-3 text-sm space-y-1">
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Cover reservoir and channels to block light</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Use opaque containers instead of clear ones</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Add food-grade hydrogen peroxide (3ml per liter)</span>
                      </li>
                      <li className="flex items-baseline">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Regular system cleaning and water changes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preventative measures section */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-100 mb-8">
            <h4 className="text-lg font-medium text-green-700 mb-4">Natural Preventative Measures for Malaysian Growers</h4>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 text-green-600 text-lg">🌿</span>
                  <h5 className="font-medium text-gray-800">Companion Planting</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Even in hydroponics, you can companion plant in separate containers to deter pests.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Basil repels flies and mosquitoes</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Mint deters ants and aphids</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Lemongrass repels mosquitoes</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 text-lg">💧</span>
                  <h5 className="font-medium text-gray-800">DIY Plant Spray</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Make a natural preventative spray that's effective in Malaysian climate.
                </p>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p className="font-medium text-gray-700 mb-1">Basic Recipe:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>1L water</li>
                    <li>2 tbsp neem oil</li>
                    <li>1 tsp liquid soap (emulsifier)</li>
                    <li>Optional: 5 drops lemongrass essential oil</li>
                  </ul>
                  <p className="mt-2 text-gray-700">Spray weekly as preventative</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 text-amber-600 text-lg">🧪</span>
                  <h5 className="font-medium text-gray-800">System Maintenance</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Regular maintenance specifically adapted for tropical conditions.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Change nutrient solution weekly (not bi-weekly)</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Clean system with vinegar solution monthly</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Monitor EC/pH twice weekly in KL's heat</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-600">Trim dead/yellowing leaves immediately</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Final box - emergency measures */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-medium text-red-600 mb-4 flex items-center">
              <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 text-red-600">
                <span className="font-bold">!</span>
              </span>
              Emergency Measures for Severe Infestations
            </h4>
            
            <p className="text-gray-700 mb-4">
              If preventative methods fail and you're facing a severe pest or disease outbreak, here are some last-resort options:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">Quarantine & Isolation</h5>
                <p className="text-sm text-gray-600">
                  Immediately move affected plants away from healthy ones. Set up a separate area at least 2 meters 
                  away with its own tools and equipment to prevent cross-contamination.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">System Reset</h5>
                <p className="text-sm text-gray-600">
                  For severe root or water-borne issues, completely empty and sanitize your system with a 10% bleach solution 
                  (rinse thoroughly afterward). Replace all growing media and start with new seedlings if possible.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">Commercial Products</h5>
                <p className="text-sm text-gray-600">
                  If organic methods fail, commercial products like potassium bicarbonate for fungal issues or pyrethrin-based 
                  insecticides may be necessary. Always follow label instructions precisely.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">Plant Sacrifice</h5>
                <p className="text-sm text-gray-600">
                  Sometimes removing the most severely affected plants completely is the best strategy to save the rest of your garden. 
                  Seal removed plants in plastic bags before disposal to prevent spreading pests.
                </p>
              </div>
            </div>
            
            <div className="mt-5 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-300">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> In Malaysia's high-density urban environments, be considerate of neighbors when using sprays 
                or treatments. Many pest control products can trigger allergies or affect pets. Always notify nearby residents if 
                using stronger treatments in shared spaces like apartment balconies.
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
      
      {/* Switch to soil guide */}
      <div className="mt-10 text-center p-8 bg-green-50 rounded-lg shadow-sm border border-gray-200">
        <p className="mb-4 text-gray-700">Looking for information about traditional soil gardening?</p>
        <a 
          href="/guides/potted-soil" 
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
        >
          Switch to Potted Soil Guide
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
                      {step === 'step1' && 'System Selection'}
                      {step === 'step2' && 'System Type'}
                      {step === 'step3' && 'Growing Media'}
                      {step === 'step4' && 'Planting Schedule'}
                      {step === 'step5' && 'Seeds & Seedlings'}
                      {step === 'step6' && 'Nutrient Management'}
                      {step === 'step7' && 'Pest & Disease'}
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

export default HydroponicGuide;