import Modal from "./Modal";
import {
  CheckIcon,
  ExclamationCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui-slice";

const Notification = (props) => {
  const dispatch = useDispatch();

  const closeNoti = () => {
    dispatch(uiActions.clearNoti());
  };

  useEffect(() => {
    const clearNoti = setTimeout(() => {
      dispatch(uiActions.clearNoti());
      clearTimeout(clearNoti);
    }, 5000);
  }, [dispatch]);

  if (props.status === "error") {
    return (
      <Modal>
        <div className="alert flex-row alert-error">
          <div className="flex-1">
            <ExclamationCircleIcon className="w-6 h-6 mx-2" />
            <span>{props.title}!</span>
            <span>{props.message}</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm btn-ghost" onClick={closeNoti}>
              <XIcon className="w-6 h-6 inline-block" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
  if (props.status === "success") {
    return (
      <Modal>
        <div className="alert flex-row alert-success">
          <div className="flex-1">
            <CheckIcon className="w-6 h-6 mx-2" />
            <span>{props.title}!</span>
            <span>{props.message}</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm btn-ghost" onClick={closeNoti}>
              <XIcon className="w-6 h-6 inline-block" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
};

export default Notification;
