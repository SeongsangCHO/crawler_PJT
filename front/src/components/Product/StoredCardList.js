import React from "react";
import PropTypes from "prop-types";

const StoredCardList = ({ cards }) => {
  return (
    <div>
      {cards?.map((card) => (
        <div>{card.title}</div>
      ))}
    </div>
  );
};

StoredCardList.propTypes = {};

export default StoredCardList;
