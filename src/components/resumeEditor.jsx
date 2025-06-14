import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { Header } from "./header";
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
      <Header />
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
      <div className="perInp">
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

      <div className="perInp">
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

      <div className="perInp">
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
          className="clearBtn"
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
          className="saveBtn"
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
  // This state remembers every input forms
  const [compId, setCompId] = useState([InUid + 0]);

  // This Removes the form when clicked the delete button
  function rmForm(formId) {
    // Every Category of form
    const indexObj = {
      1: "EXP",
      2: "EDU",
      3: "PRO",
      4: "SKI",
    };

    let iden = ""; //Will be "EXP1" / "PRO3" etc

    // If the form to be deleted is EXP2.. it will make iden = 1... which is the index of exp in main data
    Object.keys(indexObj).forEach((ind) => {
      if (formId.slice(0, 3) == indexObj[ind]) iden = "" + ind;
    });

    let formIds = [...compId];
    let mainData = { ...previewData };

    formIds.forEach((id, index) => {
      if (formId == id) {
        // Removing the child from the children array
        mainData[iden].children = mainData[iden].children.filter(
          (element) => element !== id
        );
        formIds.splice(index, 1); //Removing from the use state
        delete mainData[id]; //deleting from main object
      }
    });

    // setting values
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
            title={title + " " + (ind + 1)}
            inpField={Object.keys(inObj)}
            Input={inObj}
            onBtnClick={onBtnClick} //referencing the function on parent Component
            onRmBtnClick={rmForm}
          />
        );
      })}

      <button
        className="addBtn"
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
  const [hideState, setHideState] = useState(true);

  function getdesValue(desVal) {
    let newVal = {...value};
    newVal["Description"] = desVal;
    setValue(newVal)
  }

  return (
    <form className="forms">
      <div className="formHeader">
        <h2 className="formTitle">{title}</h2>
        <button
          className="removeForm"
          onClick={(e) => {
            e.preventDefault();
            onRmBtnClick(uid);
          }}
        >
          <FaRegTrashAlt />
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
          {hideState && <IoIosArrowDropdown />}
          {!hideState && <IoIosArrowDropup />}
        </button>
      </div>

      {!hideState &&
        inpField.map((lab) => {
          const newID = uid + lab; // Creating a unique key

          if (lab != "Description") {
            return (
              <div key={newID} className="perInp">
                <label htmlFor={newID}>{lab} : </label>
                <input
                  type="text"
                  id={newID}
                  className={lab}
                  value={value[lab] || ""}
                  onChange={(event) =>
                    setValue(
                      inputChange(
                        event.target.value,
                        event.target.className,
                        value
                      )
                    )
                  }
                ></input>
              </div>
            );
          } else {
            return (
              <DescriptionBuilder
                key={newID}
                newId={newID}
                desVal={getdesValue}
                className="perInp"
              />
            );
          }
        })}

      {!hideState && (
        <div className="buttonWrap">
          <button
            className="clearBtn"
            onClick={(e) => {
              e.preventDefault();
              setValue(Input);
            }}
          >
            Clear All
          </button>

          <button
            type="submit"
            className="saveBtn"
            onClick={(e) => {
              e.preventDefault();
              onBtnClick(value, uid);
              setHideState(() => {
                if (hideState) return false;
                return true;
              });
            }}
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
}

// Makes Description as a Bullets
function DescriptionBuilder({ className, newId, desVal }) {
  const [desArr, setDesArr] = useState([""]);

  function DesInp(val, id) {
    const tempArr = [...desArr];
    tempArr[id] = val;
    setDesArr(tempArr);
    desVal(tempArr, newId);
  }

  function addBullet() {
    const updated = [...desArr, ""];
    setDesArr(updated);
    desVal(updated, newId);
  }

  function removeBullet(index) {
    const updated = desArr.filter((_, i) => i !== index);
    setDesArr(updated);
    desVal(updated, newId);
  }

  return (
    <div className={className}>
      <p className="desLabel">Description</p>
      {desArr.map((item, i) => (
        <div key={i} className="desInpWrap">
          <input
            type="text"
            value={item}
            className="desInp"
            onChange={(event) => {
              DesInp(event.target.value, i);
            }}
          />
          {desArr.length > 1 && (
            <button
              type="button"
              className="rmDes"
              onClick={() => removeBullet(i)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addBullet}>
        Add Bullet
      </button>
    </div>
  );
}

export default DescriptionBuilder;
