import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Portal from "components/Portal/Portal";
import Button from "components/common/Button";
import AddModalTemplate from "../AddModalTemplate";

const CategoryAddModal = ({ modalClose }) => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const dispatch = useDispatch();
  const handleSetCategory = (e) => {
    setCategoryTitle(e.target.value);
  };
  const handleAddCategory = (e) => {
    dispatch({
      type: "ADD_CATEGORY_REQUEST",
      category: categoryTitle,
      isAddCategory: false,
    });
    modalClose();
  };
  const handleClose = (e) => {
    const { id } = e.target;
    if (id === "dim") {
      modalClose();
    }
  };
  const handleInputKey = (e) => {
    if (e.key === "Escape") {
      modalClose();
    }
    if (e.key === "Enter" && categoryTitle) {
      dispatch({
        type: "ADD_CATEGORY_REQUEST",
        category: categoryTitle,
        isAddCategory: false,
      });
      modalClose();
    }
  };
  return (
    <Portal onClick={handleClose}>
      <AddModalTemplate>
        <h4>관리할 링크의 카테고리를 만드세요</h4>
        <CategoryInput
          onKeyDown={handleInputKey}
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
      </AddModalTemplate>
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
// const Container = styled.div`
//   background-color: white;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   padding: 1em;
//   position: absolute;
//   left: 50%;
//   top: 22%;
//   transform: translate(-50%, -50%);
// `;
// const InputContainer = styled.div``;
const CategoryInput = styled.input`
  width: 100%;
  margin: 15px 0 15px;
`;
