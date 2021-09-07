import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Badge from "components/common/Badge";
// {
//   "id": 5031,
//   "links_id": 398,
//   "title": "32",
//   "price": "119960",
//   "priority": "1",
//   "source": "ssg",
//   "link": "http://www.ssg.com/item/itemView.ssg?itemId=1000212542683&siteNo=7014&salestrNo=6005&tlidSrchWd=%EC%83%88%EC%95%B6%EC%95%A0%EC%9E%AC32&srchPgNo=1&src_area=ssglist",
//   "imgsrc": "//item.ssgcdn.com/83/26/54/item/1000212542683_i1_232.jpg"
// }
const CrawlItem = ({ item }) => {
  return (
    <Container id={item.id}>
      <BrandBadge className={item.source}>
        {item.source.toUpperCase()}
      </BrandBadge>
      <Image src={item.imgsrc}></Image>
      <PriceText>{parseInt(item.price).toLocaleString()}</PriceText>
    </Container>
  );
};

CrawlItem.propTypes = {};

export default CrawlItem;

const Container = styled.li`
  @media screen and (max-width: 768px) {
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const PriceText = styled.span``;

const BrandBadge = styled(Badge)`
  .ssg {
  }
  .coupang {
  }
  .naver {
  }
`;
