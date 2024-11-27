import { db } from "/configs/db";
import { STUDY_MATERIAL_TABLE } from "/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { createdBy } = await req.json();

    if (!createdBy) {
      return NextResponse.json(
        { error: "The 'createdBy' field is required." },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy));

    return NextResponse.json({ result: result });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses. Please try again later." },
      { status: 500 }
    );
  }
}
