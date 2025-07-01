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

  const isNotLastCard = learningIndex < formData.learnSet.length - 1;

  const handleNext = () => {
    if (isNotLastCard) {
      setLearningIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setLearningIndex(0);
      setShowAnswer(false);
    }
  };

  return (
    <div className="form-learn-wrapper">
      {isNotLastCard && (
        <button
          className="quit-button top-right"
          onClick={() => setMode("default")}
        >
          Quit
        </button>
      )}
      <h2 className="form-learn-title">{formData.name}</h2>
      <p className="form-learn-meaning">{formData.meaning}</p>
      <p className="form-learn-count">
        Card {learningIndex + 1} of {formData.learnSet.length}
      </p>

      <div
        className={`${showAnswer ? "arabic-text" : ""} form-learn-card `}
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          fontSize: "2.3rem",
          minHeight: isNotLastCard ? "" : "160px",
          lineHeight: !isNotLastCard && showAnswer ? "5.7rem" : "",
        }}
      >
        {showAnswer ? currentCard.verb : VerbTenseLabels[currentCard.tense]}
      </div>

      <button
        className="form-learn-flip"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        Flip
      </button>

      {isNotLastCard ? (
        <button className="form-learn-next" onClick={handleNext}>
          Next
        </button>
      ) : (
        <div className="button-row">
          <button className="form-learn-next" onClick={handleNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="12px"
              height="12px"
              fill="white"
            >
              <path d="M 25 2 A 2.0002 2.0002 0 1 0 25 6 C 35.517124 6 44 14.482876 44 25 C 44 35.517124 35.517124 44 25 44 C 14.482876 44 6 35.517124 6 25 C 6 19.524201 8.3080175 14.608106 12 11.144531 L 12 15 A 2.0002 2.0002 0 1 0 16 15 L 16 4 L 5 4 A 2.0002 2.0002 0 1 0 5 8 L 9.5253906 8 C 4.9067015 12.20948 2 18.272325 2 25 C 2 37.678876 12.321124 48 25 48 C 37.678876 48 48 37.678876 48 25 C 48 12.321124 37.678876 2 25 2 z" />
            </svg>
          </button>
          <button
            className="button-ghost"
            onClick={() => {
              setMode("default");
            }}
          >
            Quit
          </button>
        </div>
      )}
    </div>
  );
}
