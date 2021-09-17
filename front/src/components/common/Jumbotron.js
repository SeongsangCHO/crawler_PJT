import React from "react";
import styled from "styled-components";
import { ReactComponent as JumbotronImage } from "assets/jumbotron.svg";

function Jumbotron() {
  return (
    <Container id="jumbotron-section">
      <ImageWrapper>
        <JumbotronImage />
      </ImageWrapper>
      <HeaderText>자주 사는 상품을 링크로 관리하세요</HeaderText>
    </Container>
  );
}

export default Jumbotron;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  gap: 30px;
  @media screen and (max-width: 768px) {
    & {
      flex-direction: column;
    }
  }
`;

const ImageWrapper = styled.div``;

const HeaderText = styled.h1`
  display: block;
  margin-top: 15px;
  font-size: 24px;
  white-space: nowrap;
`;
