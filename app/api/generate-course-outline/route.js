import { courseOutlineAIModel } from "/configs/AiModel";
import { db } from "/configs/db";
import { STUDY_MATERIAL_TABLE } from "/configs/schema";
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      await req.json();

    console.log("Received data:", {
      courseId,
      topic,
      courseType,
      difficultyLevel,
      createdBy,
    });

    const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter in JSON format`;

    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
    console.log("AI response:", aiResp);

    const aiResult = JSON.parse(aiResp.response.text());
    console.log("Parsed AI result:", aiResult);

    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy,
        topic: topic,
        courseLayout: aiResult,
      })
      .returning(STUDY_MATERIAL_TABLE);

    console.log("Database insertion result:", dbResult);

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}