import "/src/styles/resumePreview.css";

// Displays the FormInputs in an a4 sized (in ration) div
export function ResumePreview({ previewData }) {
  return (
    <div className="a4Preview">
      <PerDetailsBuilder previewData={previewData} />
      <ExpBuilder previewData={previewData} />
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

function ExpBuilder({ previewData }) {
  const expChild = [...previewData[1].children];

  if (!expChild.length) return null;

  return (
    <div className="experienceDetails">
      <h3 className="detailsHeader">Work Experience</h3>

      {expChild.map((child) => {
        return (
          <div className="workExp">
            <div className="titleDateWrap">
              <h3 className="jobTitle">{previewData[child]["Role"]}</h3>
              <p className="jobLoc">I {previewData[child]["Company"]}</p>
              <p className="date">{previewData[child]["StartDate"]} - {previewData[child]["EndDate"]}</p>
            </div>
            <ul className="description">
              <li>hello</li>
              <li>there</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
