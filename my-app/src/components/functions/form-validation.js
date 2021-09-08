const emailValidate = (email) => {
  if (email && email.length > 0 && email.includes("@")) {
    return true;
  }
  return false;
};
const passwordValidate = (pass) => {
  if (pass && pass.length > 0) {
    return true;
  }
  return false;
};
const checkNotEmpty = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return false;
};
export { emailValidate, passwordValidate, checkNotEmpty };
