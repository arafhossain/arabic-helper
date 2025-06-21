import { VerbForm } from "../models/VerbForm";

export const verbFormsData: VerbForm[] = [
  {
    id: "form-i",
    formNumber: 1,
    name: "Form I",
    meaning: "Base",
    root: "فعل",
    hideModes: [
      {
        type: "quiz",
        tooltip:
          "Form I verbs have no consistent conjugation pattern for quizzing.",
      },
      {
        type: "learn",
        tooltip:
          "Learning patterns not available for Form I – use examples instead.",
      },
      {
        type: "test",
        tooltip: "Testing is disabled for Form I due to irregular patterns.",
      },
    ],
    disclaimer:
      "This form lacks a consistent pattern. The examples provided (past, present, command) are for reference only. Interactive learning is disabled for this form.",
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
  {
    id: "form-ii",
    formNumber: 2,
    name: "Form II",
    meaning: "Causative",
    root: "فَعَّلَ",
    hideModes: [],
    learnSet: [
      { tense: "past", verb: "فَعَّلَ" },
      { tense: "present", verb: "يُفَعِّلُ" },
      { tense: "command", verb: "فَعِّلْ" },
      { tense: "verbal noun", verb: "تَفْعِيلٌ" },
      { tense: "doer pattern", verb: "مُفَعِّلٌ" },
      { tense: "receiver pattern", verb: "مُفَعَّلٌ" },
    ],
    quizSet: [
      {
        baseVerb: "فَعَّلَ",
        tenses: {
          past: "فَعَّلَ",
          present: "يُفَعِّلُ",
          command: "فَعِّلْ",
          verbalNoun: "تَفْعِيلٌ",
          doerPattern: "مُفَعِّلٌ",
          receiverPattern: "مُفَعَّلٌ",
        },
      },
      {
        baseVerb: "فَعَّلَ",
        tenses: {
          past: "فَعَّلَ",
          present: "يُفَعِّلُ",
          command: "فَعِّلْ",
          verbalNoun: "تَفْعِيلٌ",
          doerPattern: "مُفَعِّلٌ",
          receiverPattern: "مُفَعَّلٌ",
        },
      },
      {
        baseVerb: "طَهَّرَ",
        tenses: {
          past: "طَهَّرَ",
          present: "يُطَهِّرُ",
          command: "طَهِّرْ",
          verbalNoun: "تَطْهِيرٌ",
          doerPattern: "مُطَهِّرٌ",
          receiverPattern: "مُطَهَّرٌ",
        },
      },
      {
        baseVerb: "عَلَّمَ",
        tenses: {
          past: "عَلَّمَ",
          present: "يُعَلِّمُ",
          command: "عَلِّمْ",
          verbalNoun: "تَعْلِيمٌ",
          doerPattern: "مُعَلِّمٌ",
          receiverPattern: "مُعَلَّمٌ",
        },
      },
    ],
  },
];
