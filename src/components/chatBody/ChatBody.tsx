import React, { Component, useEffect } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";
import { getAllUsers } from "../../services/userServices";
import {
  addNewChat,
  getAllConnectedUsers,
  getChats,
} from "../../services/chatServices";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDetails } from "../../services/userServices";
import { setupSocketConnection } from "../../services/socket";

function ChatBody() {
  const dispatch = useDispatch();

  const [selectedUser, loggedIn] = useSelector((state: any) => [
    state.users.selectedUser,state.users.loggedIn
  ]);
  // console.log(loggedIn);

  const prevUser = loggedIn
  // console.log(prevUser === loggedIn)
  useEffect(() => {
    getAllUsers(dispatch);
    getAllConnectedUsers(dispatch);

    getLoggedInUserDetails(dispatch);
  }, []);

  return (
    <div className="main-chatbody">
      <ChatList />
      <ChatContent />
      <UserProfile />
    </div>
  );
}

export default ChatBody;
