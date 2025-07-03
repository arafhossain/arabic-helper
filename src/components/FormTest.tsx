import React, { useEffect, useMemo, useRef, useState } from "react";
import { VerbForm, VerbTenseKey, VerbTenseLabels } from "../models/Verb";
import { ExerciseMode } from "./FormDetail";
import "./FormTest.css";
import {
  EXTRA_PATTERN_LETTERS,
  HARAKAT_TANWEEN,
  HARAKAT_VOWELS_WITH_SUKOON_AND_SHADDA,
  SHADDA,
  TANWEEN_MAP,
} from "../data/arabicCharacters";
import { QuestionCard } from "../models/Question";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

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

const NUMBER_OF_VERBS_USED = 2;

function removeTashkeel(word: string): string {
  return word.replace(/[َُِّْ]/g, "");
}

function getUniqueLetters(word: string): string[] {
  if (!word) return [];
  return Array.from(new Set(removeTashkeel(word).split("")));
}

export default function FormTest({ formData, setMode }: FormTestProps) {
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [width, height] = useWindowSize();
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const GENERATED_QUESTIONS = generateTest();

    setTestQuestions(GENERATED_QUESTIONS);
  }, [formData]);

  useEffect(() => {
    if (
      showResult &&
      testQuestions.length > 0 &&
      score === testQuestions.length
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [showResult]);

  const generateTest = (): TestQuestion[] => {
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

    const generated: TestQuestion[] = selectedquestionSet.flatMap((verbData) =>
      tenses
        .filter((tense) => verbData.tenses[tense] !== undefined)
        .map((tense) => {
          const correct = verbData.tenses[tense] as string;

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

    return generated;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    const prev = userInput;

    if (next.length < prev.length) {
      setUserInput(next);
      return;
    }

    const newChar = next[next.length - 1];
    const updated = applyCharInput(prev, newChar);
    setUserInput(updated);
  };

  function applyCharInput(prev: string, char: string): string {
    const space = " ";

    if (char === space) return prev + space;

    const isLetter = /^[\u0621-\u064A]$/.test(char);
    const isHarakah = HARAKAT_VOWELS_WITH_SUKOON_AND_SHADDA.includes(char);
    const lastChar = prev[prev.length - 1];

    // Reject non-Arabic, non-harakah, non-space
    if (
      !isLetter &&
      !isHarakah &&
      !HARAKAT_TANWEEN.includes(char) &&
      char !== SHADDA &&
      char !== space
    )
      return prev;

    if (isHarakah && char === lastChar && TANWEEN_MAP[char]) {
      return prev.slice(0, -1) + TANWEEN_MAP[char];
    }

    if (!isLetter && !/[\u0621-\u064A]/.test(lastChar)) {
      if (lastChar === SHADDA) return prev + char;
      if (lastChar === char) return prev + char;
      return prev;
    }

    return prev + char;
  }

  function normalizeInput(input: string, tense: VerbTenseKey): string {
    const trimmed = input.trim();

    if (["verbalNoun", "doerPattern", "receiverPattern"].includes(tense)) {
      let normalized = trimmed;

      // If user input ends with ًا (fatḥatayn on seat alif), remove both
      if (trimmed.endsWith("ًا")) {
        normalized = normalized.replace(/ًا$/, "");
      } else {
        // Otherwise, just remove any remaining final tanwin (ً, ٌ, ٍ)
        normalized = normalized.replace(/[ًٌٍ]$/, "");
      }

      return normalized;
    }

    return trimmed;
  }

  const handleCharClick = (char: string) => {
    setUserInput((prev) => applyCharInput(prev, char));
  };

  const handleBackspace = () => {
    setUserInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserInput("");
  };

  function handleAnswerClick(questionData: TestQuestion) {
    const IS_CORRECT =
      normalizeInput(userInput, questionData.tense) ===
      normalizeInput(questionData.correctAnswer, questionData.tense);

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

  function retry() {
    const GENERATED_QUESTIONS = generateTest();

    setTestQuestions(GENERATED_QUESTIONS);

    setCurrentIndex(0);
    setUserInput("");
    setScore(0);
    setUserAnswers([]);
    setFeedback(null);
    setShowAnswer(false);
    setShowResult(false);
  }

  if (testQuestions.length === 0) {
    return <div>Loading Test...</div>;
  } else {
    const questionData = testQuestions[currentIndex];

    const tense = questionData?.tense;
    const correctAnswer = questionData?.correctAnswer;
    const letters = getUniqueLetters(questionData?.baseVerb);

    return (
      <div className="test-container">
        <Confetti
          numberOfPieces={150}
          width={width}
          height={height}
          recycle={false}
          run={showConfetti}
          initialVelocityY={5}
        />
        {showResult ? (
          <div>
            <h2>Test Complete!</h2>
            <p>
              You got {score} out of {testQuestions.length} correct.
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
          <div className="form-test-wrapper">
            {!showResult && (
              <button
                className="quit-button top-right test-mode"
                onClick={() => setMode("default")}
              >
                Quit
              </button>
            )}
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
                className="arabic-text form-test-input"
                type="text"
                value={userInput}
                onChange={(e) => {
                  handleChange(e);
                }}
                dir="rtl"
              />
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
              </div>
            )}

            {!showAnswer && (
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
                <div className="keyboard-row keyboard-row-letters">
                  {EXTRA_PATTERN_LETTERS.filter(
                    (patternLetter) => !letters.includes(patternLetter)
                  ).map((char) => (
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
                </div>
                <div className="keyboard-row keyboard-row-harakat">
                  {HARAKAT_TANWEEN.map((char) => (
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
            )}

            <div className="form-test-controls">
              {showAnswer && (
                <button
                  className="next-button"
                  onClick={() => {
                    handleNextQuestion();
                  }}
                >
                  Next
                </button>
              )}
              {!showAnswer && (
                <button
                  className="submit-button"
                  onClick={() => {
                    handleAnswerClick(questionData);
                  }}
                  disabled={userInput.trim() === ""}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
