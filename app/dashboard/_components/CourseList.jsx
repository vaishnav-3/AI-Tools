"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CourseCardItem from "./CourseCardItem";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button"



function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/courses/", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourseList(result.data.result);
      console.log(result.data.result) // Assuming the API returns `courses` array
    } catch (err) {
      console.error("Error fetching course list:", err.message);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-2">
        <h2 className="font-bold text-2xl flex justify-between items-center">Your Study Material
          <Button onClick={GetCourseList} variant="outline" className="border-primary text-primary"><RefreshCw/></Button>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-5">
            {loading==false? courseList.map((course, index) => (
                <CourseCardItem course={course} key={index} refreshData={GetCourseList}/>
            ))
          : [1,2,3,4,5].map((item, index) => (
            <div key={index} className="h-56 w-full bg-slate-200 rounded-lg animated-pulse"></div>
          ))
          }
        </div>
    </div>
  );
}

export default CourseList;
