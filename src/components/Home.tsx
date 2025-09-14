import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import BreadcrumbBar from "./BreadcrumbBar";
import { BreadcrumbContextType } from "./Layout";

function Home() {
  const { setBreadcrumbTrail } = useOutletContext<BreadcrumbContextType>();

  useEffect(() => {
    setBreadcrumbTrail([{ label: "Home", path: null }]);
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default Home;
