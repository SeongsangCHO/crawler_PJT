import React, { useEffect, useState, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const NavList = styled.ul`
  display: flex;
  line-height: 50px;
  width: 100%;
  list-style: none;
  padding-left: 2em;
  font-size: 1em;

  & li + li {
    margin-left: 15px;
  }
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  transition: 0.2s;
  &:hover {
    font-weight: bold;
    &:before {
      content: "";
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -5px;
      border-bottom: 1px solid white;
    }
  }
`;
