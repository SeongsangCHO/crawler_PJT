import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

const CategoryModal = (props) => {
  useEffect(() => {}, []);
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
    props.onHide();
  };
  return (
    <StyledModal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <StyledModal.Header closeButton>
        <StyledModal.Title id="contained-modal-title-vcenter">
          <h4>관리할 링크의 카테고리를 만드세요</h4>
        </StyledModal.Title>
      </StyledModal.Header>
      <StyledModal.Body>
        <InputContainer>
          <CategoryInput
            onChange={handleSetCategory}
            autoFocus
            type="text"
            placeholder="카테고리 입력"
            required
          ></CategoryInput>
          <button onClick={handleAddCategory} type="submit">
            저장
          </button>
        </InputContainer>
      </StyledModal.Body>
    </StyledModal>
  );
};

export default CategoryModal;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CategoryInput = styled.input`
  width: 90%;
`;
const StyledModal = styled(Modal)``;
