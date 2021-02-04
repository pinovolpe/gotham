import React from "react";
import AccordionApp from "./informazioni";

const Home = () => {
  return (
    <div>
      <h1>Il carcere di Gotham City</h1>
      {/* <img src={"./logo.png"} className="App-logo" alt="logo" /> */}
      <img
        src={"./arkham-asylum.jpg"}
        className="arkham-asylum"
        alt="Arkham Asylum"
      />
      <AccordionApp />
    </div>
  );
};

export default Home;
