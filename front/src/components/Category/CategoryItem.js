import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "components/common/Button";
import {
  SET_FILTERED_CARDS,
  SET_SELECTED_CATEGORY_ID,
} from "redux/actions/ActionType";
import { Shadow } from "styles/mixin";
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

const Item = styled.li`
  min-width: 50px;
`;

const TitleButton = styled(Button)`
  ${Shadow}
  background-color:white;
  transition: 0.2s;
  &.focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
