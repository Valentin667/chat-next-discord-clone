import { useEffect, useRef } from "react";
import style from "./Message.module.scss";
import {gsap} from "gsap";
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

const Message = ({ sender, timestamp, username, content, fromSelf, message }) => {

    const messageRef = useRef();

    const avatar = getAvatarUrl(sender);

    useEffect(() => {
        gsap.to(messageRef.current, {
            opacity : 1,
            x : 0,
        })
    })

    return (
        <div className={style.messageCard}>
            <div className={style.messageAvatarContainer}>
                <Image
                height={40}
                width={40}
                src={avatar}
                className={style.messageAvatar}
                // alt={sender}
                />
            </div>
            <div>
                <div className={style.messageDetails}>
                <p className={style.sender}>{username}</p>
                <small className={style.timestamp}>{timestamp}</small> 
                </div>
                <div ref={messageRef} className={`${style.messageText} ${fromSelf ? style.message__self : "" }`}>
                        {content}
                </div>
            </div>
            <p>{message}</p>
        </div>
    );
};

export default Message;