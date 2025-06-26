import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  QuestionCard,
  VerbForm,
  VerbTenseKey,
  VerbTenseLabels,
} from "../models/VerbForm";
import { ExerciseMode } from "./FormDetail";
import "./FormTest.css";
import { HARAKAT_VOWELS_WITH_SUKOON_AND_SHADDA } from "../data/arabicCharacters";

type FormTestProps = {
  formData: VerbForm;
  setMode: (mode: ExerciseMode) => void;
};

type TestQuestion = {
  baseVerb: string;
  tense: VerbTenseKey;
  correctAnswer: string;
};

type AnswerData = {
  baseVerb: string;
  tense: VerbTenseKey;
  correct: string;
  userAnswer: string;
  isCorrect: boolean;
};

function removeTashkeel(word: string): string {
  return word.replace(/[َُِّْ]/g, "");
}

function getUniqueLetters(word: string): string[] {
  if (!word) return [];
  return Array.from(new Set(removeTashkeel(word).split("")));
}

export default function FormTest({ formData }: FormTestProps) {
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(
    "correct"
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tenses = Object.keys(VerbTenseLabels) as VerbTenseKey[];

    function getRandomSubset(
      arr: QuestionCard[],
      count: number
    ): QuestionCard[] {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }

    const selectedTestSet = getRandomSubset(formData.testSet, 3);

    const generated: TestQuestion[] = selectedTestSet.flatMap((verbData) =>
      tenses.map((tense) => {
        const correct = verbData.tenses[tense];

        const TEST_QUESTION: TestQuestion = {
          baseVerb: verbData.baseVerb,
          tense,
          correctAnswer: correct,
        };

        return TEST_QUESTION;
      })
    );

    for (let i = generated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generated[i], generated[j]] = [generated[j], generated[i]];
    }

    setTestQuestions(generated);
  }, [formData]);

  const isInvalidInput = (char: string) => {
    // Double same vowel
    if (userInput.charAt(userInput.length - 1) === char) return true;

    return false;
  };

  const handleCharClick = (char: string) => {
    if (isInvalidInput(char)) return;

    setUserInput((prev) => prev + char);
  };

  const handleBackspace = () => {
    setUserInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserInput("");
  };

  function handleAnswerClick(questionData: TestQuestion) {
    const IS_CORRECT = userInput === questionData.correctAnswer;

    setShowAnswer(true);

    if (IS_CORRECT) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    const ANSWER_DATA: AnswerData = {
      baseVerb: questionData.baseVerb,
      tense: questionData.tense,
      correct: questionData.correctAnswer,
      userAnswer: userInput,
      isCorrect: IS_CORRECT,
    };

    setUserAnswers((prev) => [...prev, ANSWER_DATA]);

    timeoutRef.current = setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  }

  function handleNextQuestion() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (currentIndex + 1 < testQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
      setUserInput("");
      setFeedback(null);
    } else {
      setShowResult(true);
    }
  }

  if (testQuestions.length === 0) {
    return <div>Loading Test...</div>;
  } else {
    const questionData = testQuestions[currentIndex];

    const tense = questionData?.tense;
    const correctAnswer = questionData?.correctAnswer;
    const letters = getUniqueLetters(questionData?.baseVerb);

    return (
      <div className="form-test-wrapper">
        <div className="form-test-question">
          <h1 style={{ marginBottom: "6px" }}>{formData.name}</h1>
          <span style={{ color: "gray", fontSize: "1.2rem" }}>
            Question {currentIndex + 1} of {testQuestions.length}
          </span>
          <h2>
            What is the {VerbTenseLabels[tense].toUpperCase()} form of{" "}
            <span className="arabic-text">{questionData.baseVerb}</span>?
          </h2>
        </div>

        <div className="form-test-input-container">
          <input
            className="form-test-input arabic-text"
            type="text"
            value={userInput}
            onChange={(e) => {
              const char = e.target.value;
              if (isInvalidInput(char)) return;
              setUserInput(e.target.value);
            }}
            dir="rtl"
          />
        </div>

        <div className="form-test-keyboard">
          <div className="keyboard-row keyboard-row-letters">
            {letters.reverse().map((char) => (
              <button
                key={char}
                className="keyboard-button arabic-text"
                onClick={() => handleCharClick(char)}
              >
                {char}
              </button>
            ))}
          </div>
          <div className="keyboard-row keyboard-row-harakat">
            {HARAKAT_VOWELS_WITH_SUKOON_AND_SHADDA.map((char) => (
              <button
                key={char}
                className="keyboard-button harakah-button arabic-text"
                onClick={() => handleCharClick(char)}
              >
                {char}
              </button>
            ))}
            <button
              className="keyboard-button control-button"
              onClick={handleBackspace}
            >
              ⌫
            </button>
            <button
              className="keyboard-button control-button"
              onClick={handleClear}
            >
              ✖
            </button>
          </div>
        </div>

        <div className="form-test-controls">
          <button
            className="submit-button"
            onClick={() => {
              handleAnswerClick(questionData);
            }}
            disabled={userInput.trim() === ""}
          >
            Submit
          </button>
        </div>
        {showAnswer && (
          <div className="form-test-result">
            {feedback && (
              <div className={`form-test-feedback ${feedback}`}>
                <p className="feedback-message">
                  {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
                </p>
                {feedback === "wrong" && (
                  <p className="correct-answer">
                    Correct answer:{" "}
                    <span className="arabic-text">{correctAnswer}</span>
                  </p>
                )}
              </div>
            )}
            <button
              className="next-button"
              onClick={() => {
                handleNextQuestion();
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}
