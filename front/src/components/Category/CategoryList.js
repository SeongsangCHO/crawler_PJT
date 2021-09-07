import Button from "components/common/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  SET_FILTERED_CARDS,
  SET_SELECTED_CATEGORY_ID,
} from "redux/actions/ActionType";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";

const CategoryList = ({ categories }) => {
  const [focusIdx, setFocusIdx] = useState("All");
  const dispatch = useDispatch();
  const handleAllClick = () => {
    dispatch({ type: SET_FILTERED_CARDS, id: -1 });
    dispatch({ type: SET_SELECTED_CATEGORY_ID, id: -1 });
    setFocusIdx("All");
  };
  return (
    <Wrapper>
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
    </Wrapper>
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

const Wrapper = styled.ul`
  display: flex;
  max-height: 150px;
  /* margin: 10px 10px 10px 15px; */
  overflow-y: scroll;
  scrollbar-width: auto;
  ::-webkit-scrollbar {
    width: 10px; /* 세로축 스크롤바 길이 */
    height: 20px; /* 가로축 스크롤바 길이 */
  }
  & li + li {
    margin-left: 5px;
  }
  & > li {
    min-width: 50px;
  }
`;
