export default class testIntentGenerator{
    async generateOneIntentModel() {
        var intents = [];

        const modelIntent1 = { question: "Waluigi and Wario often say something-DOT- What is it?",
            children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'-DOT-": 1},
            total_children: 1,
            project_id: 1
        };
        intents.push(modelIntent1);

        return intents;
    };

    async generateOneAnalyzedIntent() {
        var intents = [];

        const analyzedIntent1 = { question: "Waluigi and Wario often say something. What is it?",
            children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'.": 1}
        };
        intents.push(analyzedIntent1);

        return intents;
    };

    async generateThreeIntentsModel() {
        var intents = [];

        const modelIntent1 = { question: "Waluigi and Wario often say something-DOT- What is it?",
            children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'-DOT-": 1},
            total_children: 1,
            project_id: 1
        };
        intents.push(modelIntent1);
        const modelIntent2 = { question: "Where should I go for a good time and great learning experience?",
            children: {"You should go to the University of Toronto-DOT-": 1,
                "You should go to the Technology Leadership Initiative-DOT-": 9},
            total_children: 10,
            project_id: 1
        };
        intents.push(modelIntent2);
        const modelIntent3 = { question: "Hey Bestflow, what time is it?",
            children: {"It's time for you to get a watch, would you like to take a look at our product?": 1,
                "Showtime showtime what I'm John Laurens in the place to be-DOT-": 2,
                "Summertime! School's out, scream and shout-DOT-": 7}
        };
        intents.push(modelIntent3);

        return intents;
    };

    async generateThreeAnalyzedIntents() {
        var intents = [];

        const analyzedIntent1 = { question: "Waluigi and Wario often say something. What is it?",
            children: {"The brothers Waluigi and Wario have their catchphrase 'waaa'.": 1}
        };
        intents.push(analyzedIntent1);
        const analyzedIntent2 = { question: "Where should I go for a good time and great learning experience?",
            children: {"You should go to the University of Toronto.": 1,
                "You should go to the Technology Leadership Initiative.": 9}
        };
        intents.push(analyzedIntent2);
        const analyzedIntent3 = { question: "Hey Bestflow, what time is it?",
            children: {"It's time for you to get a watch, would you like to take a look at our product?": 1,
                "Showtime showtime what I'm John Laurens in the place to be.": 2,
                "Summertime! School's out, scream and shout.": 7}
        };
        intents.push(analyzedIntent3);

        return intents;
    };

    async generateEmptyIntentModel() {
        var intents = [];
        
        const modelEmptyIntent = { question: "Why won't you answer me?",
            children: {},
            total_children: 0,
            project_id: 1
        };
        intents.push(modelEmptyIntent)

        return intents;
    };

    async generateAnalyzedEmptyIntent() {
        var intents = [];

        const analyzedEmptyIntent = { question: "Why won't you answer me?",
            children: {"No intents found": 0}
        };
        intents.push(analyzedEmptyIntent);

        return intents;
    }
}