import "/src/styles/header.css";

export function Header() {

  return (
    <div className="headerHolder">
      <div className="mainHeader">
        <h1 className="logo">ResumeBuilder</h1>
        <div className="headerBtn">
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="gitBtn">Github</button>
          </a>

          <button className="printBtn">
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
