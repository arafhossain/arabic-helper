import React, { useEffect, useRef, useState } from "react";
import { VerbForm } from "../models/VerbForm";
import { ExerciseMode } from "./FormDetail";
import { QuizCard } from "../models/VerbForm";
import "./FormQuiz.css";

type FormQuizProps = {
  formData: VerbForm;
  setMode: (mode: ExerciseMode) => void;
};

function generateQuizChoices(correct: string): string[] {
  const distractors = generateTashkeelVariants(correct);
  const choices = [...distractors, correct];

  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
}

function generateTashkeelVariants(correct: string, numVariants = 3): string[] {
  const variants = new Set<string>();
  const harakat = ["َ", "ِ", "ُ", "ْ"]; // fatha, kasra, damma, sukoon

  let attempts = 0;
  const MAX_ATTEMPTS = 10 * numVariants;

  while (variants.size < numVariants && attempts < MAX_ATTEMPTS) {
    let chars = [...correct.split("")];
    console.log(chars);

    // Collect indexes of harakat
    const harakahIndexes = chars
      .map((char, idx) => (harakat.includes(char) ? idx : null))
      .filter((x): x is number => x !== null);

    if (harakahIndexes.length === 0) break;

    // Choose index of random harakat
    const randIndex =
      harakahIndexes[Math.floor(Math.random() * harakahIndexes.length)];
    const current = chars[randIndex];

    // Get a different harakah
    const newHarakah = harakat.filter((h) => h !== current)[
      Math.floor(Math.random() * 3)
    ];

    // Replace randomly chosen harakat with different harakat
    chars[randIndex] = newHarakah;
    const variant = chars.join("");

    // Check to ensure its not the same as correct answer, add to set
    if (variant !== correct) {
      variants.add(variant);
      attempts = 0;
    } else {
      attempts++;
    }
  }

  return Array.from(variants);
}

type QuizQuestion = {
  baseVerb: string;
  tense: string;
  correctAnswer: string;
  choices: string[];
};

type AnswerData = {
  baseVerb: string;
  tense: string;
  correct: string;
  userAnswer: string;
  isCorrect: boolean;
};

export default function FormQuiz({ formData, setMode }: FormQuizProps) {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tenses = ["past", "present", "command"] as const;

    const generated: QuizQuestion[] = formData.quizSet.flatMap((verbData) =>
      tenses.map((tense) => {
        const correct = verbData.tenses[tense];
        const choices = generateQuizChoices(correct);

        const QUIZ_QUESTION: QuizQuestion = {
          baseVerb: verbData.baseVerb,
          tense,
          correctAnswer: correct,
          choices,
        };

        return QUIZ_QUESTION;
      })
    );

    setQuizQuestions(generated);
  }, []);

  function handleAnswerClick(choice: string, correct: string) {
    setSelectedAnswer(choice);

    const IS_CORRECT = choice === correct;

    if (IS_CORRECT) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    const ANSWER_DATA: AnswerData = {
      baseVerb: quizQuestions[currentIndex].baseVerb,
      tense: quizQuestions[currentIndex].tense,
      correct: correct,
      userAnswer: choice,
      isCorrect: IS_CORRECT,
    };

    setUserAnswers((prev) => [...prev, ANSWER_DATA]);

    setShowNextButton(true);

    timeoutRef.current = setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  }

  function handleNextQuestion() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
      setShowNextButton(false);
    } else {
      setShowResult(true);
    }
  }

  if (quizQuestions.length === 0) {
    return <p>Loading quiz ...</p>;
  } else {
    const currentQuestionData: QuizQuestion = quizQuestions[currentIndex];

    return (
      <div className="quiz-container">
        <button
          className="quit-button top-right"
          onClick={() => setMode("default")}
        >
          Quit
        </button>
        {showResult ? (
          <div>
            <h2>Quiz Complete!</h2>
            <p>
              You got {score} out of {quizQuestions.length} correct.
            </p>
            <table className="result-table">
              <thead>
                <tr>
                  <th>Verb</th>
                  <th>Tense</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                  <th>✅</th>
                </tr>
              </thead>
              <tbody>
                {userAnswers.map((answerData, idx) => (
                  <tr key={idx}>
                    <td>
                      {" "}
                      <span className="arabic-text">{answerData.baseVerb}</span>
                    </td>
                    <td>{answerData.tense}</td>
                    <td>
                      <span
                        className={`arabic-text ${
                          !answerData.isCorrect ? "wrong" : ""
                        }`}
                      >
                        {answerData.userAnswer}
                      </span>
                    </td>
                    <td>
                      <span className="arabic-text">{answerData.correct}</span>
                    </td>
                    <td>{answerData.isCorrect ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2>
              {`What is the ${currentQuestionData.tense.toUpperCase()} form of "`}
              <span
                className="arabic-text"
                style={{ fontSize: "2rem", fontWeight: "normal" }}
              >
                {currentQuestionData.baseVerb}
              </span>
              "?
            </h2>

            <div className="options">
              {currentQuestionData.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    handleAnswerClick(choice, currentQuestionData.correctAnswer)
                  }
                  className={`${
                    selectedAnswer
                      ? choice === currentQuestionData.correctAnswer
                        ? "correct"
                        : choice === selectedAnswer
                        ? "wrong"
                        : ""
                      : ""
                  } arabic-text`}
                  disabled={!!selectedAnswer}
                >
                  {choice}
                </button>
              ))}
            </div>
            <div className="quiz-feedback-container">
              {feedback && (
                <p style={{ marginTop: "2rem" }}>
                  {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
                </p>
              )}
              {showNextButton && !showResult && (
                <button
                  onClick={() => {
                    handleNextQuestion();
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
