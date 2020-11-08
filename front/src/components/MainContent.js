import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import "./css/MainContent.css";

const MainContentWrapper = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: gray;
`;

function MainContent() {
  return (
    <MainContentWrapper id="main-content-wrapper">
      <Carousel>
        <Carousel.Item interval={5200}>

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://g-selected.pstatic.net/MjAyMDEwMjdfMjAg/MDAxNjAzNzU4MTE5Mzgx.-NwsO8m83PIoIyw7-oRoU9G2woD4nbK9zFcoVQb3sTYg.vXdw3wjCohJTmSy-YqLfC5Jjfjljch3VTVMKbd7WYH0g.JPEG/live_up1.jpg?type=f320_480_q90"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </MainContentWrapper>
  );
}

export default MainContent;
