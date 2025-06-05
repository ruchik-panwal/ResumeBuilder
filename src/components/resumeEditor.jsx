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



// This Function Handles the personal detail Form
function PersonalDetails() {

  // Thsi UseState checks on the value of inputs
  const [value, setValue] = useState({
    personName: "",
    personEmail: "",
    personNumber: "",
  });

  // This changes the input field and stores the state
  function inputChange(val, id) {
    let details = { ...value };
    for (const key in details) {
      if (key == id) details[key] = val;
    }
    setValue(details);
  }

  // Clears the Input fields when clicked
  function clearBtn() {
    let details = { ...value };
    for (const key in details) {
      details[key] = "";
    }
    setValue(details);
  }

  // Collects and sends the data when submit button is pressed
  function dataCollector(obj) {
  console.log(obj); //Temp
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
            inputChange(event.target.value, event.target.id)
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
            inputChange(event.target.value, event.target.id, event.id)
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
            inputChange(event.target.value, event.target.id, event.id)
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
            dataCollector(value);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
}
