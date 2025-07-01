import { Link } from "react-router-dom";
import BreadcrumbBar from "./BreadcrumbBar";
import { verbFormsData } from "../data/verbForms";

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

        <div style={{ marginTop: "2rem" }}>
          {verbFormsData.map((verbForm) => (
            <Link to={`/verb-forms/${verbForm.id}`}>
              <button style={{ margin: "0.5rem", padding: "1rem" }}>
                {verbForm.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default VerbForms;
