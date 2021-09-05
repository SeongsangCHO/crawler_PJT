import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateNotification from "components/CreateNotification";
import moment from "moment";
import "moment-timezone";

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ProductAddingModal = (props) => {
  // Custom hook으로 onChange하는 거 다 묶어야겠다.
  const dispatch = useDispatch();
  const linkCardData = useSelector(
    (state) => state.linkDataApiCallReducer.data.category
  ); //array
  const checkIsCardTitle = (title) => {
    for (let categories of linkCardData) {
      for (let item of categories[Object.keys(categories)]) {
        if (item.title === title) {
          return true;
        }
      }
    }
    return false;
  };
  const currentCategory = useSelector(
    (state) => state.currentCategoryReducer.currentCategory
  );
  const addLinkCard = ({ title, price, link, info }) => {
    dispatch({
      type: "ADD_LINK_REQUEST",
      data: {
        title: title.value,
        price: price.value.toLocaleString(),
        link: link.value,
        info: info.value,
        currentCategory: currentCategory,
        registerTime: moment()._d,
      },
    });
  };
  const doCrawl = (title) => {
    dispatch({
      type: "RUN_CRAWLER_REQUEST",
      currentLinkTitle: title,
      isCrawled: false,
    });
  };
  const isVaildFormData = (data) => {
    if (data.title.value === "") {
      return false;
    }
    return true;
  };
  const handleAddLink = (e) => {
    e.preventDefault();
    const formData = e.target;
    const isDouble = checkIsCardTitle(formData.title.value);
    const isVaild = isVaildFormData(formData);
    if (isVaild && !isDouble) {
      addLinkCard(formData);
      doCrawl(formData.title.value);
      props.onHide();
      CreateNotification("info")(`${formData.title.value}에 대한 검색을 시작합니다.`);
    } else {
      if (isDouble) {
        CreateNotification("error")("상품명이 이미 카테고리에 있습니다.");
      }
      if (!isVaild) {
        CreateNotification("error")("입력을 확인해주세요.");
      }
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>링크를 만드세요</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalWrapper>
          <form onSubmit={handleAddLink}>
            <input type="hidden" placeholder={currentCategory}></input>
            <input name="title" type="text" placeholder="구매한 상품명"></input>
            <input name="price" type="text" placeholder="구매 가격"></input>
            <input name="link" type="text" placeholder="구매 링크"></input>
            <input name="info" type="text" placeholder="메모"></input>
            <button type="submit">저장하기</button>
          </form>
        </ModalWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default ProductAddingModal;
