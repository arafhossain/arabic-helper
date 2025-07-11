import React from "react";

type CustomQuizProps = {
  selectedForms: string[];
  numQuestions: number;
  onQuit: () => void;
};

export default function CustomQuiz({
  selectedForms,
  numQuestions,
}: CustomQuizProps) {
  console.log("Forms: ", selectedForms);
  console.log("Num ?s: ", numQuestions);

  return <div>CustomQuiz</div>;
}
