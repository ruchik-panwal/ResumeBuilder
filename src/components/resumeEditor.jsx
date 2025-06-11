import { useState } from "react";
import "/src/styles/resumeEditor.css";

import {
  educationInputs,
  experienceInputs,
  projectInputs,
  skillInput,
} from "./mainData";

// Creates Dom for all the Inputs and exports the main data to App.jsx which then transfer it to Preview Component
export function ResumeEditor({ getResumeData, previewData }) {
  // Gets Data from Exp, Edu adn Project Forms
  function printValueExp(val, id) {
    let newData = { ...previewData }; //Temp variable

    // Data for comparing dynamically
    const indexObj = {
      1: "EXP",
      2: "EDU",
      3: "PRO",
      4: "SKI",
    };
    newData[id] = val; // Adds or replaces the object

    // adds the address of the object to the main object Childres
    Object.keys(indexObj).forEach((cId) => {
      //Iterating indexObj
      if (id.slice(0, 3) == indexObj[cId]) {
        //If ("EXP" == "EXP")
        if (!newData[cId].children.find((ele) => ele == id)) {
          // if the id does not exist in children
          newData[cId].children.push(id); // push it
        }
      }
    });

    getResumeData(newData); //Updating state
  }

  // Returning the data from the form
  return (
    <div className="resumeEditor">
      {/* creating and getting personal Data */}
      <Personal onBtnClick={printValueExp} />

      {/* All the other multiple inputs */}
      <WrapBuilder
        cName="experienceWrap"
        title={"Experience Details"}
        InUid={"EXP"}
        inObj={experienceInputs}
        onBtnClick={printValueExp}
        getResumeData={getResumeData}
        previewData={previewData}
      />
      <WrapBuilder
        cName="educationWrap"
        title={"Education Details"}
        InUid={"EDU"}
        inObj={educationInputs}
        onBtnClick={printValueExp}
        getResumeData={getResumeData}
        previewData={previewData}
      />
      <WrapBuilder
        cName="projectsWrap"
        title={"Project Details"}
        InUid={"PRO"}
        inObj={projectInputs}
        onBtnClick={printValueExp}
        getResumeData={getResumeData}
        previewData={previewData}
      />
      <WrapBuilder
        cName="skillsWrap"
        title={"Skills Details"}
        InUid={"SKI"}
        inObj={skillInput}
        onBtnClick={printValueExp}
        getResumeData={getResumeData}
        previewData={previewData}
      />
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
          onChange={
            (event) =>
              setValue(inputChange(event.target.value, event.target.id, value))
            // Controling the input Fiels
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
            // clears the state and puts defaulr
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
            onBtnClick(value, "PER");
            // sends the value objedt and type of data when submited
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
}

// Builds the wrapper for Exp, Edu and project fields
function WrapBuilder({
  cName,
  title,
  InUid,
  inObj,
  onBtnClick,
  getResumeData,
  previewData,
}) {
  const [compId, setCompId] = useState([InUid + 0]);

  function rmForm(formId) {
    let formIds = [...compId];
    let mainData = { ...previewData };

    formIds.forEach((id, index) => {
      if (formId == id) {
        formIds.splice(index, 1);
        delete mainData[id];
      }
    });
    setCompId(formIds);
    getResumeData(mainData);
  }

  return (
    <div className={cName}>
      <h1>{title}</h1>

      {compId.map((uid, ind) => {
        return (
          <FormInpBuilder
            key={uid}
            uid={uid}
            title={title + (ind + 1)}
            inpField={Object.keys(inObj)}
            Input={inObj}
            onBtnClick={onBtnClick} //referencing the function on parent Component
            onRmBtnClick={rmForm}
          />
        );
      })}

      <button
        onClick={(e) => {
          e.preventDefault();
          const tempId = [...compId];
          tempId.push(InUid + compId.length);
          setCompId(tempId);
        }}
      >
        Add
      </button>
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
function FormInpBuilder({
  uid,
  inpField,
  Input,
  title,
  onBtnClick,
  onRmBtnClick,
}) {
  const [value, setValue] = useState(Input);
  const [hideState, setHideState] = useState(false);

  return (
    <form>
      <div className="formHeader">
        <h2 className="formTitle">{title}</h2>
        <button
          className="removeForm"
          onClick={(e) => {
            e.preventDefault();
            onRmBtnClick(uid);
          }}
        >
          Remove
        </button>

        <button
          className="hideForm"
          onClick={(e) => {
            e.preventDefault();
            setHideState(() => {
              if (hideState) return false;
              return true;
            });
          }}
        >
          {hideState && <>Un Hide</>}
          {!hideState && <>Hide</>}
        </button>
      </div>

      {!hideState && inpField.map((lab) => {
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
            onBtnClick(value, uid);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
