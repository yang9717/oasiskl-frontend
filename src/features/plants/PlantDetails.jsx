import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CircleArrowLeft, Droplet, Sun, Scissors, MapPin, Fence, SearchCheck } from 'lucide-react';

const PlantDetails = () => {
  const { id } = useParams();
  // Scroll to top when the component mounts
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // Mock data for the plant details
  const plant = {
    id: id,
    name: "Monstera Deliciosa",
    image: `/src/assets/plants_images/${id}.jpg`,
    description: "The Monstera deliciosa is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very popular as a houseplant.",
    sunlight: "Monstera deliciosa thrives in medium to bright indirect light. It can tolerate some direct morning sun but should be protected from harsh afternoon sunlight, which can scorch its leaves. In lower light conditions, the plant will grow more slowly and may develop smaller leaves with fewer characteristic splits and holes.",
    watering: "Allow the top 1-2 inches of soil to dry out between waterings. Water thoroughly until water flows from the drainage holes, then empty the saucer. Reduce watering in winter when growth slows. Overwatering can lead to root rot, while underwatering will cause the leaves to droop and potentially develop brown, crispy edges.",
    pruning: "Prune your Monstera to control its size and shape, as it can grow quite large indoors. Remove yellow or damaged leaves at the base of the stem. For larger plants, you can cut back leggy stems to encourage bushier growth. Always use clean, sharp scissors or pruning shears to make clean cuts."
  };

  // Sample greenspaces where this plant is commonly observed
  const observedGreenSpaces = [
    {
      id: 16,
      name: "KLCC Park",
      district: "Bukit Bintang",
      image: "/src/assets/space_images/16.jpg",
    },
    {
      id: 17,
      name: "Perdana Botanical Gardens",
      district: "Titiwangsa",
      image: "/src/assets/space_images/17.jpg",
    },
    {
      id: 18,
      name: "Taman Tugu",
      district: "Segambut",
      image: "/src/assets/space_images/18.jpg",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link to={-1} className="flex items-center text-green-600 hover:text-green-700 transition-colors">
          <CircleArrowLeft className="w-4 h-4 mr-2" />
          Back to Green Space
        </ Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plant Image Section */}
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-[400px] object-contain p-4"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=Plant+Image';
            }}
          />
        </div>
        
        {/* Plant Details Section */}
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">
              {plant.name}
            </h1>
          </div>
          
          {/* Description */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {plant.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Garden Tips Banner */}
      <div className="mt-10 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
            <Fence className="w-8 h-8 text-green-600" />
          </div>
          <div className="ml-5">
            <h2 className="text-2xl font-bold text-gray-800">Want to plant in your own garden?</h2>
            <p className="text-gray-700 mt-1">Follow these care tips below to help your {plant.name} thrive!</p>
          </div>
        </div>
      </div>
      
      {/* Care Guide Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sunlight Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full">
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Sun className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Sunlight</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {plant.sunlight}
            </p>
          </div>
        </div>
        
        {/* Watering Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full">
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Droplet className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Watering</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {plant.watering}
            </p>
          </div>
        </div>
        
        {/* Pruning Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full">
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Scissors className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Pruning</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {plant.pruning}
            </p>
          </div>
        </div>
      </div>

      {/* Where to Find This Plant Section */}
      {/* Green space list banner */}
      <div className="mt-12">
        <div className="mt-10 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
              <SearchCheck className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-5">
              <h2 className="text-2xl font-bold text-gray-800">Where to Find {plant.name} in Kuala Lumpur?</h2>
              <p className="text-gray-700 mt-1">These green spaces host this plant, visit them to see it up close!</p>
            </div>
          </div>
        </div>
        {/* Green Spaces List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {observedGreenSpaces.map((space) => (
            <Link 
              key={space.id} 
              to={`/green-spaces/${space.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 bg-gray-100">
                <img 
                  src={space.image}
                  alt={space.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Green+Space';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg">{space.name}</h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  {space.district}, Kuala Lumpur
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
    </div>
  );
};

export default PlantDetails;