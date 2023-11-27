import { useEffect, useRef, useState } from "react";
import style from "./User.module.scss";
import Image from "next/image";
import avatar from "../../../public/discord1.jpeg";

const User = ({ user, selectedUser, setSelectedUser, resetNotification }) => {
  const userRef = useRef();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    console.log(userRef);
  });

  useEffect(() => {
    // Increment the notification count when user.hasNewMessages is true
    if (user.hasNewMessages) {
      setNotificationCount(notificationCount + 1);
    }
  }, [user.hasNewMessages]);

  return (
    <div
      ref={userRef}
      className={`${style.user} ${
        selectedUser?.userID === user.userID ? style.user__active : ""
      }`}
      onClick={() => {
        setSelectedUser(user);
        resetNotification(user);
        setNotificationCount(0);
      }}
    >
      <Image
        draggable="false"
        height={40}
        width={40}
        src={avatar}
        className={style.message_avatar}
        alt=""
      />
      <div className={style.usernameContainer}>
        {user.username}
        {user.hasNewMessages === true ? (
          <span className={style.notification}>{notificationCount}</span>
        ) : null}
      </div>
    </div>
  );
};

export default User;
