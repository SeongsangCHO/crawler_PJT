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

const CardTabWrapper = styled.div``;


function CardTab({ categoryItems }) {

  return (
    <CardTabWrapper>
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content style={{ display: "flex" }}>
            <ProductStoreSection categoryItems={categoryItems}></ProductStoreSection>
            <ProductCrawledSection
              obj={categoryItems}
            />
          </Tab.Content>
        </Nav>
      </Tab.Container>
    </CardTabWrapper>
  );
}

const ProductTab = ({ obj }) => {
  const dispatch = useDispatch();
  const linkData = useSelector((state) => state.linkDataApiCallReducer.data);
  console.log(linkData);
  useEffect(() => {
    console.log('**********Product Tab rendered ************');
  })
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
