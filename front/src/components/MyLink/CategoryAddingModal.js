import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

const CategoryWrapper = styled.div`
  padding: 5px;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const CategoryModal = (props) => {
  useEffect(() => {}, []);
  const [categoryData, setCategoryData] = useState("");
  const dispatch = useDispatch();
  const handleSetCategory = (e) => {
    setCategoryData(e.target.value);
  };
  const handleAddCategory = (e) => {
    //페이지리로딩 방지를 위해서 넣어주어야해.
    e.preventDefault();
    dispatch({
      type: "ADD_CATEGORY_REQUEST",
      category: categoryData,
      isAddCategory: false,
    });
    //[추측][비동기처리해서] 그냥 될떄도있고 안될때도있네 => submit로 페이지 리로딩이 되기때문.
    props.onHide();
    //그럼 추가가 완료된 이후에는 모달창을 종료해야하는데?
    //props로 전달된 onHide호출해서 창내림
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>관리할 링크의 카테고리를 만드세요</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <ModalForm onSubmit={handleAddCategory}>
            <input
              onChange={handleSetCategory}
              autoFocus
              type="text"
              placeholder="카테고리 입력"
              required
            ></input>
            <button type="submit">저장하기</button>
          </ModalForm>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;

const ModalForm = styled.form`
  width: 100%;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
