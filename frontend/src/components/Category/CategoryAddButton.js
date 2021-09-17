import React, { useEffect } from "react";
import styled from "styled-components";
import CategoryAddModal from "components/Modal/CategoryAddModal/CategoryAddModal";
import useModal from "hooks/useModal";
import CreateNotification from "components/common/CreateNotification";
import { useSelector } from "react-redux";
import Button from "components/common/Button";
import { Shadow } from "styles/mixin";

const CategoryWrapper = styled.div`
  padding: 5px;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const CategoryAddButton = () => {
  const { modalOpen, modalClose, isOpen } = useModal();
  const isAddCategory = useSelector(
    (state) => state.categoryReducer.isAddCategory
  );
  useEffect(() => {
    if (isAddCategory === true) {
      CreateNotification("success")("카테고리 추가");
    }
  }, [isAddCategory]);

  return (
    <CategoryWrapper>
      <CategoryAddBtn onClick={modalOpen}>카테고리 추가</CategoryAddBtn>
      <hr />
      {isOpen && (
        <CategoryAddModal modalOpen={modalOpen} modalClose={modalClose} />
      )}
    </CategoryWrapper>
  );
};

export default CategoryAddButton;

const CategoryAddBtn = styled(Button)`
  margin-bottom: 5px;
  ${Shadow}
  background-color: white;
  transition: 0.2s;
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
