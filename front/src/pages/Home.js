import React from "react";
import { ReactComponent as JumbotronImage } from "assets/jumbotron.svg";

function Home() {
  return (
    <div id="home-wrapper">
      <div id="jumbotron-section">
        <JumbotronImage id="jumbotron" />
        <span id="jumbotron-sentence">자주 사는 상품을 링크로 관리하세요</span>
      </div>
    </div>
  );
}

export default Home;
