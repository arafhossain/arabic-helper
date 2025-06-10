export interface VerbForm {
  root: string;
  forms: {
    tense: "past" | "present" | "command";
    verb: string;
  }[];
}

export const verbFormsData: VerbForm[] = [
  {
    root: "فعل",
    forms: [
      { tense: "past", verb: "فَعَلَ" },
      { tense: "present", verb: "يَفْعَلُ" },
      { tense: "command", verb: "اِفْعَلْ" },
    ],
  },
];
