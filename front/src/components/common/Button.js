import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ children, ...restProps }) => {
  return <CommonButton {...restProps}>{children}</CommonButton>;
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;

const CommonButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  text-align: center;
`;
