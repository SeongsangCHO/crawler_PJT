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

  return (
    <CardTabWrapper>
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content style={{ display: "flex" }}>
            <ProductStoreSection obj={obj}></ProductStoreSection>
            <ProductCrawledSection
              obj={obj}
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
  const isLogined = useSelector((state) => state.loginReducer.isLogined);

  useEffect(() => {
    //dispatch수행해서 리랜더링될 때 , axios로 api호출
    dispatch({
      type: "LINK_DATA_REQUEST",
      data: {},
      isCalled: false,
    });
  }, [isLogined]);
  return (
    <ProductTabWrapper>
      <Tab.Content>
        {linkData?.category?.map((cate, idx) => (
          <Tab.Pane eventKey={Object.keys(cate)} key={idx} unmountOnExit={true}>
            <CardTab obj={cate} />
          </Tab.Pane>
        ))}
      </Tab.Content>
    </ProductTabWrapper>
  );
};

export default ProductTab;
