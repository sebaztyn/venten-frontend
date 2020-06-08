import React from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
  background-color: hsla(0%, 0%, 0%, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
`;

const Modal = (props) => {
  const { children } = props;
  return <ContainerDiv {...props}>{children}</ContainerDiv>;
};

export default Modal;
