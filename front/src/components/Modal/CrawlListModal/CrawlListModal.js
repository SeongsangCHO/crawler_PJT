import Portal from "components/Portal/Portal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_CARD_ID } from "redux/actions/ActionType";
import styled from "styled-components";
import CrawlItem from "./CrawlItem";

const CrawlListModal = ({ modalClose, title }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    const { id } = e.target;
    if (id === "dim") {
      dispatch({ type: SET_SELECTED_CARD_ID, id: -1 });
      modalClose();
    }
  };
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 0);
  }, []);
  const { selectedCardData } = useSelector(
    (state) => state.linkDataApiCallReducer
  );
  console.log(selectedCardData);
  const { crawlList } = useSelector((state) => state.crawlReducer);
  return (
    <Portal onClick={handleClose}>
      <Container className={animation && "animation"}>
        <Header>
          <Title>
            <span>{title}</span> 상품 수집정보
          </Title>
        </Header>
        <ItemWrapper>
          {crawlList.map((item) => (
            <CrawlItem
              item={item}
              key={item.id}
              selectedCardData={selectedCardData}
            />
          ))}
        </ItemWrapper>
        크롤러모달
      </Container>
    </Portal>
  );
};

export default CrawlListModal;

const Container = styled.aside`
  position: absolute;
  transition: 0.6s;
  overflow-y: scroll;
  max-width: 500px;
  min-width: 300px;
  width: 40%;
  height: 100%;
  background-color: white;
  right: -100%;
  padding: 15px;
  font-size: 16px;
  &.animation {
    right: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    width: 50%;
  }
`;

const Header = styled.div``;
const Title = styled.h1`
  text-align: center;
  font-size: 1em;
  border-bottom: 1px solid #888888;
  padding-bottom: 10px;
  & > span {
    font-size: 1.2em;
    color: ${({ theme }) => theme.colors.primary};
  }
  @media screen and (max-width: 768px) {
    & > span {
      display: block;
    }
  }
`;
const ItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  /* display: grid; */
  /* grid-template-columns: repeat(2, 1fr); */
`;
