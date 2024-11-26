"use client"
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import TopicInput from './_components/TopicInput';

function Create() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([])
    const handleUserInput=(fieldName, fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]: fieldValue
        }))
        console.log(formData)
    }
  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 h-screen'>
        <h2 className='font-bold text-4xl text-primary'>Start Building Your Personal Study Material</h2>
        <p className='text-gray-500 text-lg'>Fill all the details in order to generate study material for your next project</p>
        <div className='mt-10'>
            {step==0? <SelectOption selectedStudyType={(value)=>handleUserInput("studyType",value)}/> : <TopicInput setTopic={(value)=>handleUserInput("topic", value)} setDifficultyLevel={(value)=>handleUserInput("difficultyLevel", value)}/>}
        </div>
        <div className="flex justify-between w-full mt-32">
        {step!=0? <button className="btn btn-primary" onClick={()=>setStep(step-1)}>Previous</button>:'-'}
        {step==0? <button onClick={()=>setStep(step+1)} className="btn btn-outline-primary">Next</button> : <button className="btn btn-outline-primary">Generate</button>}
      </div>
    </div>
  )
}

export default Create