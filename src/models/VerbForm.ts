export interface VerbForm {
  id: string;
  formNumber: number;
  name: string;
  meaning: string;
  root: string;
  learnSet: LearnCard[];
  quizSet: QuizCard[];
}

export interface LearnCard {
  tense: "past" | "present" | "command";
  verb: string;
}

export interface QuizCard {
  baseVerb: string;
  tenses: {
    past: string;
    present: string;
    command: string;
  };
}
