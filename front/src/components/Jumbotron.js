import React from "react";

import { ReactComponent as JumbotronImage } from "./public/JumbotronImage.svg";
// import { ReactComponent as JumbotronImage } from "./public/jumbotron.svg";
import "./css/Header.css";

function Jumbotron() {
  return (
    <div id="jumbotron-section">
      <JumbotronImage />
      <span>save link, save time</span>
    </div>
  );
}

export default Jumbotron;
