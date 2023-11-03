import { useEffect, useRef } from "react"
import style from "./User.module.scss"
import Image from "next/image";
import avatar from "../../../public/avatar-1.webp";

const User = ({ user, selectedUser, setSelectedUser, resetNotification}) => {
    const userRef = useRef();

    useEffect(() => {
        console.log(userRef);
    })

    return (
            <div 
            ref={userRef}
            className={`${style.user} ${
                selectedUser?.userID === user.userID ? style.user__active : ""
        }`}
            onClick={ () => 
                { 
                    setSelectedUser(user)
                    resetNotification(user)
                }
            }
        >
            <Image
                height={40}
                width={40}
                src={avatar}
                className={style.message_avatar}
                // alt={sender}
                />
            {user.username}

            {user.hasNewMessages === true ? (
                <span className={style.notification}>
                </span>
            ) : null }
        </div>
    )
}

export default User ;