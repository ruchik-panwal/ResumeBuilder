import { useState } from "react";
import { ResumePreview } from "./resumePreview";
import "/src/styles/resumeEditor.css";

export function ResumeEditor() {
  return (
    <div className="resumeEditor">
      <PersonalDetails />
    </div>
  );
}



// This Function Handles the persnal detail Form
function PersonalDetails() {
  const [value, setValue] = useState({
    personName: "",
    personEmail: "",
    personNumber: "",
  });

  function dataCollector(val, id) {
    let details = { ...value };
    for (const key in details) {
      if (key == id) details[key] = val;
    }
    setValue(details);
  }

  function clearBtn() {
    let details = { ...value };
    for (const key in details) {
      details[key] = "";
    }
    setValue(details);
  }

  function submitBtn(obj) {
  console.log(obj);
}

  return (
    <form>
      <h1>Personal Details</h1>
      <div>
        <label htmlFor="personName">Name: </label>
        <input
          type="text"
          id="personName"
          value={value.personName}
          onChange={(event) =>
            dataCollector(event.target.value, event.target.id)
          }
        />
      </div>

      <div>
        <label htmlFor="personEmail">Email: </label>
        <input
          type="email"
          id="personEmail"
          value={value.personEmail}
          onChange={(event) =>
            dataCollector(event.target.value, event.target.id, event.id)
          }
        />
      </div>

      <div>
        <label htmlFor="personNumber">Contact: </label>
        <input
          type="text"
          id="personNumber"
          value={value.personNumber}
          onChange={(event) =>
            dataCollector(event.target.value, event.target.id, event.id)
          }
        />
      </div>

      <div className="buttonWrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            clearBtn();
          }}
        >
          Clear All
        </button>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submitBtn(value);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
}
