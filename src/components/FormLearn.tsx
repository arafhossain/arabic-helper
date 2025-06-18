import React, { useState } from "react";
import { LearnCard, VerbForm } from "../data/verbForms";

type IFormLearn = {
  formData: VerbForm;
  setMode: (mode: "default" | "learn" | "quiz" | "test") => void;
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
      setMode("default");
      setLearningIndex(0);
      setShowAnswer(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "0" }}>{formData.name}</h2>
      <p style={{ fontStyle: "italic" }}>{formData.meaning}</p>
      <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
        Card {learningIndex + 1} of {formData.learnSet.length}
      </p>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "2rem",
          width: "300px",
          height: "30px",
          fontSize: "1.5rem",
          cursor: "pointer",
          backgroundColor: "#f9f9f9",
          textAlign: "center",
          marginBottom: "1rem",
        }}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? currentCard.verb : currentCard.tense}
      </div>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          backgroundColor: "var(--secondary-color)",
          color: "var(--primary-color)",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Flip
      </button>

      <button
        onClick={handleNext}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "var(--primary-color)",
          color: "var(--font-color)",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {learningIndex < formData.learnSet.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}
