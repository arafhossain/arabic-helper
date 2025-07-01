import React, { useEffect, useRef, useState } from "react";
import { VerbForm, VerbTenseLabels, VerbTenseKey } from "../models/Verb";
import { ExerciseMode } from "./FormDetail";
import "./FormQuiz.css";
import {
  HARAKAT_VOWELS_WITH_SUKOON,
  HARAKAT_VOWELS,
} from "../data/arabicCharacters";
import { QuestionCard } from "../models/Question";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

type FormQuizProps = {
  formData: VerbForm;
  setMode: (mode: ExerciseMode) => void;
};

type QuizQuestion = {
  baseVerb: string;
  tense: VerbTenseKey;
  correctAnswer: string;
  choices: string[];
};

type AnswerData = {
  baseVerb: string;
  tense: VerbTenseKey;
  correct: string;
  userAnswer: string;
  isCorrect: boolean;
};

const NUMBER_OF_VERBS_USED = 2;

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
  const SHADDA = "ّ";

  let attempts = 0;
  const MAX_ATTEMPTS = 10 * numVariants;

  while (variants.size < numVariants && attempts < MAX_ATTEMPTS) {
    let chars = [...correct.split("")];

    // Collect indexes of harakat
    const harakahIndexes = chars
      .map((char, idx) =>
        HARAKAT_VOWELS_WITH_SUKOON.includes(char) ? idx : null
      )
      .filter((x): x is number => x !== null);

    if (harakahIndexes.length === 0) break;

    // Choose index of random harakat
    const randIndex =
      harakahIndexes[Math.floor(Math.random() * harakahIndexes.length)];
    const current = chars[randIndex];

    // Determine if the harakah follows a shadda
    const followsShadda = chars[randIndex - 1] === SHADDA;

    // Filter harakat accordingly
    const options = followsShadda
      ? HARAKAT_VOWELS.filter((h) => h !== current)
      : HARAKAT_VOWELS_WITH_SUKOON.filter((h) => h !== current);

    // If no valid replacement exists, skip
    if (options.length === 0) {
      attempts++;
      continue;
    }

    // Replace the harakah
    const newHarakah = options[Math.floor(Math.random() * options.length)];
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

export default function FormQuiz({ formData, setMode }: FormQuizProps) {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  // const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [width, height] = useWindowSize();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const GENERATED_QUESTIONS = generateQuiz();

    setQuizQuestions(GENERATED_QUESTIONS);
  }, [formData]);

  useEffect(() => {
    if (
      showResult &&
      quizQuestions.length > 0 &&
      score === quizQuestions.length
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [showResult]);

  const generateQuiz = (): QuizQuestion[] => {
    const tenses = Object.keys(VerbTenseLabels) as VerbTenseKey[];

    function getRandomSubset(
      arr: QuestionCard[],
      count: number
    ): QuestionCard[] {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }

    const selectedquestionSet = getRandomSubset(
      formData.questionSet,
      NUMBER_OF_VERBS_USED
    );

    const generated: QuizQuestion[] = selectedquestionSet.flatMap((verbData) =>
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

    for (let i = generated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generated[i], generated[j]] = [generated[j], generated[i]];
    }

    return generated;
  };

  function handleAnswerClick(choice: string, correct: string) {
    setSelectedAnswer(choice);

    const IS_CORRECT = choice === correct;

    if (IS_CORRECT) {
      setScore((prev) => prev + 1);
      // setFeedback("correct");
    } else {
      // setFeedback("wrong");
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
      // setFeedback(null);
      setShowNextButton(false);
    } else {
      setShowResult(true);
    }
  }

  function retry() {
    const GENERATED_QUESTIONS = generateQuiz();

    setQuizQuestions(GENERATED_QUESTIONS);

    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setUserAnswers([]);
    // setFeedback(null);
    setShowNextButton(false);
    setShowResult(false);
  }

  if (quizQuestions.length === 0) {
    return <p>Loading quiz ...</p>;
  } else {
    const currentQuestionData: QuizQuestion = quizQuestions[currentIndex];
    const tenseLabel = VerbTenseLabels[currentQuestionData.tense];

    return (
      <div className="quiz-container">
        <Confetti
          numberOfPieces={150}
          width={width}
          height={height}
          recycle={false}
          run={showConfetti}
          initialVelocityY={5}
        />
        {!showResult && (
          <button
            className="quit-button top-right"
            onClick={() => setMode("default")}
          >
            Quit
          </button>
        )}
        {showResult ? (
          <div>
            <h2>Quiz Complete!</h2>
            <p>
              You got {score} out of {quizQuestions.length} correct.
            </p>
            <table className="result-table">
              <thead>
                <tr>
                  <th></th>
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
                    <td>{idx + 1}.</td>
                    <td>
                      {" "}
                      <span className="arabic-text">{answerData.baseVerb}</span>
                    </td>
                    <td>{VerbTenseLabels[answerData.tense]}</td>
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
            <div className="button-row">
              <button
                className="form-learn-next"
                onClick={() => {
                  retry();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="12px"
                  height="12px"
                  fill="white"
                >
                  <path d="M 25 2 A 2.0002 2.0002 0 1 0 25 6 C 35.517124 6 44 14.482876 44 25 C 44 35.517124 35.517124 44 25 44 C 14.482876 44 6 35.517124 6 25 C 6 19.524201 8.3080175 14.608106 12 11.144531 L 12 15 A 2.0002 2.0002 0 1 0 16 15 L 16 4 L 5 4 A 2.0002 2.0002 0 1 0 5 8 L 9.5253906 8 C 4.9067015 12.20948 2 18.272325 2 25 C 2 37.678876 12.321124 48 25 48 C 37.678876 48 48 37.678876 48 25 C 48 12.321124 37.678876 2 25 2 z" />
                </svg>
              </button>
              <button
                className="button-ghost"
                onClick={() => {
                  setMode("default");
                }}
              >
                Quit
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 style={{ marginBottom: "6px" }}>{formData.name}</h1>
            <span style={{ color: "gray", fontSize: "1.2rem" }}>
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
            <h2>
              {`What is the ${tenseLabel.toUpperCase()} form of `}
              <span
                className="arabic-text"
                style={{ fontSize: "2rem", fontWeight: "normal" }}
              >
                {currentQuestionData.baseVerb}
              </span>
              ?
            </h2>

            <div className="options">
              {currentQuestionData.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    (e.target as HTMLButtonElement).blur();
                    handleAnswerClick(
                      choice,
                      currentQuestionData.correctAnswer
                    );
                  }}
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
