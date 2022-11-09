export default class testIntentGenerator {
    generateOneIntentModel() {
        return [
            { question: "Waluigi and Wario often say something-DOT- What is it?",
                children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'-DOT-": 1},
                total_children: 1,
                project_id: 1
            }
        ];
    };

    generateOneAnalyzedIntent() {
        return [
            { question: "Waluigi and Wario often say something. What is it?",
                children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'.": 1}
            }
        ];
    };

    generateThreeIntentsModel() {
        return [{ question: "Waluigi and Wario often say something-DOT- What is it?",
                children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'-DOT-": 1},
                total_children: 1,
                project_id: 1
            },
            { question: "Where should I go for a good time and great learning experience?",
                children: {"You should go to the University of Toronto-DOT-": 1, "You should go to the Technology Leadership Initiative-DOT-": 9},
                total_children: 10,
                project_id: 1
            },
            { question: "Hey Bestflow, what time is it?",
                children: {"It's time for you to get a watch, would you like to take a look at our product?": 1,
                    "Showtime showtime what I'm John Laurens in the place to be-DOT-": 2,
                    "Summertime! School's out, scream and shout-DOT-": 7},
                    total_children: 10,
                    project_id: 1
            }
        ];
    };

    generateThreeAnalyzedIntents() {
        return [
            { question: "Waluigi and Wario often say something. What is it?",
            children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'.": 1}
            },
            { question: "Where should I go for a good time and great learning experience?",
                children: {"You should go to the University of Toronto.": 1, "You should go to the Technology Leadership Initiative.": 9}
            },
            { question: "Hey Bestflow, what time is it?",
                children: {"It's time for you to get a watch, would you like to take a look at our product?": 1,
                    "Showtime showtime what I'm John Laurens in the place to be.": 2,
                    "Summertime! School's out, scream and shout.": 7}
            }
        ];
    };

    generateEmptyIntentModel() {
        return [
            { question: "Why won't you answer me?",
                children: {},
                total_children: 0,
                project_id: 1
            }
        ];
    };

    generateAnalyzedEmptyIntent() {
        return [
            { question: "Why won't you answer me?",
                children: {"No intents found.": 0}
            }
        ];
    }
}