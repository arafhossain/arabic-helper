export interface VerbForm {
  id: string;
  formNumber: number;
  name: string;
  meaning: string;
  root: string;
  learnSet: {
    tense: "past" | "present" | "command";
    verb: string;
  }[];
  quizSet: {
    baseVerb: string;
    tenses: {
      past: string;
      present: string;
      command: string;
    };
  }[];
}

export const verbFormsData: VerbForm[] = [
  {
    id: "form-i",
    formNumber: 1,
    name: "Form I",
    meaning: "Base",
    root: "فعل",
    learnSet: [
      { tense: "past", verb: "فَعَلَ" },
      { tense: "present", verb: "يَفْعَلُ" },
      { tense: "command", verb: "اِفْعَلْ" },
    ],
    quizSet: [
      {
        baseVerb: "فعل",
        tenses: {
          past: "فَعَلَ",
          present: "يَفْعَلُ",
          command: "اِفْعَلْ",
        },
      },
      {
        baseVerb: "كتب",
        tenses: {
          past: "كَتَبَ",
          present: "يَكْتُبُ",
          command: "اكْتُبْ",
        },
      },
      {
        baseVerb: "درس",
        tenses: {
          past: "دَرَسَ",
          present: "يَدْرُسُ",
          command: "ادْرُسْ",
        },
      },
    ],
  },
];
