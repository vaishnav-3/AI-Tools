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
        ? `Generate the ${type} on topic: ${chapter} in JSON format with front-back content, Maximum 15`
        : `Generate Quiz on topic : ${chapter} with Question and Options along with correct answer in JSON format, (Max 10)`;

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
