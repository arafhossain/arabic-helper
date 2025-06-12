import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { verbFormsData } from "../data/verbForms";
import BreadcrumbBar from "./BreadcrumbBar";

type Props = {};

type State = {};

const FormDetail = () => {
  const { formId } = useParams<{ formId: string }>();
  const formData = verbFormsData.find((form) => form.id === formId);

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
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>{formData.name}</h2>
        <p style={{ fontStyle: "italic" }}>{formData.meaning}</p>

        <div style={{ marginTop: "2rem" }}>
          {formData.forms.map((form, idx) => (
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
          <button style={{ margin: "0.5rem", padding: "1rem" }}>Learn</button>
          <button style={{ margin: "0.5rem", padding: "1rem" }}>Quiz</button>
          <button style={{ margin: "0.5rem", padding: "1rem" }}>Test</button>
        </div>
      </div>
    </div>
  );
};

export default FormDetail;
