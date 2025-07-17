import React, { useState } from "react";
import QuizBuilderForm from "./QuizBuilderForm";
import CustomQuiz from "./CustomQuiz";
import BreadcrumbBar from "./BreadcrumbBar";

type Props = {};

export default function QuizBuilder({}: Props) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState<number>(10);

  if (quizStarted) {
    return (
      <div>
        <BreadcrumbBar
          trail={[
            { label: "Home", path: "/" },
            { label: "Verb Forms", path: "/verb-forms" },
            { label: "Custom Quiz", path: null },
          ]}
        />
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
      <BreadcrumbBar
        trail={[
          { label: "Home", path: "/" },
          { label: "Verb Forms", path: "/verb-forms" },
          { label: "Custom Quiz", path: null },
        ]}
      />
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
