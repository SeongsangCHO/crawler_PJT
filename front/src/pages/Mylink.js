import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import CategoryTab from "../components/MyLink/Category/CategoryTab";
import ProductTab from "../components/MyLink/ProductTab";
import { useDispatch, useSelector } from "react-redux";
import { requestGetCategoires } from "redux/actions/Category";
import CategoryList from "components/Category/CategoryList";
import {
  requestGetCards,
  requestGetLinkCardList,
  requestGetProductsList,
} from "redux/actions/LinkCard";
import ProductList from "components/Product/ProductList";
import StoredCardList from "components/Product/StoredCardList";

const MyLink = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const cardData = useSelector((state) => state.addLinkReducer.data.title);
  const { products } = useSelector(
    (state) => state.linkDataApiCallReducer.products
  );
  const scrollToTop = () => {
    sectionRef.current.scrollIntoView();
  };
  const { categories, status } = useSelector((state) => state.categoryReducer);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const { cards } = useSelector((state) => state.linkDataApiCallReducer);
  const { isLogined } = useSelector((state) => state.loginReducer);
  useEffect(() => {
    if (isLogined) {
      dispatch(requestGetCategoires());
    }
  }, [isLogined]);

  useEffect(() => {
    if (status === "GET_CATEGORY_SUCCESS") {
      setSelectedCategoryId(categories[0].id);
      // dispatch(requestGetProductsList());
      dispatch(requestGetCards());
    }
  }, [status]);
  return (
    <MyLinkSection id="MyLinkSection" ref={sectionRef}>
      <Tab.Container id="left-tabs" defaultActiveKey={cardData}>
        <ContentWrapper id="ContentWrapper">
          <CategoryTab />
          <ProductTab />
        </ContentWrapper>
      </Tab.Container>
      <CategoryList categories={categories} />
      <StoredCardList cards={cards} />
      <ProductList products={products} />
      <ScrollTopButton onClick={scrollToTop}>맨 위로</ScrollTopButton>
    </MyLinkSection>
  );
};

export default MyLink;

const ScrollTopButton = styled.a`
  position: fixed;
  bottom: 15px;
  right: 5px;
  background-color: tomato;
  color: white;
  height: 30px;
  border-radius: 5px;
  line-height: 20px;
  padding: 5px;
  cursor: pointer;
  :hover {
    color: tomato;
    background-color: white;
    text-decoration: none;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MyLinkSection = styled.div``;
