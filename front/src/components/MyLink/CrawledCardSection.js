import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const SortButton = styled.button`
  width: 100%;
  background-color: #feeeea;
  border-radius: 5px;
  color: #df7861;
  border: none;
  margin-right: 5px;
  .active {
    background-color: black;
  }
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
  border: 1px solid gray;
  border-radius: 5px;
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
const priceComma = (price) => {
  if (price === "") {
    return "-";
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
};

const getBadgeStyle = (source) => {
  let badgeStyle = "";
  if (source === "naver") {
    badgeStyle = "success";
  } else if (source === "coupang") {
    badgeStyle = "primary";
  } else {
    badgeStyle = "warning";
  }
  return badgeStyle;
};

const parsePrice = (item) => {
  if (typeof item.price === "string" && item.price.includes("원")) {
    item.price = parseInt(
      item.price.slice(0, item.price.indexOf("원")).split(",").join("")
    );
  }
};

const CrawledCard = ({ crawledData }) => {
  let { link, imgsrc, title, price } = crawledData;
  if (title.length > 15) {
    title = title.slice(0, 15) + "...";
  }

  return (
    <div>
      <TitleLink target="_blank" href={link}>
        <ProductImage src={imgsrc} />
        {title}
      </TitleLink>
      <PriceSpan>{priceComma(price)}</PriceSpan>
    </div>
  );
};

const CrawlCardList = ({ item }) => {
  return (
    <CrawledCardBox key={item.title}>
      <BadgeDiv>
        <Badge pill variant={() => getBadgeStyle(item.source)}>
          {item.source.toUpperCase()}
        </Badge>
      </BadgeDiv>
      <CrawledCard crawledData={item}></CrawledCard>
    </CrawledCardBox>
  );
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
    const { crawl } = element;
    setSortToggle("desc");
    //데이터 sort해서 그 값을 상태로 전달해주어야함.
    crawl.map((item) => {
      parsePrice(item);
    });
    crawl.sort((a, b) => a.price - b.price);
  };

  const onPriceSort = (element) => {
    const { crawl } = element;
    crawl.map((item) => {
      parsePrice(item);
    });
    if (sortToggle === "desc") {
      crawl.sort((a, b) => a.price - b.price);
      setSortToggle("asc");
    } else {
      crawl.sort((a, b) => b.price - a.price);
      setSortToggle("desc");
    }
    //데이터 sort해서 그 값을 상태로 전달해주어야함.
    crawl.map((item) => {
      parsePrice(item);
    });
  };

  const onPriceSortDesc = (element) => {
    const { crawl } = element;
    setSortToggle("asc");
    crawl.map((item) => {
      parsePrice(item);
    });
    crawl.sort((a, b) => b.price - a.price);
  };
  return (
    <>
      {obj[Object.keys(obj)]?.map((element, idx) => (
        <>
          <CardWrapper
            eventKey={element.title}
            key={element.title}
            unmountOnExit={true}
          >
            <div>
              <SortButton onClick={() => onPriceSort(element)}>
                {sortToggle === "desc" ? (
                  <FontAwesomeIcon icon={faAngleDown} />
                ) : (
                  <FontAwesomeIcon icon={faAngleUp} />
                )}
                <span style={{ marginLeft: "5px" }}>정렬</span>
              </SortButton>
            </div>
            <div></div>
            <div></div>
            {element.crawl.map((item, idx) => (
              <CrawlCardList id={idx} item={item} />
            ))}
          </CardWrapper>
        </>
      ))}
    </>
  );
}
export default CrawledCardSection;

const CardWrapper = styled(Tab.Pane)`
  display: grid;
  padding: 5px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
