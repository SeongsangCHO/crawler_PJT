import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  width:100%;
  background-color: aqua;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  bottom:0;
  left:0;
`;


function Footer() {
  return <FooterWrapper>Footer</FooterWrapper>;
}

export default Footer;
