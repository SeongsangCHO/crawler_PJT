import Button from "components/common/Button";
import React, { useDebugValue, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_FILTERED_CARDS } from "redux/actions/ActionType";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";

const CategoryList = ({ categories }) => {
  const [focusIdx, setFocusIdx] = useState("All");
  const dispatch = useDispatch();
  const handleAllClick = () => {
    dispatch({ type: SET_FILTERED_CARDS });
    setFocusIdx("All");
  };
  return (
    <ul>
      <li>
        <TotalCategory
          onClick={handleAllClick}
          className={focusIdx === "All" ? "focus" : ""}
        >
          All
        </TotalCategory>
      </li>
      {categories?.map((category, idx) => (
        <CategoryItem
          setFocusIdx={setFocusIdx}
          focusIdx={focusIdx}
          itemIdx={idx}
          key={category.id}
          category={category}
        />
      ))}
    </ul>
  );
};

CategoryList.propTypes = {};

export default CategoryList;

const TotalCategory = styled(Button)`
  &.focus {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
