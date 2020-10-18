import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import TabContainer from "react-bootstrap/TabContainer";
import "./css/Contentc.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const dummy =
  //사용자가 추가할 category
  {
    category: [
      {
        생필품: [
          {
            title: "생수",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 생수크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 생수크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 생수크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
          {
            title: "탄산수",
            link: "탄산수 링크",
            price: "탄산수  가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 탄산수크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 탄산수크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 탄산수크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
          {
            title: "1",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
          {
            title: "2",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
          {
            title: "3",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
          {
            title: "4",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
          {
            title: "5",
            link: "생수 링크",
            price: "생수 가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
        ],
      },
      {
        옷: [
          {
            title: "후드티",
            link: "후드티 링크",
            price: "후드티 가격",
            info: "정보",
            ssg: [
              {
                크롤링제목: "쓱 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
          {
            title: "자켓",
            link: "자켓 링크",
            price: "자켓  가격",
            ssg: [
              {
                크롤링제목: "쓱 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "쓱 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            coupang: [
              {
                크롤링제목: "coupang 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "coupang 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
            naver: [
              {
                크롤링제목: "naver 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 2 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
              {
                크롤링제목: "naver 3 크롤링제목",
                크롤링링크: "생수 크롤링 링크",
                크롤링가격: "생수 크롤링가격",
              },
            ],
          },
        ],
      },
    ],
  };
const CategoryWrapper = styled.div`
  border: 1px solid black;
  padding: 5px;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;
const CardWrapper = styled.div`
  border: 1px solid black;
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
const CardTabLeftSection = styled.div`
  border: 1px solid black;

  flex: 2;
`;

const CardTabRightSection = styled.div`
  border: 1px solid black;

  flex: 1;
`;

const CrawlingCardWrapper = styled.div`
  border: 1px solid black;
  padding: 5px;
`;
const ContentWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const LinkCardSectionWrapper = styled.div`
  flex: 4;
`;
const ProductCardWrapper = styled.div`
  min-height: 150px;
  height: 100%;
`;

function AddCategory(props) {
  const categoryStatus = useSelector(
    (state) => state.addCategoryReducer.category
  );
  useEffect(() => {}, []);
  console.log(categoryStatus);
  const [categoryData, setCategoryData] = useState("");
  const dispatch = useDispatch();
  const handleSetCategory = (e) => {
    setCategoryData(e.target.value);
    console.log(e.target.value);
  };
  const handleAddCategory = (e) => {
    //페이지리로딩 방지를 위해서 넣어주어야해.
    e.preventDefault();
    dispatch({
      type: "ADD_CATEGORY_REQUEST",
      category: categoryData,
      isAdded: false,
    });
    //[추측][비동기처리해서] 그냥 될떄도있고 안될때도있네 => submit로 페이지 리로딩이 되기때문.
    alert("카테고리 추가 완료");
    console.log(props);
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
          <form onSubmit={handleAddCategory}>
            <input
              onChange={handleSetCategory}
              autoFocus
              type="text"
              placeholder="카테고리 입력"
              required
            ></input>
            <button type="submit">저장하기</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;

function AddLink(props) {
  const handleLink = () => {
    alert("링크 추가 완료");
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
          <form onSubmit={handleLink}>
            <input type="text" placeholder="제목 입력"></input>
            <input type="text" placeholder="가격 입력"></input>
            <input type="text" placeholder="링크 입력"></input>
            <input type="text" placeholder="메모 입력"></input>
            <button type="submit">저장하기</button>
          </form>
        </ModalWrapper>
      </Modal.Body>
    </Modal>
  );
}
function CategoryTab({ obj }) {
  const [modalShow, setModalShow] = useState(false);
  const handleCateClick = (e) => {
    //현재 클릭되었을 때 innerHTML로 값을 얻을 수 있음
    //클릭된 값을 saga로 던져주면서 링크카드에서 useSelector로 가져오면 되겠다.
    console.log(e.currentTarget.innerHTML);
    console.log('cate');

  }
  return (
    <CategoryWrapper>
      <Nav variant="pills" className="flex-sm-column">
        {obj?.category?.map((cate, idx) => (
          <Nav.Item className="nav-item-card">
            {Object.keys(cate) != "null" ? (
              <Nav.Link value ={Object.keys(cate) }onClick={handleCateClick}eventKey={Object.keys(cate)}>
                {Object.keys(cate)}
              </Nav.Link>
            ) : (
              <Nav.Link>카테고리 추가하세요</Nav.Link>
            )}
          </Nav.Item>
        ))}
      </Nav>
      <button onClick={() => setModalShow(true)}>추가하기</button>
      <AddCategory show={modalShow} onHide={() => setModalShow(false)} />
    </CategoryWrapper>
  );
}

function CrawlingCard({ obj }) {
  return (
    <CrawlingCardWrapper>
      {obj[Object.keys(obj)]?.map((element, id) => (
        <Tab.Pane
          eventKey={element.title}
          key={element.title}
          unmountOnExit="true"
        >
          {element.ssg.map((ssgElement) => (
            <div>{ssgElement.title}</div>
          ))}
          {element.coupang.map((coupangElement) => (
            <div>{coupangElement.title}</div>
          ))}
          {element.naver.map((naverElement) => (
            <div>{naverElement.title}</div>
          ))}
        </Tab.Pane>
      ))}
    </CrawlingCardWrapper>
  );
}

const PriceDetail = styled.div``;

const InfoDetail = styled.div``;
const LinkDetail = styled.div``;
const CardDetail = styled.div``;

function ProductCard({ element }) {

  const handleCardClick = (e) => {
    console.log(e.target.value);
  }
  return (
    <ProductCardWrapper>
      {element.title != null ? (
      <Nav.Item>
        <Nav.Link onClick={handleCardClick}
          justify="true"
          className="nav-link-style"
          eventKey={element.title}
        >
          {element.title}
        </Nav.Link>
        <CardDetail>
          <PriceDetail>가격: {element.price}</PriceDetail>
          <InfoDetail>내가입력: {element.info}</InfoDetail>
          <LinkDetail>link: {element.link}</LinkDetail>
        </CardDetail>
      </Nav.Item>
      )
      : (<div>링크추가하세요</div>)}
    </ProductCardWrapper>
  );
}

const CardTabWrapper = styled.div``;
function CardTab({ obj }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <CardTabWrapper>
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content style={{ display: "flex" }}>
            <CardTabLeftSection>
              <CardWrapper>
                {obj[Object.keys(obj)]?.map((element) => (
                  <ProductCard element={element} />
                ))}
                <button onClick={() => setModalShow(true)}>링크추가하기</button>
                <AddLink show={modalShow} onHide={() => setModalShow(false)} />
              </CardWrapper>
            </CardTabLeftSection>

            <CardTabRightSection>
              <CrawlingCard obj={obj} />
            </CardTabRightSection>
          </Tab.Content>
        </Nav>
      </Tab.Container>
    </CardTabWrapper>
  );
}

function LinkCardSection({ obj }) {
  return (
    <LinkCardSectionWrapper>
      <Tab.Content defaultActiveKey="0">
        {obj?.category?.map((cate, idx) => (
          <Tab.Pane eventKey={Object.keys(cate)} key={idx} unmountOnExit="true">
            <CardTab obj={cate} />
          </Tab.Pane>
        ))}
      </Tab.Content>
    </LinkCardSectionWrapper>
  );
}

function Contentc() {
  const dispatch = useDispatch();
  const linkData = useSelector((state) => state.linkDataApiCallReducer.data);
  useEffect(() => {
    //dispatch수행해서 리랜더링될 때 , axios로 api호출
    dispatch({
      type: "LINK_DATA_REQUEST",
      data: {},
    });
  }, []);
  //[linkData] <-로 업데이트 추적해서 실시간으로 랜더링할수있는데
  //get요청을 엄청나게 보내네..?
  // },[linkData]);

  // const dataList = Object.keys(linkData?.category[0]);
  //categoryTab / LinkCard : 1 : 4로 나누기 // OK
  //LinkCard에서  래퍼 flex지정하고 , tabContent를 3 : 2로 나누기
  // 카드탭은,,컨테이너 안에, 컨텐츠 안에 개별적인 아이템이 있음
  //먼저 CardTab의 탭컨텐츠를 카드, 크롤링데이터 영역으로 나눠야함
  //CardTab의 탭컨텐츠 위에 wrapper flex지정,
  //NavItem반복 상위에 flex3지정, display: grid 1fr 1fr 1fr정하기
  //크롤링카드 에 flex 2 지정
  //CardTab의 Tab.컨텐츠를 grid로하고 1fr, 1fr,1fr씩하면 3등분될듯
  //여기서 데이터를 가져와서 props로 전달?
  return (
    <div className="content-wrapper">
      <Tab.Container id="left-tabs" defaultActiveKey="All">
        <ContentWrapper>
          <CategoryTab obj={linkData} />
          <LinkCardSection obj={linkData} />
        </ContentWrapper>
      </Tab.Container>

      <NavLink className="navbar-brand" to={"/login"}>
        login
      </NavLink>
    </div>
  );
}

export default Contentc;
