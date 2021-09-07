import React from "react";
import styled from "styled-components";

const Badge = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Badge;

const Wrapper = styled.div`
  display: inline;
  padding: 5px;
  border-radius: 5px;
`;
