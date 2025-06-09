import { useState } from "react";
import "/src/styles/resumeEditor.css";

export function ResumeEditor({ getResumeData, previewData }) {
  const [counter, setCounter] = useState(5);

  // Stores the Data taken from the form to the resume Data updating the state
  function printValue(val, id) {
    let newData = {...previewData};

    // 
    if (newData[id]?.children?.length != 0) {
      newData[newData[id]?.children[0]] = val;
    } else {
      newData[id].children[0] = counter;
      newData[counter] = val;
      setCounter(counter + 1);
    }
    getResumeData(newData);
  }

  // Returning the data from the form
  return (
    <div className="resumeEditor">
      <PersonalDetails onBtnClick={printValue} />
    </div>
  );
}

// This Function Handles the personal detail Form
function PersonalDetails({ onBtnClick }) {
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

  return (
    <form>
      <h1>Personal Details</h1>
      <div>
        <label htmlFor="personName">Name: </label>
        <input
          type="text"
          id="personName"
          value={value.personName}
          onChange={(event) => inputChange(event.target.value, event.target.id)}
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
            onBtnClick(value, 0);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
}
