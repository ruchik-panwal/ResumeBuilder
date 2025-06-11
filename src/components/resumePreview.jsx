import "/src/styles/resumePreview.css";

// Displays the FormInputs in an a4 sized (in ration) div
export function ResumePreview({ previewData }) {
  return (
    <div className="a4Preview">
      <PerDetailsBuilder previewData={previewData} />{" "}
      {/* Displays Personal Detail */}
    </div>
  );
}

// Function for displaying Personal Details
function PerDetailsBuilder({ previewData }) {
  // If there is no Personal Detail filled yet, Return nothing
  if (!previewData["PER"]) {
    return null;
  }

  let domObj = previewData["PER"]; //Taking the OBJ for personal Detail

  // If there is nothing inside the obj, return nothing
  if (
    domObj.personName == "" &&
    domObj.personNumber == "" &&
    domObj.personEmail == ""
  )
    return null;

  return (
    <div className="personalDetails">
      {domObj.personName && <h1>{domObj.personName}</h1>}

      {(domObj.personEmail || domObj.personNumber) && (
        <div>
          {domObj.personEmail && <p>{domObj.personEmail}</p>}
          {<p>|</p>}
          {domObj.personNumber && <p>{domObj.personNumber}</p>}
        </div>
      )}
    </div>
  );
}
