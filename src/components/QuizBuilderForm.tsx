import { useEffect, useState } from "react";
import "./QuizBuilderForm.css";
import { verbFormsData } from "../data/verbForms";

const allForms = verbFormsData
  .map((formData) => {
    return {
      id: formData.id,
      name: formData.name,
      count: formData.learnSet.length,
    };
  })
  .filter((formData) => formData.id !== "form-i");

type QuizBuilderFormProps = {
  selectedForms: string[];
  setSelectedForms: React.Dispatch<React.SetStateAction<string[]>>;
  numQuestions: number;
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;
  onStart: () => void;
};

export default function QuizBuilderForm({
  selectedForms,
  setSelectedForms,
  numQuestions,
  setNumQuestions,
  onStart,
}: QuizBuilderFormProps) {
  const [open, setOpen] = useState(false);

  const toggleForm = (formId: string) => {
    setSelectedForms((prev) =>
      prev.includes(formId)
        ? prev.filter((f) => f !== formId)
        : [...prev, formId]
    );
  };

  useEffect(() => {
    const totalQuestions = selectedForms.reduce((sum, formId) => {
      const form = allForms.find((f) => f.id === formId);
      return sum + (form?.count || 0);
    }, 0);

    setNumQuestions(totalQuestions);
  }, [selectedForms]);

  const maxVisible = 2;

  const selectedFormNames = selectedForms.map(
    (option) => allForms.filter((formData) => formData.id === option)[0].name
  );

  let buttonLabel = "Select Forms";
  if (selectedFormNames.length === 1) {
    buttonLabel = selectedFormNames[0];
  } else if (selectedFormNames.length === 2) {
    buttonLabel = selectedFormNames.join(", ");
  } else if (selectedFormNames.length > 2) {
    buttonLabel = `${selectedFormNames.slice(0, maxVisible).join(", ")} +${
      selectedForms.length - maxVisible
    } more`;
  }

  const allFormIds = allForms.map((option) => option.id);

  const handleSelectAll = () => setSelectedForms(allFormIds);

  const handleDeselectAll = () => setSelectedForms([]);

  return (
    <div className="quiz-builder">
      <h2>Build Your Quiz</h2>

      <div className="dropdown-container">
        <button onClick={() => setOpen(!open)} className="dropdown-toggle">
          {buttonLabel}
        </button>

        {open && (
          <div className="dropdown-menu">
            <div className="dropdown-controls">
              <button onClick={handleSelectAll}>Select All</button>
              <button onClick={handleDeselectAll}>Deselect All</button>
            </div>
            {allForms.map((form) => (
              <label key={form.id}>
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
          Total Questions: <strong>{numQuestions}</strong>
        </p>
        <button
          className="start-button"
          disabled={selectedForms.length === 0}
          onClick={() => {
            onStart();
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
