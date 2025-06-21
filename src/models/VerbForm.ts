export type ModeType = "quiz" | "learn" | "test";

type HiddenMode = {
  type: ModeType;
  tooltip: string;
};

export interface VerbForm {
  id: string;
  formNumber: number;
  name: string;
  meaning: string;
  root: string;
  learnSet: LearnCard[];
  quizSet: QuizCard[];
  hideModes?: HiddenMode[];
  disclaimer?: string;
}

export interface LearnCard {
  tense:
    | "past"
    | "present"
    | "command"
    | "verbal noun"
    | "doer pattern"
    | "receiver pattern";
  verb: string;
}

export interface QuizCard {
  baseVerb: string;
  tenses: {
    past: string;
    present: string;
    command: string;
    verbalNoun?: string;
    doerPattern?: string;
    receiverPattern?: string;
  };
}
