import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import CategoryAddModal from "components/Modal/CategoryAddModal/CategoryAddModal";
import Nav from "react-bootstrap/Nav";
// import "../../css/Contentc.css";
import useModal from "hooks/useModal";
import CreateNotification from "../../CreateNotification";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/common/Button";

const CategoryWrapper = styled.div`
  margin-left: 5px;
  padding: 5px;
  flex: 0.7;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const CategoryTab = () => {
  const { modalOpen, modalClose, isOpen } = useModal();

  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.linkDataApiCallReducer.data?.category
  );
  const isAddCategory = useSelector(
    (state) => state.addCategoryReducer.isAddCategory
  );
  const [modalShow, setModalShow] = useState(false);
  const handleCateClick = (e) => {
    dispatch({
      type: "GET_CATEGORY_REQUEST",
      currentCategory: e.currentTarget.innerHTML,
    });
  };
  useEffect(() => {
    if (isAddCategory === true) {
      CreateNotification("success")("카테고리 추가");
    }
  }, [isAddCategory]);
  return (
    <CategoryWrapper id="category-wrapper">
      <CategoryAddButton onClick={modalOpen}>카테고리 추가</CategoryAddButton>
      <hr />
      <Nav variant="pills" className="flex-sm-column nav-wrapper">
        {data?.map((cate, idx) => (
          <Nav.Item className="nav-item-card" key={Object.keys(cate)}>
            {Object.keys(cate) != "null" ? (
              <Nav.Link
                value={Object.keys(cate)}
                onClick={handleCateClick}
                eventKey={Object.keys(cate)}
              >
                {Object.keys(cate)}
              </Nav.Link>
            ) : (
              <span>관리할 카테고리를 추가하세요</span>
            )}
          </Nav.Item>
        ))}
      </Nav>
      {isOpen && (
        <CategoryAddModal modalOpen={modalOpen} modalClose={modalClose} />
      )}
    </CategoryWrapper>
  );
};

export default CategoryTab;

const CategoryAddButton = styled(Button)`
  margin-bottom: 5px;
`;
// #nav-item #nav-link{
//   text-align: center;
//   font-size: 14px;
//   color: #df7861;
//   background-color: #ffeeea;
//   text-decoration: none;
//   transition: .4s;
// }

// #nav-item a#nav-link:hover{
//   background-color: #df7861;
//   text-decoration: none;
//   color: #ffffff;
// }

// #nav-item a#nav-link.active {
//   text-decoration: none;
//   background-color: #df7861;
//   color: #ffffff;
// }

// .title {
//   font-size: 25px;
//   padding-top: 40px;
// }

// .add-button {
//   width: 100%;
//   background-color: #ffeeea;
//   color: #df7861;
//   border-radius: 9px;
//   border: none;
// }

// .add-button :hover {
//   background-color: #fff;
//   color: #ffffff;
// }

// #category-wrapper div {
//   display: flex;
//   justify-items: center;
// }

// .redo-image{
// }

// #category-wrapper a {
//   margin: 3px;
//   width: 100%;
//   text-align: center;
//   font-size: 12px;
//   background-color: #ffeeea;
//   color: #df7861;
// }

// #category-wrapper a.active {
//   margin: 3px;
//   width: 100%;
//   text-align: center;
//   font-size: 12px;
//   background-color: #df7861;
//   color: #ffffff;
// }

// #AddLinkImage{
//   width: 100%;
//   height: 60px;
// }

// .redo-button{
//   cursor: pointer;
//   background-color: #fff;
//   border: none;
//   outline: 0;
// }

// .redo-button :hover{
//   outline: 0;
//   background-color: #ffeeea;
// }
