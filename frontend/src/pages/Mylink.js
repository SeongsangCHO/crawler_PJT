import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { requestGetCategoires } from "redux/actions/Category";
import CategoryList from "components/Category/CategoryList";
import { requestGetCards } from "redux/actions/LinkCard";
import ProductList from "components/Product/ProductList";
import CategoryAddButton from "components/Category/CategoryAddButton";
import CardList from "components/Card/CardList";
import Spinner from "components/common/Spinner";
import useSpinner from "hooks/useSpinner";
import useModal from "hooks/useModal";
import CrawlListModal from "components/Modal/CrawlListModal/CrawlListModal";
import { GET_CRAWL_DATA_LIST_REQUEST } from "redux/actions/ActionType";

const MyLink = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSpinner();
  const { products } = useSelector(
    (state) => state.linkDataApiCallReducer.products
  );
  const { isOpen, modalOpen, modalClose } = useModal();
  const { categories, status, selectedCategoryId } = useSelector(
    (state) => state.categoryReducer
  );

  const { cards, selectedCardData } = useSelector(
    (state) => state.linkDataApiCallReducer
  );
  const { isLogined } = useSelector((state) => state.loginReducer);
  useEffect(() => {
    if (isLogined) {
      dispatch(requestGetCategoires());
    }
  }, [isLogined]);

  useEffect(() => {
    if (status === "SUCCESS") {
      dispatch(requestGetCards());
    }
  }, [status]);
  useEffect(() => {
    if (selectedCardData.id !== -1) {
      dispatch({
        type: GET_CRAWL_DATA_LIST_REQUEST,
        id: selectedCardData.id,
      });
      modalOpen();
    }
  }, [selectedCardData]);
  return (
    <MyLinkSection id="MyLinkSection">
      <CategoryAddButton />
      <CategoryList categories={categories} />
      <CardList cards={cards} selectedCategoryId={selectedCategoryId} />
      <ProductList products={products} />
      {isLoading && <Spinner />}
      {isOpen && (
        <CrawlListModal
          title={selectedCardData.title}
          modalClose={modalClose}
        />
      )}
    </MyLinkSection>
  );
};

export default MyLink;

const MyLinkSection = styled.main`
  margin: 0 15px 0 15px;
`;
