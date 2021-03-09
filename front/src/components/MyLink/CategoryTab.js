import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryModal from './CategoryAddingModal';
import Nav from "react-bootstrap/Nav";
import "../css/Contentc.css";
import { useDispatch } from "react-redux";

const CategoryWrapper = styled.div`
  margin-left: 5px;
  padding: 5px;
  flex: .7;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const CategoryTab = ({ obj }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const handleCateClick = e => {
    //현재 클릭되었을 때 innerHTML로 값을 얻을 수 있음
    //클릭된 값을 saga로 던져주면서 링크카드에서 useSelector로 가져오면 되겠다.
    //여기서 dispatch 수행해서 카테고리 상태값 지정, default는 없게하면 될듯 or 초기페이지 설정? => 언제하냐
    dispatch({
      type: "GET_CATEGORY_REQUEST",
      currentCategory: e.currentTarget.innerHTML
    });
  };
  return (
    <CategoryWrapper id="category-wrapper">
      <button className="add-button" onClick={() => setModalShow(true)}>
        카테고리 추가
      </button>
      <hr />
      <Nav variant="pills" className="flex-sm-column nav-wrapper">
        {obj?.category?.map((cate, idx) => (
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
      <CategoryModal show={modalShow} onHide={() => setModalShow(false)}/>
    </CategoryWrapper>
  );
}

export default CategoryTab;