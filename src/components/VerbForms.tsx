import { Link, useOutletContext } from "react-router-dom";
import BreadcrumbBar from "./BreadcrumbBar";
import { verbFormsData } from "../data/verbForms";
import "./VerbForm.css";
import { BreadcrumbContextType } from "./Layout";
import { useEffect } from "react";

const VerbForms = () => {
  const { setBreadcrumbTrail } = useOutletContext<BreadcrumbContextType>();

  useEffect(() => {
    setBreadcrumbTrail([
      { label: "Home", path: "/" },
      { label: "Verb Forms", path: null },
    ]);
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Verb Forms</h2>
        <p>Select a verb forms to begin:</p>

        <div className="form-button-container">
          {verbFormsData.map((verbForm) => (
            <Link to={`/verb-forms/${verbForm.id}`} key={verbForm.id}>
              <button className="form-button">{verbForm.name}</button>
            </Link>
          ))}
        </div>

        <hr className="section-divider" />

        <div className="tools-section">
          <h3 className="tools-header">Tools</h3>
          <div className="form-button-container">
            <Link to={`/verb-forms/quiz-builder`}>
              <button className="form-button">Quiz Builder</button>
            </Link>
            <Link to={`/verb-forms/reference`}>
              <button className="form-button">Reference Chart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerbForms;
