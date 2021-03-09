import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {useSelector } from "react-redux";
import ProductAddingModal from "./ProductAddingModal";
import { ReactComponent as AddLinkImage } from "assets/addLink.svg";
import ProductCard from './ProductCard';

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


const ProductStoreSection = ({ obj }) => {
  const linkDataIsCalled = useSelector(
    (state) => state.linkDataApiCallReducer.isCalled
  );
  const [modalShow, setModalShow] = useState(false);
  return (
    <StoreSectionWrapper id="StoreSectionWrapper">
      <button className="add-button" onClick={() => setModalShow(true)}>
        검색 및 구매 상품 추가
        {/* <AddLinkImage id="AddLinkImage" /> */}
      </button>
      <hr />
      <ProductStoredList>
        {obj[Object.keys(obj)]?.map((element) => (
          <ProductCard element={element} />
        ))}
      </ProductStoredList>
      <ProductAddingModal show={modalShow} onHide={() => setModalShow(false)} />
    </StoreSectionWrapper>
  );
};

export default ProductStoreSection;
