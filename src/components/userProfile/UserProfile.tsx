import "./userProfile.css";
import ProfilePic from "../../images/userprofile5.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setupSocketConnection } from "../../services/socket";
import {
  addNewChat,
  getAllConnectedUsers,
  getChats,
} from "../../services/chatServices";

const UserProfile = () => {
  const [user, selectedUser, loggedIn] = useSelector((state: any) => [
    state.users.loggedIn,
    state.users.selectedUser,
    state.users.loggedIn,
  ]);

  const dispatch = useDispatch();

  const toggleInfo = (e: any) => {
    e.target.parentNode.classList.toggle("open");
  };

  useEffect(() => {
    let socket = setupSocketConnection();

    socket.emit("setUserActive", loggedIn.username);

    socket.on("doneSettingUpUserActive", (user) => {
      console.log("seting up active state for : ", user);
      getAllConnectedUsers(dispatch);
    });

    socket.on("message-sent", (user: string) => {
      console.log("event message sent : " , user)
      if (user === selectedUser.username) {
        getChats(dispatch, selectedUser.username);
      }
    });
  }, [loggedIn]);
  console.log(user);
  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img src={"http://localhost:4000/" + user.profileImage} />
        </div>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
        <p>{user.username}</p>
      </div>
      <div className="profile__card">
        <div className="card__header" onClick={toggleInfo}>
          <h4>Bio</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card__content">{user.bioData}</div>
      </div>
    </div>
  );
};

export default UserProfile;
