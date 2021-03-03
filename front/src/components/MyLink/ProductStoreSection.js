import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {useSelector } from "react-redux";
import ProductAddingModal from "./ProductAddingModal";
import { ReactComponent as AddLinkImage } from "../public/addLink.svg";
import ProductCard from './ProductCard';

const ProductStoredList = styled.div`
  display: grid;
  padding: 5px;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
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
  flex: 2;
`;


const ProductStoreSection = ({ obj }) => {
  const linkDataIsCalled = useSelector(
    (state) => state.linkDataApiCallReducer.isCalled
  );
  const [modalShow, setModalShow] = useState(false);
  return (
    <StoreSectionWrapper>
      <button className="add-button" onClick={() => setModalShow(true)}>
        <AddLinkImage id="AddLinkImage" />
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
