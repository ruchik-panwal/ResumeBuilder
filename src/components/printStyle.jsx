// The CSS For the Print Window
// Similar to preview css but Vite has issue with css after build so here it is

export const printStyle = `
  h1, 
  h2,
  h3,
  h4,
  p,
  li,
  ul {
    margin: 0;
    padding: 0;
  }

  @page {
    size: A4;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .a4Preview {
    height: 100%;
    width: 100%;
    background-color: white;
    position: sticky;
    top: 10vh;
    box-sizing: border-box;
    padding: 2vh 2vw;
    display: flex;
    flex-direction: column;
    gap: 2vh;
  }

  .a4Preview p {
    font-size: 16px;
  }

  ul {
    padding: 0;
    margin: 0;
    font-size: 15px;
    list-style-position: inside;
  }

  .perDetails {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .perDetails h1 {
    font-family: sans-serif;
    font-size: 24px;
  }

  .perDetails p {
    font-size: 16px;
  }

  .perDetails div {
    display: flex;
    gap: 1vh;
  }

  .detailsHeader {
    font-weight: 400;
    font-size: 22px;
    width: 100%;
    border-style: solid;
    border-width: 0 0 2px 0;
  }

  .wraps {
    display: flex;
    align-items: baseline;
    gap: 0.6vh;
  }

  .mainTitle {
    font-size: 21px;
  }

  p.dash {
    font-size: 20px;
    font-weight: 150;
  }

  .eduTWrap {
    justify-content: space-between;
  }

  .date {
    margin-left: auto;
    font-style: italic;
  }

  .workExp,
  .projWrap {
    display: flex;
    flex-direction: column;
    gap: 0.4vh;
  }

  .expDetails,
  .proDetails,
  .eduDetails,
  .skiDetails {
    display: flex;
    flex-direction: column;
    gap: 0.7vh;
  }

  .hello {
    display: flex;
    flex-direction: column;
    gap: 0.2vh;
  }

  .stackTitle {
    font-weight: 700;
  }
`;
