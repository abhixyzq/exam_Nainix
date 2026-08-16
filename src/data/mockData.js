export const PLATFORM_INFO = {
  name: "exam.nainix.me",
  tagline: "Class 10th & 12th Board Practice Platform 2026",
  description: "Official board practice tests with instant VVI solutions, Board Division rank prediction, and mock exams.",
  targetExamYear: 2026,
  examDaysLeft: 142,
  stats: {
    totalStudents: "1,25,000+",
    totalQuestions: "15,000+",
    passRate: "98.8%",
    avgRating: "4.9/5"
  },
  upiId: "nainix@upi",
  pricePerSubject: 50
};

export const BOARDS_DATA = [
  {
    id: "bseb",
    name: "Bihar Board (BSEB)",
    code: "BSEB PATNA",
    tagline: "Matric & Inter Annual Board Exam 2026",
    classes: ["10th", "12th"],
    students: "16.5 Lakh+",
    accentColor: "#0072f5",
    icon: "GraduationCap",
    popular: true,
    pattern: "50% MCQ Objective + 50% Subjective"
  },
  {
    id: "cbse",
    name: "CBSE Central Board",
    code: "CBSE NEW DELHI",
    tagline: "All India Secondary School Examination 2026",
    classes: ["10th", "12th"],
    students: "22 Lakh+",
    accentColor: "#0284c7",
    icon: "BookOpen",
    popular: true,
    pattern: "NCERT Competency & Case-Based MCQs"
  },
  {
    id: "upmsp",
    name: "UP Board (UPMSP)",
    code: "UPMSP PRAYAGRAJ",
    tagline: "High School & Intermediate Exam 2026",
    classes: ["10th", "12th"],
    students: "28 Lakh+",
    accentColor: "#2563eb",
    icon: "Award",
    popular: true,
    pattern: "OMR Sheet Objective + Written Exam"
  },
  {
    id: "icse",
    name: "ICSE / ISC Board",
    code: "CISCE",
    tagline: "Council for the Indian School Certificate Exams",
    classes: ["10th", "12th"],
    students: "3.5 Lakh+",
    accentColor: "#4f46e5",
    icon: "Shield",
    popular: false,
    pattern: "Conceptual Analytical & Application MCQs"
  },
  {
    id: "jee_neet",
    name: "JEE & NEET Foundation",
    code: "NTA MOCK",
    tagline: "National Level Competitive Entrance Prep",
    classes: ["10th", "12th"],
    students: "18 Lakh+",
    accentColor: "#059669",
    icon: "Zap",
    popular: true,
    pattern: "NTA Computer Based Test (CBT) Speed Mock"
  }
];

