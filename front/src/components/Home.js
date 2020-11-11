import React from "react";
import { ReactComponent as JumbotronImage } from "./public/jumbotron.svg";
import "./css/Header.css";
import MainContent from './MainContent';

function Home() {
  return (
    <div id="home-wrapper">
      <div id="jumbotron-section">
        <JumbotronImage id="jumbotron" />
        <span id="jumbotron-sentence">save link, save time</span>
      </div>
      <MainContent/>
    </div>
  );
}

export default Home;
