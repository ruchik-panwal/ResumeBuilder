import "/src/styles/resumePreview.css";

// Displays the FormInputs in an a4 sized (in ration) div
export function ResumePreview({ previewData }) {
  return (
    <div className="a4Preview">
      <PerDetailsBuilder previewData={previewData} />
      <ExpBuilder previewData={previewData} />
      <EduBuilder previewData={previewData} />
      <ProBuilder previewData={previewData} />
      <SkiBuilder previewData={previewData} />
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
    <div className="perDetails">
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
    <div className="expDetails">
      <h3 className="detailsHeader">Work Experience</h3>

      {expChild.map((child, idx) => {
        return (
          <div key={idx} className="workExp">
            <div className="titleDateWrap">
              <h3 className="jobTitle">{previewData[child]["Role"]}</h3>
              <p className="jobLoc">I {previewData[child]["Company"]}</p>
              <p className="date">
                {previewData[child]["StartDate"]} -{" "}
                {previewData[child]["EndDate"]}
              </p>
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

function EduBuilder({ previewData }) {
  const expChild = [...previewData[2].children];

  if (!expChild.length) return null;

  return (
    <div className="eduDetails">
      <h3 className="detailsHeader">Education</h3>

      {expChild.map((child, idx) => {
        return (
          <div key={idx} className="education">
            <div className="edutitleLocWrap">
              <h3 className="jobTitle">{previewData[child]["Institute"]}</h3>
              <p className="jobLoc">I {previewData[child]["Location"]}</p>
              <p className="date">
                {previewData[child]["StartDate"]} -{" "}
                {previewData[child]["EndDate"]}
              </p>
            </div>

            <p className="degree">{previewData[child]["Degree"]}</p>
            <p className="year">{previewData[child]["Year"]}</p>
          </div>
        );
      })}
    </div>
  );
}

function ProBuilder({ previewData }) {
  const expChild = [...previewData[3].children];

  if (!expChild.length) return null;

  return (
    <div className="proDetails">
      <h3 className="detailsHeader">Projects</h3>

      {expChild.map((child, idx) => {
        return (
          <div key={idx} className="education">
            <div className="projectWraps">
              <h3 className="jobTitle">{previewData[child]["Title"]}</h3>
              <p className="jobLoc">I {previewData[child]["TechStack"]}</p>
            </div>
            <ul className="description">
              <li>ffefw</li>
              <li>dsfwf</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function SkiBuilder({ previewData }) {
  const expChild = [...previewData[4].children];

  if (!expChild.length) return null;

  return (
    <div className="proDetails">
      <h3 className="detailsHeader">Projects</h3>

      {expChild.map((child, idx) => {
        return (
          <div key={idx} className="education">
            <h4 className="stackTitle">{previewData[child]["Title"]}</h4> : <p className="skills">{previewData[child]["skills"]}</p>
          </div>
        );
      })}
    </div>
  );
}