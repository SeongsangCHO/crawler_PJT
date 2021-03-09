import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import CategoryTab from "../components/MyLink/CategoryTab";
import ProductTab from "../components/MyLink/ProductTab";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import Footer from "components/Footer";

const ContentWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MyLinkSection = styled.div`
`;
const CarouselWrapper = styled.div`
  height: 170px;
  text-align: center;
  background-color: #ffeeea;
  @media (max-width: 576px){
    display:none;
  }
`
const Carousel = () => {
  return (
    <CarouselWrapper>
      <div className="title">나만의 링크를 저장하세요</div>
      <br />
      <div className="subtitle">ㅇㅅㅇ;</div>
    </CarouselWrapper>
  );
};

const MyLink = () => {
  const dispatch = useDispatch();
  const currentLinkTitle = useSelector(
    (state) => state.runCrawlerReducer.currentLinkTitle
  );

  const linkData = useSelector((state) => state.linkDataApiCallReducer.data);
  const currentLink = useSelector((state) => state.addLinkReducer.data.link);
  const currentTitle = useSelector((state) => state.addLinkReducer.data.title);
  const currentCategory = useSelector(
    (state) => state.addCategoryReducer.category
  );
  const isReloaded = useSelector((state) => state.reloadReducer.isReloaded);
  const linkTitle = useSelector((state) => state.reloadReducer.linkTitle);
  useEffect(() => {

    //dispatch수행해서 리랜더링될 때 , axios로 api호출
  }, []); //linkData가 서버에서 받아오는 데이터
  useEffect(() => {
    //dispatch수행해서 리랜더링될 때 , axios로 api호출
    dispatch({
      type: "LINK_DATA_REQUEST",
      data: {},
      isCalled: false,
    });
  }, [
    currentCategory,
    currentLink,
    currentTitle,
    currentLinkTitle,
    isReloaded,
    linkTitle,
  ]);
  return (
    <MyLinkSection id="MyLinkSection">
      <Carousel />
      <Tab.Container id="left-tabs" defaultactiveKey="All">
        <ContentWrapper id="ContentWrapper">
          <CategoryTab obj={linkData} />
          <ProductTab obj={linkData} />
        </ContentWrapper>
      </Tab.Container>
    </MyLinkSection>
  );
};

export default MyLink;
