import  React, {useState, useEffect}  from 'react';
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import CrawledCardSection from './CrawledCardSection';

const ProductCrawledSectionWrapper = styled.div`
  flex-wrap: nowrap;
  flex: 1;
`;


const ProductCrawledSection = ({obj}) => {
  const linkDataIsCalled = useSelector(
    (state) => state.linkDataApiCallReducer.isCalled
  );
  return (
    <ProductCrawledSectionWrapper id="card-tab-right-section">
    {linkDataIsCalled ? (
      <CrawledCardSection obj={obj} />
    ) : (
      <h5>검색결과를 받아오는 중 입니다..</h5>
    )}
    
  </ProductCrawledSectionWrapper>
  );
}

export default ProductCrawledSection;