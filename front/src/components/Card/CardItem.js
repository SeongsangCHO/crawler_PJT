import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
const CardItem = ({ card }) => {
  const getFromBoughtDaysDiffToday = () => {
    const diffDays = moment(card.registerTime).diff(new Date(), "days");
    if (diffDays === 0) {
      return "오늘 등록";
    }
    return diffDays + "일전 등록";
  };
  return (
    <Container>
      <ProductText>{card.title}</ProductText>
      <h2>구매가격 : {parseInt(card.price).toLocaleString()}원</h2>
      <InfoText>{card.info}</InfoText>
      <RegisterText>{getFromBoughtDaysDiffToday()}</RegisterText>
      <ProductLink target="_blank" href={card.link}>
        <FontAwesomeIcon icon={faLink} />
      </ProductLink>
    </Container>
  );
};

CardItem.propTypes = {};

export default CardItem;
const ProductLink = styled.a`
  color: black;
  &:visited {
    color: black;
  }
`;
const Container = styled.li``;
const RegisterText = styled.span`
  /* position: absolute; */
`;
const InfoText = styled.span``;
const ProductText = styled.span``;
