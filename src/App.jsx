import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import HomePage from './components/layouts/HomePage';
import GreenMap from './features/map/GreenMap';
import GreenSpaceDetails from './features/greenSpaces/GreenSpaceDetails';
import PlantDetails from './features/plants/PlantDetails';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<GreenMap />} />
        <Route path="/spaces/:id" element={<GreenSpaceDetails />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
      </Routes>
    </Layout>
  );
};

export default App;