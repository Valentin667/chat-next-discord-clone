import { useEffect, useRef } from "react"
import style from "./User.module.scss"
import { gsap } from "gsap";

const User = ({ user, selectedUser, setSelectedUser, resetNotification}) => {
    const userRef = useRef();

    useEffect(() => {
        console.log(userRef);

        // gsap.to(userRef.current, {
        //     opacity : 1,
        //     translateX : 0,
        //     duration: 0.5,
        //     delay: index * 0.1,
        // })
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
        {user.username}

        {user.hasNewMessages === true ? (
            <span className={style.notification}>
            </span>
        ) : null }
    </div>
    )
}

export default User ;