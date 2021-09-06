import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { requestGetCategoires } from "redux/actions/Category";
import CategoryList from "components/Category/CategoryList";
import { requestGetCards } from "redux/actions/LinkCard";
import ProductList from "components/Product/ProductList";
import LinkAddModal from "components/Modal/LinkAddModal/LinkAddModal";
import useModal from "hooks/useModal";
import CategoryTab from "components/MyLink/Category/CategoryTab";
import CardList from "components/Card/CardList";

const MyLink = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const { products } = useSelector(
    (state) => state.linkDataApiCallReducer.products
  );
  const scrollToTop = () => {
    sectionRef.current.scrollIntoView();
  };
  const { modalClose, modalOpen, isOpen } = useModal();
  const { categories, status, selectedCategoryId } = useSelector(
    (state) => state.categoryReducer
  );

  const { cards } = useSelector((state) => state.linkDataApiCallReducer);
  const { isLogined } = useSelector((state) => state.loginReducer);
  useEffect(() => {
    if (isLogined) {
      dispatch(requestGetCategoires());
    }
  }, [isLogined]);

  useEffect(() => {
    if (status === "GET_CATEGORY_SUCCESS") {
      dispatch(requestGetCards());
    }
    console.log(selectedCategoryId, status);
  }, [status]);
  return (
    <MyLinkSection id="MyLinkSection" ref={sectionRef}>
      <CategoryTab />
      <CategoryList categories={categories} />
      <CardList cards={cards} selectedCategoryId={selectedCategoryId} />
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

const MyLinkSection = styled.main`
  margin: 0 15px 0 15px;
`;
