import { CHAPTER_NOTES_TABLE } from "/configs/schema";
import { db } from "/configs/db";
import { eq } from "drizzle-orm"; // Ensure eq is imported
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "The 'courseId' field is required." },
        { status: 400 }
      );
    }

    if (studyType === "ALL") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      const result = {
        notes: notes,
        flashcard: null, // Replace with actual query if needed
        quiz: null, // Replace with actual query if needed
        qa: null, // Replace with actual query if needed
      };

      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: "Unsupported study type." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/study-type:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch study materials. Please try again later." },
      { status: 500 }
    );
  }
}
