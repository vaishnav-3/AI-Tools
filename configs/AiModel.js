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

  export const generateNotesAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTMLK , Head, Body, title tag), The chapters: \n"topics": [\n        "What is Object-Oriented Programming?",\n        "Principles of OOP: Encapsulation, Inheritance, Polymorphism, Abstraction",\n        "Benefits of OOP",\n        "Comparison with Procedural Programming",\n        "Classes and Objects: Basic Concepts"\n      ]',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "```html\n<h1>What is Object-Oriented Programming?</h1>\n<p>This chapter introduces the fundamental concept of Object-Oriented Programming (OOP).  It will cover:</p>\n<ul>\n  <li>Definition of OOP and its paradigm shift from procedural programming.</li>\n  <li>Key characteristics of OOP: objects, classes, and their relationships.</li>\n  <li>Real-world analogies to illustrate the concepts of objects and classes.</li>\n  <li>A brief history of OOP and its evolution.</li>\n  <li>Different programming languages that support OOP (e.g., Java, Python, C++, C#).</li>\n</ul>\n\n\n<h1>Principles of OOP: Encapsulation, Inheritance, Polymorphism, Abstraction</h1>\n<p>This chapter delves into the four fundamental principles of OOP:</p>\n<ul>\n  <li><strong>Encapsulation:</strong>\n    <ul>\n      <li>Definition and purpose of encapsulation.</li>\n      <li>Data hiding and access modifiers (public, private, protected).</li>\n      <li>Benefits of encapsulation: data integrity and code maintainability.</li>\n      <li>Implementation of encapsulation in various programming languages.</li>\n    </ul>\n  </li>\n  <li><strong>Inheritance:</strong>\n    <ul>\n      <li>Definition and purpose of inheritance.</li>\n      <li>Base classes and derived classes.</li>\n      <li>Types of inheritance (single, multiple, multilevel, hierarchical).</li>\n      <li>Code reusability and extensibility through inheritance.</li>\n      <li>Polymorphism in the context of inheritance.</li>\n    </ul>\n  </li>\n  <li><strong>Polymorphism:</strong>\n    <ul>\n      <li>Definition and purpose of polymorphism.</li>\n      <li>Compile-time polymorphism (method overloading).</li>\n      <li>Runtime polymorphism (method overriding).</li>\n      <li>Benefits of polymorphism: flexibility and extensibility.</li>\n      <li>Examples of polymorphism in different scenarios.</li>\n    </ul>\n  </li>\n  <li><strong>Abstraction:</strong>\n    <ul>\n      <li>Definition and purpose of abstraction.</li>\n      <li>Hiding complex implementation details and showing only essential information.</li>\n      <li>Abstract classes and interfaces.</li>\n      <li>Benefits of abstraction: simplified code and improved maintainability.</li>\n      <li>Relationship between abstraction and encapsulation.</li>\n    </ul>\n  </li>\n</ul>\n\n\n<h1>Benefits of OOP</h1>\n<p>This chapter discusses the advantages of using OOP in software development:</p>\n<ul>\n  <li>Modularity and reusability of code.</li>\n  <li>Improved code organization and maintainability.</li>\n  <li>Enhanced flexibility and scalability.</li>\n  <li>Data security through encapsulation.</li>\n  <li>Reduced development time and cost.</li>\n  <li>Easier debugging and testing.</li>\n</ul>\n\n\n<h1>Comparison with Procedural Programming</h1>\n<p>This chapter compares and contrasts OOP with procedural programming:</p>\n<ul>\n  <li>Fundamental differences in approach and structure.</li>\n  <li>Advantages and disadvantages of each paradigm.</li>\n  <li>Suitable applications for each programming paradigm.</li>\n  <li>A side-by-side comparison of code examples to illustrate the differences.</li>\n</ul>\n\n\n<h1>Classes and Objects: Basic Concepts</h1>\n<p>This chapter explains the core concepts of classes and objects:</p>\n<ul>\n  <li>Definition of a class as a blueprint for creating objects.</li>\n  <li>Definition of an object as an instance of a class.</li>\n  <li>Class members: attributes (data) and methods (functions).</li>\n  <li>Constructors and destructors.</li>\n  <li>Creating and manipulating objects in code.</li>\n  <li>Object lifecycle and memory management.</li>\n</ul>\n```\n",
          },
        ],
      },
    ],
  });