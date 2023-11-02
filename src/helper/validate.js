import toast from "react-hot-toast";
import { authenticate } from "./helper";

// validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  if (values.username) {
    //check user exist
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exist = toast.error("User does not exist...!");
    }
  }
  return errors;
}

// validate login pass password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

//validate reset password
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);
  if (Object.keys(errors).length === 0) {
    if (values.password !== values.confirm_password) {
      errors.exist = toast.error("Password not match...!");
    }
  }
  return errors;
}

//validate Register form
export async function registerValidate(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

//validate Profile form
export async function profileValidate(values) {
  const errors = emailVerify({}, values);

  return errors;
}

// validate username?
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required..!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...");
  }
  return error;
}

// validate password?
function passwordVerify(error = {}, values) {
  const specialCharacters = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
  if (!values.password) {
    error.password = toast.error("Password Required..!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password...");
  } else if (values.password.length < 3) {
    error.password = toast.error("Password must be more that 4 character");
  } else if (!specialCharacters.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }
  return error;
}

// validate email
function emailVerify(error = {}, values) {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!values.email) {
    error.email = toast.error("Email required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }
  return error;
}
