import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { requestGetLinkCardList } from "redux/actions/LinkCard";

const CategoryList = (props) => {
  const { categories } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  return (
    <div>
      {categories?.map((category) => (
        <button onClick={() => dispatch(requestGetLinkCardList(category.id))}>
          {category.title}
        </button>
      ))}
    </div>
  );
};

CategoryList.propTypes = {};

export default CategoryList;
