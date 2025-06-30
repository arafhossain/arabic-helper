import React, { useState } from "react";
import { VerbForm, VerbTenseLabels } from "../models/Verb";
import { ExerciseMode } from "./FormDetail";
import { LearnCard } from "../models/Learn";
import "./FormLearn.css";

type IFormLearn = {
  formData: VerbForm;
  setMode: (mode: ExerciseMode) => void;
};

export default function FormLearn({ formData, setMode }: IFormLearn) {
  const [learningIndex, setLearningIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!formData) return <div>Form not found.</div>;

  const currentCard: LearnCard = formData.learnSet[learningIndex];

  const handleNext = () => {
    if (learningIndex < formData.learnSet.length - 1) {
      setLearningIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setLearningIndex(0);
      setShowAnswer(false);
    }
  };

  return (
    <div className="form-learn-wrapper">
      <button
        className="quit-button top-right"
        onClick={() => setMode("default")}
      >
        Quit
      </button>
      <h2 className="form-learn-title">{formData.name}</h2>
      <p className="form-learn-meaning">{formData.meaning}</p>
      <p className="form-learn-count">
        Card {learningIndex + 1} of {formData.learnSet.length}
      </p>

      <div
        className={`form-learn-card ${showAnswer ? "arabic-text" : ""}`}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? currentCard.verb : VerbTenseLabels[currentCard.tense]}
      </div>

      <button
        className="form-learn-flip"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        Flip
      </button>

      <button className="form-learn-next" onClick={handleNext}>
        {learningIndex < formData.learnSet.length - 1 ? "Next" : "Retry"}
      </button>
    </div>
  );
}
