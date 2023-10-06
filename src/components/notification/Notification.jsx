import { useEffect } from "react";
import style from "./Notification.module.scss";

const Notification = ({title, content, onClose}) => {
    useEffect(() => {
        console.log("on mounted");
        setTimeout(()=>{
            onClose();
        }, 4000)
    })
    return (
        <div className={style.notification}>
            <div className={style.close} onClick={onClose}></div>
                <strong>{title}</strong>
                <p>{content}</p>
        </div>
    )
}

export default Notification