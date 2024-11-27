import React from 'react';
import Loader from './Loader';
import Link from 'next/link';
import Progress from './Progress';

function CourseCardItem({ course }) {
    console.log("course" , course.status)
  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-100">
      <div>
        <div className="flex justify-between items-center">
          <img src="/knowledge.png" alt="knowledge" width={50} height={50} />
          <h2 className="text-[10px] p-1 px-2 rounded-full bg-gray-200">20 December</h2>
        </div>
        <h2 className="mt-3 font-medium text-lg">{course.courseLayout.courseTitle}</h2>
        <p className="text-sm line-clamp-2 text-gray-500">{course.courseLayout.courseSummary}</p>
        <Progress max={10} value={5}/>
        {/*<div className="w-full bg-gray-300 rounded-full h-[15px] mt-3">
          <div className="bg-blue-500 h-[15px] rounded-full" style={{ width: '50%' }}></div>
        </div>*/}
        <div className='mt-3 flex justify-end'>
            {course.status === "Generating" ? <Loader/> : <Link href={'course/'+course.courseId}><button className='btn btn-outline-primary'>View</button></Link>}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
