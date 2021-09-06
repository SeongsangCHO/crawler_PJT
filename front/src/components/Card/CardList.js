import LinkAddModal from "components/Modal/LinkAddModal/LinkAddModal";
import useModal from "hooks/useModal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CardItem from "./CardItem";

const CardList = ({ cards, selectedCategoryId }) => {
  const { filteredCards } = useSelector(
    (state) => state.linkDataApiCallReducer
  );
  const { modalOpen, modalClose, isOpen } = useModal();
  return (
    <Wrapper>
      <CardListWrapper>
        {filteredCards?.map((card) => (
          <CardItem card={card} key={card.id}></CardItem>
        ))}
      </CardListWrapper>
      {isOpen && (
        <LinkAddModal
          selectedCategoryId={selectedCategoryId}
          modalClose={modalClose}
        />
      )}
      {selectedCategoryId !== -1 && (
        <AddButton onClick={modalOpen}>+</AddButton>
      )}
    </Wrapper>
  );
};

CardList.propTypes = {};

export default CardList;

const Wrapper = styled.section`
  padding: 10px;
  background-color: aliceblue;
  position: relative;
`;

const CardListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AddButton = styled.button`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;
