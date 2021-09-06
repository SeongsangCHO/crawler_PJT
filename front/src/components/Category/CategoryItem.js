import React from "react";
import PropTypes from "prop-types";
import { requestGetLinkCardList } from "redux/actions/LinkCard";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "components/common/Button";
import {
  SET_FILTERED_CARDS,
  SET_SELECTED_CATEGORY_ID,
} from "redux/actions/ActionType";
const CategoryItem = ({ category, itemIdx, setFocusIdx, focusIdx }) => {
  const dispatch = useDispatch();
  const handleItemClick = () => {
    // dispatch(requestGetLinkCardList(category.id));
    dispatch({ type: SET_FILTERED_CARDS, id: category.id });
    dispatch({ type: SET_SELECTED_CATEGORY_ID, id: category.id });
    setFocusIdx(itemIdx);
  };
  return (
    // <div>
    <Item onClick={handleItemClick}>
      <TitleButton className={itemIdx === focusIdx ? "focus" : ""}>
        {category.title}
      </TitleButton>
    </Item>
    // </div>
  );
};

CategoryItem.propTypes = {};

export default CategoryItem;

const Item = styled.li``;

const TitleButton = styled(Button)`
  &.focus {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
