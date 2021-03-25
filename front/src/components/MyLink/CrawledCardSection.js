import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

const CrawledCardSectionWrapper = styled.div`
  border-radius: 5px;
  padding: 5px;
  height: 100%;
`;

const SsgBadge = styled.span`
  display: inline;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #000;
  background-color: #f6ae14;
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;
`;
const CrawledCardBox = styled.div`
  border: 1px solid #000;
`;
const BadgeDiv = styled.div``;
const TitleLink = styled.a`
  display: block;
  font-size: 13px;
  min-height:135px;
`;
const PriceSpan = styled.span`
  font-size: 14px;
`;
const ProductImage = styled.img`
  border-radius: 13px;
  width: 100%;
  height: auto;
`;
const CrawledCardWrapper = styled.div`
  padding: 5px;
`;
const CrawledCard = ({ crawledData }) => {
  let { link, imgsrc, title, price } = crawledData;
  if (title.length > 15){
    title = title.slice(0, 15) + "...";
  }
  return (
    <CrawledCardWrapper>
      <TitleLink target="_blank" href={link}>
        <ProductImage src={imgsrc} />

        {title}
      </TitleLink>
      <PriceSpan>{price}</PriceSpan>
    </CrawledCardWrapper>
  );
};

const CoupangCard = ({ element }) => {
  return (
    <>
      {element.coupang.map((coupangElement) => (
        <CrawledCardBox key={coupangElement.title}>
          <BadgeDiv>
            <Badge pill variant="primary">
              COUPANG
            </Badge>
          </BadgeDiv>
          <CrawledCard crawledData={coupangElement}></CrawledCard>
        </CrawledCardBox>
      ))}
    </>
  );
};
const SsgCard = ({ element }) => {
  return (
    <>
      {element.ssg.map((ssgElement, idx) => (
        <CrawledCardBox key={ssgElement.title}>
          <BadgeDiv>
            <SsgBadge pill variant="warning">
              SSG
            </SsgBadge>
          </BadgeDiv>
          <CrawledCard crawledData={ssgElement}></CrawledCard>
        </CrawledCardBox>
      ))}
    </>
  );
};
const NaverCard = ({ element }) => {
  return (
    <>
      {element.naver.map((naverElement) => (
        <CrawledCardBox key={naverElement.title}>
          <BadgeDiv>
            <Badge pill variant="success">
              NAVER
            </Badge>
            <CrawledCard crawledData={naverElement}></CrawledCard>
          </BadgeDiv>
        </CrawledCardBox>
      ))}
    </>
  );
};


function CrawledCardSection({ obj }) {


  const onPriceSort = (element) =>{
    //데이터 sort해서 그 값을 상태로 전달해주어야함.
    const {coupang, naver, ssg} = element;
    console.log(element);
    naver.map((item) => {
      if (item.price.includes("원")){
        item.price = parseInt(item.price.slice(0, item.price.indexOf("원")).split(',').join(''));
        console.log(item.price);
      }
    })
    let sorted = naver.sort((a, b) => a.price - b.price);
    console.log(sorted);
    const crawlData = [coupang, naver, ssg];
    console.log(crawlData);
  }
  return (
    <CrawledCardSectionWrapper id="crawl-card-wrapper">
      {obj[Object.keys(obj)]?.map((element, idx) => (
        <Tab.Pane
          eventKey={element.title}
          key={element.title}
          unmountOnExit={true}
        >
          <button onClick={()=>onPriceSort(element)}>가격순 정렬</button>
          <SsgCard element={element} />
          <CoupangCard element={element} />
          <NaverCard element={element} />
        </Tab.Pane>
      ))}
    </CrawledCardSectionWrapper>
  );
}
export default CrawledCardSection;
