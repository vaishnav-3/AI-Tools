import { index } from 'drizzle-orm/mysql-core';
import React from 'react'
import MaterialCardItem from './MaterialCardItem';

function StudyMaterialSection() {

    const MaterialList = [
      {
        name: "Notes/Chapters",
        desc: "Read notes to prepare it",
        icon: "/notes.png",
        path: "/notes",
      },
      {
        name: "Flashcard",
        desc: "Flashcard to help remember concepts",
        icon: "/flashcard.png",
        path: "/flashcards"
      },
      {
        name: "Quiz",
        desc: "Great way to test you knowledge",
        icon: "/quiz.png",
        path: "/quiz",
      },
      {
        name: "Question/Answer",
        desc: "Help to practice your learning",
        icon: "/qa.png",
        path: "/qa",
      }
    ];

  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Material</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {MaterialList.map((item, index) => (
                <MaterialCardItem item={item} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default StudyMaterialSection