import React from "react";
import styled from "styled-components";

const TopScrollButton = ({ moveId }) => {
  return <ScrollTopButton href={`#${moveId}`}>맨 위로</ScrollTopButton>;
};

TopScrollButton.propTypes = {};

export default TopScrollButton;

const ScrollTopButton = styled.a`
  position: fixed;
  bottom: 15px;
  right: 5px;
  background-color: tomato;
  color: white;
  height: 30px;
  border-radius: 5px;
  line-height: 20px;
  padding: 5px;
  cursor: pointer;
  :hover {
    color: tomato;
    background-color: white;
    text-decoration: none;
  }
`;
