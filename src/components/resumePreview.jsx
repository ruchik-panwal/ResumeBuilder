import "/src/styles/resumePreview.css";

export function ResumePreview({ previewData }) {
  return (
    <div className="a4Preview">
      <PerDetailsBuilder
        personalData={previewData[0]}
        previewData={previewData}
      />
    </div>
  );
}

function PerDetailsBuilder({ personalData, previewData }) {
  if (personalData?.children.length == 0) {
    return null;
  }

  let domObj = previewData[personalData?.children[0]];

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
          {domObj.personNumber && <p>{domObj.personNumber}</p>}
        </div>
      )}
    </div>
  );
}