export const SUBJECTS_DATA = [
  // Class 10th Subjects
  {
    id: "c10_phy_sci",
    boardId: "bseb",
    classLevel: "10th",
    category: "Science",
    name: "Science (विज्ञान)",
    code: "SCI-100",
    questionsCount: 850,
    price: 50,
    isFree: true,
    progress: 60,
    iconName: "Zap",
    chapters: [
      {
        id: "ch_sci_1",
        title: "Light Reflection & Refraction (प्रकाश का परावर्तन तथा अपवर्तन)",
        questionsCount: 15,
        timeMins: 10,
        difficulty: "Medium",
        isVVI: true,
        questions: [
          {
            id: "q10_sci_1_1",
            question: "What is the focal length of a plane mirror?",
            options: ["Zero", "Infinite", "25 cm", "-25 cm"],
            correctIndex: 1,
            explanation: "Since the radius of curvature of a plane mirror is infinite, its focal length (f = R/2) is also infinite.",
            chapter: "Light Reflection & Refraction",
            isVVI: true
          },
          {
            id: "q10_sci_1_2",
            question: "The speed of light in vacuum is approximately equal to:",
            options: ["3 × 10^8 m/s", "3 × 10^5 m/s", "3 × 10^8 km/s", "3 × 10^6 m/s"],
            correctIndex: 0,
            explanation: "The speed of light in vacuum or air is 3 × 10^8 meters per second.",
            chapter: "Light Reflection & Refraction",
            isVVI: true
          },
          {
            id: "q10_sci_1_3",
            question: "An image formed by a concave mirror is real, inverted and of the same size as the object. Where is the object placed?",
            options: ["At Focus (F)", "Between F and C", "At Centre of Curvature (C)", "Beyond C"],
            correctIndex: 2,
            explanation: "When an object is placed at the Centre of Curvature (C) of a concave mirror, its image is also formed at C, real, inverted and equal in size.",
            chapter: "Light Reflection & Refraction",
            isVVI: true
          },
          {
            id: "q10_sci_1_4",
            question: "SI unit of power of a lens is:",
            options: ["Meter", "Diopter", "Centimeter", "Watt"],
            correctIndex: 1,
            explanation: "Power of a lens P = 1/f (in meters). Its SI unit is Diopter (D).",
            chapter: "Light Reflection & Refraction",
            isVVI: true
          }
        ]
      },
      {
        id: "ch_sci_2",
        title: "Human Eye & Colorful World (मानव नेत्र तथा रंगबिरंगा संसार)",
        questionsCount: 12,
        timeMins: 8,
        difficulty: "Easy",
        isVVI: true,
        questions: [
          {
            id: "q10_sci_2_1",
            question: "On which part of the human eye is the image of an object formed?",
            options: ["Cornea", "Iris", "Pupil", "Retina"],
            correctIndex: 3,
            explanation: "In the human eye, a real and inverted image of an object is formed on the Retina.",
            chapter: "Human Eye & Colorful World",
            isVVI: true
          },
          {
            id: "q10_sci_2_2",
            question: "The least distance of distinct vision for a young adult with normal vision is about:",
            options: ["25 m", "2.5 cm", "25 cm", "2.5 m"],
            correctIndex: 2,
            explanation: "The minimum distance at which an object can be seen clearly without strain is 25 cm.",
            chapter: "Human Eye & Colorful World",
            isVVI: true
          },
          {
            id: "q10_sci_2_3",
            question: "Which color light scatters the most in the atmosphere?",
            options: ["Red", "Yellow", "Blue", "Green"],
            correctIndex: 2,
            explanation: "Blue light has a shorter wavelength and scatters more than other colors, giving the sky its blue appearance.",
            chapter: "Human Eye & Colorful World",
            isVVI: true
          }
        ]
      },
      {
        id: "ch_sci_3",
        title: "Electric Current & Circuits (विद्युत धारा तथा परिपथ)",
        questionsCount: 18,
        timeMins: 12,
        difficulty: "Hard",
        isVVI: true,
        questions: [
          {
            id: "q10_sci_3_1",
            question: "What is the SI unit of Electric Current?",
            options: ["Volt", "Ampere", "Ohm", "Coulomb"],
            correctIndex: 1,
            explanation: "The SI unit for measuring electric current is Ampere (A). 1 A = 1 C / 1 s.",
            chapter: "Electric Current & Circuits",
            isVVI: true
          },
          {
            id: "q10_sci_3_2",
            question: "Ohm's law gives the mathematical relation:",
            options: ["V = I / R", "V = I × R", "I = V × R", "R = V × I"],
            correctIndex: 1,
            explanation: "According to Ohm's Law at constant temperature, V = I × R.",
            chapter: "Electric Current & Circuits",
            isVVI: true
          },
          {
            id: "q10_sci_3_3",
            question: "What is the unit of Electrical Energy consumed in commercial billing?",
            options: ["Joule", "Kilowatt", "Kilowatt-Hour (kWh)", "Volt-Ampere"],
            correctIndex: 2,
            explanation: "Commercial unit of electrical energy is Kilowatt-hour (kWh), commonly known as 1 Unit = 3.6 × 10^6 Joules.",
            chapter: "Electric Current & Circuits",
            isVVI: true
          }
        ]
      },
      {
        id: "ch_sci_4",
        title: "Acids, Bases & Salts (अम्ल, क्षारक एवं लवण)",
        questionsCount: 14,
        timeMins: 10,
        difficulty: "Medium",
        isVVI: false,
        questions: [
          {
            id: "q10_sci_4_1",
            question: "What is the pH value of a neutral solution?",
            options: ["Less than 7", "Equal to 7", "Greater than 7", "Zero"],
            correctIndex: 1,
            explanation: "Neutral water or solutions have a pH value of exactly 7.",
            chapter: "Acids, Bases & Salts",
            isVVI: true
          },
          {
            id: "q10_sci_4_2",
            question: "Chemical formula of Plaster of Paris is:",
            options: ["CaSO4 · 2H2O", "CaSO4 · 1/2H2O", "CuSO4 · 5H2O", "Na2CO3 · 10H2O"],
            correctIndex: 1,
            explanation: "Plaster of Paris is Calcium Sulphate Hemihydrate: CaSO4 · 1/2H2O.",
            chapter: "Acids, Bases & Salts",
            isVVI: true
          }
        ]
      }
    ]
  },
  {
    id: "c10_math",
    boardId: "bseb",
    classLevel: "10th",
    category: "Mathematics",
    name: "Mathematics (गणित)",
    code: "MATH-100",
    questionsCount: 920,
    price: 50,
    isFree: false,
    progress: 35,
    iconName: "Calculator",
    chapters: [
      {
        id: "ch_math_1",
        title: "Real Numbers (वास्तविक संख्याएं)",
        questionsCount: 15,
        timeMins: 10,
        difficulty: "Easy",
        isVVI: true,
        questions: [
          {
            id: "q10_math_1_1",
            question: "Which of the following is a prime number?",
            options: ["15", "23", "12", "75"],
            correctIndex: 1,
            explanation: "23 is divisible only by 1 and itself (23), making it a prime number.",
            chapter: "Real Numbers",
            isVVI: true
          },
          {
            id: "q10_math_1_2",
            question: "HCF of two co-prime numbers is always equal to:",
            options: ["0", "1", "2", "Their Product"],
            correctIndex: 1,
            explanation: "Co-prime numbers share no common factors other than 1, so their HCF is 1.",
            chapter: "Real Numbers",
            isVVI: true
          }
        ]
      },
      {
        id: "ch_math_2",
        title: "Polynomials & Quadratic Equations (बहुपद तथा द्विघात समीकरण)",
        questionsCount: 20,
        timeMins: 15,
        difficulty: "Medium",
        isVVI: true,
        questions: [
          {
            id: "q10_math_2_1",
            question: "Sum of zeroes (α + β) of quadratic polynomial ax² + bx + c is:",
            options: ["-b / a", "c / a", "b / a", "-c / a"],
            correctIndex: 0,
            explanation: "The sum of zeroes α + β is equal to -b/a, and the product of zeroes α·β = c/a.",
            chapter: "Polynomials & Quadratic Equations",
            isVVI: true
          },
          {
            id: "q10_math_2_2",
            question: "If Discriminant D = b² - 4ac > 0, roots of quadratic equation are:",
            options: ["Real and Equal", "Real and Distinct", "Not Real", "Imaginary"],
            correctIndex: 1,
            explanation: "When D > 0, the quadratic equation has two distinct real roots.",
            chapter: "Polynomials & Quadratic Equations",
            isVVI: true
          }
        ]
      },
      {
        id: "ch_math_3",
        title: "Trigonometry (त्रिकोणमिति)",
        questionsCount: 22,
        timeMins: 15,
        difficulty: "Hard",
        isVVI: true,
        questions: [
          {
            id: "q10_math_3_1",
            question: "sin (90° - θ) is equal to:",
            options: ["cos θ", "tan θ", "cosec θ", "sec θ"],
            correctIndex: 0,
            explanation: "According to trigonometric complementary identities: sin(90° - θ) = cos θ.",
            chapter: "Trigonometry",
            isVVI: true
          },
          {
            id: "q10_math_3_2",
            question: "Value of (sin² 30° + cos² 30°) is:",
            options: ["0", "1", "1/2", "2"],
            correctIndex: 1,
            explanation: "For any angle θ, sin² θ + cos² θ = 1.",
            chapter: "Trigonometry",
            isVVI: true
          }
        ]
      }
    ]
  },
  {
    id: "c10_soc",
    boardId: "bseb",
    classLevel: "10th",
    category: "Social Science",
    name: "Social Science (सामाजिक विज्ञान)",
    code: "SOC-100",
    questionsCount: 880,
    price: 50,
    isFree: false,
    progress: 20,
    iconName: "Globe",
    chapters: [
      {
        id: "ch_soc_1",
        title: "Nationalism in Europe & India (यूरोप और भारत में राष्ट्रवाद)",
        questionsCount: 16,
        timeMins: 10,
        difficulty: "Medium",
        isVVI: true,
        questions: [
          {
            id: "q10_soc_1_1",
            question: "Who founded the secret society 'Young Italy'?",
            options: ["Mazzini", "Cavour", "Garibaldi", "Bismarck"],
            correctIndex: 0,
            explanation: "Giuseppe Mazzini founded the secret society 'Young Italy' in 1831 for Italian unification.",
            chapter: "Nationalism in Europe & India",
            isVVI: true
          },
          {
            id: "q10_soc_1_2",
            question: "In which year was the 'Champaran Satyagraha' started in India?",
            options: ["1915", "1917", "1919", "1920"],
            correctIndex: 1,
            explanation: "Mahatma Gandhi launched his first satyagraha in India at Champaran, Bihar in 1917 against the Tinkathia system.",
            chapter: "Nationalism in Europe & India",
            isVVI: true
          }
        ]
      },
      {
        id: "ch_soc_2",
        title: "Resources & Agriculture (संसाधन एवं कृषि)",
        questionsCount: 14,
        timeMins: 10,
        difficulty: "Easy",
        isVVI: true,
        questions: [
          {
            id: "q10_soc_2_1",
            question: "Bhakra Nangal project is constructed on which river?",
            options: ["Narmada", "Sutlej", "Ganga", "Krishna"],
            correctIndex: 1,
            explanation: "The Bhakra Nangal multipurpose dam project is built across the Sutlej River.",
            chapter: "Resources & Agriculture",
            isVVI: true
          }
        ]
      }
    ]
  },
  {
    id: "c10_eng",
    boardId: "bseb",
    classLevel: "10th",
    category: "Language",
    name: "English (Panorama)",
    code: "ENG-100",
    questionsCount: 700,
    price: 50,
    isFree: true,
    progress: 45,
    iconName: "Languages",
    chapters: [
      {
        id: "ch_eng_1",
        title: "Prose & Literature (Panorama Part 2)",
        questionsCount: 15,
        timeMins: 10,
        difficulty: "Easy",
        isVVI: true,
        questions: [
          {
            id: "q10_eng_1_1",
            question: "Who wrote 'The Pace for Living'?",
            options: ["R.C. Hutchinson", "Joan Lexau", "Mahadevi Verma", "Toni Morrison"],
            correctIndex: 0,
            explanation: "'The Pace for Living' is an essay by British novelist R.C. Hutchinson.",
            chapter: "Prose & Literature",
            isVVI: true
          }
        ]
      },
      {
        id: "ch_eng_2",
        title: "English Grammar & Usage",
        questionsCount: 20,
        timeMins: 12,
        difficulty: "Medium",
        isVVI: true,
        questions: [
          {
            id: "q10_eng_2_1",
            question: "Choose the correct Passive Voice: 'He writes a letter.'",
            options: ["A letter was written by him.", "A letter is written by him.", "A letter is being written by him.", "A letter has written by him."],
            correctIndex: 1,
            explanation: "Passive form of 'He writes a letter' (Simple Present) is 'A letter is written by him.'",
            chapter: "English Grammar & Usage",
            isVVI: true
          }
        ]
      }
    ]
  },

  // Class 12th Subjects
  {
    id: "c12_phy",
    boardId: "cbse",
    classLevel: "12th",
    category: "Science",
    name: "Physics (भौतिकी)",
    code: "PHY-120",
    questionsCount: 1200,
    price: 50,
    isFree: false,
    progress: 10,
    iconName: "Atom",
    chapters: [
      {
        id: "ch_phy12_1",
        title: "Electrostatics & Electric Charges",
        questionsCount: 25,
        timeMins: 18,
        difficulty: "Hard",
        isVVI: true,
        questions: [
          {
            id: "q_phy12_1_1",
            question: "The relative permittivity (εr) of vacuum is:",
            options: ["0", "1", "Infinite", "8.85 × 10^-12"],
            correctIndex: 1,
            explanation: "The relative permittivity εr for vacuum/air is exactly 1.",
            chapter: "Electrostatics & Electric Charges",
            isVVI: true
          },
          {
            id: "q_phy12_1_2",
            question: "SI unit of Electric Dipole Moment is:",
            options: ["Coulomb-Meter (C·m)", "Coulomb / Meter", "Volt-Meter", "Farad"],
            correctIndex: 0,
            explanation: "Electric Dipole Moment p = q × 2a. Its SI unit is Coulomb-meter (C·m).",
            chapter: "Electrostatics & Electric Charges",
            isVVI: true
          }
        ]
      }
    ]
  },
  {
    id: "c12_chem",
    boardId: "cbse",
    classLevel: "12th",
    category: "Science",
    name: "Chemistry (रसायन शास्त्र)",
    code: "CHEM-120",
    questionsCount: 1100,
    price: 50,
    isFree: false,
    progress: 0,
    iconName: "FlaskConical",
    chapters: [
      {
        id: "ch_chem12_1",
        title: "Solutions & Electrochemistry",
        questionsCount: 20,
        timeMins: 15,
        difficulty: "Medium",
        isVVI: true,
        questions: [
          {
            id: "q_chem12_1_1",
            question: "Which law states that mole fraction of gas dissolved in liquid is proportional to partial pressure?",
            options: ["Raoult's Law", "Henry's Law", "Dalton's Law", "Boyle's Law"],
            correctIndex: 1,
            explanation: "Henry's law states that solubility of a gas in a liquid is directly proportional to partial pressure of the gas.",
            chapter: "Solutions & Electrochemistry",
            isVVI: true
          }
        ]
      }
    ]
  }
];

