import { useEffect, useRef } from "react";
import style from "./Message.module.scss";
import {gsap} from "gsap";

const Message = ({ username, content, fromSelf }) => {

    const messageRef = useRef();

    useEffect(() => {
        gsap.to(messageRef.current, {
            opacity : 1,
            x : 0,
        })
    })

    return (
        <div ref={messageRef} className={`${style.message} ${fromSelf ? style.message__self : "" }`}>
            {username} : {content}
        </div>
    );
};

export default Message;