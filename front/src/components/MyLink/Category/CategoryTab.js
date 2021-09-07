import React, { useEffect } from "react";
import styled from "styled-components";
import CategoryAddModal from "components/Modal/CategoryAddModal/CategoryAddModal";
import useModal from "hooks/useModal";
import CreateNotification from "../../common/CreateNotification";
import { useSelector } from "react-redux";
import Button from "components/common/Button";

const CategoryWrapper = styled.div`
  padding: 5px;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const CategoryTab = () => {
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
      <CategoryAddButton onClick={modalOpen}>카테고리 추가</CategoryAddButton>
      <hr />
      {isOpen && (
        <CategoryAddModal modalOpen={modalOpen} modalClose={modalClose} />
      )}
    </CategoryWrapper>
  );
};

export default CategoryTab;

const CategoryAddButton = styled(Button)`
  margin-bottom: 5px;
`;
