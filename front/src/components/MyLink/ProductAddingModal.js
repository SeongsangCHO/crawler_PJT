import  React, {useState, useEffect}  from 'react';
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;


const  ProductAddingModal = (props) => {
  // Custom hook으로 onChange하는 거 다 묶어야겠다.
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    state => state.currentCategoryReducer.currentCategory
  );

  const handleAddLink = e => {
    const formData = e.target;

    e.preventDefault();
    //여기서 dispatch 수행해서 post요청해야함
    dispatch({
      type: "ADD_LINK_REQUEST",
      data: {
        title: formData.title.value,
        price: formData.price.value.toLocaleString(),
        link: formData.link.value,
        info: formData.info.value,
        currentCategory: currentCategory
      }
    });

    dispatch({
      type: "RUN_CRAWLER_REQUEST",
      currentLinkTitle: formData.title.value,
      isCrawled: false
    });

    props.onHide();
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
            <input name="title" type="text" placeholder="제목 입력"></input>
            <input name="price" type="text" placeholder="가격 입력"></input>
            <input name="link" type="text" placeholder="링크 입력"></input>
            <input name="info" type="text" placeholder="메모 입력"></input>
            <button type="submit">저장하기</button>
          </form>
        </ModalWrapper>
      </Modal.Body>
    </Modal>
  );
}

export default ProductAddingModal;