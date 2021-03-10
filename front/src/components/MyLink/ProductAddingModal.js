import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateNotification from "components/CreateNotification";

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ProductAddingModal = (props) => {
  // Custom hook으로 onChange하는 거 다 묶어야겠다.
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state) => state.currentCategoryReducer.currentCategory
  );

  const isVaildFormData = (data) => {
    if (data.title.value === "") {
      return false;
    }
    return true;
  };
  const handleAddLink = (e) => {
    e.preventDefault();
    const formData = e.target;
    if (isVaildFormData(formData)) {
      dispatch({
        type: "ADD_LINK_REQUEST",
        data: {
          title: formData.title.value,
          price: formData.price.value.toLocaleString(),
          link: formData.link.value,
          info: formData.info.value,
          currentCategory: currentCategory,
        },
      });

      dispatch({
        type: "RUN_CRAWLER_REQUEST",
        currentLinkTitle: formData.title.value,
        isCrawled: false,
      });
      props.onHide();
      
    } else {
      CreateNotification("error")("상품명을 입력해주세요.");
      console.log("제목 확인하셈");
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
