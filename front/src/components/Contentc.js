import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import TabContainer from "react-bootstrap/TabContainer";
import "./css/Contentc.css";

const dummy =
  //사용자가 추가할 category
  {
    category: [
      {
        생필품: [
          {
            title: "생수",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "생수 크롤링제목",
              크롤링링크: "생수 크롤링 링크",
              크롤링가격: "생수 크롤링가격",
            },
          },
          {
            title: "탄산수",
            link: "탄산수 링크",
            price: "탄산수  가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "탄산수 크롤링제목",
              크롤링링크: "탄산수 크롤링 링크",
              크롤링가격: "탄산수 크롤링가격",
            },
          },
          {
            title: "1",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "생수 크롤링제목",
              크롤링링크: "생수 크롤링 링크",
              크롤링가격: "생수 크롤링가격",
            },
          },
          {
            title: "2",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "생수 크롤링제목",
              크롤링링크: "생수 크롤링 링크",
              크롤링가격: "생수 크롤링가격",
            },
          },
          {
            title: "3",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "생수 크롤링제목",
              크롤링링크: "생수 크롤링 링크",
              크롤링가격: "생수 크롤링가격",
            },
          },
          {
            title: "4",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "생수 크롤링제목",
              크롤링링크: "생수 크롤링 링크",
              크롤링가격: "생수 크롤링가격",
            },
          },
          {
            title: "5",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "생수 크롤링제목",
              크롤링링크: "생수 크롤링 링크",
              크롤링가격: "생수 크롤링가격",
            },
          },
        ],
      },
      {
        옷: [
          {
            title: "후드티",
            link: "후드티 링크",
            price: "후드티 가격",
            info: "정보",
            크롤링데이터: {
              크롤링제목: "후드티 크롤링제목",
              크롤링링크: "후드티 크롤링 링크",
              크롤링가격: "후드티 크롤링가격",
            },
          },
          {
            title: "자켓",
            link: "자켓 링크",
            price: "자켓  가격",
            info: "자켓정보자켓정보자켓정보자켓정보자켓정보자켓정보",
            크롤링데이터: {
              크롤링제목: "자켓 크롤링제목",
              크롤링링크: "자켓 크롤링 링크",
              크롤링가격: "자켓 크롤링가격",
            },
          },
        ],
      },
    ],
  };
const CategoryWrapper = styled.div`
  border: 1px solid black;
  padding: 5px;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;
const CardWrapper = styled.div`
  border: 1px solid black;
  display: grid;
  padding: 5px;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const CardTabLeftSection = styled.div`
  border: 1px solid black;

  flex: 2;
`;

const CardTabRightSection = styled.div`
  border: 1px solid black;

  flex: 1;
`;

const CrawlingCardWrapper = styled.div`
  border: 1px solid black;
  padding: 5px;
`;
const ContentWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const LinkCardSectionWrapper = styled.div`
  flex: 4;
`;
const ProductCardWrapper = styled.div`
  min-height: 150px;
  height: 100%;
`;
function CategoryTab({ obj }) {
  return (
    <CategoryWrapper>
      <Nav variant="pills" className="flex-sm-column">
        {obj.category.map((cate, idx) => (
          <Nav.Item className="nav-item-card">
            <Nav.Link eventKey={Object.keys(cate)}>
              {Object.keys(cate)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </CategoryWrapper>
  );
}

function CrawlingCard({ obj }) {
  return (
    <CrawlingCardWrapper>
      {obj[Object.keys(obj)]?.map((element, id) => (
        <Tab.Pane
          eventKey={element.title}
          key={element.title}
          unmountOnExit="true"
        >
          <div>{element.크롤링데이터.크롤링제목}</div>
        </Tab.Pane>
      ))}
    </CrawlingCardWrapper>
  );
}

const PriceDetail = styled.div`
  
`;

const InfoDetail = styled.div`
  
`;
const LinkDetail = styled.div`
  
`;
const CardDetail = styled.div`
  
`;
function ProductCard({ element }) {
  return (
    <ProductCardWrapper>
      <Nav.Item>
        <Nav.Link
          justify="true"
          className="nav-link-style"
          eventKey={element.title}
        >
          {element.title}
        </Nav.Link>
        <CardDetail>
          <PriceDetail>가격: {element.price}</PriceDetail>
          <InfoDetail>내가입력: {element.info}</InfoDetail>
          <LinkDetail>link: {element.link}</LinkDetail>
        </CardDetail>
      </Nav.Item>
    </ProductCardWrapper>
  );
}
const CardTabWrapper = styled.div``;
function CardTab({ obj }) {
  return (
    <CardTabWrapper>
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content style={{ display: "flex" }}>
            <CardTabLeftSection>
              <CardWrapper>
                {obj[Object.keys(obj)]?.map((element) => (
                  <ProductCard element={element} />
                ))}
              </CardWrapper>
            </CardTabLeftSection>

            <CardTabRightSection>
              <CrawlingCard obj={obj} />
            </CardTabRightSection>
          </Tab.Content>
        </Nav>
      </Tab.Container>
    </CardTabWrapper>
  );
}

function LinkCardSection({ obj }) {
  return (
    <LinkCardSectionWrapper>
      <Tab.Content defaultActiveKey="0">
        {obj?.category?.map((cate, idx) => (
          <Tab.Pane eventKey={Object.keys(cate)} key={idx} unmountOnExit="true">
            <CardTab obj={cate} />
          </Tab.Pane>
        ))}
      </Tab.Content>
    </LinkCardSectionWrapper>
  );
}

function Contentc() {
  //categoryTab / LinkCard : 1 : 4로 나누기 // OK
  //LinkCard에서  래퍼 flex지정하고 , tabContent를 3 : 2로 나누기
  // 카드탭은,,컨테이너 안에, 컨텐츠 안에 개별적인 아이템이 있음
  //먼저 CardTab의 탭컨텐츠를 카드, 크롤링데이터 영역으로 나눠야함
  //CardTab의 탭컨텐츠 위에 wrapper flex지정,
  //NavItem반복 상위에 flex3지정, display: grid 1fr 1fr 1fr정하기
  //크롤링카드 에 flex 2 지정
  //CardTab의 Tab.컨텐츠를 grid로하고 1fr, 1fr,1fr씩하면 3등분될듯
  //여기서 데이터를 가져와서 props로 전달?
  return (
    <div className="content-wrapper">
      <Tab.Container
        id="left-tabs"
        defaultActiveKey={Object.keys(dummy?.category[0])}
      >
        <ContentWrapper>
          <CategoryTab obj={dummy} />
          <LinkCardSection obj={dummy} />
        </ContentWrapper>
      </Tab.Container>
    </div>
  );
}

export default Contentc;
