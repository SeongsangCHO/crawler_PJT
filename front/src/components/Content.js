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
import "./css/Content.css";

const dummy = [
  {
    생필품: [
      {
        음료수: {
          link: "naver",
          price: "3000",
          info: "걍 정보,,",
          크롤링데이터: {
            link: "크롤링네이버",
            price: "크롤링가갹",
            info: "크롤링정보",
          },
        },
        탄산수: {
          link: "쿠팡",
          price: "50050",
          info: "더미데이터의 중요성",
          크롤링데이터: {
            link: "크롤링탄산수",
            price: "크롤링탄산수가격",
            info: "크롤링탄산수정보",
          },
        },
      },
    ],
    옷: [
      {
        후드티: {
          link: "더미데이터 ㅠㅠ",
          price: "억만금을 줘야해",
          info: "그치..?",
        },
        패딩: {
          link: "패딩스",
          price: "백원",
          info: "좋음",
        },
      },
    ],
  },
];
const categoryList = [
  {
    id: 1,
    title: "생필품",
  },
  {
    id: 2,
    title: "옷",
  },
  {
    id: 3,
    title: "강의",
  },
];

const linkList = [
  {
    생필품: [
      {
        id: 1,
        title: "음료수",
        link: "naver.com",
        price: "3000",
        info: "그냥 추가정보",
      },
      {
        id: 2,
        title: "탄산수",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 3,
        title: "쌀",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 4,
        title: "샴푸",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 5,
        title: "고기",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 6,
        title: "햇반",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 7,
        title: "고무",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
    ],
  },
  {
    옷가지: [
      {
        id: 1,
        title: "옷",
        link: "naver.com",
        price: "3000",
        info: "그냥 추가정보",
      },
      {
        id: 2,
        title: "후드티",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
    ],
  },
];
const crawlingList = [
  {
    음료수: [
      {
        id: 1,
        link: "www.머시깽이링크.com",
        price: "뭔가격",
      },
      {
        id: 2,
        link: "www.코카콜라.com",
        price: "만언",
      },
      {
        id: 3,
        link: "www.펩시.com",
        price: "십원",
      },
    ],
    탄산수: [
      {
        id: 1,
        link: "www.탄산수.com",
        price: "탄산수가격",
      },
    ],
    쌀: [],
    샴푸: [],
    고기: [],
    햇반: [],
    고무: [],
    옷: [],
    후드티: [],
  },
];
//styled component color은 hex code
const ContentWrapper = styled.div`
  display: flex;
  background: #fff;
  flex-direction: row;
  padding: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 4;
  background: #fff;

  @media (max-width: 768px) {
    flex: 1;
  }
`;
const TabContent = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const TabCateorySection = styled.div`
  flex: 1;
`;
const TabCardSection = styled.div`
  padding-left: 15px;
  flex: 7;
`;
const RightSection = styled.div`
  flex: 1;
  background: #00bb00;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const TabWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const LinkCardWrapper = styled.div`
  flex: 1;
`;
function CategoryTab() {
  return (
    <Nav variant="pills" className="flex-column">
      {categoryList?.map((v, idx) => (
        <Nav.Item>
          <Nav.Link eventKey={idx}>{v.title}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

const CardTest = styled.div`
  display: inline;
`;
//링크카드가 각각 nav link가 되고,
//이에 따른 right Section에 오는게 tab.pane이 되어야함
//defalut키는 없어도됨.
function LinkCard({ element }) {
  const { id, title, price, link, info } = element;
  return (
    <div className="link-card">
      <div className="card-title">{element.title}</div>
      <div className="cart-content">{element.link}</div>
    </div>
  );
}

//반복문으로 링크만들어야할듯
function TestSection() {
  return (
    <>
      <Tab.Pane eventKey={0} unmountOnExit="true">
        <LinkCardWrapper>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            {linkList?.map((obj, idx) =>
              obj[Object.keys(obj)].map((element, id) => (
                // 이부분 카드형식으로 묶기
                <LinkCard element={element} />
              ))
            )}
          </Tab.Container>
        </LinkCardWrapper>
      </Tab.Pane>
    </>
  );
}
function Test() {
  return <Nav.Item></Nav.Item>;
}
function TabSection() {
  return (
    <>
      {linkList?.map((obj, idx) =>
        obj[Object.keys(obj)].map((element, id) => (
          // 이부분 카드형식으로 묶기
          <Tab.Pane eventKey={idx} unmountOnExit="true">
            <LinkCardWrapper>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <LinkCard element={element} />
                {/* <Test element={element} /> */}
              </Tab.Container>
            </LinkCardWrapper>
          </Tab.Pane>
        ))
      )}
    </>
  );
}

function LinkContent() {
  return (
    <Tab.Content>
      <TabWrapper>
        {/* <TabSection /> */}
        <TestSection />
      </TabWrapper>
    </Tab.Content>
  );
}

function Content() {
  return (
    <ContentWrapper>
      <LeftSection>
        <Tab.Container id="tab" defaultActiveKey="0">
          <TabContent>
            <TabCateorySection>
              <CategoryTab />
            </TabCateorySection>
            <TabCardSection>
              <LinkContent />
            </TabCardSection>
          </TabContent>
        </Tab.Container>
      </LeftSection>
      <RightSection>RightSection</RightSection>
    </ContentWrapper>
  );
}

export default Content;
