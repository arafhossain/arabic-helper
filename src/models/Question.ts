export interface QuestionCard {
  baseVerb: string;
  tenses: {
    past: string;
    present: string;
    command?: string;
    verbalNoun: string;
    doerPattern: string;
    receiverPattern?: string;
  };
}
