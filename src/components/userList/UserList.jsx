import { useEffect, useRef } from 'react';
import User from '../user/User';
import style from './UserList.module.scss'
import { gsap } from "gsap";

const UserList = ({users, setUsers, selectedUser,setSelectedUser}) => {

    const listRef = useRef();

    useEffect(() => {
        gsap.to(listRef.current.children, {
            opacity : 1,
            translateX : 0,
            duration: 0.5,
            stagger : 0.1,
        })
    }, [users])

    const resetNotification = (user) => {
        const _users = [...users];
    
        const index = _users.findIndex((_user) => _user.userID === user.userID);
    
        _users[index].hasNewMessages = false;
    
        setUsers(_users);
      };

    return (
        <div ref={listRef} className={style.userlist}>
            <div 
                className={`${style.user} ${
                    selectedUser ? "" : style.user__active
            }`}
               onClick={() => setSelectedUser(null)}
                    >
                Général
            </div>
            {users.map((user) => {
                return user.connected === true ? (
                    <User key={user.userID} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} resetNotification={resetNotification} />
                ) : null
            })}
        </div>
    ) 
}

export default UserList