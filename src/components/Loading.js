import React from "react";
import Modal from "./Modal.js";
import ModalLoader from "./ModalLoader.js";

const Loading = () => (
  <Modal
    style={{
      backgroundColor: "hsla(0, 50%, 100%, 0.8)",
    }}
  >
    <ModalLoader />
  </Modal>
);

export default Loading;
