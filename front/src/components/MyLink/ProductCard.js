import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon as DropDownButton } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const END_POINT = `http://localhost:8080`;

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
  min-height: 50px;
  font-size: 16px;
`;

const CardDate = styled.span`
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
  width: 100%;
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
  /* font-size: 14px; */
  width: 100%;

  :hover {
    background-color: #df7861;
    color: white;
  }
`;
const DropDownWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 6px;
  height: 0px;
`;
const DropDownMenu = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: 0.4s;
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

function ProductCard({ bottomScrollRef, categoryItem }) {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onDropDownToggle = () => setIsActive(!isActive);
  const handleCardClick = (e) => {
    bottomScrollRef.current.scrollIntoView();
  };
  const handleReload = (title) => {
    dispatch({
      type: "RELOAD_REQUEST",
      isReloaded: false,
      linkTitle: title,
    });
  };
  const priceComma = (price) => {
    if (price === "") {
      return "-";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };
  // let KST = timeSource.toLocaleString("ko-KR", {
  //   timeZone: "Asia/Seoul",
  // });
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
    let daysDiff =
      (currentDate.year - year) * 365 + (currentDays - writtenDays);
    //1.1부터 현재일까지 몇일인지 일수 계산
    //(현재년도 - 작성년도) * 365 + (햔재월 일까지의 days)
    return daysDiff == 0 ? "오늘 작성" : daysDiff + "일전에 작성";
  };

  const onDeleteCard = async (id) => {
    console.log('onDeleteCard');
    dispatch({
      type:"DELETE_CARD_REQUEST",
      deleteId : id
    })
    try {
      const res = await axios.delete(`${END_POINT}/postdelete/${id}`, {
        withCredentials: true,
        
      });
      if (!res.data.ok) {
        throw new Error("delete Request Error");
      } else {
        console.log('setIsDelete');
        
        setIsDelete((prev) => !prev);
      }
    } catch (err) {
      console.error(err);

      
    }
    console.log(id);
  };
  useEffect(() => {}, []);
  //새로운 카드가 등록되었을 때 리랜더링
  return (
    <ProductCardWrapper id="ProductCardWrapper">
      {categoryItem.title != null ? (
        <>
          <DropDownWrapper>
            <DropDownButton onClick={onDropDownToggle} icon={faAngleDown} />
            <DropDownMenu ref={dropdownRef} active={isActive}>
              <Button onClick={() => onDeleteCard(categoryItem.id)}>
                삭제
              </Button>
              <Button>수정</Button>
              <CardLink target="_blank" href={parseLink(categoryItem.link)}>
                링크
              </CardLink>

              <Button onClick={() => handleReload(categoryItem.title)}>
                새로고침
              </Button>
            </DropDownMenu>
          </DropDownWrapper>
          <Nav.Item id="nav-item">
            <Nav.Link
              id="nav-link"
              onClick={handleCardClick}
              justify="true"
              eventKey={categoryItem.title}
            >
              {categoryItem.title}
            </Nav.Link>
            <CardDetail>
              <CardPrice>{priceComma(categoryItem.price)}</CardPrice>
              <CardInfo>{categoryItem.info}</CardInfo>
              <CardDate>{convertDay(categoryItem.date)}</CardDate>
            </CardDetail>
          </Nav.Item>
        </>
      ) : (
        <DefaultCard>자주사는 물품을 등록해주세요</DefaultCard>
      )}
    </ProductCardWrapper>
  );
}

export default ProductCard;

const DefaultCard = styled.div`
  font-size: 14px;
  text-align: center;
`;
