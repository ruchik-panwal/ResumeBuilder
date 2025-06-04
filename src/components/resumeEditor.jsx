import "/src/styles/resumeEditor.css";

export function ResumeEditor() {
  return (
    <div className="resumeEditor">
      <PersonalDetails />
    </div>
  );
}

function clearBtn(e) {
  e.preventDefault();
}

function PersonalDetails() {
  return (
    <form>
      <h1>Personal Details</h1>
      <div>
        <label htmlFor="personName">Name: </label>
        <input type="text" id="personName" />
      </div>

      <div>
        <label htmlFor="personEmail">Email: </label>
        <input type="email" id="personEmail" />
      </div>

      <div>
        <label htmlFor="personNumber">Contact: </label>
        <input type="text" id="personNumber" />
      </div>

      <div className="buttonWrap">
        <button onClick={clearBtn}>Clear All</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
