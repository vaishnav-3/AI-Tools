import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "../configs/schema";
import { db } from "../configs/db";
import { inngest } from "./client";
import { generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "../configs/AiModel";
import { eq } from "drizzle-orm";

// Function to test the "hello-world" event
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Function to create a new user if they don't already exist
export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const [user] = event.data;

    const result = await step.run(
      "Check User and Create if Not in DB",
      async () => {
        // Check if the user exists in the database
        const existingUser = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        if (existingUser.length === 0) {
          // Insert the new user if not found
          const newUser = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });
          return newUser;
        }
        return existingUser;
      }
    );

    console.log(result);
    return "Success";
  }
);

// Function to generate notes for chapters in a course
export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    try {
      // Generate notes for each chapter
      const notesResult = await step.run("Generate Chapter Notes", async () => {
        const chapters = course.courseLayout.chapters;

        const chapterPromises = chapters.map(async (chapter, index) => {
          const PROMPT = `Generate a JSON object that represents study notes for a course chapter. The JSON should meet the following requirements:
0. Provided Chapters:
${JSON.stringify(chapter)}


1. Structure:
The JSON must include the following fields:
chapterTitle (string): The title of the chapter.
chapterSummary (string): A brief summary of the chapter.
emoji (string): A relevant emoji to visually represent the chapter.
topics (array): A list of topics covered in the chapter. Each topic must be an object with:
topicTitle (string): The title of the topic.
content (string): Detailed content for the topic written in HTML format, styled with Tailwind CSS, and ready for rendering in a React.js component.

2. Content Formatting:
HTML Requirements:
Wrap all content in <div> elements with Tailwind CSS classes, such as p-4, bg-gray-100, rounded-lg, shadow-md, etc.
Use semantic HTML elements:
<h3> for topic titles.
<p> for text paragraphs.
<div> with list-disc and list-item classes for lists.
Escape all special characters properly to ensure valid JSON formatting.
Use className instead of class for styling compatibility with React.js.
Make the HTML content visually attractive:
Use Tailwind CSS classes for enhanced styling, such as bg-gradient-to-r, text-center, text-xl, hover:bg-blue-200, etc.
Add additional styling to make each topic's content visually engaging and modern-looking.

3. Styling Guidelines:
Apply Tailwind CSS classes for responsive, aesthetic designs:
Padding: p-4, p-2, etc.
Backgrounds: bg-gray-100, bg-blue-200, bg-gradient-to-r, etc.
Borders and shadows: rounded-lg, shadow-md, etc.
Hover effects: hover:bg-blue-200, hover:text-white, etc.
Maintain consistency with font styles (text-lg, font-bold, text-gray-700).
Ensure the layout is visually appealing, with elements spaced out cleanly and a good balance of colors and fonts.

4. Error-Free Output:
Ensure the JSON is valid and parsable without errors.
Properly escape quotation marks ("), line breaks (\n), and backslashes (\\) within strings.
There should not be any Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'undefined'
Do not include undefined or null values in the JSON.
Replace any missing data with appropriate placeholders or omit invalid entries entirely.

5. Application Context:
The JSON will be used in a React.js application styled with Tailwind CSS. Ensure compatibility with this environment by:
Using className for all HTML elements.
Maintaining clean, modular HTML snippets that can be directly rendered in React components.

**IMPORTANT**
There should be an emoji
Check twice or thrice that the output is like the given output example format (#6)
Check twice or thrice to ensure that the JSON is valid and parsable without errors and that the application context is valid before continuing to use it as a React component.

### 6. **Output Example:**
{
    "chapterTitle": "Networking and Multiplayer Game Development",
    "chapterSummary": "Understand the complexities of building online multiplayer games, including networking protocols, synchronization techniques, and security.",
    "emoji": "🌐",
    "topics": [
        {
            "topicTitle": "Client-server architecture",
            "content": "<div className=\"p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200\"><h3 className=\"text-lg font-bold mb-2 text-xl text-center\">Client-server architecture</h3><p className=\"text-gray-700\">In a client-server architecture, multiple clients connect to a central server. The server manages game state, handles player interactions, and distributes updates to the clients.  This architecture is suitable for large-scale games where managing game state on individual clients is impractical. The server is responsible for authoritative updates which keeps the game fair and consistent.  Clients send input to the server and receive updates on other players and game events.</p></div>"
        },
        {
            "topicTitle": "Peer-to-peer networking",
            "content": "<div className=\"p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200\"><h3 className=\"text-lg font-bold mb-2 text-xl text-center\">Peer-to-peer networking</h3><p className=\"text-gray-700\">In peer-to-peer (P2P) networking, each client acts as both a client and a server, communicating directly with other clients.  This eliminates the need for a central server, simplifying development and reducing latency. However, managing game state and preventing cheating can be more complex in P2P architectures.  P2P is well suited for small, low-latency games.</p></div>"
        },
        {
            "topicTitle": "Network synchronization techniques (Lag compensation, interpolation)",
            "content": "<div className=\"p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200\"><h3 className=\"text-lg font-bold mb-2 text-xl text-center\">Network synchronization techniques (Lag compensation, interpolation)</h3><p className=\"text-gray-700\">Network synchronization is crucial in multiplayer games to ensure consistency across all clients.  Lag compensation predicts player movement based on network latency, reducing the impact of delays. Interpolation smooths out jerky movements by interpolating between received updates, improving the visual experience.</p></div>"
        },
        {
            "topicTitle": "Security considerations for online games",
            "content": "<div className=\"p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200\"><h3 className=\"text-lg font-bold mb-2 text-xl text-center\">Security considerations for online games</h3><p className=\"text-gray-700\">Security is paramount in online games.  Protecting against cheating (e.g., aimbots, wallhacks) requires robust server-side validation and anti-cheat measures.  Protecting player data (e.g., accounts, personal information) necessitates secure authentication and encryption protocols.</p></div>"
        },
        {
            "topicTitle": "Game networking libraries and APIs",
            "content": "<div className=\"p-4 bg-gray-100 rounded-lg shadow-md hover:bg-blue-200\"><h3 className=\"text-lg font-bold mb-2 text-xl text-center\">Game networking libraries and APIs</h3><p className=\"text-gray-700\">Game networking libraries and APIs simplify network programming.  Popular choices include Unity's UNET, Unreal Engine's networking features, and third-party libraries like RakNet and ENet. These libraries handle low-level networking details, allowing developers to focus on game logic.</p></div>"
        }
    ]
}



 7. **Additional Notes:**  
   - **IMPORTANT** There should be an emoji
   - Every Content should be in detail and explained properly
   - Each 'content' field should use simple and concise language suitable for study notes.  
   - Ensure that topics include clear definitions, key points, and, where appropriate, examples or sample code.  
   - All generated content should be focused on clarity and exam preparation, with minimal redundancy.  

 8. **Avoid Common Errors:**  
   - Do not generate outputs with unescaped special characters (e.g., 'Error: Parse error on line...').  
   - Double-check for mismatched brackets, missing fields, or improperly formatted strings.  
   - Do not generate incomplete or ambiguous JSON objects.;`;


          // Generate notes using AI model
          const result = await generateNotesAiModel.sendMessage(PROMPT);
          const aiResp = await result.response.text();

          // Insert the generated notes into the database
          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: index,
            courseId: course.courseId,
            notes: aiResp,
          });
        });

        // Wait for all chapter notes to be processed
        await Promise.all(chapterPromises);
        return "Chapter Notes Generated";
      });

      // Update course status to "Ready"
      const updateCourseStatusResult = await step.run(
        "Update Course Status to Ready",
        async () => {
          await db
            .update(STUDY_MATERIAL_TABLE)
            .set({ status: "Ready" })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, course.courseId));
          return "Course Status Updated to Ready";
        }
      );

      // Return the combined results
      return { notesResult, updateCourseStatusResult };
    } catch (error) {
      // Log and rethrow any errors
      console.error("Error during GenerateNotes function execution:", error);
      throw new Error("An error occurred while generating course notes");
    }
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  {id: "Generate Study Type Content"},
  {event: "studyType.content"},
  async({event, step}) => {
    const {studyType, prompt, courseId, recordId} = event.data;
    const AIResult = await step.run('Generating Flashcard using AI', async()=>{
      const result = 
      studyType == "Flashcard" ? 
      await GenerateStudyTypeContentAiModel.sendMessage(prompt):
      await GenerateQuizAiModel.sendMessage(prompt);
      const AIResult = JSON.parse(result.response.text())
      return AIResult;
    })
    const DbResult = await step.run('Save Result to DB', async()=>{
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AIResult,
          status: "Ready",
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
      return 'Data Inserted'
    })
  }
)