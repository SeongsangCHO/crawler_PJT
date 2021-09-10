import React from "react";
import styled from "styled-components";

const Badge = ({ children, ...restProps }) => {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

export default Badge;

const Wrapper = styled.div`
  padding: 5px;
  border-radius: 5px;
`;
