import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProductAddingModal from "./ProductAddingModal";
import LinkAddingModal from "./LinkAddingModal";
import { ReactComponent as AddLinkImage } from "assets/addLink.svg";
import ProductCard from "./ProductCard";

const ProductStoredList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StoreSectionWrapper = styled.div`
  padding: 5px;
  flex: 1.3;
`;

const AddButtonWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
`;

const AddProductButton = styled.button`
  background-color: #f55117;
  color: white;
  border-radius: 9px;
  flex: 1;
  border: none;
`;

const ProductStoreSection = ({ categoryItems }) => {
  const [productModalShow, setProductModalShow] = useState(false);
  const [linkModalShow, setLinkModalShow] = useState(false);
  const bottomScrollRef = useRef(null);
  
  return (
    <StoreSectionWrapper id="StoreSectionWrapper">
      <AddButtonWrapper>
        <AddProductButton onClick={() => setProductModalShow(true)}>
          구매 상품 추가
        </AddProductButton>
      </AddButtonWrapper>
      <hr />
      <ProductStoredList>
        {categoryItems[Object.keys(categoryItems)]?.map((categoryItem, idx) => (
          <ProductCard
            bottomScrollRef={bottomScrollRef}
            key={idx}
            categoryItem={categoryItem}
          />
        ))}
      </ProductStoredList>
      <ProductAddingModal
        show={productModalShow}
        onHide={() => setProductModalShow(false)}
      />
      <LinkAddingModal
        show={linkModalShow}
        onHide={() => setLinkModalShow(false)}
      />

  <ScrollBottom id="scroll-bottom" ref={bottomScrollRef}></ScrollBottom>

    </StoreSectionWrapper>
  );
};

export default ProductStoreSection;
const ScrollBottom = styled.div`
  visibility:hidden;
`;

