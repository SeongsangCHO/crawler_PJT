import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";

import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Redo } from "../public/redo.svg";
import { ReactComponent as AddLinkImage } from "../public/addLink.svg";


const ProductCardWrapper = styled.div`
  min-height: 150px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid gray;
`;

const PriceDetail = styled.div`
  font-size: 14px;
`;

const InfoDetail = styled.div`
  font-size: 10px;
`;
const LinkDetail = styled.a``;
const CardDetail = styled.div`
  margin: 3px 0px 0px 3px;
`;
const FormTitle = styled.span`
  display:none;
`;

const RegisterDetail = styled.div`
  font-size: 10px;
`;
const CardTabWrapper = styled.div``;
const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CardWrapper = styled.div`
  display: grid;
  padding: 5px;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
`;


const StoreSectionWrapper = styled.div`
  padding: 5px;
  flex: 2;
`;

function ProductCard({ element }) {
  const dispatch = useDispatch();
  const linkTitle = useSelector(state => state.reloadReducer.isReloaded);
  

  const handleCardClick = e => {
    //여기서 innerHTML해서 제목데이터를 상태로 관리하고,
    // link card의 제목을 클릭할 때마다, 상태값으로 관리
    // 상태값이 변경될 때마다 dispatch로 호출
    // user_id랑 일치하고, title이 같은
    // [핵심]links의 id를 crawl테이블에 저장 상품명, 가격, 우선순위(1,2,3), link =>크롤링결과를 insert함
    // [분기]links_id가 crawl테이블에 존재할때,
    // 크롤러 무한요청을 막기위해 크롤링데이터가 있을때
    // 시간데이터도 넣어서 현재시간으로부터 하루정도? 지났으면 크롤링을 수행
    // 없으면 이미 데이터가 있는 것이므로 그대로 두면됨
    // dispatch({
    //   type: "RUN_CRAWLER_REQUEST",
    //   currentLinkTitle : e.currentTarget.innerHTML,
    // });
  };
  const handleReload = e => {
    e.preventDefault();
    
    // console.log(e.currentTarget.firstChild.innerText); //현재 item 타이틀
    dispatch({
      type: "RELOAD_REQUEST",
      isReloaded: false,
      linkTitle: e.currentTarget.firstChild.innerText,
    });
  };
  return (
    <ProductCardWrapper>
      {element.title != null ? (
        <Nav.Item id="nav-item">
          <Nav.Link
            id="nav-link"
            onClick={handleCardClick}
            justify="true"
            eventKey={element.title}
          >
            {element.title}
          </Nav.Link>
          <CardDetail>
            <PriceDetail>{element.price}원에 구매</PriceDetail>
            <InfoDetail>{element.info}</InfoDetail>
            <RegisterDetail>{element.date}</RegisterDetail>
            <LinkDetail target="_blank" href={element.link}>
              링크
            </LinkDetail>
            <form onSubmit={handleReload}>
              <FormTitle>{element.title}</FormTitle>
              <button className="redo-button" type="submit">
                <Redo className="redo-image" />
              </button>
            </form>
          </CardDetail>
        </Nav.Item>
      ) : (
        <div>자주사는 물품을 등록해주세요</div>
      )}
    </ProductCardWrapper>
  );
}

function AddLink(props) {
  // Custom hook으로 onChange하는 거 다 묶어야겠다.
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    state => state.currentCategoryReducer.currentCategory
  );

  const handleAddLink = e => {
    const formData = e.target;

    e.preventDefault();
    alert("링크 추가 완료");
    //여기서 dispatch 수행해서 post요청해야함
    dispatch({
      type: "ADD_LINK_REQUEST",
      data: {
        title: formData.title.value,
        price: formData.price.value,
        link: formData.link.value,
        info: formData.info.value,
        currentCategory: currentCategory
      }
    });

    dispatch({
      type: "RUN_CRAWLER_REQUEST",
      currentLinkTitle: formData.title.value,
      isCrawled: false
    });

    props.onHide();
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
          <h4>링크를 만드세요</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalWrapper>
          <form onSubmit={handleAddLink}>
            <input type="hidden" placeholder={currentCategory}></input>
            <input name="title" type="text" placeholder="제목 입력"></input>
            <input name="price" type="text" placeholder="가격 입력"></input>
            <input name="link" type="text" placeholder="링크 입력"></input>
            <input name="info" type="text" placeholder="메모 입력"></input>
            <button type="submit">저장하기</button>
          </form>
        </ModalWrapper>
      </Modal.Body>
    </Modal>
  );
}
const ProductStoreSection = ({obj}) => {
  const linkDataIsCalled = useSelector(
    state => state.linkDataApiCallReducer.isCalled
  );
  const [modalShow, setModalShow] = useState(false);
  return (
    <StoreSectionWrapper>
    <button className="add-button" onClick={() => setModalShow(true)}>
      <AddLinkImage id="AddLinkImage" />
    </button>
    <hr />
    <CardWrapper>
      {obj[Object.keys(obj)]?.map(element => (
        <ProductCard element={element} />
      ))}
      <AddLink show={modalShow} onHide={() => setModalShow(false)} />
    </CardWrapper>
  </StoreSectionWrapper>
  );
}

export default ProductStoreSection;