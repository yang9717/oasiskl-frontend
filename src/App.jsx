import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import HomePage from './components/layouts/HomePage';
import GreenMap from './features/map/GreenMap';
import GreenSpaceDetails from './features/greenSpaces/GreenSpaceDetails';
import PlantDetails from './features/plants/PlantDetails';
import NotFound from './components/layouts/NotFound';
import PlantGallery from './features/plants/PlantGallery';
import PlantCareDetails from './features/plants/PlantCareDetails';
import SoilGuide from './features/careGuides/SoilGuide';
import HydroponicGuide from './features/careGuides/HydroponicGuide';
import CareMain from './features/careGuides/CareMain';
import PlantIdentifier from './features/plantAI/PlantIdentifier';
import GeneralCare from './features/careGuides/GeneralCare';
import PlantRecommender from './features/recommender/PlantRecommender';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<GreenMap />} />
        <Route path="/spaces/:id" element={<GreenSpaceDetails />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="/gallery" element={<PlantGallery />} />
        <Route path="/care-guides" element={<CareMain />} />
        <Route path="/care-guides/:id" element={<PlantCareDetails />} />
        <Route path="/guides" element={<GeneralCare />} >
          <Route path="potted-soil" element={<SoilGuide />} />
          <Route path="hydroponics" element={<HydroponicGuide />} />
        </Route>
        <Route path="/plant-identifier" element={<PlantIdentifier />} />
        <Route path="/plant-recommender" element={<PlantRecommender />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;