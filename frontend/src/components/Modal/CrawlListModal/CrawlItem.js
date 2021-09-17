import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Badge from "components/common/Badge";
import { Shadow } from "styles/mixin";
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
const CrawlItem = ({ item, selectedCardData }) => {
  const [isCheapThanCard, setIsCheapThanCard] = useState(false);
  const [diffPrice, setDiffPrice] = useState(null);
  useEffect(() => {
    getPriceDiff();
  }, []);
  const getPriceDiff = () => {
    if (
      isNaN(parseInt(selectedCardData.price)) ||
      isNaN(parseInt(item.price))
    ) {
      return "가격비교 불가";
    }
    const diff = parseInt(item.price) - parseInt(selectedCardData.price);
    if (diff > 0) {
      setIsCheapThanCard(false);
    } else {
      setIsCheapThanCard(true);
    }
    setDiffPrice(Math.abs(diff));
  };
  return (
    <Container id={item.id}>
      <ProductImageWrapper>
        <BrandBadge>
          <BrandText className={item.source}>
            {item.source.toUpperCase()}
          </BrandText>
        </BrandBadge>
        <a href={item.link} target="_blank">
          <Image src={item.imgsrc} />
        </a>
      </ProductImageWrapper>
      <ProductDetail>
        <ProductTitle>{item.title}</ProductTitle>
        <PriceDiffText className={isCheapThanCard ? "cheap" : "expensive"}>
          {`저장상품보다 ${diffPrice?.toLocaleString()}원 ${
            isCheapThanCard ? "저렴합니다" : "비쌉니다"
          }`}
        </PriceDiffText>
        <ProductPrice className={item.source}>
          {parseInt(item.price).toLocaleString()}원
        </ProductPrice>
      </ProductDetail>
    </Container>
  );
};

CrawlItem.propTypes = {};

export default CrawlItem;

const PriceDiffText = styled.span`
  margin-top: 5px;
  font-size: 12px;
  &.cheap {
    color: green;
  }
  &.expensive {
    color: red;
  }
`;
const ProductImageWrapper = styled.div`
  text-align: center;
`;

const ProductDetail = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const ProductTitle = styled.span`
  display: block;
  font-size: 14px;
`;

const Container = styled.li`
  padding: 5px;
  transition: 0.6s;
  width: 100%;
  border-radius: 8px;
  ${Shadow}
  & + & {
    margin-top: 10px;
  }

  &:hover {
    /* font-size: 1.2em; */
    /* width: calc(100% + 15px); */
    height: calc(100% + 15px);
  }
`;

const Image = styled.img`
  transition: 0.2s;
  width: 200px;
  height: 200px;
  object-fit: fill;
  &:hover {
    width: 240px;
    height: 240px;
  }
  /* position: absolute; */
`;

const ProductPrice = styled.span`
  display: block;
  font-size: 1.2em;
  margin-top: 10px;
  &.ssg {
    color: ${({ theme }) => theme.colors.ssgYellow};
  }
  &.coupang {
    color: ${({ theme }) => theme.colors.coupangBlue};
  }
  &.naver {
    color: ${({ theme }) => theme.colors.naverGreen};
  }
`;

const BrandBadge = styled(Badge)`
  text-align: center;
  margin-bottom: 5px;
`;

const BrandText = styled.span`
  text-align: center;
  color: white;
  padding: 5px;
  border-radius: 8px;
  &.ssg {
    background-color: ${({ theme }) => theme.colors.ssgYellow};
  }
  &.coupang {
    background-color: ${({ theme }) => theme.colors.coupangBlue};
  }
  &.naver {
    background-color: ${({ theme }) => theme.colors.naverGreen};
  }
`;
