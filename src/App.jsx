import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import HomePage from './components/layouts/HomePage';
import GreenMap from './features/map/GreenMap';
import GreenSpaceDetails from './features/greenSpaces/GreenSpaceDetails';
import PlantDetails from './features/plants/PlantDetails';
import NotFound from './components/layouts/NotFound';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<GreenMap />} />
        <Route path="/spaces/:id" element={<GreenSpaceDetails />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;