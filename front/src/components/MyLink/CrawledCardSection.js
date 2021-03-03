import  React, {useState, useEffect}  from 'react';
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";


const CrawledCardWrapper = styled.div`
  border: 0.1px solid gray;
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
const CrawledCardList = styled.div`
  border: 1px solid #000;
`;
const BadgeDiv = styled.div``;
const TitleLink = styled.a`
  dispaly: block;
  font-size: 13px;
  text-align: center;
`;
const PriceSpan = styled.span`
  font-size: 14px;
`;
const ProductImage = styled.img`
  border-radius: 13px;
  width: 100%;
  height: auto;
`;
const CrawledCard = ({ crawledData }) => {
  const { link, imgsrc, title, price } = crawledData;
  return (
    <>
      <TitleLink target="_blank" href={link}>
        <ProductImage src={imgsrc} />

        {title}
      </TitleLink>
      <div>
        <PriceSpan>{price}</PriceSpan>
      </div>
    </>
  );
};

function CrawledCardSection({ obj }) {

  return (
    <CrawledCardWrapper id="crawl-card-wrapper">
      {obj[Object.keys(obj)]?.map((element, idx) => (
        <Tab.Pane
          eventKey={element.title}
          key={element.title}
          unmountOnExit="true"
        >

          {element.ssg.map((ssgElement, idx) => (
            <CrawledCardList key={ssgElement.title}>
              <BadgeDiv>
                <SsgBadge pill variant="warning">
                  SSG
                </SsgBadge>
              </BadgeDiv>
              <CrawledCard crawledData={ssgElement}></CrawledCard>
            </CrawledCardList>
          ))}
          {element.coupang.map(coupangElement => (
            <CrawledCardList key={coupangElement.title}>
              <BadgeDiv>
                <Badge pill variant="primary">
                  COUPANG
                </Badge>
              </BadgeDiv>
              <CrawledCard crawledData={coupangElement}></CrawledCard>

            </CrawledCardList>
          ))}
          {element.naver.map(naverElement => (
            <CrawledCardList key={naverElement.title}>
              <BadgeDiv>
                <Badge pill variant="success">
                  NAVER
                </Badge>
                <CrawledCard crawledData={naverElement}></CrawledCard>

              </BadgeDiv>
            </CrawledCardList>
          ))}
        </Tab.Pane>
      ))}
    </CrawledCardWrapper>
  );
}
export default CrawledCardSection;