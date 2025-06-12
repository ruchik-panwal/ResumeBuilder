import { useState } from "react";
import { ResumeEditor } from "./components/resumeEditor";
import { ResumePreview } from "./components/resumePreview";
import { mainData } from "./components/mainData";

export function App() {
  const [resumeData, setResumeData] = useState(mainData);
  return (
    <>
      <ResumeEditor
        getResumeData={(givenData) => setResumeData(givenData)}
        previewData={resumeData}
      />
      <ResumePreview previewData={resumeData} />
    </>
  );
}
