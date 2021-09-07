import Portal from "components/Portal/Portal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// {
//   "id": 5031,
//   "links_id": 398,
//   "title": "32",
//   "price": "119960",
//   "priority": "1",
//   "source": "ssg",
//   "link": "http://www.ssg.com/item/itemView.ssg?itemId=1000212542683&siteNo=7014&salestrNo=6005&tlidSrchWd=%EC%83%88%EC%95%B6%EC%95%A0%EC%9E%AC32&srchPgNo=1&src_area=ssglist",
//   "imgsrc": "//item.ssgcdn.com/83/26/54/item/1000212542683_i1_232.jpg"
// }
const CrawlListModal = ({ modalClose, title }) => {
  const handleClose = (e) => {
    const { id } = e.target;
    if (id === "dim") {
      modalClose();
    }
  };
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 0);
  }, []);
  const { crawlList } = useSelector((state) => state.crawlReducer);
  return (
    <Portal onClick={handleClose}>
      <Container className={animation && "animation"}>
        <div></div>
        <h1>{title}에 대한 수집정보입니다.</h1>
        {crawlList.map((item) => (
          <div key={item.id}>{item.price}</div>
        ))}
        크롤러모달
      </Container>
    </Portal>
  );
};

export default CrawlListModal;

const Container = styled.aside`
  position: absolute;
  transition: 0.6s;
  width: 30%;
  height: 100%;
  background-color: white;
  right: -100%;
  padding: 15px;
  &.animation {
    right: 0;
  }
`;
