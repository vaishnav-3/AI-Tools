import { STUDY_TYPE_CONTENT_TABLE } from "/configs/schema";
import { db } from "/configs/db";
import { inngest } from "/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { chapter, courseId, type } = await req.json();

    if (!chapter || !courseId || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const PROMPT =
      type === "Flashcard"
        ? `Generate a ${type} on the topic: "${chapter}" in JSON format with front-back content, Maximum 15 entries.`
        : type === "Quiz"
        ? `Generate a Quiz on the topic: "${chapter}" with questions, options, and correct answers in JSON format (Maximum 10 entries).`
        : `
        Create **15 question-and-answer pairs** based on the following topics: 
        ${chapter}

        The Answer should be at least of 10 lines	

### **Output Requirements**
1. **Questions and Answers:**
   - Each question must be concise and directly address one of the topics above.
   - Each answer should be **detailed and explanatory**, providing:
     - A clear explanation of the concept.
     - Examples or scenarios illustrating the answer where applicable.
     - Practical tips or best practices.

2. **HTML Structure:**
   - Wrap all content in '<div>' elements styled with **Tailwind CSS** classes.
   - Replace '<ul>' and '<li>' tags with '<div>' containers, using classes:
     - 'list-disc' for the parent list container.
     - 'list-item' for each list element.
   - Styling guidelines:
     - **Titles:** Use '<h3>' with 'className='text-lg font-bold''.
     - **Paragraphs:** Use '<p>' with 'className='text-gray-700'''
     - **Lists:** Use '<div>' for both the container and items, with appropriate list styles.

3. **Styling Guidelines (Tailwind CSS):**
   - Use responsive and aesthetic classes:
     - **Padding:** 'p-4', 'p-2'.
     - **Backgrounds:** 'bg-gray-100', 'hover:bg-blue-200'.
     - **Borders and Shadows:** 'rounded-lg', 'shadow-md'.
     - **Font Styling:** 'text-gray-700', 'font-bold', 'text-lg'.
   - Apply hover effects where applicable: 'hover:bg-blue-200',''hover:text-white'.

4. **Error-Free and React-Compatible Output:**
   - Ensure valid **JSON** format:
     - Escape special characters ('\"', '\\', '\n').
     - Avoid undefined, null values, or syntax errors.
   - Ensure compatibility with React.js by:
     - Using 'className' for all Tailwind CSS classes.
     - Avoiding any ambiguous or missing data fields.

### **Output Example for a Question**
{
  "questions": [
    {
      "question": "What is React Native, and how does it differ from React?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>React Native Fundamentals</h3><p className='text-gray-700'>React Native is a framework for building native mobile apps using JavaScript and React. Unlike React, which renders to the browser's DOM, React Native renders to native platform components (iOS's UIViews and Android's Views). This allows for a truly native look and feel, while leveraging the efficiency and speed of JavaScript.  React focuses on web development, handling user interfaces on web browsers. React Native instead uses a bridge to communicate with native modules, giving access to device features like the camera and GPS. The core concept of component-based architecture and JSX is shared between both, but their target platforms and rendering mechanisms differ significantly. This means that while you write code in JavaScript using JSX, the components actually translate into the native UI elements for each platform, giving you performance comparable to native development.</p><div className='list-disc pl-6'><div className='list-item'>React uses the DOM; React Native uses native components.</div><div className='list-item'>React Native enables cross-platform development (iOS and Android).</div><div className='list-item'>React primarily targets web browsers, React Native mobile devices.</div><div className='list-item'>Both use JSX and component-based architecture.</div><div className='list-item'>React Native relies on a bridge for communication with native modules.</div><div className='list-item'>Performance can be similar to native apps when optimized.</div><div className='list-item'>Code reusability is possible across platforms but may require platform-specific adjustments.</div></div></div>"
    },
    {
      "question": "Explain the concept of JSX in React Native.",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>React Native Fundamentals</h3><p className='text-gray-700'>JSX (JavaScript XML) is a syntax extension to JavaScript that allows you to write HTML-like code within your JavaScript files.  In React Native, JSX is used to define the UI structure of your components. It makes the code more readable and easier to understand, resembling traditional HTML markup but with the power of JavaScript embedded within it.  It's not actually HTML; it's transformed into JavaScript functions by Babel during the build process. This allows you to use JavaScript expressions within the JSX, dynamically updating the UI based on the application's state and props. JSX simplifies UI development by making it more intuitive and declarative.  You describe what the UI should look like, and React Native handles the rendering.</p><div className='list-disc pl-6'><div className='list-item'>JSX is transformed into JavaScript before execution.</div><div className='list-item'>Allows for embedding JavaScript expressions within the HTML-like structure.</div><div className='list-item'>Enhances code readability and maintainability.</div><div className='list-item'>Simplifies the creation of dynamic user interfaces.</div><div className='list-item'>It is a key element for creating React components.</div><div className='list-item'>Best practice is to keep JSX concise and focused on UI structure.</div><div className='list-item'>Overly complex JSX can indicate a need for component refactoring.</div></div></div>"
    },
    {
      "question": "Describe the different stages in a React Native component's lifecycle.",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Component Lifecycle and State Management</h3><p className='text-gray-700'>A React Native component goes through several stages during its lifetime. Understanding these stages is crucial for managing data, performing side effects, and optimizing performance.  Key lifecycle methods include: 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'.  'componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate' are deprecated and should be avoided in favor of newer lifecycle methods.  'componentDidMount' is where you typically make network requests or subscribe to events. 'componentWillUnmount' is the place to clean up subscriptions or timers to prevent memory leaks. 'shouldComponentUpdate' helps to optimize performance by allowing you to decide if a re-render is necessary.  The modern approach leverages hooks for managing lifecycle behavior, making state management cleaner and more efficient.  Understanding component lifecycle methods is essential for writing effective and performant React Native applications. </p><div className='list-disc pl-6'><div className='list-item'>Mounting: componentWillMount, render, componentDidMount</div><div className='list-item'>Updating: componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, render, componentDidUpdate</div><div className='list-item'>Unmounting: componentWillUnmount</div><div className='list-item'>Use useEffect hook as modern replacement for lifecycle methods.</div><div className='list-item'>Focus on componentDidMount for side effects and componentWillUnmount for cleanup.</div><div className='list-item'>shouldComponentUpdate for performance optimization</div><div className='list-item'>Proper understanding prevents memory leaks and unexpected behavior.</div></div></div>"
    },
    {
      "question": "How does state management work in React Native, and what are some popular libraries?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Component Lifecycle and State Management</h3><p className='text-gray-700'>State management in React Native involves techniques to handle and update data that affects the UI.  For simple applications, using the component's local state ('useState' hook) is sufficient. However, as apps grow, managing state across multiple components becomes complex. This is where state management libraries come in.  They provide structured ways to store, update, and access the application's state. Popular libraries include Context API (built into React), Redux, MobX, and Recoil.  Context API is suitable for simpler apps, while Redux, MobX, and Recoil are better suited for complex applications with lots of shared state.  Choosing the right library depends on the application's size and complexity; Context API offers a simpler, more straightforward approach, while the others offer more advanced features like time-travel debugging and predictable state updates.</p><div className='list-disc pl-6'><div className='list-item'>useState hook for local component state.</div><div className='list-item'>Context API for simpler state sharing.</div><div className='list-item'>Redux for predictable state updates and complex applications.</div><div className='list-item'>MobX for reactive programming paradigms.</div><div className='list-item'>Recoil for atom-based state management with improved performance characteristics.</div><div className='list-item'>Consider the app's complexity when choosing a state management library.</div><div className='list-item'>Avoid over-engineering: start with simpler solutions and scale as needed.</div></div></div>"
    },
    {
      "question": "Explain the concept of Navigation in React Native.",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Advanced React Native Concepts</h3><p className='text-gray-700'>Navigation in React Native refers to the process of moving between different screens or views within your application.  It's crucial for creating a user-friendly experience. Popular libraries for navigation include React Navigation and React Native Navigation. React Navigation is a widely used, flexible library that provides a declarative way to manage navigation flows. It allows you to define routes, screens, and transitions between them.  It also supports various navigation patterns like stack navigation (for hierarchical screens), tab navigation (for bottom or top tabs), and drawer navigation (for side menus).  Properly structuring navigation improves usability and makes the app feel more natural and intuitive. </p><div className='list-disc pl-6'><div className='list-item'>React Navigation is a popular and flexible library.</div><div className='list-item'>Provides various navigation patterns (stack, tab, drawer).</div><div className='list-item'>Declarative approach for defining routes and screens.</div><div className='list-item'>Handles transitions and animations between screens.</div><div className='list-item'>Supports passing data between screens using navigation parameters.</div><div className='list-item'>Important for creating a structured and user-friendly app.</div><div className='list-item'>Consider using a navigation library for larger applications.</div></div></div>"
    },
    {
      "question": "How do you perform network requests in React Native?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Networking and Data Fetching</h3><p className='text-gray-700'>Fetching data from external APIs is a common task in React Native. You typically use the 'fetch' API or third-party libraries like Axios. 'fetch' is a built-in browser API, also available in React Native, that provides a simple interface for making network requests.  Axios offers additional features like request cancellation and automatic JSON transformation.  When making network requests, it's vital to handle errors gracefully, display loading indicators to the user, and secure sensitive data using HTTPS.  The fetched data is typically processed and used to update the component's state, triggering a re-render of the UI.  Remember to handle asynchronous operations appropriately using promises or async/await.</p><div className='list-disc pl-6'><div className='list-item'>Use fetch API or libraries like Axios.</div><div className='list-item'>Handle potential network errors using try-catch blocks or .catch()</div><div className='list-item'>Display loading indicators to the user while data is fetched.</div><div className='list-item'>Use HTTPS to secure communication.</div><div className='list-item'>Process fetched data and update the app's state.</div><div className='list-item'>Use Async/await for cleaner asynchronous code.</div><div className='list-item'>Properly manage data to avoid memory leaks and performance issues.</div></div></div>"
    },
    {
      "question": "What are some common HTTP methods used in React Native networking?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Networking and Data Fetching</h3><p className='text-gray-700'>HTTP methods define the type of operation you're performing on a resource.  Common methods include: GET (retrieve data), POST (create or update data), PUT (update existing data), DELETE (remove data), PATCH (partially update data).  The choice of method depends on the operation. GET is for retrieving data, typically read-only and idempotent.  POST is used to create new resources or submit data (often non-idempotent). PUT is for updating an entire resource. DELETE removes a resource.  PATCH is for updating only a part of a resource.  Understanding these methods is fundamental to building RESTful APIs and properly interacting with them in your React Native applications.</p><div className='list-disc pl-6'><div className='list-item'>GET: Retrieve data from a server.</div><div className='list-item'>POST: Send data to the server to create or update a resource.</div><div className='list-item'>PUT: Update a complete resource on the server.</div><div className='list-item'>DELETE: Remove a resource from the server.</div><div className='list-item'>PATCH: Partially update a resource on the server.</div><div className='list-item'>Choosing the right method is crucial for correct API interactions.</div><div className='list-item'>Understanding HTTP verbs is essential for web development.</div></div></div>"
    },
    {
      "question": "How can you handle asynchronous operations in React Native?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Networking and Data Fetching</h3><p className='text-gray-700'>Asynchronous operations are common when interacting with APIs or databases.  In React Native, you typically use promises, async/await, or callbacks.  Promises provide a way to handle the eventual result of an asynchronous operation.  Async/await simplifies asynchronous code by making it look and behave more like synchronous code.  Callbacks are a more traditional way to handle asynchronous operations, but they can lead to callback hell if not used carefully.  The preferred modern approach is async/await, which improves readability and maintainability significantly compared to promises and callbacks.  Handling asynchronous operations correctly is key to writing robust and error-free React Native applications. </p><div className='list-disc pl-6'><div className='list-item'>Promises: Represent the eventual result of an asynchronous operation.</div><div className='list-item'>Async/await: Makes asynchronous code look and behave more synchronously.</div><div className='list-item'>Callbacks: Older method, but can lead to “callback hell”.</div><div className='list-item'>Async/await is generally preferred for better readability and maintainability.</div><div className='list-item'>Always handle potential errors with try-catch blocks.</div><div className='list-item'>Use loading indicators to improve user experience.</div><div className='list-item'>Proper error handling improves app stability and resilience.</div></div></div>"
    },
    {
      "question": "What are some best practices for optimizing performance in React Native apps?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Advanced React Native Concepts</h3><p className='text-gray-700'>Optimizing performance is crucial for creating a smooth and responsive user experience. Key strategies include: using 'shouldComponentUpdate' to prevent unnecessary re-renders, optimizing images (using appropriate sizes and formats), minimizing the number of components, using memoization techniques ('useMemo', 'React.memo'), and using flatlist instead of ScrollView for large lists.  Profiling tools can help identify performance bottlenecks.  Careful attention to state management and efficient data fetching also significantly impacts performance.  Regularly reviewing the app's performance and addressing any identified issues is crucial for providing a consistent and satisfactory user experience.</p><div className='list-disc pl-6'><div className='list-item'>Use shouldComponentUpdate to control re-renders.</div><div className='list-item'>Optimize images for size and format.</div><div className='list-item'>Minimize the number of components in the render tree.</div><div className='list-item'>Use memoization techniques (useMemo, React.memo).</div><div className='list-item'>Use FlatList for large lists instead of ScrollView.</div><div className='list-item'>Use efficient state management solutions.</div><div className='list-item'>Employ code splitting to load only necessary modules.</div></div></div>"
    },
    {
      "question": "Describe different approaches to handling data persistence in React Native.",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>Advanced React Native Concepts</h3><p className='text-gray-700'>Data persistence enables storing data locally on the device even after the app closes.  Common approaches include AsyncStorage (built into React Native), SQLite (for relational databases), and Realm (a mobile database).  AsyncStorage is suitable for small amounts of key-value data.  SQLite offers a more powerful relational database solution for larger and more complex data structures. Realm provides a simpler and more object-oriented approach compared to SQLite. The choice depends on your needs: simple key-value pairs (AsyncStorage), complex structured data (SQLite or Realm).  Consider security implications and data encryption if dealing with sensitive information.</p><div className='list-disc pl-6'><div className='list-item'>AsyncStorage: Key-value storage, suitable for small amounts of data.</div><div className='list-item'>SQLite: Relational database for larger, more structured data.</div><div className='list-item'>Realm: Object-oriented database, easier to use than SQLite.</div><div className='list-item'>Choose the best approach based on data complexity and app requirements.</div><div className='list-item'>Consider security and encryption for sensitive data.</div><div className='list-item'>Properly handle data migration when updating your app.</div><div className='list-item'>Regularly backup and restore your database if needed.</div></div></div>"
    },
    {
      "question": "Explain the importance of testing in React Native development.",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>React Native Interview Preparation</h3><p className='text-gray-700'>Testing is crucial for building reliable and robust React Native applications.  It helps identify bugs early in the development process, improves code quality, and reduces the risk of unexpected behavior.  Different types of tests include unit tests (testing individual components), integration tests (testing interactions between components), and end-to-end tests (testing the entire application flow).  Jest and React Testing Library are popular frameworks for testing React Native components.  Testing ensures that your app functions as expected under various conditions and helps maintain a high level of code quality throughout its lifecycle.  A well-tested application is more likely to be stable and less prone to unexpected errors.</p><div className='list-disc pl-6'><div className='list-item'>Unit tests: Test individual components in isolation.</div><div className='list-item'>Integration tests: Test interactions between components.</div><div className='list-item'>End-to-end tests: Test the entire application workflow.</div><div className='list-item'>Jest and React Testing Library are popular testing frameworks.</div><div className='list-item'>Testing helps find bugs early and improve code quality.</div><div className='list-item'>Increases confidence in the application's stability.</div><div className='list-item'>Reduces the risk of unexpected errors during deployment.</div></div></div>"
    },
    {
      "question": "What are some common React Native interview questions?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>React Native Interview Preparation</h3><p className='text-gray-700'>Common React Native interview questions often cover fundamental concepts like JSX, component lifecycle, state management, navigation, networking, and performance optimization.  Expect questions about state management libraries (Redux, Context API, MobX), navigation libraries (React Navigation), asynchronous operations, and data persistence.  You should also be prepared to discuss your experience with testing frameworks, debugging techniques, and performance optimization strategies.  Behavioral questions assessing your problem-solving skills and teamwork abilities are also common.  Practice explaining your projects and highlighting your problem-solving approach.</p><div className='list-disc pl-6'><div className='list-item'>Explain JSX and its purpose.</div><div className='list-item'>Discuss the React Native component lifecycle.</div><div className='list-item'>Describe different state management approaches.</div><div className='list-item'>Explain how you handle navigation in your apps.</div><div className='list-item'>Describe your experience with network requests and data fetching.</div><div className='list-item'>Discuss performance optimization techniques.</div><div className='list-item'>Explain your testing methodologies.</div></div></div>"
    },
    {
      "question": "How would you approach debugging a React Native application?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>React Native Interview Preparation</h3><p className='text-gray-700'>Debugging React Native applications involves a combination of techniques and tools.  Start by using the developer tools provided by your IDE or by React Native itself.  Use the debugger to step through code, inspect variables, and identify the source of errors.  The console logs are also crucial for tracking the flow of execution and identifying unexpected behavior.  React Native's developer menu provides features like hot reloading and remote debugging.  If you're encountering issues with native modules, you may need to use platform-specific debugging tools.  The key to effective debugging is a systematic and methodical approach, starting with clear error messages and using the right tools to pinpoint the source of the problem. </p><div className='list-disc pl-6'><div className='list-item'>Use the debugger to step through code.</div><div className='list-item'>Utilize console logs to track variable values and execution flow.</div><div className='list-item'>Employ React Native's developer menu features (hot reloading, remote debugging).</div><div className='list-item'>Leverage platform-specific debugging tools if needed.</div><div className='list-item'>Read error messages carefully to understand the problem.</div><div className='list-item'>Use a methodical approach to isolate and fix the issue.</div><div className='list-item'>Practice efficient debugging techniques to save time and improve problem-solving skills.</div></div></div>"
    },
    {
      "question": "What are some common pitfalls to avoid when developing React Native apps?",
      "answer": "<div className='p-4 bg-gray-100 rounded-lg shadow-md'><h3 className='text-lg font-bold'>React Native Interview Preparation</h3><p className='text-gray-700'>Common pitfalls in React Native development include improper state management (leading to performance issues and unexpected behavior), neglecting performance optimization (resulting in slow or unresponsive apps), inadequate error handling (causing crashes or unexpected behavior), insufficient testing (leading to buggy releases), and neglecting platform-specific considerations (resulting in inconsistent behavior across platforms).  Always plan your app's architecture carefully, choose appropriate state management strategies, and prioritize performance optimization throughout the development lifecycle.  Thorough testing and attention to detail are crucial for avoiding common issues and creating a high-quality app.</p><div className='list-disc pl-6'><div className='list-item'>Improper state management can lead to performance issues and bugs.</div><div className='list-item'>Ignoring performance optimization results in slow and unresponsive apps.</div><div className='list-item'>Inadequate error handling can cause crashes and unexpected behavior.</div><div className='list-item'>Insufficient testing leads to buggy releases and reduced app quality.</div><div className='list-item'>Neglecting platform-specific considerations results in inconsistent user experiences.</div><div className='list-item'>Overlooking security vulnerabilities can compromise user data.</div><div className='list-item'>Failing to plan your app architecture can lead to messy and hard-to-maintain code.</div></div></div>"
    }
  ]
}

### **Implementation Notes**
- **Replace '<ul>' and '<li>':** Use '<div className='list-disc'>' and '<div className='list-item'>' for lists.
- Ensure **valid JSON** format for seamless integration with the Gmeni API and React applications.
- Avoid special character parsing issues by escaping properly.
        
        `;

    console.log("Prompt:", PROMPT);

    // Insert into the database
    const result = await db
      .insert(STUDY_TYPE_CONTENT_TABLE)
      .values({
        courseId: courseId,
        type: type,
        chapter: chapter, // Add chapter for better traceability
      })
      .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    console.log("Inserted Content ID:", result);

    // Trigger the external task
    await inngest.send({
      name: "studyType.content",
      data: {
        studyType: type,
        prompt: PROMPT,
        courseId: courseId,
        recordId: result[0]?.id,
      },
    });

    return NextResponse.json({ id: result[0]?.id });
  } catch (error) {
    console.error("Error in POST /api/study-type-content:", error.message);
    return NextResponse.json(
      { error: "Failed to generate study material. Please try again." },
      { status: 500 }
    );
  }
}
