import React from "react";
import styled from "styled-components";

const InputLabel = ({ children }) => {
  return <Label>{children}</Label>;
};

export default InputLabel;

const Label = styled.label`
  font-size: 0.7em;
`;
