import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerbForms from "./components/VerbForms";
import Home from "./components/Home";
import FormDetail from "./components/FormDetail";
import "./theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verb-forms" element={<VerbForms />} />
        <Route path="/verb-forms/:formId" element={<FormDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
