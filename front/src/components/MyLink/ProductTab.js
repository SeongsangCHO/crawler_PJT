import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import "./ProductTab.scss";

const ProductTabWrapper = styled.div`
  flex: 4;
`;

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
