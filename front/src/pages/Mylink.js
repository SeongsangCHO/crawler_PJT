import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import CategoryTab from "../components/MyLink/Category/CategoryTab";
import ProductTab from "../components/MyLink/ProductTab";
import { useDispatch, useSelector } from "react-redux";

const MyLink = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const cardData = useSelector((state) => state.addLinkReducer.data.title);
  const linkData = useSelector((state) => state.linkDataApiCallReducer.data);
  const isLogined = useSelector((state) => state.loginReducer.isLogined); //로그인이 되었을 때
  const isAddCategory = useSelector(
    (state) => state.addCategoryReducer.isAddCategory
  ); // 카테고리를 추가했을 때
  const isReloaded = useSelector((state) => state.reloadReducer.isReloaded); // 상품카드를 저장했을 때
  const isCrawled = useSelector((state) => state.runCrawlerReducer.isCrawled); // 크롤링을 수행했을 때
  const scrollToTop = () => {
    console.log("click");
    sectionRef.current.scrollIntoView();
  };
  useEffect(() => {
    if (linkData === null || isCrawled || isAddCategory || isReloaded)
      dispatch({
        type: "LINK_DATA_REQUEST",
        data: {},
        isCalled: false,
        message: "request",
      });
  }, [isLogined, isAddCategory, isCrawled, isReloaded]);

  return (
    <MyLinkSection id="MyLinkSection" ref={sectionRef}>
      <Tab.Container id="left-tabs" defaultActiveKey={cardData}>
        <ContentWrapper id="ContentWrapper">
          <CategoryTab />
          <ProductTab />
        </ContentWrapper>
      </Tab.Container>
      <ScrollTopButton onClick={scrollToTop}>맨 위로</ScrollTopButton>
    </MyLinkSection>
  );
};

export default MyLink;

const ScrollTopButton = styled.a`
  position: fixed;
  bottom: 15px;
  right: 5px;
  background-color: tomato;
  color: white;
  height: 30px;
  border-radius: 5px;
  line-height: 20px;
  padding: 5px;
  cursor: pointer;
  :hover {
    color: tomato;
    background-color: white;
    text-decoration: none;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MyLinkSection = styled.div``;
