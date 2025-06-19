import React from "react";
import { VerbForm } from "../models/VerbForm";

type IOverviewCardProps = {
  formData: VerbForm;
  setMode: (mode: "default" | "learn" | "quiz" | "test") => void;
};

export default function OverviewCard({
  formData,
  setMode,
}: IOverviewCardProps) {
  return (
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
            <h4 style={{ marginBottom: "0.3rem" }}>{form.tense}</h4>
            <p style={{ fontSize: "1.5rem" }} className="arabic-text">
              {form.verb}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button
          style={{ margin: "0.5rem", padding: "1rem" }}
          onClick={() => {
            setMode("learn");
          }}
        >
          Learn
        </button>
        <button
          style={{ margin: "0.5rem", padding: "1rem" }}
          onClick={() => {
            setMode("quiz");
          }}
        >
          Quiz
        </button>
        <button style={{ margin: "0.5rem", padding: "1rem" }}>Test</button>
      </div>
    </div>
  );
}
