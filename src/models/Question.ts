export interface QuestionCard {
  baseVerb: string;
  form?: string;
  tenses: {
    past: string;
    present: string;
    command?: string;
    verbalNoun: string;
    doerPattern: string;
    receiverPattern?: string;
  };
}
