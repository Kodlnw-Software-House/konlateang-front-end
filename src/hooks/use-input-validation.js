import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouch: false,
};

const inputStateReducer = (prevState, action) => {
  if (action.type === "INPUT") {
    const newInput = { value: action.value, isTouch: prevState.isTouch };
    return newInput;
  }
  if (action.type === "BLUR") {
    return { value: prevState.value, isTouch: true };
  }
  if (action.type === "RESET") {
    return initialInputState;
  }
  return initialInputState;
};

const useInputValidation = (validateValue) => {
  const [inputState, dispatchFunc] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouch;

  const inputChangeHandler = (event) => {
    dispatchFunc({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const inputBlurHandler = (state) => {
    dispatchFunc({
      type: "BLUR",
      isTouch: state,
    });
  };

  const reset = () => {
    dispatchFunc({
      type: "RESET",
    });
  };

  return {
    value: inputState.value,
    hasError,
    valueIsValid,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  };
};

export default useInputValidation;
