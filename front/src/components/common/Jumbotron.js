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

const Container = styled.main`
  display: flex;
  max-width: 768px;
  margin: 0 auto;
`;

const ImageWrapper = styled.div``;

const HeaderText = styled.h1`
  display: block;
  margin-top: 15px;
  font-size: 24px;
  white-space: nowrap;
`;
