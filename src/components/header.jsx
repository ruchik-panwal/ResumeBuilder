import "/src/styles/header.css";
import { printStyle } from "./printStyle";

// Contains and functions the header; with github link and print Button
export function Header() {
  // Prints the content inside the a4Preview Div
  function printDiv() {
    // Selecting
    const printContent = document.querySelector(".a4Preview");

    if (!printContent) {
      //Checking for the Div
      alert("No content found to print.");
      return;
    }

    // making a Windw which will contain the div
    const printWindow = window.open("", "", "width=800,height=600");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Preview</title>
            <style>
        body {
          font-family: 'Roboto', sans-serif;
        }
      </style>
            <style>${printStyle}</style>
          </head>
          <body>
          <div class="a4Preview">
            ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `);

      // Closing the window and then Printing
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }

  return (
    <div className="headerHolder">
      <div className="mainHeader">
        <h1 className="logo">ResumeBuilder</h1>
        <div className="headerBtn">
          {/* Github Linking :) */}
          <a
            href="https://github.com/ruchik-panwal/ResumeBuilder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="gitBtn">Github</button>
          </a>

          {/* Print Button*/}
          <button className="printBtn" onClick={printDiv}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
