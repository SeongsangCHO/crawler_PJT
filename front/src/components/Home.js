import React from "react";
import { ReactComponent as JumbotronImage } from "./public/jumbotron.svg";
import "./css/Header.css";

function Home() {
  return (
    <div id="home-wrapper">
      <div id="jumbotron-section">
        <JumbotronImage />
        <span>save link, save time</span>
      </div>
    </div>
  );
}

export default Home;
