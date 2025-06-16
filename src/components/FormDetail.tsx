import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { verbFormsData } from "../data/verbForms";
import BreadcrumbBar from "./BreadcrumbBar";

type Props = {};

type State = {};

const FormDetail = () => {
  const { formId } = useParams<{ formId: string }>();
  const formData = verbFormsData.find((form) => form.id === formId);

  const [learningMode, setLearningMode] = useState(false);
  const [learningIndex, setLearningIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!formData) return <div>Form not found.</div>;

  const currentCard = formData.learnSet[learningIndex];

  const handleNext = () => {
    if (learningIndex < formData.learnSet.length - 1) {
      setLearningIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setLearningMode(false);
      setLearningIndex(0);
      setShowAnswer(false);
    }
  };

  return (
    <div>
      <BreadcrumbBar
        trail={[
          { label: "Home", path: "/" },
          { label: "Verb Forms", path: "/verb-forms" },
          { label: formData.name, path: null },
        ]}
      />
      {!learningMode && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2 style={{ marginBottom: "0" }}>{formData.name}</h2>
          <p style={{ fontStyle: "italic" }}>{formData.meaning}</p>

          <div style={{ marginTop: "2rem" }}>
            {formData.learnSet.map((form, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  margin: "0.5rem auto",
                  maxWidth: "300px",
                }}
              >
                <h4 style={{ marginBottom: "0.5rem" }}>{form.tense}</h4>
                <p style={{ fontSize: "1.5rem" }}>{form.verb}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button
              style={{ margin: "0.5rem", padding: "1rem" }}
              onClick={() => {
                setLearningMode(true);
              }}
            >
              Learn
            </button>
            <button style={{ margin: "0.5rem", padding: "1rem" }}>Quiz</button>
            <button style={{ margin: "0.5rem", padding: "1rem" }}>Test</button>
          </div>
        </div>
      )}
      {learningMode && (
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
      )}
    </div>
  );
};

export default FormDetail;
