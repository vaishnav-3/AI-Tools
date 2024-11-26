const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const courseOutlineAIModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate a detailed study material for Python for Exam and level of difficulty will be EASY with summery of\ncourse, List of Chapters along with summery for each chapter, Topic list in each chapter, All result in JSON\nformat",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "courseSummary": "This course provides a gentle introduction to Python programming, covering fundamental concepts suitable for beginners.  It focuses on practical application and building a solid foundation for further learning.  The emphasis is on understanding core principles rather than advanced techniques.",\n  "chapters": [\n    {\n      "chapterTitle": "Introduction to Python",\n      "chapterSummary": "This chapter introduces the Python programming language, its applications, and the basic setup required to start coding.  We\'ll cover installing Python and using a code editor or IDE.",\n      "topics": [\n        "What is Python?",\n        "Why use Python?",\n        "Installing Python",\n        "Choosing a code editor/IDE (e.g., VS Code, Thonny)",\n        "Running your first Python program",\n        "Understanding comments in Python"\n      ]\n    },\n    {\n      "chapterTitle": "Data Types and Variables",\n      "chapterSummary": "This chapter covers fundamental data types in Python, including integers, floats, strings, and booleans, and how to work with variables to store and manipulate data.",\n      "topics": [\n        "Integers and Floats",\n        "Strings and String Manipulation (basic)",\n        "Booleans and Boolean Operators",\n        "Variables and Assignment",\n        "Type Conversion",\n        "Basic Input/Output using `print()` and `input()`"\n      ]\n    },\n    {\n      "chapterTitle": "Operators and Expressions",\n      "chapterSummary": "This chapter explores different types of operators in Python, including arithmetic, comparison, logical, and assignment operators, and how they are used to build expressions.",\n      "topics": [\n        "Arithmetic Operators (+, -, *, /, //, %, **)",\n        "Comparison Operators (==, !=, >, <, >=, <=)",\n        "Logical Operators (and, or, not)",\n        "Assignment Operators (=, +=, -=, *=, /=)",\n        "Operator Precedence"\n      ]\n    },\n    {\n      "chapterTitle": "Control Flow (Conditional Statements)",\n      "chapterSummary": "This chapter introduces conditional statements—`if`, `elif`, and `else`—which allow you to control the flow of your program based on conditions.",\n      "topics": [\n        "The `if` statement",\n        "The `if-else` statement",\n        "The `if-elif-else` statement",\n        "Nested `if` statements",\n        "Boolean expressions and conditional logic"\n      ]\n    },\n    {\n      "chapterTitle": "Loops",\n      "chapterSummary": "This chapter covers loops—`for` and `while` loops—which enable you to repeat blocks of code efficiently.",\n      "topics": [\n        "The `for` loop (iterating over sequences)",\n        "The `while` loop (repeating until a condition is false)",\n        "Loop control statements (`break` and `continue`)",\n        "Nested loops"\n      ]\n    },\n    {\n      "chapterTitle": "Lists and Tuples",\n      "chapterSummary": "This chapter introduces lists and tuples, fundamental data structures for storing sequences of items.",\n      "topics": [\n        "Creating and accessing lists",\n        "List methods (append, insert, remove, etc.)",\n        "List slicing",\n        "Creating and accessing tuples",\n        "Difference between lists and tuples"\n      ]\n    },\n    {\n      "chapterTitle": "Basic Functions",\n      "chapterSummary": "This chapter introduces functions—reusable blocks of code that perform specific tasks, improving code organization and readability.",\n      "topics": [\n        "Defining functions",\n        "Function parameters and arguments",\n        "Return values",\n        "Function calls",\n        "Scope of variables"\n      ]\n    }\n  ]\n}\n```\n',
          },
        ],
      },
    ],
  });

  //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  //console.log(result.response.text());