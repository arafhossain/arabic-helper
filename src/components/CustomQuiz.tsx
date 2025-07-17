import React, { useEffect, useRef, useState } from "react";
import { AnswerData, generateQuizChoices, QuizQuestion } from "./FormQuiz";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { VerbTenseKey, VerbTenseLabels } from "../models/Verb";
import { ExerciseMode } from "./FormDetail";
import { QuestionCard } from "../models/Question";
import { verbFormsData } from "../data/verbForms";

type CustomQuizProps = {
  selectedForms: string[];
  numQuestions: number;
  onQuit: () => void;
};

const NUMBER_OF_VERBS_USED = 1;

export default function CustomQuiz({
  selectedForms,
  numQuestions,
  onQuit,
}: CustomQuizProps) {
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
    console.log("Question: ", GENERATED_QUESTIONS);

    setQuizQuestions(GENERATED_QUESTIONS);
  }, []);

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

    const QUESTION_POOL = verbFormsData
      .filter(
        (verbFormData) =>
          verbFormData.id !== "form-i" &&
          selectedForms.includes(verbFormData.id)
      )
      .map((formData) =>
        getRandomSubset(
          formData.questionSet,
          NUMBER_OF_VERBS_USED,
          formData.name
        )
      )
      .flat();

    function getRandomSubset(
      arr: QuestionCard[],
      count: number,
      form: string
    ): QuestionCard[] {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count).map((question) => {
        return { ...question, form };
      });
    }

    function getSimilarChoices(
      verb: string,
      tense: VerbTenseKey,
      form: string,
      correct: string
    ): string[] {
      let CHOICES = verbFormsData
        .filter((formData) => formData.id !== "form-i" && formData.id !== form)
        .map((formData) => {
          const BASE_FORM = formData.learnSet.filter(
            (learnCard) => learnCard.tense === tense
          )[0];

          if (BASE_FORM) {
            const VERB = BASE_FORM.verb;
            const BROKEN_VERB = VERB.split("");

            const FIRST_ROOT_IDX = BROKEN_VERB.indexOf("ف");
            const SECOND_ROOT_IDX = BROKEN_VERB.indexOf("ع");
            const THIRD_ROOT_IDX = BROKEN_VERB.indexOf("ل");

            const [FIRST_VERB_ROOT, SECOND_VERB_ROOT, THIRD_VERB_ROOT] =
              verb.split("");

            BROKEN_VERB[FIRST_ROOT_IDX] = FIRST_VERB_ROOT;
            BROKEN_VERB[SECOND_ROOT_IDX] = SECOND_VERB_ROOT;
            BROKEN_VERB[THIRD_ROOT_IDX] = THIRD_VERB_ROOT;

            return BROKEN_VERB.join("");
          } else return "";
        });

      CHOICES = CHOICES.filter((verb) => verb !== "" && verb !== correct).slice(
        0,
        3
      );

      CHOICES.push(correct);

      for (let i = CHOICES.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [CHOICES[i], CHOICES[j]] = [CHOICES[j], CHOICES[i]];
      }

      return CHOICES;
    }

    const generated: QuizQuestion[] = QUESTION_POOL.flatMap((verbData) =>
      tenses
        .filter((tense) => verbData.tenses[tense] !== undefined)
        .map((tense, idx) => {
          const correct = verbData.tenses[tense] as string;

          const choices = getSimilarChoices(
            verbData.baseVerb,
            tense,
            verbData.form ?? "",
            correct
          );

          const QUIZ_QUESTION: QuizQuestion = {
            baseVerb: verbData.baseVerb,
            tense,
            correctAnswer: correct,
            choices,
            form: verbData.form ?? "",
          };

          return QUIZ_QUESTION;
        })
    );

    for (let i = generated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generated[i], generated[j]] = [generated[j], generated[i]];
    }

    console.log("Gen ques: ", generated);

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

    console.log("Current question data: ", currentQuestionData);

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
          <button className="quit-button top-right" onClick={() => onQuit()}>
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
                  onQuit();
                }}
              >
                Quit
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* <h1 style={{ marginBottom: "6px" }}>{formData.name}</h1> */}
            <span style={{ color: "gray", fontSize: "1.2rem" }}>
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
            <h2>
              {`What is the ${
                currentQuestionData.form
              } ${tenseLabel.toUpperCase()} form of `}
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
