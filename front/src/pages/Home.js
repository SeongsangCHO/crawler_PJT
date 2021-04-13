import React from "react";
import { ReactComponent as JumbotronImage } from "assets/jumbotron.svg";
import MainContent from '../components/MainContent';
import Header from '../components/Header';

function Home() {
  return (
    <div id="home-wrapper">
      <div id="jumbotron-section">
        <JumbotronImage id="jumbotron" />
        <span id="jumbotron-sentence">Save link, Save time</span>
      </div>
      {/* <MainContent/> */}
    </div>
  );
}

export default Home;