export const MOCK_QUESTIONS = {
  c10_phy_sci: [
    {
      id: "q10_sci_1",
      question: "What is the SI unit of Electric Current?",
      options: ["Volt", "Ampere", "Ohm", "Coulomb"],
      correctIndex: 1,
      explanation: "The SI unit for measuring electric current is Ampere (A). 1 A = 1 C / 1 s.",
      chapter: "Electric Current",
      isVVI: true
    },
    {
      id: "q10_sci_2",
      question: "The focal length of a plane mirror is:",
      options: ["Zero", "Infinite", "25 cm", "-25 cm"],
      correctIndex: 1,
      explanation: "Since the radius of curvature of a plane mirror is infinite, its focal length (f = R/2) is also infinite.",
      chapter: "Light Reflection & Refraction",
      isVVI: true
    },
    {
      id: "q10_sci_3",
      question: "On which part of the human eye is the image of an object formed?",
      options: ["Cornea", "Iris", "Pupil", "Retina"],
      correctIndex: 3,
      explanation: "In the human eye, a real and inverted image of an object is formed on the Retina.",
      chapter: "Human Eye & Colorful World",
      isVVI: true
    },
    {
      id: "q10_sci_4",
      question: "What is the pH value of an acidic solution?",
      options: ["Equal to 7", "Less than 7", "Greater than 7", "Equal to 14"],
      correctIndex: 1,
      explanation: "Acidic solutions have a pH value less than 7. Neutral solutions have pH = 7, and basic solutions have pH > 7.",
      chapter: "Acids, Bases & Salts",
      isVVI: true
    },
    {
      id: "q10_sci_5",
      question: "In plants, Xylem is primarily responsible for:",
      options: ["Transport of Water", "Transport of Food", "Transport of Amino Acids", "Transport of Oxygen"],
      correctIndex: 0,
      explanation: "Xylem transports water and minerals from roots up to leaves, while Phloem transports food.",
      chapter: "Life Processes",
      isVVI: true
    },
    {
      id: "q10_sci_6",
      question: "What is the atomic number of Iron (Fe)?",
      options: ["23", "26", "25", "24"],
      correctIndex: 1,
      explanation: "The atomic number of Iron (Fe) is 26.",
      chapter: "Metals & Non-metals",
      isVVI: false
    }
  ],
  c10_math: [
    {
      id: "q10_math_1",
      question: "Which of the following is a prime number?",
      options: ["15", "23", "12", "75"],
      correctIndex: 1,
      explanation: "23 is divisible only by 1 and itself (23), making it a prime number.",
      chapter: "Real Numbers",
      isVVI: true
    },
    {
      id: "q10_math_2",
      question: "Sum of zeroes (α + β) of quadratic polynomial ax² + bx + c is:",
      options: ["-b / a", "c / a", "b / a", "-c / a"],
      correctIndex: 0,
      explanation: "The sum of zeroes α + β is equal to -b/a, and the product of zeroes α·β = c/a.",
      chapter: "Polynomials",
      isVVI: true
    },
    {
      id: "q10_math_3",
      question: "sin (90° - θ) is equal to:",
      options: ["cos θ", "tan θ", "cosec θ", "sec θ"],
      correctIndex: 0,
      explanation: "According to trigonometric complementary identities: sin(90° - θ) = cos θ.",
      chapter: "Introduction to Trigonometry",
      isVVI: true
    }
  ]
};

export const ARCHITECTURE_SPECS = {
  title: "Technical Architecture & Security Roadmap",
  version: "v2.5 Production Spec",
  databaseCollections: [
    {
      name: "boards",
      fields: "id, name, code, classes[], pattern, activeStatus"
    },
    {
      name: "subjects",
      fields: "id, boardId, classLevel, name, code, chapters[]"
    },
    {
      name: "chapters",
      fields: "id, subjectId, title, questionsCount, difficulty"
    },
    {
      name: "questions",
      fields: "id, chapterId, questionText, options[], correctIndex (SERVER SECURED)"
    }
  ],
  antiCheatingRules: [
    "Zero Client Expose: Never stream `correctIndex` payload to client before test submission.",
    "Cloud Functions Evaluation: Client posts payload `[{qId, selectedIdx}]` -> Server verifies against database.",
    "Timestamp Guard: Server side timing checks prevent speed-bot submissions."
  ]
};
