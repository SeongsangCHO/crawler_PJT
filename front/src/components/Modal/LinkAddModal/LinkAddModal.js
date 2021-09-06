import React from "react";
import Portal from "components/Portal/Portal";
import AddModalTemplate from "../AddModalTemplate";
import styled from "styled-components";
import Button from "components/common/Button";
import { useDispatch } from "react-redux";
import moment from "moment";

const LinkAddModal = ({ modalClose, selectedCategoryId }) => {
  const dispatch = useDispatch();
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
    if (e.key === "Enter") {
      modalClose();
    }
  };

  const handleStoreClick = (e) => {
    e.preventDefault();
    const formData = e.target;
    console.log(formData.title.value);
    dispatch({
      type: "ADD_LINK_REQUEST",
      data: {
        title: formData.title.value,
        price: formData.price.value,
        link: formData.link.value,
        info: formData.info.value,
        categoryId: selectedCategoryId,
        // currentCategory: currentCategory,
        registerTime: moment()._d,
      },
    });
  };
  return (
    <Portal onClick={handleClose}>
      <AddModalTemplate>
        <form onSubmit={handleStoreClick}>
          <InputContainer>
            <input
              name="title"
              placeholder="상품 이름"
              required
              autoFocus
            ></input>
            <input
              name="price"
              placeholder="가격 예) 20000"
              required
              type="number"
            ></input>
            <input name="link" placeholder="링크"></input>
            <input name="info" placeholder="한줄 평"></input>
          </InputContainer>
          <ButtonContainer>
            <CloseButton onClick={modalClose}>닫기</CloseButton>
            <AddButton type="submit">저장</AddButton>
          </ButtonContainer>
        </form>
      </AddModalTemplate>
    </Portal>
  );
};

export default LinkAddModal;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  & input {
    border-radius: 5px;
    padding: 5px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 15px;
`;
const AddButton = styled(Button)`
  margin-left: 15px;
  width: 50px;
`;
const CloseButton = styled(Button)`
  width: 50px;
`;
