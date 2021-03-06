import { useSelector } from "react-redux";
import Avatar from "../chatList/Avatar";

function ChatItem(props:any) {

   return (
    <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{props.msg}</div>
          <div className="chat__meta">
            <span>{props.time}</span>
            {/* <span>Seen 1.03PM</span> */}
          </div>
        </div>
        <Avatar isOnline="none" image={ props.image} />
      </div>
  )
}

export default ChatItem;