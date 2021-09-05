import React, { useEffect, useState, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavList id="nav-bar-NavList">
      <li>
        <StyledNavLink to={"/"} exact>
          Home
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to={"/mylink"}>mylink</StyledNavLink>
      </li>
    </NavList>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  width: 100%;
  flex-direction: row;
`;

const NavList = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  margin-left: 15px;
  & li + li {
    margin-left: 15px;
  }
`;

const StyledNavLink = styled(NavLink)``;
