import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";

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
  min-height: 135px;
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
  if (title.length > 15) {
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
          </BadgeDiv>
          <CrawledCard crawledData={naverElement}></CrawledCard>
        </CrawledCardBox>
      ))}
    </>
  );
};

const CrawlCardList = ({ item }) => {
  const getBadgeStyle = () => {
    let badgeStyle = "";
    if (item.source === "naver") {
      badgeStyle = "success";
    } else if (item.source === "coupang") {
      badgeStyle = "primary";
    } else {
      badgeStyle = "warning";
    }
    return badgeStyle;
  };
  return (
    <CrawledCardBox key={item.title}>
      <BadgeDiv>
        <Badge pill variant={getBadgeStyle()}>
          {item.source.toUpperCase()}
        </Badge>
      </BadgeDiv>
      <CrawledCard crawledData={item}></CrawledCard>
    </CrawledCardBox>
  );
};
const parsePrice = (item) => {
  if (typeof item.price === "string" && item.price.includes("원")) {
    item.price = parseInt(
      item.price.slice(0, item.price.indexOf("원")).split(",").join("")
    );
  }
};

function CrawledCardSection({ obj }) {
  const { isReloaded, linkTitle } = useSelector((state) => state.reloadReducer);
  console.log("rerender");
  const [reloadTitle, setReloadTitle] = useState("");
  const [sortToggle, setSortToggle] = useState("");
  useEffect(() => {
    if (isReloaded) {
      setReloadTitle(linkTitle);
    }
  }, [isReloaded]);

  const onPriceSortAsc = (element) => {
    setSortToggle("desc");
    //데이터 sort해서 그 값을 상태로 전달해주어야함.
    const { crawl } = element;
    crawl.map((item) => {
      parsePrice(item);
    });
    crawl.sort((a, b) => a.price - b.price);
  };

  const onPriceSortDesc = (element) => {
    setSortToggle("asc");
    const { crawl } = element;
    crawl.map((item) => {
      parsePrice(item);
    });
    crawl.sort((a, b) => b.price - a.price);
  };
  return (
    <CrawledCardSectionWrapper id="crawl-card-wrapper">
      {obj[Object.keys(obj)]?.map((element, idx) => (
        <Tab.Pane
          eventKey={element.title}
          key={element.title}
          unmountOnExit={true}
        >
          <button onClick={() => onPriceSortAsc(element)}>
            가격 낮은순 정렬
          </button>
          <button onClick={() => onPriceSortDesc(element)}>
            가격 높은순 정렬
          </button>
          {element.crawl.map((item) => (
            <CrawlCardList item={item} />
          ))}
          {/* <SsgCard element={element} />
          <CoupangCard element={element} />
          <NaverCard element={element} /> */}
        </Tab.Pane>
      ))}
    </CrawledCardSectionWrapper>
  );
}
export default CrawledCardSection;
