import React, { useState, useEffect } from "react";
import SectionTitle from "../components/MyLink/SectionTitle";
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
    console.log(isReloaded);
    console.log(linkTitle);
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
    <div className="content-wrapper">
      <Header />

      <SectionTitle />
      <Tab.Container id="left-tabs" defaultactiveKey="All">
        <ContentWrapper>
          <CategoryTab obj={linkData} />
          <ProductTab obj={linkData} />
        </ContentWrapper>
      </Tab.Container>
      <Footer />
    </div>
  );
};

export default MyLink;
