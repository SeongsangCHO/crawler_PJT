import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateNotification from "components/CreateNotification";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import runCrawlerReducer from "redux/RunCrawler/reducer";

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ProductAddingModal = (props) => {
  // Custom hook으로 onChange하는 거 다 묶어야겠다.
  const dispatch = useDispatch();
  const linkCardData = useSelector((state) => state.linkDataApiCallReducer.data.category);//array
  const checkIsCardTitle = (title) => {
    for(let categories of linkCardData){
      for(let item of categories[Object.keys(categories)]){
        if(item.title === title){
          return false;
        }
      }
    }
    return true;
  }
  const currentCategory = useSelector(
    (state) => state.currentCategoryReducer.currentCategory
  );
  const addLinkCard = ({title, price, link, info}) => {
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
  }
  const doCrawl = (title) =>{
    dispatch({
      type: "RUN_CRAWLER_REQUEST",
      currentLinkTitle: title,
      isCrawled: false,
    });
  }
  const isVaildFormData = (data) => {
    if (data.title.value === "") {
      return false;
    }
    return true;
  };
  const handleAddLink = (e) => {
    e.preventDefault();
    const formData = e.target;
    if (isVaildFormData(formData) && checkIsCardTitle(formData.title.value)) {
      addLinkCard(formData);
      doCrawl(formData.title.value);
      props.onHide();
    } else {
      CreateNotification("error")("상품명을 입력해주세요.");
    }
    //여기서 dispatch 수행해서 post요청해야함
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
