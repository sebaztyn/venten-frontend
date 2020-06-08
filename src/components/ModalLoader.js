import React from "react";
import styled, { keyframes } from "styled-components";

// "-webkit-animation": "sk-stretchdelay 1.2s infinite ease-in-out";
// animation: `$skStretchdelay 1.2s infinite ${theme.transitions.easing.easeInOut}`;

const bounce = keyframes`
    0% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
    40% {
      transform: scaleY(0.4);
    }
    100% {
      transform: scaleY(0.4);
    }`;
const DivSpinner = styled.div`
  margin: 100px auto;
  width: 100px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%; -50%);
  & > div {
    background-color: blue;
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-left: 5px;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-name: ${bounce};
    animation-timing-function: ease-in-out;
  }
  & .rect2 {
    animation-delay: -1.1s;
  }
  & .rect3 {
    animation-delay: -1s;
  }
  & .rect4 {
    animation-delay: -0.9s;
  }
  & .rect5 {
    animation-delay: -0.8s;
  }
`;

const ModalLoader = () => {
  return (
    <DivSpinner>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </DivSpinner>
  );
};

export default ModalLoader;
