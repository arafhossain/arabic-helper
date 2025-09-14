import React, { useEffect } from "react";
import "./FormReference.css";
import "./FormLearn.css";

import BreadcrumbBar from "./BreadcrumbBar";
import { verbFormsData } from "../data/verbForms";
import { VerbForm } from "../models/Verb";
import { useOutletContext } from "react-router-dom";
import { BreadcrumbContextType } from "./Layout";

export default function FormReference() {
  const { setBreadcrumbTrail } = useOutletContext<BreadcrumbContextType>();

  useEffect(() => {
    setBreadcrumbTrail([
      { label: "Home", path: "/" },
      { label: "Verb Forms", path: "/verb-forms" },
      { label: "Reference Chart", path: null },
    ]);
  }, []);

  function lookup(form: VerbForm, tense: string): string {
    const entry = form.learnSet.find((item) => item.tense === tense);
    return entry ? entry.verb : "—";
  }
  return (
    <div>
      <div className="reference-table-wrapper">
        <div className="reference-table-container">
          <table className="reference-table">
            <thead>
              <tr>
                <th>Form</th>
                <th>Meaning</th>
                <th>Past</th>
                <th>Present</th>
                <th>Command</th>
                <th>Verbal Noun</th>
                <th>Doer</th>
                <th>Receiver</th>
              </tr>
            </thead>
            <tbody>
              {verbFormsData
                .filter((form) => form.formNumber !== 1)
                .map((form) => (
                  <tr key={form.id}>
                    <td>{form.name}</td>
                    <td>{form.meaning}</td>
                    <td>{lookup(form, "past")}</td>
                    <td>{lookup(form, "present")}</td>
                    <td>{lookup(form, "command")}</td>
                    <td>{lookup(form, "verbalNoun")}</td>
                    <td>{lookup(form, "doerPattern")}</td>
                    <td>{lookup(form, "receiverPattern")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
