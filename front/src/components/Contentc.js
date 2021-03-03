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
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import { ReactComponent as Redo } from "./public/redo.svg";
import { ReactComponent as AddLinkImage } from "./public/addLink.svg";
import SectionTitle from './MyLink/SectionTitle';
import CategoryModal from './MyLink/CategoryModal';
import CategoryTab from './MyLink/CategoryTab';

const CategoryWrapper = styled.div`
  padding: 5px;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: row;
  }
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
const CardTabLeftSection = styled.div`
  padding: 5px;
  flex: 2;
`;

const CardTabRightSection = styled.div`
  border: 0.5px solid gray;
  border-radius: 5px;
  flex-wrap: nowrap;
  flex: 1;
`;

const CrawledCardWrapper = styled.div`
  border: 0.1px solid gray;
  border-radius: 5px;
  padding: 5px;
  height: 100%;
`;
const ContentWrapper = styled.div`
  margin-top: 10px;
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
  border-radius: 4px;
  border: 1px solid gray;
`;

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`;

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

const SsgBadge = styled.span`
  display: inline;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #000;
  background-color: #f6ae14;
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;
`;
const CrawledCardList = styled.div`
  border: 1px solid #000;
`;
const BadgeDiv = styled.div``;
const TitleLink = styled.a`
  dispaly: block;
  font-size: 13px;
  text-align: center;
`;
const PriceSpan = styled.span`
  font-size: 14px;
`;
const ProductImage = styled.img`
  border-radius: 13px;
  width: 100%;
  height: auto;
`;


const CrawledCard = ({crawledData}) => {
  const {link, imgsrc, title, price} = crawledData;
  return (
    <>
    <TitleLink target="_blank" href={link}>
    <ProductImage src={imgsrc} />

    {title}
  </TitleLink>
  <div>
    <PriceSpan>{price}</PriceSpan>
  </div>
  </>
  );
}
function CrawledCardSection({ obj }) {

  return (
    <CrawledCardWrapper id="crawl-card-wrapper">
      {obj[Object.keys(obj)]?.map((element, idx) => (
        <Tab.Pane
          eventKey={element.title}
          key={element.title}
          unmountOnExit="true"
        >

          {element.ssg.map((ssgElement, idx) => (
            <CrawledCardList key={ssgElement.title}>
              <BadgeDiv>
                <SsgBadge pill variant="warning">
                  SSG
                </SsgBadge>
              </BadgeDiv>
              <CrawledCard crawledData={ssgElement}></CrawledCard>
            </CrawledCardList>
          ))}
          {element.coupang.map(coupangElement => (
            <CrawledCardList key={coupangElement.title}>
              <BadgeDiv>
                <Badge pill variant="primary">
                  COUPANG
                </Badge>
              </BadgeDiv>
              <CrawledCard crawledData={coupangElement}></CrawledCard>

            </CrawledCardList>
          ))}
          {element.naver.map(naverElement => (
            <CrawledCardList key={naverElement.title}>
              <BadgeDiv>
                <Badge pill variant="success">
                  NAVER
                </Badge>
                <CrawledCard crawledData={naverElement}></CrawledCard>

              </BadgeDiv>
            </CrawledCardList>
          ))}
        </Tab.Pane>
      ))}
    </CrawledCardWrapper>
  );
}

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
const RegisterDetail = styled.div`
  font-size: 10px;
`;
const CardTabWrapper = styled.div``;

//카테고리에 해당하는 물품들 전부 로딩해와야함.

function CardTab({ obj }) {

  const linkDataIsCalled = useSelector(
    state => state.linkDataApiCallReducer.isCalled
  );
  const [modalShow, setModalShow] = useState(false);
  return (
    <CardTabWrapper>
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content style={{ display: "flex" }}>
            <CardTabLeftSection>
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
            </CardTabLeftSection>

            <CardTabRightSection id="card-tab-right-section">
              {linkDataIsCalled == true ? (
                <CrawledCardSection obj={obj} />
              ) : (
                <Spinner animation="border" variant="primary" />
              )}
              
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
      <Tab.Content>
        {obj?.category?.map((cate, idx) => (
          <Tab.Pane eventKey={Object.keys(cate)} key={idx} unmountOnExit={true}>
            <CardTab obj={cate} />
          </Tab.Pane>
        ))}
      </Tab.Content>
    </LinkCardSectionWrapper>
  );
}

function Contentc() {
  const dispatch = useDispatch();
  const currentLinkTitle = useSelector(
    state => state.runCrawlerReducer.currentLinkTitle
  );

  const linkData = useSelector(state => state.linkDataApiCallReducer.data);
  const currentLink = useSelector(state => state.addLinkReducer.data.link);
  const currentTitle = useSelector(state => state.addLinkReducer.data.title);
  const currentCategory = useSelector(
    state => state.addCategoryReducer.category
  );
  const isReloaded = useSelector(state => state.reloadReducer.isReloaded);
  const linkTitle = useSelector(state => state.reloadReducer.linkTitle);
  useEffect(() => {
    console.log(isReloaded);
    console.log(linkTitle);
    //dispatch수행해서 리랜더링될 때 , axios로 api호출

  }, []); //linkData가 서버에서 받아오는 데이터 
  useEffect(() => {
    //dispatch수행해서 리랜더링될 때 , axios로 api호출
    dispatch({
      type: "LINK_DATA_REQUEST",
      data: {},
      isCalled: false
    });
  }, [currentCategory, currentLink, currentTitle, currentLinkTitle,isReloaded,linkTitle]); //linkData가 서버에서 받아오는 데이터
  //뭘로 progress를 띄우지, 크롤러 success가 아직 안됬음,
  //requst보낼때마다 false로 던지고, 성공하면 true로 반환하게.

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
      <SectionTitle/>
      <>
      <Tab.Container id="left-tabs" defaultactiveKey="All">
        <ContentWrapper>
          <CategoryTab obj={linkData} />
          <LinkCardSection obj={linkData} />
        </ContentWrapper>
      </Tab.Container>
      </>
    </div>
  );
}

export default Contentc;
