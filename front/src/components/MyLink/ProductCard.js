import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const ProductCardWrapper = styled.div`
  height: 100%;
  border-radius: 4px;
  border: 1px solid gray;
  position: relative;
`;

const CardPrice = styled.span`
  font-size: 1rem;
  display: block;
`;

const CardInfo = styled.span`
  font-size: 0.7px;
  display: block;
  min-height: 15px;
`;
const CardDetail = styled.div`
  margin: 3px 0px 0px 3px;
  min-height: 50px;
  font-size: 16px;
  overflow: hidden;
  position: relative;
`;

const CardDate = styled.div`
  font-size: 0.3rem;
  position: absolute;
  top: 100%;
  transform: translate(0, -100%);
`;

const CardButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 100%;
  font-size: 10px;
  @media (max-width: 512px) {
    font-size: 12px;
  }
`;
const CardLink = styled.a`
  display: block;
  background-color: #ffeeea;
  color: #df7861;
  text-align: center;
  font-size: 1em;
  :link {
    background-color: #ffeeea;
    text-decoration: none;
    color: #df7861;
  }
  :visited {
    background-color: #ffeeea;
    text-decoration: none;
    color: #df7861;
  }
  :hover {
    background-color: #df7861;
    color: white;
    text-decoration: none;
  }
  :active {
    text-decoration: none;
    background-color: #df7861;
    color: white;
  }
`;
const Button = styled.button`
  cursor: pointer;
  background-color: #ffeeea;
  color: #df7861;
  border: none;
  outline: 0;
  font-size: 1em;
  width: 100%;

  :hover {
    background-color: #df7861;
    color: white;
  }
`;
const DropDownWrapper = styled.div``;
const DropDownMenu = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  opacity: 0;
  transition:.4s;
  z-index: 1;
  visibility: hidden;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  `}
`;

const parseLink = (link) => {
  if (~link.indexOf("https")) {
    return link;
  } else {
    return "https://" + link;
  }
};
const priceComma = (price) => {
  if (price === "") {
    return "-";
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
};
const getDays = (year, month, day) => {
  for (let i = 1; i < month; i++) {
    day += new Date(year, i, 0).getDate();
  }
  return day;
};
const convertDay = (date) => {
  const current = new Date();
  //현재시간
  const currentDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate(),
    hour: current.getHours(),
    min: current.getMinutes(),
    second: current.getSeconds(),
  };
  //글 작성시간
  let [year, month, day, hour, min, second] = moment(date)._a;
  month += 1;
  let currentDays = getDays(
    currentDate.year,
    currentDate.month,
    currentDate.day
  );
  let writtenDays = getDays(year, month, day);
  let daysDiff = (currentDate.year - year) * 365 + (currentDays - writtenDays);
  //1.1부터 현재일까지 몇일인지 일수 계산
  //(현재년도 - 작성년도) * 365 + (햔재월 일까지의 days)
  return daysDiff == 0 ? "오늘 작성" : daysDiff + "일전에 작성";
};

function ProductCard({ categoryItem }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onDropDownToggle = () => setIsActive(!isActive);

  const handleCardClick = (e) => {
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

  const handleReload = (title) => {

    dispatch({
      type: "RELOAD_REQUEST",
      isReloaded: false,
      linkTitle: title,
    });
  };


  return (
    <ProductCardWrapper id="ProductCardWrapper">
      {categoryItem.title != null ? (
        <Nav.Item id="nav-item">
          <Nav.Link
            id="nav-link"
            onClick={handleCardClick}
            justify="true"
            eventKey={categoryItem.title}
          >
            {categoryItem.title}
            <DropDownWrapper>
              <FontAwesomeIcon onClick={onDropDownToggle} icon={faAngleDown} />

              <DropDownMenu ref={dropdownRef} active={isActive}>
                <Button>삭제</Button>
                <Button>수정</Button>

                <Button onClick={()=>handleReload(categoryItem.title)}>새로고침</Button>
              </DropDownMenu>
            </DropDownWrapper>
          </Nav.Link>
          <CardDetail>
            <CardPrice>{priceComma(categoryItem.price)}</CardPrice>
            <CardInfo>{categoryItem.info}</CardInfo>
            <CardDate>{convertDay(categoryItem.date)}</CardDate>
          </CardDetail>
          <CardLink target="_blank" href={parseLink(categoryItem.link)}>
            링크
          </CardLink>
          {/* <CardButtonWrapper>
            <CardLink target="_blank" href={parseLink(categoryItem.link)}>
              링크
            </CardLink>
            <Button>삭제</Button>
            <Button onClick={handleReload}>
              새로고침
            </Button>
          </CardButtonWrapper> */}
        </Nav.Item>
      ) : (
        <div>자주사는 물품을 등록해주세요</div>
      )}
    </ProductCardWrapper>
  );
}

export default ProductCard;
