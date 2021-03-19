import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import CategoryTab from "../components/MyLink/CategoryTab";
import ProductTab from "../components/MyLink/ProductTab";
import { useDispatch, useSelector } from "react-redux";
import {useCookies } from 'react-cookie';
import CreateNotification from "components/CreateNotification";

const ContentWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MyLinkSection = styled.div``;
const CarouselWrapper = styled.div`
  height: 170px;
  text-align: center;
  background-color: #ffeeea;
  @media (max-width: 576px) {
    display: none;
  }
`;
const Carousel = () => {
  //제일 마지막에 구매한 순서대로 캐러셀 표현.
  //필요한 데이터 전체 카테고리
  const data = useSelector((state)=>state.linkDataApiCallReducer.data.category);
  console.log(data); // 카테고리를 추가했을 때
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
  //리랜더링 조건 + 데이터 api 호출 시점
  //로그인은 전체 데이터를 불러오는게 맞아.
  
  //전체 데이터 state가 이미 유저에 맞춰서 가져온 것이므로 state를 사용해서 분리해 할 수 있을텐데.

  //스테이트가 바뀌면 리랜더링된다.
  //
  //데이터 추가 -> 서버저장 -> 데이터업데이트(api요청) -> 리랜더링

  //데이터 추가 지점
  //크롤링수행
  //상품카드 추가
  //카테고리 추가
  const linkApiResult = useSelector((state) => state.linkDataApiCallReducer.message);
  const isLogined = useSelector((state) => state.loginReducer.isLogined); //로그인이 되었을 때
  const isAddCategory = useSelector((state)=>state.addCategoryReducer.isAddCategory); // 카테고리를 추가했을 때
  const linkCardData = useSelector((state) => state.addLinkReducer.data); // 상품카드를 저장했을 때
  const isCrawled = useSelector((state)=>state.runCrawlerReducer.isCrawled); // 크롤링을 수행했을 때
  useEffect(() => {
    dispatch({
      type: "LINK_DATA_REQUEST",
      data: {},
      message:'request',
    });

  }, [isLogined, linkCardData, isAddCategory,isCrawled]);
  return (
    <MyLinkSection id="MyLinkSection">
      <Carousel />
      <Tab.Container id="left-tabs" defaultactiveKey="All">
        <ContentWrapper id="ContentWrapper">
          <CategoryTab />
          <ProductTab />
        </ContentWrapper>
      </Tab.Container>
    </MyLinkSection>
  );
};

export default MyLink;
