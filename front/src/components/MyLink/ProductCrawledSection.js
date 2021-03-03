import  React, {useState, useEffect}  from 'react';
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import CrawledCardSection from './CrawledCardSection';

const ProductCrawledSectionWrapper = styled.div`
  border: 0.5px solid gray;
  border-radius: 5px;
  flex-wrap: nowrap;
  flex: 1;
`;


const ProductCrawledSection = ({obj, linkDataIsCalled}) => {
  return (
    <ProductCrawledSectionWrapper id="card-tab-right-section">
    {linkDataIsCalled == true ? (
      <CrawledCardSection obj={obj} />
    ) : (
      <Spinner animation="border" variant="primary" />
    )}
    
  </ProductCrawledSectionWrapper>
  );
}

export default ProductCrawledSection;