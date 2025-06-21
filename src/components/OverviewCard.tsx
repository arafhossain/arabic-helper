import React from "react";
import { ModeType, VerbForm } from "../models/VerbForm";

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
        {formData.disclaimer && (
          <p className="form-disclaimer">{formData.disclaimer}</p>
        )}
        {(["learn", "quiz", "test"] as ModeType[]).map((mode) => {
          const hiddenMode = formData.hideModes?.find((m) => m.type === mode);
          const isDisabled = !!hiddenMode;

          return (
            <button
              key={mode}
              style={{ margin: "0.5rem", padding: "1rem" }}
              className={`mode-button ${isDisabled ? "disabled" : ""}`}
              disabled={isDisabled}
              onClick={() => !isDisabled && setMode(mode)}
              data-tooltip={isDisabled ? hiddenMode?.tooltip : undefined}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
