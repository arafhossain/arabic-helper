import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Arabic Helper</h1>
      <p>Strengthen your Arabic practice with tailored exercises.</p>

      <div style={{ marginTop: "2rem" }}>
        <Link to={"/verb-forms"}>
          <button
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Verb Forms
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
