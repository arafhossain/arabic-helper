import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerbForms from "./components/VerbForms";
import Home from "./components/Home";
import FormDetail from "./components/FormDetail";
import "./theme.css";
import QuizBuilder from "./components/QuizBuilder";
import FormReference from "./components/FormReference";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verb-forms" element={<VerbForms />} />
        <Route path="/verb-forms/:formId" element={<FormDetail />} />
        <Route path="/verb-forms/quiz-builder" element={<QuizBuilder />} />
        <Route path="/verb-forms/reference" element={<FormReference />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
