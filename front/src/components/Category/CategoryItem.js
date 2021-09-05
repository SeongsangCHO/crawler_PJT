import React from "react";
import PropTypes from "prop-types";
import { requestGetLinkCardList } from "redux/actions/LinkCard";
import { useDispatch } from "react-redux";

const CategoryItem = ({ category }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(requestGetLinkCardList(category.id))}>
        {category.title}
      </button>
    </div>
  );
};

CategoryItem.propTypes = {};

export default CategoryItem;
