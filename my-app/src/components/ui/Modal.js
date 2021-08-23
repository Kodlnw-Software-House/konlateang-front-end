import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css'
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModal}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("modal_overlay")
      )}
    </Fragment>
  );
};

export default Modal;
