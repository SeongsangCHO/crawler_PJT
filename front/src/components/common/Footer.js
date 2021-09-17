import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  bottom: 0;
  color: white;
  margin: 0;
`;

function Footer() {
  return <FooterWrapper></FooterWrapper>;
}

export default Footer;
