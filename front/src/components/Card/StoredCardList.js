import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const StoredCardList = ({ cards }) => {
  const { filteredCards } = useSelector(
    (state) => state.linkDataApiCallReducer
  );
  useEffect(() => {}, []);
  return (
    <div>
      {filteredCards?.map((card) => (
        <div key={card.id}>{card.title}</div>
      ))}
    </div>
  );
};

StoredCardList.propTypes = {};

export default StoredCardList;
