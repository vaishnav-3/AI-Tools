import Progress from '/app/dashboard/_components/Progress';
import React from 'react'

function CourseIntroCard({ course }) {
    //console.log("jhgsfjsbjd", course.courseLayout["courseTitle"]);
  return (
    <div className='flex gap-5 items-center p-10 border shadow-md rounded-lg bg-gray-100'>
      <img src="/knowledge.png" alt="knowledge" width={70} height={70} />
      <div>
        <h2 className='font-bold text-2xl'>{course.courseLayout.courseTitle}</h2>
        <p>{course.courseLayout.courseSummary}</p>
        <Progress max={10} value={5}/>
        <h2 className='text-[15px] text-blue-600 font-semibold'>Total Chapters: {course.courseLayout.chapters.length}</h2>
      </div>
    </div>
  );
}

export default CourseIntroCard