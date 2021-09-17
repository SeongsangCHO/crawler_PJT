import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import styled from "styled-components";
import ProductStoreSection from "./ProductStoreSection";
import ProductCrawledSection from "./ProductCrawledSection";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";


const ProductTabWrapper = styled.div`
  flex: 4;
`;



function CardTab({ categoryItems }) {

  return (
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content >
            <ProductStoreSection categoryItems={categoryItems}></ProductStoreSection>
            <ProductCrawledSection
              obj={categoryItems}
            />
          </Tab.Content>
        </Nav>
      </Tab.Container>
  );
}

const ProductTab = ({ obj }) => {
  const linkData = useSelector((state) => state.linkDataApiCallReducer.data);

  return (
    <ProductTabWrapper>
      <Tab.Content>
        {linkData?.category?.map((categoryItems, idx) => (
          <Tab.Pane eventKey={Object.keys(categoryItems)} key={idx} unmountOnExit={true}>
            <CardTab categoryItems={categoryItems} />
          </Tab.Pane>
        ))}
      </Tab.Content>
    </ProductTabWrapper>
  );
};

export default ProductTab;
