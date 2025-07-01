import { VerbForm } from "../models/Verb";

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
      "This form lacks a consistent pattern. The examples provided are for reference only. Interactive learning is disabled for this form.",
    learnSet: [
      { tense: "past", verb: "فَعَلَ" },
      { tense: "present", verb: "يَفْعَلُ" },
      { tense: "command", verb: "اِفْعَلْ" },
      { tense: "verbalNoun", verb: "فِعْلٌ" },
      { tense: "doerPattern", verb: "فَاعِلٌ" },
      { tense: "receiverPattern", verb: "مَفْعُولٌ" },
    ],
    questionSet: [],
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
      { tense: "verbalNoun", verb: "تَفْعِيلٌ" },
      { tense: "doerPattern", verb: "مُفَعِّلٌ" },
      { tense: "receiverPattern", verb: "مُفَعَّلٌ" },
    ],
    questionSet: [
      {
        baseVerb: "فعل",
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
        baseVerb: "طهر",
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
        baseVerb: "علم",
        tenses: {
          past: "عَلَّمَ",
          present: "يُعَلِّمُ",
          command: "عَلِّمْ",
          verbalNoun: "تَعْلِيمٌ",
          doerPattern: "مُعَلِّمٌ",
          receiverPattern: "مُعَلَّمٌ",
        },
      },
      {
        baseVerb: "سير",
        tenses: {
          past: "سَيَّرَ",
          present: "يُسَيِّرُ",
          command: "سَيِّرْ",
          verbalNoun: "تَسْيِيرٌ",
          doerPattern: "مُسَيِّرٌ",
          receiverPattern: "مُسَيَّرٌ",
        },
      },
    ],
  },
  {
    id: "form-iii",
    formNumber: 3,
    name: "Form III",
    meaning: "Mutuality",
    root: "فَاعَلَ",
    hideModes: [],
    learnSet: [
      { tense: "past", verb: "فَاعَلَ" },
      { tense: "present", verb: "يُفَاعِلُ" },
      { tense: "command", verb: "فَاعِلْ" },
      { tense: "verbalNoun", verb: "مُفَاعَلَةٌ" },
      { tense: "doerPattern", verb: "مُفَاعِلٌ" },
      { tense: "receiverPattern", verb: "مُفَاعَلٌ" },
    ],
    questionSet: [
      {
        baseVerb: "قاتل",
        tenses: {
          past: "قَاتَلَ",
          present: "يُقَاتِلُ",
          command: "قَاتِلْ",
          verbalNoun: "مُقَاتَلَةٌ",
          doerPattern: "مُقَاتِلٌ",
          receiverPattern: "مُقَاتَلٌ",
        },
      },
      {
        baseVerb: "عاهد",
        tenses: {
          past: "عَاهَدَ",
          present: "يُعَاهِدُ",
          command: "عَاهِدْ",
          verbalNoun: "مُعَاهَدَةٌ",
          doerPattern: "مُعَاهِدٌ",
          receiverPattern: "مُعَاهَدٌ",
        },
      },
      {
        baseVerb: "شارك",
        tenses: {
          past: "شَارَكَ",
          present: "يُشَارِكُ",
          command: "شَارِكْ",
          verbalNoun: "مُشَارَكَةٌ",
          doerPattern: "مُشَارِكٌ",
          receiverPattern: "مُشَارَكٌ",
        },
      },
    ],
  },
  {
    id: "form-iv",
    formNumber: 4,
    name: "Form IV",
    meaning: "Causative",
    root: "أَفْعَلَ",
    hideModes: [],
    learnSet: [
      { tense: "past", verb: "أَفْعَلَ" },
      { tense: "present", verb: "يُفْعِلُ" },
      { tense: "command", verb: "أَفْعِلْ" },
      { tense: "verbalNoun", verb: "إِفْعَالٌ" },
      { tense: "doerPattern", verb: "مُفْعِلٌ" },
      { tense: "receiverPattern", verb: "مُفْعَلٌ" },
    ],
    questionSet: [
      {
        baseVerb: "خرج",
        tenses: {
          past: "أَخْرَجَ",
          present: "يُخْرِجُ",
          command: "أَخْرِجْ",
          verbalNoun: "إِخْرَاجٌ",
          doerPattern: "مُخْرِجٌ",
          receiverPattern: "مُخْرَجٌ",
        },
      },
      {
        baseVerb: "لبس",
        tenses: {
          past: "أَلْبَسَ",
          present: "يُلْبِسُ",
          command: "أَلْبِسْ",
          verbalNoun: "إِلْبَاسٌ",
          doerPattern: "مُلْبِسٌ",
          receiverPattern: "مُلْبَسٌ",
        },
      },
      {
        baseVerb: "شرك",
        tenses: {
          past: "أَشْرَكَ",
          present: "يُشْرِكُ",
          command: "أَشْرِكْ",
          verbalNoun: "إِشْرَاكٌ",
          doerPattern: "مُشْرِكٌ",
          receiverPattern: "مُشْرَكٌ",
        },
      },
    ],
  },
  {
    id: "form-v",
    formNumber: 5,
    name: "Form V",
    meaning: "Reflexive",
    root: "تَفَعَّلَ",
    hideModes: [],
    learnSet: [
      { tense: "past", verb: "تَفَعَّلَ" },
      { tense: "present", verb: "يَتَفَعَّلُ" },
      { tense: "command", verb: "تَفَعَّلْ" },
      { tense: "verbalNoun", verb: "تَفَعُّلٌ" },
      { tense: "doerPattern", verb: "مُتَفَعِّلٌ" },
      { tense: "receiverPattern", verb: "مُتَفَعَّلٌ" },
    ],
    questionSet: [
      {
        baseVerb: "علم",
        tenses: {
          past: "تَعَلَّمَ",
          present: "يَتَعَلَّمُ",
          command: "تَعَلَّمْ",
          verbalNoun: "تَعَلُّمٌ",
          doerPattern: "مُتَعَلِّمٌ",
          receiverPattern: "مُتَعَلَّمٌ",
        },
      },
      {
        baseVerb: "ذكر",
        tenses: {
          past: "تَذَكَّرَ",
          present: "يَتَذَكَّرُ",
          command: "تَذَكَّرْ",
          verbalNoun: "تَذَكُّرٌ",
          doerPattern: "مُتَذَكِّرٌ",
          receiverPattern: "مُتَذَكَّرٌ",
        },
      },
      {
        baseVerb: "نزل",
        tenses: {
          past: "تَنَزَّلَ",
          present: "يَتَنَزَّلُ",
          command: "تَنَزَّلْ",
          verbalNoun: "تَنَزُّلٌ",
          doerPattern: "مُتَنَزِّلٌ",
          receiverPattern: "مُتَنَزَّلٌ",
        },
      },
    ],
  },
];
