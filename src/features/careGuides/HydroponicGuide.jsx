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
                
                {/* Placeholder for image */}
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
                      <span className="text-gray-400">Image: DWC System</span>
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
                      <span className="text-gray-400">Image: NFT System</span>
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
                      <span className="text-gray-400">Image: Wick System</span>
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
                      <span className="text-gray-400">Image: Coco Coir</span>
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
                      <span className="text-gray-400">Image: Rockwool</span>
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
                      <span className="text-gray-400">Image: Clay Pellets</span>
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
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-gray-400">📷</span>
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
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-gray-400">📷</span>
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
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-gray-400">📷</span>
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
      
      {/* Switch to soil guide */}
      <div className="mt-10 text-center p-8 bg-green-50 rounded-lg shadow-sm border border-gray-200">
        <p className="mb-4 text-gray-700">Looking for information about traditional soil gardening?</p>
        <a 
          href="/guides/potted-soil-plan" 
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