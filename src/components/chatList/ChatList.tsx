import React, { Component, useEffect } from "react";
import "./chatList.css";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ChatListItems from "../chatList/ChatListItem";
import { addNewChat,  getChats } from "../../services/chatServices";
import { useDispatch, useSelector } from "react-redux";

import { AutoComplete } from "antd";

function ChatList() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: any) => state.users.allUsers);
  const allChats = useSelector((state: any) => state.chat.allChats);

  const startNewChat = (userId: any) => {
    addNewChat(dispatch, userId);
  };

  return (
    <div>
      <div className="main__chatlist">
        <AutoComplete
          style={{ width: 200 }}
          options={allUsers.map((user: any) => ({ value: user.username }))}
          placeholder="search for users"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          allowClear={true}
          notFoundContent="No user Present"
          onSelect={startNewChat}
          // onChange={(e: any) => console.log(e.target.value)}
        />

        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {allChats ? (
            allChats.map((item: any, index: number) => {
              // console.log(item.profileImage);
              return (
                <ChatListItems
                  firstName={item.firstName}
                  lastName = {item.lastName}
                  username = {item.username}
                  key={item.username}
                  animationDelay={index + 1}
                  active={item.active ? "active" : ""}
                  isOnline={item.active ? "active" : ""}
                  image={item.profileImage}
                  lastSeen ={item.lastSeen}
                />
              );
            })
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
