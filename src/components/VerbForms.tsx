import { Link } from "react-router-dom";

const VerbForms = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Verb Forms</h2>
      <p>Select a verb form to begin:</p>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/verb-forms/form-i">
          <button style={{ margin: "0.5rem", padding: "1rem" }}>Form 1</button>
        </Link>
        <Link to="/verb-forms/form-ii">
          <button style={{ margin: "0.5rem", padding: "1rem" }}>Form 2</button>
        </Link>
        {/* More forms as needed */}
      </div>
    </div>
  );
};
export default VerbForms;
