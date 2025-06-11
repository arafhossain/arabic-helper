export interface VerbForm {
  id: string;
  name: string;
  meaning: string;
  root: string;
  forms: {
    tense: "past" | "present" | "command";
    verb: string;
  }[];
}

export const verbFormsData: VerbForm[] = [
  {
    id: "form-i",
    name: "Form I",
    meaning: "Basic Active",
    root: "فعل",
    forms: [
      { tense: "past", verb: "فَعَلَ" },
      { tense: "present", verb: "يَفْعَلُ" },
      { tense: "command", verb: "اِفْعَلْ" },
    ],
  },
];
