import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateNotification from "components/common/CreateNotification";
import moment from "moment";
import "moment-timezone";

const LinkAddingModal = (props) => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state) => state.currentCategoryReducer.currentCategory
  );

  const isVaildFormData = (data) => {
    if (data.title.value === "" || data.link.value === "") {
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
          price: "",
          link: formData.link.value,
          info: formData.info.value,
          currentCategory: currentCategory,
          registerTime: moment()._d,
        },
      });

      props.onHide();
    } else {
      CreateNotification("error")("제목 또는 링크를 입력해주세요.");
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
            <input
              name="title"
              type="text"
              placeholder="북마크할 링크 제목"
            ></input>
            <input name="link" type="text" placeholder="저장 링크"></input>
            <input name="info" type="text" placeholder="메모"></input>
            <button type="submit">저장하기</button>
          </form>
        </ModalWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default LinkAddingModal;
const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;
