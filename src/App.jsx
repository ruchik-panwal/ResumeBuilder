import { useState } from "react";
import { ResumeEditor } from "./components/resumeEditor";
import { ResumePreview } from "./components/resumePreview";
import { mainData } from "./components/mainData";

// Takes the whole data from the form; Changes its state; stores inside local storages; and transfer to the previewDiv
export function App() {
  let newData = {};
  if (!localStorage.getItem("data"))
    newData = { ...mainData }; //If nothing in local storage, use the main Data
  else newData = JSON.parse(localStorage.getItem("data")); //Else Use thaat lacal storage

  // Use State for the main data
  const [resumeData, setResumeData] = useState(newData);
  return (
    <>
      <ResumeEditor
        getResumeData={(givenData) => {
          setResumeData(givenData); //Getting and setting the data from the forms
          localStorage.setItem("data", JSON.stringify(givenData)); //Storing inside the local Storage
        }}
        previewData={resumeData}
      />
      <ResumePreview previewData={resumeData} />{" "}
      {/* Transfers the Data to preview */}
    </>
  );
}
