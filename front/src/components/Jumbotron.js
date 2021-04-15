import React from "react";

import { ReactComponent as JumbotronImage } from "./public/JumbotronImage.svg";
// import { ReactComponent as JumbotronImage } from "./public/jumbotron.svg";
import "./css/Header.css";

function Jumbotron() {
  return (
    <div id="jumbotron-section">
      <JumbotronImage />
      <span>자주 사는 상품을 링크로 관리하세요</span>
    </div>
  );
}

export default Jumbotron;
