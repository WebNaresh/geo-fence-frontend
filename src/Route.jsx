import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import AddGeoMap from "./pages/AddGeoMap/AddGeoMap";
import CoordinateViewer from "./pages/CordinateViewer/Page";
import Home from "./pages/Home/Home";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<About />} />
      <Route exact path="/map/:name" element={<AddGeoMap />} />
      <Route
        exact
        path="/map/:name/:coordinateId"
        element={<CoordinateViewer />}
      />
    </Routes>
  );
};
export default App;
