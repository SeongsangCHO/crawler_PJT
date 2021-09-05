import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.querySelector("#modal-root");

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, modalRoot);
};

export default Portal;
