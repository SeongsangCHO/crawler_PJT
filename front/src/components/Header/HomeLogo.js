import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";

const HomeLogo = () => {
  return (
    <LogoWrapper>
      <NavLink style={{ textDecoration: "none" }} to={"/"}>
        <Logo id="LogoImage" width="50px" height="50px" alt="LOGO" />
        <TitleLink>다링</TitleLink>
      </NavLink>
    </LogoWrapper>
  );
};

export default HomeLogo;

const TitleLink = styled.span`
  color: black;
  text-decoration: "none";
  margin-left: 10px;
`;

const LogoWrapper = styled.div``;
