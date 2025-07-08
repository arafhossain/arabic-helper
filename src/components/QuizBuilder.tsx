import { useState } from "react";
import "./QuizBuilder.css";

const allForms = [
  { id: "form-i", name: "Form I", count: 6 },
  { id: "form-ii", name: "Form II", count: 6 },
  { id: "form-iii", name: "Form III", count: 6 },
  { id: "form-iv", name: "Form IV", count: 6 },
  { id: "form-v", name: "Form V", count: 6 },
  { id: "form-vi", name: "Form VI", count: 6 },
  { id: "form-vii", name: "Form VII", count: 6 },
  { id: "form-viii", name: "Form VIII", count: 6 },
  { id: "form-ix", name: "Form IX", count: 4 },
  { id: "form-x", name: "Form X", count: 6 },
];

export default function QuizBuilder() {
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleForm = (formId: string) => {
    setSelectedForms((prev) =>
      prev.includes(formId)
        ? prev.filter((f) => f !== formId)
        : [...prev, formId]
    );
  };

  const totalQuestions = selectedForms.reduce((sum, formId) => {
    const form = allForms.find((f) => f.id === formId);
    return sum + (form?.count || 0);
  }, 0);

  const selectedFormNames = selectedForms
    .map(
      (option) => allForms.filter((formData) => formData.id === option)[0].name
    )
    .join(", ");

  const buttonLabel =
    selectedFormNames.length > 0 ? selectedFormNames : "Select Forms";

  return (
    <div className="quiz-builder">
      <h2>Build Your Quiz</h2>

      <div className="dropdown-container">
        <button onClick={() => setOpen(!open)} className="dropdown-toggle">
          {buttonLabel}
        </button>

        {open && (
          <div className="dropdown-menu">
            {allForms.map((form) => (
              <label key={form.id} className="dropdown-option">
                <input
                  type="checkbox"
                  checked={selectedForms.includes(form.id)}
                  onChange={() => toggleForm(form.id)}
                />
                {form.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="quiz-summary">
        <p>
          Total Questions: <strong>{totalQuestions}</strong>
        </p>
        <button className="start-button" disabled={selectedForms.length === 0}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
