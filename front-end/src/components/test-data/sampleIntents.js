/* istanbul ignore file */

// This defines a list of 9 sample intents for use in testing IntentLister and IntentDiagram.

const sampleIntents = [
    {
      question: "Sample Intent 0",
      children: {
        "q1": 100,
      }
    },
    {
      question: "Sample Intent 1",
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

export default sampleIntents;