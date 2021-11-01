import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const BackdropClasses = props.type ? classes.backdrop : "";
  return <div className={BackdropClasses} onClick={props.closeModal}></div>;
};

const ModalOverlay = (props) => {
  const ModalClasses = props.type ? classes.modal : classes.noti_modal;
  return <div className={ModalClasses}>{props.children}</div>;
};

const Modal = (props) => {
  let backdrop;
  props.type === "DECISION" ? (backdrop = true) : (backdrop = false);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop type={backdrop} closeModal={props.closeModal} />,
        document.getElementById("backdrop")
      )}
      {!backdrop
        ? ReactDOM.createPortal(
            <ModalOverlay type={backdrop}>{props.children}</ModalOverlay>,
            document.getElementById("noti_overlay")
          )
        : ReactDOM.createPortal(
            <ModalOverlay type={backdrop}>{props.children}</ModalOverlay>,
            document.getElementById("modal_overlay")
          )}
    </Fragment>
  );
};

export default Modal;
