import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  USER_TABLE,
} from "../configs/schema";
import { db } from "../configs/db";
import { inngest } from "./client";
import { generateNotesAiModel } from "../configs/AiModel";
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
      "Check User and create New if Not in DB",
      async () => {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
        console.log(result);

        if (result?.length === 0) {
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });
          return userResp;
        }
        return result;
      }
    );
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
        let index = 0;

        // Creating promises for each chapter note generation
        const chapterPromises = chapters.map(async (chapter) => {
          const PROMPT = `Generate exam material detail content for each chapter. Make sure to include all topic points in the content. Provide the content in HTML format (Do not include HTML, Head, Body, title tags). The chapter details: ${JSON.stringify(
            chapter
          )}`;

          // Send request to generate notes via AI model
          const result = await generateNotesAiModel.sendMessage(PROMPT);
          const aiResp = result.response.text();

          // Insert the generated notes into the database
          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: index,
            courseId: course.courseId,
            notes: aiResp,
          });
          index++;
        });

        // Wait for all chapter notes to be generated
        await Promise.all(chapterPromises);
        return "Chapter Notes Generated";
      });

      // After generating notes, update course status to "Ready"
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

      // Return a successful response with both results
      return { notesResult, updateCourseStatusResult };
    } catch (error) {
      // Catch any errors and log them for debugging
      console.error("Error during GenerateNotes function execution:", error);
      throw new Error("An error occurred while generating course notes");
    }
  }
);
