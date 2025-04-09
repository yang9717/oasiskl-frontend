import React from 'react';
import { Link } from 'react-router-dom';
import { CircleArrowLeft, MapPin, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-red-50 p-6 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
          >
            <CircleArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <Link 
            to="/map" 
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Explore Green Spaces
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;