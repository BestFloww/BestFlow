/* istanbul ignore file */

// This defines a list of 9 sample intents for use in testing IntentLister and IntentDiagram.

const sampleIntents = [
    {
      question: "Sample Intent 0 (special search substring)",
      children: {
        "q1": 100,
      }
    },
    {
      question: "Sample Intent 1 (special search substring)",
      children: {
        "q1": 10,
        "q2": 90
      }
    }, 
    {
      question: "Sample Intent 2",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
    {
      question: "Sample Intent 3",
      children: {
        "q1": 10,
      }
    },
    {
      question: "Sample Intent 4",
      children: {
        "q1": 10,
        "q2": 90,
      }
    },
    {
      question: "Sample Intent 5",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
    {
      question: "Sample Intent 6",
      children: {
        "q1": 100
      }
    },
    {
      question: "Sample Intent 7",
      children: {
        "q1": 10,
        "q2": 90,
      }
    },
    {
      question: "Sample Intent 8",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
];

const fakeIntents = [
  {
    question: "What is something that Waluigi and Wario often say?",
    children: {
      "The brothers Waluigi and Wario have their catchphrase 'waaa'.": 100,
    }
  },
  {
    question: "Where should I go for a good time and great learning experience?",
    children: {
      "You should go to the University of Toronto.": 10,
      "You should go to the Technology Leadership Initiative.": 90,
    }
  }, 
  {
    question: "Hey BestFlow, what time is it?",
    children: {
      "It's time for you to get a watch, would you like to take a look at our product?": 10,
      "Showtime showtime what I'm John Laurens in the place to be.": 20,
      "Summertime! School's out, scream and shout.": 70,
    }
  },
  {
    question: "What is Tailwind used for?",
    children: {
      "Escaping from your enemies.": 15,
      "Making it easier to code CSS.": 85,
    }
  },
  {
    question: "What is your favorite cooking ingredient?",
    children: {
      "Basil.": 36,
      "Onion.": 23,
      "Asphalt.": 41,
      "Cookbooks.": 0,
    }
  },
  {
    question: "What would you like to buy today?",
    children: {
      "Cottage cheese.": 37,
      "A cottage.": 25,
      "Cheese.": 38,
    }
  },
  {
    question: "What is the name of the rat in Ratatouille?",
    children: {
      "Ratatouille.": 99,
      "Remy.": 1,
    }
  }
]

export default sampleIntents;