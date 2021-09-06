import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { requestGetCategoires } from "redux/actions/Category";
import CategoryList from "components/Category/CategoryList";
import { requestGetCards } from "redux/actions/LinkCard";
import ProductList from "components/Product/ProductList";
import StoredCardList from "components/Card/StoredCardList";
import LinkAddModal from "components/Modal/LinkAddModal/LinkAddModal";
import useModal from "hooks/useModal";
import CategoryTab from "components/MyLink/Category/CategoryTab";

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
      <CategoryTab></CategoryTab>
      <CategoryList categories={categories} />
      {selectedCategoryId !== -1 && (
        <button onClick={modalOpen}>구매했던 상품링크 추가하기</button>
      )}
      <StoredCardList cards={cards} />
      <ProductList products={products} />
      {isOpen && (
        <LinkAddModal
          selectedCategoryId={selectedCategoryId}
          modalClose={modalClose}
        />
      )}
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
