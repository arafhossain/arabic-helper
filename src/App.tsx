import React, { useState } from "react";
import VerbForms from "./components/VerbForms";

function App() {
  const [section, setSection] = useState("home");

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Arabic Helper</h1>
      <p>Strengthen your Arabic practice with tailored exercises.</p>

      {section === "home" && (
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => {
              setSection("verb-forms");
            }}
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Verb Forms
          </button>
        </div>
      )}

      {section === "verb-forms" && <VerbForms />}
    </div>
  );
}

export default App;
