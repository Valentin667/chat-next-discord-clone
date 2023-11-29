import { useEffect, useRef, useState } from "react";
import style from "./Message.module.scss";
import { gsap } from "gsap";
import Image from "next/image";

const getAvatarUrl = (sender) => {
  if (sender === "expediteur1") {
    return "/discord1.jpeg";
  } else if (sender === "expediteur2") {
    return "/discord2.jpeg";
  } else {
    return "/discord4.jpeg";
  }
};

const Message = ({
  sender,
  timestamp,
  username,
  content,
  fromSelf,
  message,
  imageURL,
}) => {
  const messageRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const avatar = getAvatarUrl(sender);

  useEffect(() => {
    gsap.to(messageRef.current, {
      opacity: 1,
      x: 0,
    });
  });

  return (
    <div
      className={`${style.messageCard} ${isHovered ? style.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style.messageAvatarContainer}>
        <Image
          draggable="false"
          height={40}
          width={40}
          src={avatar}
          className={style.messageAvatar}
          alt=""
        />
      </div>
      <div>
        <div className={style.messageDetails}>
          <p className={style.sender}>{username}</p>
          <small className={style.timestamp}>{timestamp}</small>
          <p className={style.date}>Today at 10:12 AM</p>
        </div>
        <div
          ref={messageRef}
          className={`${style.messageText} ${
            fromSelf ? style.message__self : ""
          }`}
        >
          {content}
        </div>
        {imageURL && <img src={imageURL} alt="Selected" />}
        {isHovered && (
          <div className={style.imageContainer}>
            <Image
              draggable="false"
              width={28}
              height={28}
              src="/assets/icons/smiley.svg"
              alt=""
              className={`${style.hiddenImage} ${style.smiley}`}
            />
            <Image
              draggable="false"
              width={28}
              height={28}
              src="/assets/icons/arrow.svg"
              alt=""
              className={`${style.hiddenImage} ${style.arrow}`}
            />
            <Image
              draggable="false"
              width={28}
              height={28}
              src="/assets/icons/ellipsis.svg"
              alt=""
              className={`${style.hiddenImage} ${style.ellipsis}`}
            />
          </div>
        )}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Message;
