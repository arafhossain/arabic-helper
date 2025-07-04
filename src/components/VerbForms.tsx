import { Link } from "react-router-dom";
import BreadcrumbBar from "./BreadcrumbBar";
import { verbFormsData } from "../data/verbForms";
import "./VerbForm.css";

const VerbForms = () => {
  return (
    <div>
      <BreadcrumbBar
        trail={[
          { label: "Home", path: "/" },
          { label: "Verb Forms", path: null },
        ]}
      />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Verb Forms</h2>
        <p>Select a verb form to begin:</p>

        <div className="form-button-container">
          {verbFormsData.map((verbForm) => (
            <Link to={`/verb-forms/${verbForm.id}`}>
              <button className="form-button">{verbForm.name}</button>
            </Link>
          ))}
          <Link to={`/verb-forms/quiz-builder`}>
            <button className="form-button">Quiz Builder</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default VerbForms;
