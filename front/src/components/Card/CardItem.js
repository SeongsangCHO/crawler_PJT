import React from "react";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Button from "components/common/Button";
import { useDispatch } from "react-redux";
import { SET_SELECTED_CARD_ID } from "redux/actions/ActionType";
const CardItem = ({ card, selectedCardData }) => {
  const dispatch = useDispatch();
  const getFromBoughtDaysDiffToday = () => {
    const diffDays = moment(card.registerTime).diff(new Date(), "days");
    if (diffDays === 0) {
      return "오늘 등록";
    }
    return diffDays + "일전 등록";
  };
  const handleTitleClick = () => {
    dispatch({
      type: SET_SELECTED_CARD_ID,
      id: card.id,
      title: card.title,
    });
    // dispatch(해당하는 카드ID로 select하는 dispatch)
    // CrawlModal Open
  };
  return (
    <Container>
      <ProductTitleButton
        onClick={handleTitleClick}
        className={card.id === selectedCardData.id ? "focus" : ""}
      >
        {card.title}
      </ProductTitleButton>
      <CardInfoContainer>
        <ProductLink target="_blank" href={card.link}>
          <FontAwesomeIcon icon={faLink} />
        </ProductLink>
        <h2>구매가격 : {parseInt(card.price).toLocaleString()}원</h2>
        <InfoText>{card.info}라고했음.</InfoText>
        <RegisterText>{getFromBoughtDaysDiffToday()}</RegisterText>
      </CardInfoContainer>
    </Container>
  );
};

CardItem.propTypes = {};

export default CardItem;

const CardInfoContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 5px;
`;

const ProductLink = styled.a`
  color: black;
  &:visited {
    color: black;
  }
`;
const Container = styled.li`
  padding: 5px;
`;
const RegisterText = styled.span`
  display: block;
`;
const InfoText = styled.span``;
const ProductTitleButton = styled(Button)`
  transition: 0.2s;
  background-color: ${({ theme }) => theme.colors.secondPrimary};
  color: white;
  &:hover,
  &.focus {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
