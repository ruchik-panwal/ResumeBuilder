import { useState } from "react";
import "/src/styles/resumeEditor.css";

import { educationInputs, experienceInputs, projectInputs } from "./mainData";

export function ResumeEditor({ getResumeData, previewData }) {
  const [counter, setCounter] = useState(5);

  // Stores the Data taken from the form to the resume Data updating the state
  function printValue(val, id) {
    let newData = { ...previewData };

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

  // Gets Data from Exp, Edu adn Project Forms
  function printValueExp(val, id) {
    console.log(val);
    console.log(id);
  }

  // Returning the data from the form
  return (
    <div className="resumeEditor">
      <Personal onBtnClick={printValue} />
      <WrapBuilder
        cName="experienceWrap"
        title={"Experience Details"}
        uid={"exp1"}
        inObj={experienceInputs}
        onBtnClick={printValueExp}
      />
      <WrapBuilder
        cName="educationWrap"
        title={"Education Details"}
        uid={"ed1"}
        inObj={educationInputs}
        onBtnClick={printValueExp}
      />
      <WrapBuilder
        cName="projectsWrap"
        title={"Project Details"}
        uid={"pro1"}
        inObj={projectInputs}
        onBtnClick={printValueExp}
      />
      {/* <Skills /> */}
    </div>
  );
}

// This Function Handles the personal detail Form
function Personal({ onBtnClick }) {
  // This UseState checks on the value of inputs
  const [value, setValue] = useState({
    personName: "",
    personEmail: "",
    personNumber: "",
  });

  return (
    <form className="personalWrap">
      <h1>Personal Details</h1>
      <div>
        <label htmlFor="personName">Name: </label>
        <input
          type="text"
          id="personName"
          value={value.personName}
          onChange={(event) =>
            setValue(inputChange(event.target.value, event.target.id, value))
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
            setValue(inputChange(event.target.value, event.target.id, value))
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
            setValue(inputChange(event.target.value, event.target.id, value))
          }
        />
      </div>

      <div className="buttonWrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            setValue({
              personName: "",
              personEmail: "",
              personNumber: "",
            });
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

// Builds the wrapper for Exp, Edu and project fields
function WrapBuilder({ cName, title, uid, inObj, onBtnClick }) {
  return (
    <div className={cName}>
      <h1>{title}</h1>
      <FormInpBuilder
        uid={uid}
        inpField={Object.keys(inObj)}
        Input={inObj}
        onBtnClick={onBtnClick} //referencing the function on parent Component
      />
      <button>Add</button>
    </div>
  );
}

// This changes the input field and returns new object to change the state.
function inputChange(val, id, value) {
  let details = { ...value };
  for (const key in details) {
    if (key == id) details[key] = val;
  }
  return details;
}

// Builds the DOM for exp, edu and project form
function FormInpBuilder({ uid, inpField, Input, onBtnClick }) {
  const [value, setValue] = useState(Input);

  return (
    <form>
      {inpField.map((lab) => {
        const newID = uid + lab; // Creating a unique key

        return (
          <div key={newID}>
            <label htmlFor={newID}>{lab} : </label>
            <input
              type="text"
              id={newID}
              className={lab}
              value={value[lab] || ""}
              onChange={(event) =>
                setValue(
                  inputChange(event.target.value, event.target.className, value)
                )
              }
            ></input>
          </div>
        );
      })}

      <div className="buttonWrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            setValue(Input);
          }}
        >
          Clear All
        </button>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            //Sends the value and first 3 letters of uid (i.e : exp1 -> exp) for identification
            onBtnClick(value, uid.slice(0, 3));
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
