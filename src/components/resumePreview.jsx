import "/src/styles/resumePreview.css";

// Displays the FormInputs in an a4 sized (in ration) div
export function ResumePreview({ previewData }) {
  return (
    <div className="a4Preview">
      <PerDetailsBuilder previewData={previewData} /> {/* Displays Personal Detail */}  
    </div>
  );
}

function PerDetailsBuilder({ previewData }) {
  if (!previewData["PER"]) {
    return null;
  }

  let domObj = previewData["PER"];
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
