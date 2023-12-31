import axios from "axios";
/*Make api requests */

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/*authenticate user*/
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't match" };
  }
}

/*get user details*/
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: "Password doesn't match" };
  }
}

/*register user function*/
export async function registerUser(credentials) {
  try {
    const {
      data: { message },
      status,
    } = await axios.post("/api/register", credentials);
    let { username, email } = credentials;
    /*send email*/
    if (status === 201) {
      await axios.get("/registerMail", {
        username,
        userEmail: email,
        text: message,
      });
    }
    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/*login function*/
export async function verifyPassword({ username, password }) {
  try {
    const { data } = await axios.post("/api/login", { username, password });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match" });
  }
}

/*update user function*/
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({ error: "couldn't update user" });
  }
}

/*generate OTP*/
export async function generateOTP(username) {
  try {
    const { data: code, status } = await axios.get("/api/generateOTP", {
      params: { username },
    });
    //send mail with OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your password recovery OTP is ${code} for password recovery`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        Subject: "password recovery",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/*verify OTP*/
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/*reset password*/
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.return({ data, status });
  } catch (error) {
    return Promise.reject(error);
  }
}
