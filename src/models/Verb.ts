import { LearnCard } from "./Learn";
import { QuestionCard } from "./Question";

export type ModeType = "quiz" | "learn" | "test";

export type VerbTenseKey =
  | "past"
  | "present"
  | "command"
  | "verbalNoun"
  | "doerPattern"
  | "receiverPattern";

export type VerbTenseMap = {
  [K in VerbTenseKey]: string;
};

export const VerbTenseLabels: Record<VerbTenseKey, string> = {
  past: "Past",
  present: "Present",
  command: "Command",
  verbalNoun: "Verbal Noun",
  doerPattern: "Doer Pattern",
  receiverPattern: "Receiver Pattern",
};

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
  questionSet: QuestionCard[];
  hideModes?: HiddenMode[];
  disclaimer?: string;
}
