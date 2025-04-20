import React from 'react'
import { Link } from "react-router-dom";
import { CircleArrowLeft, Leaf, ThermometerSun, Heart, Sun, Sprout, ShoppingBag, ChevronsDown } from "lucide-react";

const CareMain = () => {

  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const videoId = "l2itHbx8lkY";

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-700 bg-opacity-80 bg-blend-overlay bg-cover bg-center" style={{ 
        backgroundImage: "url('/assets/careguides/herosection4.jpg')" 
      }}>
        <div className="container mx-auto py-20 px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              Create Your Own Green Corner
              <br />
              <span className="text-orange-500">Indoor</span>
              <span className="whitespace-nowrap"> - right plant, right guide</span>
            </h1>
            <p className="text-white text-lg max-w-2xl">
            Grow your own green space in Kuala Lumpur with easy guides and expert tips—from hydroponics to pot gardening, OasisKL’s got you covered.
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

      {/* Why Bring Nature Indoors Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="w-full h-117 flex gap-4">
                {/* First image */}
                <div className="flex-1 aspect-[9/16] rounded-lg shadow-md overflow-hidden">
                <img 
                    src="/assets/careguides/why2.jpg" 
                    alt="Indoor plants in living space" 
                    className="w-full h-full object-cover"
                />
                </div>

                {/* Second image */}
                <div className="flex-1 aspect-[9/16] rounded-lg shadow-md overflow-hidden">
                <img 
                    src="/assets/careguides/why1.jpg" 
                    alt="Indoor plant detail" 
                    className="w-full h-full object-cover"
                />
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                Why Bring Nature{" "}
                <span className="text-orange-500">Indoors In KL</span>?
              </h2>
              <p className="text-gray-700 mb-8">
                Kuala Lumpur's rapid urbanization has resulted in a devastating 88% green space loss in just a decade 
                (2007-2017), which contributes to urban heat island effects and declining well-being among residents.
              </p>
              
              <h3 className="text-3xl font-bold mb-6">
                Why Create Your Own Green Corner
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <Leaf className="w-4 h-4 text-green-600" />
                  </span>
                  <span className="text-gray-700 mt-1">Improved air quality</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <Heart className="w-4 h-4 text-green-600" />
                  </span>
                  <span className="text-gray-700 mt-1">Reduced stress and enhanced well-being</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <ThermometerSun className="w-4 h-4 text-green-600" />
                  </span>
                  <span className="text-gray-700 mt-1">Mitigation of the urban heat island effect</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <Sun className="w-4 h-4 text-green-600" />
                  </span>
                  <span className="text-gray-700 mt-1">Daily connection with nature</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <Sprout className="w-4 h-4 text-green-600" />
                  </span>
                  <span className="text-gray-700 mt-1">Promotion of sustainable living</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <ShoppingBag className="w-4 h-4 text-green-600" />
                  </span>
                  <span className="text-gray-700 mt-1">Potential for fresh, homegrown produce</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Planting Methods Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
        <h2 className="text-[2.5rem] font-bold text-center mb-16">
            <span className="flex items-center justify-center gap-2">
                Choose Your <span className="text-orange-500">Indoor Gardening</span> Style 🌱🌱🌱
            </span>
        </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Soil-Based Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-600 border-2 flex flex-col">
              <div className="p-8 flex-grow">
                <h3 className="text-3xl font-bold mb-3 text-center">
                  Grow with <span className="text-orange-500 ">Potted Soil</span>
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Traditional gardening adapted for KL's tropical climate — perfect for balconies and small yards.
                </p>
                
                <div className="flex items-center mb-8">
                  <div className="w-1/2">
                    <img 
                      src="/assets/careguides/potted.jpg" 
                      alt="Potted plant" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-1/2 pl-8">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">Versatile for herbs & flowers</span>
                      </li>
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">Locally available supplies</span>
                      </li>
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">Easy to maintain</span>
                      </li>
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">KL climate-compatible</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-600 p-6 text-center text-white">
                <h4 className="text-white text-xl font-medium mb-3">Get tips for your <span className="text-orange-200 font-semibold">soil-based garden</span></h4>
                <a href="/guides/potted-soil" className="inline-block bg-white text-green-600 px-6 py-2 rounded-full font-medium hover:bg-green-50 transition-colors shadow-md">
                  Learn How
                </a>
              </div>
            </div>
            {/* Hydroponics Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border border-green-600 border-2 flex flex-col">
              <div className="p-8 flex-grow">
                <h3 className="text-3xl font-bold mb-3 text-center">
                  Grow with <span className="text-orange-500">Hydroponics</span>
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Perfect for modern apartments in KL — hydroponics offers a clean, space-saving way to grow plants indoors.
                </p>
                
                <div className="flex items-center mb-8">
                  <div className="w-1/2">
                    <img 
                      src="/assets/careguides/hydroponic.jpg" 
                      alt="Hydroponic plant" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-1/2 pl-8">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">Space-efficient</span>
                      </li>
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">Water-saving</span>
                      </li>
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">Year-round growing</span>
                      </li>
                      <li className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-gray-700">Precise nutrient control</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-600 p-6 text-center text-white">
                <h4 className="text-white text-xl font-medium mb-3">Get tips for your <span className="text-orange-200 font-semibold">hydroponic garden</span></h4>
                <a href="/guides/hydroponics" className="inline-block bg-white text-green-600 px-6 py-2 rounded-full font-medium hover:bg-green-50 transition-colors shadow-md">
                  Learn How
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Gallery Section */}
      <section className="py-16 -mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-green-50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/5 p-4">
                <div className="rounded-xl overflow-hidden h-64 relative">
                  <img 
                    src="/assets/careguides/galleryguide.jpg" 
                    alt="Collection of indoor plants" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-3/5 p-8">
                <h2 className="text-4xl font-bold mb-3 text-gray-800">
                  Explore What Plants <br/>
                  <span className="text-green-600">We Can Help You Grow</span>
                </h2>
                
                <hr className="w-24 border-2 border-green-600 mb-4" />
                
                <p className="text-gray-600 mb-6">
                  Discover a curated selection of indoor-friendly plants perfect for your space in KL!
                </p>
                
                <a 
                  href="/gallery?suitability=Indoor%20friendly" 
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md"
                >
                  Explore Indoor Plant Gallery
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog And Articles Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-3">
              <span className="text-orange-500">Blog</span> & 
              <span className="text-orange-500"> Articles</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover more indoor gardening tips, success stories, and video guides tailored for Kuala Lumpur. 
              <br />
              Explore our Blog and Articles to start transforming your green space at home!
            </p>
          </div>
          
          {/* Featured YouTube Video */}
          <div className="mb-12 relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-96 w-full">
              {/* Use state to toggle between thumbnail and embedded video */}
              {videoPlaying ? (
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  {/* Video Thumbnail */}
                  <img 
                    src="/assets/careguides/thumbnail.png" 
                    alt="Indoor Gardening Basics" 
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  
                  {/* YouTube Play Button */}
                  <button 
                    className="absolute inset-0 flex items-center justify-center w-full h-full bg-transparent border-0"
                    onClick={() => setVideoPlaying(true)}
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer transform transition-transform hover:scale-110">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-4xl font-bold text-white mb-2">
                      5 Indoor Gardening Basics to Get Started
                    </h3>
                    <p className="text-white/90 text-lg mb-2">with Ekta Chaudhary</p>
                    <div className="flex items-center text-white/80 text-sm">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        7 min
                      </span>
                      <span className="mx-3">•</span>
                      <span>June 5, 2021</span>
                      <span className="mx-3">•</span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="red" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        YouTube
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Blog Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform hover:shadow-lg">
              <div className="h-52 overflow-hidden">
                <img 
                  src="/assets/careguides/article1.jpg" 
                  alt="Indoor Gardening Malaysia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-orange-600 text-sm font-medium mb-2">Tips</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Indoor Gardening Malaysia – Learning from Mistakes
                </h3>
                <div className="flex items-center text-gray-500 mb-3 text-sm">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Monica Tindall
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    August 7, 2021
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  Possibly the most frequent tip given to me about indoor gardening in Malaysia was about drainage. Poor drainage seems to be a common factor leading to the death of indoor plants...
                </p>
                <a href="https://www.theyumlist.net/2021/08/indoor-gardening-malaysia-learning-from-mistakes.html" className="inline-block text-center w-full py-2 px-4 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors text-sm font-medium">
                  Read More
                </a>
              </div>
            </div>
            
            {/* Blog Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform hover:shadow-lg">
              <div className="h-52 overflow-hidden">
                <img 
                  src="/assets/careguides/article2.jpg" 
                  alt="Monsoon gardening" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-orange-600 text-sm font-medium mb-2">Insight</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  How to take care of garden during monsoon season
                </h3>
                <div className="flex items-center text-gray-500 mb-3 text-sm">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    SERBAJADI
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    December 20, 2022
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  The monsoon season can be both a blessing and a curse for gardeners. On one hand, the abundance of rain can provide much-needed hydration for plants...
                </p>
                <a href="https://serbajadi.com.my/how-to-take-care-of-garden-during-monsoon-season" 
                    className="inline-block text-center w-full py-2 px-4 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors text-sm font-medium">
                  Read More
                </a>
              </div>
            </div>
            
            {/* Blog Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform hover:shadow-lg">
              <div className="h-52 overflow-hidden">
                <img 
                  src="/assets/careguides/article3.jpg" 
                  alt="Organic Fertilisers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-orange-600 text-sm font-medium mb-2">Insight</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Organic Fertilisers During Hot Weather to Prevent Worsening Soil Conditions
                </h3>
                <div className="flex items-center text-gray-500 mb-3 text-sm">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    SERBAJADI
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    June 1, 2023
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  As summer approaches and temperatures soar, gardeners and farmers face the challenge of maintaining soil health and preventing the deterioration of soil conditions...
                </p>
                <a href="https://serbajadi.com.my/organic-fertilisers-during-hot-weather-to-prevent-worsening-soil-conditions/" className="inline-block text-center w-full py-2 px-4 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors text-sm font-medium">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
    </div>
  )
}

export default CareMain