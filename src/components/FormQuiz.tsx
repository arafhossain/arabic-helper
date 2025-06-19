import React, { useState } from "react";
import { VerbForm } from "../models/VerbForm";
import { ExerciseMode } from "./FormDetail";
import { QuizCard } from "../models/VerbForm";

type FormQuizProps = {
  formData: VerbForm;
  setMode: (mode: ExerciseMode) => void;
};

function generateTashkeelVariants(correct: string, numVariants = 3): string[] {
  const variants = new Set<string>();
  const harakat = ["َ", "ِ", "ُ", "ْ"]; // fatha, kasra, damma, sukoon

  while (variants.size < numVariants) {
    let chars = [...correct.split("")];

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
    }
  }

  return Array.from(variants);
}

export default function FormQuiz({ formData }: FormQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const currentQuestion: QuizCard = formData.quizSet[currentIndex];

  const tenses = ["past", "present", "command"] as const;
  const currentTense = tenses[Math.floor(Math.random() * tenses.length)];

  const correctAnswer = currentQuestion.tenses[currentTense];

  function generateQuizChoices(correct: string): string[] {
    const distractors = generateTashkeelVariants(correct);
    const choices = [...distractors, correct];

    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    return choices;
  }
  const uniqueAnswers = generateQuizChoices(correctAnswer);

  function handleAnswerClick(choice: string) {
    setSelectedAnswer(choice);

    if (choice === correctAnswer) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (currentIndex + 1 < formData.quizSet.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  }

  return (
    <div>
      {showResult ? (
        <div>
          <h2>Quiz Complete!</h2>
          <p>
            You got {score} out of {formData.quizSet.length} correct.
          </p>
        </div>
      ) : (
        <div>
          <h2>{`What is the ${currentTense.toUpperCase()} form of "${
            currentQuestion.baseVerb
          }"?`}</h2>

          <div className="options">
            {uniqueAnswers.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerClick(choice)}
                className={
                  selectedAnswer
                    ? choice === correctAnswer
                      ? "correct"
                      : choice === selectedAnswer
                      ? "wrong"
                      : ""
                    : ""
                }
                disabled={!!selectedAnswer}
              >
                {choice}
              </button>
            ))}
          </div>

          {feedback && (
            <p>{feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}</p>
          )}
        </div>
      )}
    </div>
  );
}
