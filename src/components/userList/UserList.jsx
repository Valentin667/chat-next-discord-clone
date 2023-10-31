import { useEffect, useRef } from 'react';
import User from '../user/User';
import style from './UserList.module.scss'
import { gsap } from "gsap";
import Image from 'next/image'
import friends from '../../../public/icons/friends.svg'
import nitro from '../../../public/icons/nitro.svg'

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
        <div ref={listRef} className={style.conversations}>
            <div className={style.conversationListTop}>
        <input type='search' placeholder='Find or start a conversation' />
      </div>
      
        <div className={style.elementsContainer}>
          <div className={style.svgContainer}>
            <Image
              height={25}
              width={25}
              src={friends}
              className={style.svg}
              alt='friends'
            />
          </div>
          <p>Friends</p>
        </div>
        <div className={style.elementsContainer}>
          <div className={style.svgContainer}>
            <Image
              height={25}
              width={25}
              src={nitro}
              className={style.svg}
              alt='nitro'
            />
          </div>
          <p>Nitro</p>
        </div>
            <div className={style.dmTitle}>DIRECT MESSAGES</div>
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