import React from "react";
import styled from "styled-components";
const AddModalTemplate = ({ children }) => {
  return <Container>{children}</Container>;
};

AddModalTemplate.propTypes = {};

export default AddModalTemplate;

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1em;
  position: absolute;
  left: 50%;
  top: 22%;
  transform: translate(-50%, -50%);
`;
