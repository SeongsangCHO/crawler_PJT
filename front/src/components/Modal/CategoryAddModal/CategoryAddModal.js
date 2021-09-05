import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Portal from "components/Portal/Portal";
import Button from "components/common/Button";

const CategoryAddModal = ({ modalClose, modalOpen, isOpen }) => {
  const [categoryData, setCategoryData] = useState("");
  const dispatch = useDispatch();
  const handleSetCategory = (e) => {
    setCategoryData(e.target.value);
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_CATEGORY_REQUEST",
      category: categoryData,
      isAddCategory: false,
    });
  };
  const handleClose = (e) => {
    const { id } = e.target;
    if (id === "dim") {
      modalClose();
    }
  };
  return (
    <Portal onClick={handleClose}>
      <Container>
        <h1 id="contained-modal-title-vcenter">
          <h4>관리할 링크의 카테고리를 만드세요</h4>
        </h1>
        <CategoryInput
          onChange={handleSetCategory}
          autoFocus
          type="text"
          placeholder="카테고리 입력"
          required
        ></CategoryInput>
        <ButtonContainer>
          <CloseButton onClick={modalClose}>닫기</CloseButton>
          <AddButton onClick={handleAddCategory} type="submit">
            저장
          </AddButton>
        </ButtonContainer>
      </Container>
    </Portal>
  );
};

export default CategoryAddModal;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const AddButton = styled(Button)`
  margin-left: 15px;
  width: 50px;
`;
const CloseButton = styled(Button)`
  width: 50px;
`;
const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1em;
  position: absolute;
  left: 50%;
  top: 22%;
  transform: translate(-50%, -50%);
`;
const InputContainer = styled.div``;
const CategoryInput = styled.input`
  width: 100%;
  margin: 15px 0 15px;
`;
