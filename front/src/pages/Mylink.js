import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionTitle from './components/SectionTitle';
import styled from "styled-components";

const CrawlContentWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const MyLink = () => {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <SectionTitle/>
        <Tab.Container id="left-tabs" defaultactiveKey="All">
          <CrawlContentWrapper>
            <CategoryTab obj={linkData} />
            <LinkCardSection obj={linkData} />
          </CrawlContentWrapper>
        </Tab.Container>
      </div>

      <Footer />
    </>
  );
};

export default MyLink;
