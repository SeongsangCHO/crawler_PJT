import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";

const HomeLogo = () => {
  return (
    <LogoWrapper>
      <NavLink to={"/"}>
        <Logo alt="LOGO" id="home-logo" />
        <TitleLink>다링</TitleLink>
      </NavLink>
    </LogoWrapper>
  );
};

export default HomeLogo;

const TitleLink = styled.span`
  color: black;
  text-decoration: "none";
  font-size: 1em;
  position: absolute;
  top: 2em;
`;

const LogoWrapper = styled.div`
  & #home-logo {
    width: 50px;
    height: 50px;
  }
`;
