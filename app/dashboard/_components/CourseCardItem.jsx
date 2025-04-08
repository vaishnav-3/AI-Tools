import React from "react";
import Loader from "./Loader";
import Link from "next/link";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import DropdownOption from "./DropdownOption";
import { db } from "./../../../configs/db";
import { eq } from "drizzle-orm";
import { STUDY_MATERIAL_TABLE } from "./../../../configs/schema";


function CourseCardItem({ course, refreshData }) {
  console.log("CourseCardItem rendered with course:", course);
  console.log("course", course.status);

  const handleOnDelete = async () => {
    console.log("handleOnDelete called with course:", course);
    if (!course || !course.courseId) {
      console.error("Error: course or courseId is undefined");
      return;
    }
  
    try {
      console.log("Attempting to delete course with ID:", course.courseId);
      const resp = await db
        .delete(STUDY_MATERIAL_TABLE)
        .where(eq(STUDY_MATERIAL_TABLE.courseId, course.courseId))
        .returning({ course: STUDY_MATERIAL_TABLE.courseId });
  
      console.log("Delete response:", resp);
      if (resp.length > 0) {
        console.log("Course deleted successfully, refreshing data...");
        refreshData(true);
      } else {
        console.warn("No rows were deleted. Check if the course ID exists in the database.");
      }
    } catch (error) {
      console.error("Error deleting course:", error.message, error.stack);
    }
  };
   

  return (
    <div className="p-4  w-full border rounded-lg shadow-md bg-gray-100">
      <div className="flex flex-col justify-between">
        <div className="flex items-center mb-4">
          <img
            src="/knowledge.png"
            alt="knowledge"
            width={50}
            height={50}
            className="mr-4"
          />
          <h2 className="text-lg font-semibold">
            {course.courseLayout.courseTitle}
          </h2>
        </div>

        <div className="text-sm mt-3  text-gray-600 bg-[#ededed] py-5 px-3 rounded-lg">
          <p className="line-clamp-4">{course.courseLayout.courseSummary}</p>
        </div>

        <div className="mt-5 flex justify-end items-center gap-4">
          {course.status === "Generating" ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <Link href={`course/${course.courseId}`}>
              <button className="btn btn-outline-primary px-4 py-2">
                View
              </button>
            </Link>
          )}
          <h2>

            <DropdownOption
              handleOnDelete={() => handleOnDelete()}>

            </DropdownOption>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
