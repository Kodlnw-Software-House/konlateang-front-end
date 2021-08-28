import Modal from "./Modal";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui-slice";

const Notification = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const clearNoti = setTimeout(() => {
      dispatch(uiActions.clearNoti());
      clearTimeout(clearNoti);
    }, 5500);
  }, [dispatch]);

  if (props.status === "error") {
    return (
      <Modal>
        <div className="alert alert-error">
          <div className="flex flex-row justify-start items-center space-x-2">
            <ExclamationCircleIcon className="w-6 h-6" />
            <span>{props.title}!</span>
            <span>{props.message}</span>
          </div>
        </div>
      </Modal>
    );
  }
  if (props.status === "success") {
    return (
      <Modal>
        <div className="alert alert-success">
          <div className="flex flex-row justify-start items-center space-x-2">
            <CheckIcon className="w-6 h-6" />
            <span>{props.title}!</span>
            <span>{props.message}</span>
          </div>
        </div>
      </Modal>
    );
  }
};

export default Notification;
