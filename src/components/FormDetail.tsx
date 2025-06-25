import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { verbFormsData } from "../data/verbForms";
import BreadcrumbBar from "./BreadcrumbBar";
import FormLearn from "./FormLearn";
import OverviewCard from "./OverviewCard";
import FormQuiz from "./FormQuiz";
import FormTest from "./FormTest";

export type ExerciseMode = "default" | "learn" | "quiz" | "test";

const FormDetail = () => {
  const { formId } = useParams<{ formId: string }>();
  const formData = verbFormsData.find((form) => form.id === formId);

  const [mode, setMode] = useState<ExerciseMode>("default");

  if (!formData) return <div>Form not found.</div>;

  return (
    <div>
      <BreadcrumbBar
        trail={[
          { label: "Home", path: "/" },
          { label: "Verb Forms", path: "/verb-forms" },
          { label: formData.name, path: null },
        ]}
      />
      {mode === "default" && (
        <OverviewCard formData={formData} setMode={setMode} />
      )}
      {mode === "learn" && <FormLearn formData={formData} setMode={setMode} />}
      {mode === "quiz" && <FormQuiz formData={formData} setMode={setMode} />}
      {mode === "test" && <FormTest formData={formData} setMode={setMode} />}
    </div>
  );
};

export default FormDetail;
