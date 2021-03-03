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


function CardTab({ obj }) {
  const linkDataIsCalled = useSelector(
    (state) => state.linkDataApiCallReducer.isCalled
  );
  const [modalShow, setModalShow] = useState(false);
  return (
    <CardTabWrapper>
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content style={{ display: "flex" }}>
            <ProductStoreSection obj={obj}></ProductStoreSection>
            <ProductCrawledSection
              obj={obj}
              linkDataIsCalled={linkDataIsCalled}
            />
          </Tab.Content>
        </Nav>
      </Tab.Container>
    </CardTabWrapper>
  );
}

const ProductTab = ({ obj }) => {
  return (
    <ProductTabWrapper>
      <Tab.Content>
        {obj?.category?.map((cate, idx) => (
          <Tab.Pane eventKey={Object.keys(cate)} key={idx} unmountOnExit={true}>
            <CardTab obj={cate} />
          </Tab.Pane>
        ))}
      </Tab.Content>
    </ProductTabWrapper>
  );
};

export default ProductTab;
