import React from "react";
import { ModeType, VerbForm, VerbTenseLabels } from "../models/Verb";
import "./OverviewCard.css";

type IOverviewCardProps = {
  formData: VerbForm;
  setMode: (mode: "default" | "learn" | "quiz" | "test") => void;
};

export default function OverviewCard({
  formData,
  setMode,
}: IOverviewCardProps) {
  return (
    <div className="overview">
      <h2 className="title">{formData.name}</h2>
      <p className="meaning">{formData.meaning}</p>

      <div className="card-container">
        {formData.learnSet.map((form, idx) => (
          <div key={idx} className="card">
            <h4 className="title">{VerbTenseLabels[form.tense]}</h4>
            <p className="arabic-text verb">{form.verb}</p>
          </div>
        ))}
      </div>

      <div className="footer">
        {formData.disclaimer && (
          <p className="form-disclaimer">{formData.disclaimer}</p>
        )}
        {(["learn", "quiz", "test"] as ModeType[]).map((mode) => {
          const hiddenMode = formData.hideModes?.find((m) => m.type === mode);
          const isDisabled = !!hiddenMode;

          return (
            <button
              key={mode}
              className={`mode-button button ${isDisabled ? "disabled" : ""}`}
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
