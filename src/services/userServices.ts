import axios from "axios";
import { UserSignUp, UserLogin } from "../interfaces/userInterface";
import {
  selectForm,
  setAllChats,
  setAllUsers,
  setLoggedUser,
} from "../redux/actions";
import { FORM_DISPLAY } from "../redux/actionTypes";

export const signUp = async (dispatch: any, user: any) => {
  // for(var i in user.entre)
  try {
    let res = await axios.post("http://localhost:4000/api/user/signup", user);
  } catch (err) {
    console.log(err);
  }

  dispatch(selectForm("LOGIN_FORM"));
};

export const login = async (user: UserLogin) => {
  let res = await axios.post("http://localhost:4000/api/user/login", user);

  return res;
};

export const checkOtp = async (dispatch: any, otp: any) => {
  let res = await axios.post(
    "http://localhost:4000/api/user/verify/otp",
    { otp },
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  // console.log(res);
  // dispatch(setLoggedUser(res.data.user));

  return res;
};

export const getAllUsers = async (dispatch: any) => {
  let res = await axios.get("http://localhost:4000/api/user");
  dispatch(setAllUsers(res.data));
};
export const getUsersByUserName = async (dispatch: any, userName: string) => {
  let res = await axios.get(`http://localhost:4000/api/user/${userName}`);
  dispatch(setAllChats(res.data));
};

export const getLoggedInUserDetails = async (dispatch: any) => {
  let res = await axios.get("http://localhost:4000/api/user/token", {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  // console.log(res)
  dispatch(setLoggedUser(res.data));
};
