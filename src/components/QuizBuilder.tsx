import React, { useState } from "react";
import QuizBuilderForm from "./QuizBuilderForm";
import CustomQuiz from "./CustomQuiz";

type Props = {};

export default function QuizBuilder({}: Props) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState<number>(10);

  if (quizStarted) {
    return (
      <CustomQuiz
        selectedForms={selectedForms}
        numQuestions={numQuestions}
        onQuit={() => setQuizStarted(false)}
      />
    );
  }

  return (
    <QuizBuilderForm
      selectedForms={selectedForms}
      setSelectedForms={setSelectedForms}
      numQuestions={numQuestions}
      setNumQuestions={setNumQuestions}
      onStart={() => setQuizStarted(true)}
    />
  );
}
