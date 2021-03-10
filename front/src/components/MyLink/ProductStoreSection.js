import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProductAddingModal from "./ProductAddingModal";
import LinkAddingModal from "./LinkAddingModal";
import { ReactComponent as AddLinkImage } from "assets/addLink.svg";
import ProductCard from "./ProductCard";

const ProductStoredList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StoreSectionWrapper = styled.div`
  padding: 5px;
  flex: 1.3;
`;

const AddButtonWrapper = styled.div`
  display: flex;
  padding:0 5px 0 5px;
  box-sizing: border-box;
`;

const AddProductButton = styled.button`
  background-color: #F55117;
  color: white;
  border-radius: 9px;
  flex: 1;
  border:none;
  margin-right:10px;
`;

const AddLinkButton = styled.button`
  background-color: #F55117;
  color: white;
  border-radius: 9px;
  flex: 1;
  border:none;
`;

const ProductStoreSection = ({ categoryItems }) => {
  const [productModalShow, setProductModalShow] = useState(false);
  const [linkModalShow, setLinkModalShow] = useState(false);

  return (
    <StoreSectionWrapper id="StoreSectionWrapper">
      <AddButtonWrapper>
        <AddProductButton onClick={() => setProductModalShow(true)}>
          구매 상품 추가
          {/* <AddLinkImage id="AddLinkImage" /> */}
        </AddProductButton>
        <AddLinkButton onClick={() => setLinkModalShow(true)}>
          링크 추가
          {/* <AddLinkImage id="AddLinkImage" /> */}
        </AddLinkButton>
      </AddButtonWrapper>
      <hr />
      <ProductStoredList>
        {categoryItems[Object.keys(categoryItems)]?.map((categoryItem, idx) => (
          <ProductCard key={"ProductCard-" + idx} categoryItem={categoryItem} />
        ))}
      </ProductStoredList>
      <ProductAddingModal show={productModalShow} onHide={() => setProductModalShow(false)} />
      <LinkAddingModal show={linkModalShow} onHide={()=> setLinkModalShow(false)}/>
    </StoreSectionWrapper>
  );
};

export default ProductStoreSection;
