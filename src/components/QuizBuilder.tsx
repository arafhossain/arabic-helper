import React, { useEffect, useState } from "react";
import QuizBuilderForm from "./QuizBuilderForm";
import CustomQuiz from "./CustomQuiz";
import BreadcrumbBar from "./BreadcrumbBar";
import { useOutletContext } from "react-router-dom";
import { BreadcrumbContextType } from "./Layout";

type Props = {};

export default function QuizBuilder({}: Props) {
  const { setBreadcrumbTrail } = useOutletContext<BreadcrumbContextType>();

  useEffect(() => {
    setBreadcrumbTrail([
      { label: "Home", path: "/" },
      { label: "Verb Forms", path: "/verb-forms" },
      { label: "Custom Quiz", path: null },
    ]);
  }, []);

  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState<number>(10);

  if (quizStarted) {
    return (
      <div>
        <CustomQuiz
          selectedForms={selectedForms}
          numQuestions={numQuestions}
          onQuit={() => setQuizStarted(false)}
        />
      </div>
    );
  }

  return (
    <div>
      <QuizBuilderForm
        selectedForms={selectedForms}
        setSelectedForms={setSelectedForms}
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
        onStart={() => setQuizStarted(true)}
      />
    </div>
  );
}
