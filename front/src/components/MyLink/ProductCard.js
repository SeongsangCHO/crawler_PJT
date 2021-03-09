import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Redo } from "assets/redo.svg";

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
  display: none;
`;

const RegisterDetail = styled.div`
  font-size: 10px;
`;

const CardButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardLink = styled.a`
  background-color: #ffeeea;
  color: #df7861;
  text-align: center;
  font-size: 14px;
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
  font-size: 14px;
  width: 100%;

  :hover {
    background-color: #df7861;
    color: white;
  }
`;
const RedoForm = styled.form`
  width: 100%;
  ${Button} {
  }
`;

function ProductCard({ element }) {
  const dispatch = useDispatch();
  const linkTitle = useSelector((state) => state.reloadReducer.isReloaded);

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
  const parseLink = (link) => {
    if (~link.indexOf("https")) {
      return link;
    } else {
      return "https://" + link;
    }
  };
  const handleReload = (e) => {
    e.preventDefault();

    // console.log(e.currentTarget.firstChild.innerText); //현재 item 타이틀
    dispatch({
      type: "RELOAD_REQUEST",
      isReloaded: false,
      linkTitle: e.currentTarget.firstChild.innerText,
    });
  };


  return (
    <ProductCardWrapper id="ProductCardWrapper">
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
            <PriceDetail>{element.price}</PriceDetail>
            <InfoDetail>{element.info}</InfoDetail>
            <RegisterDetail>{element.date}</RegisterDetail>
            <CardButtonWrapper>
              <CardLink target="_blank" href={parseLink(element.link)}>
                링크
              </CardLink>
              <Button>수정</Button>
              <Button>삭제</Button>
            </CardButtonWrapper>
            <RedoForm onSubmit={handleReload}>
              <FormTitle>{element.title}</FormTitle>
              <Button type="submit">새로고침</Button>
            </RedoForm>
          </CardDetail>
        </Nav.Item>
      ) : (
        <div>자주사는 물품을 등록해주세요</div>
      )}
    </ProductCardWrapper>
  );
}

export default ProductCard;
