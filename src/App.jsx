import { useState } from 'react'
import { ResumeEditor } from './components/resumeEditor'
import { ResumePreview } from './components/resumePreview'
import { mainData } from './components/mainData';

export function App(){
    const [resumeData, setResumeData] = useState(mainData);
    
    function appendingData(givenData){
        setResumeData(givenData);
    }

    return <>
        <ResumeEditor getResumeData = {appendingData} previewData={resumeData} />
        <ResumePreview previewData = {resumeData} />
    </>
}