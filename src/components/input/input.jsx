import { socket } from "@/utils/socket";
import { useRef } from "react";
import Image from "next/image";
import plusFilled from '../../../public/icons/plus-filled.svg'
import sticker from '../../../public/icons/sticker.svg'
import smiley from '../../../public/icons/smiley.svg'
import gift from '../../../public/icons/gift.svg'
import gif from '../../../public/icons/gif.svg'
import style from "./input.module.scss";

const Input = ({ selectedUser, setSelectedUser }) => {
  const inputRef = useRef();

  const onKeyDown = (e) => {
    // detect when user press enter
    if (inputRef.current.value.length !== 0 && e.keyCode === 13) {
      console.log(inputRef.current.value);

      if (selectedUser) {
        socket.emit("private message", {
          content: inputRef.current.value,
          to: selectedUser.userID,
        });

        // do this because react doesnt re-render otherwise
        const _selectedUser = { ...selectedUser };

        _selectedUser.messages.push({
          content: inputRef.current.value,
          // fromSelf: true,
          username: localStorage.getItem("username"),
          from: socket.userID,
        });

        // change the reference to trigger a render
        setSelectedUser(_selectedUser);
      } else {
        socket.emit("message", { content: inputRef.current.value });
      }

      inputRef.current.value = "";
    }
  };

  return (
    <div className={style.chatInputContainer}>
      <div className={style.chatInputWrapper}>
        <div className={style.svgContainer}>
          <Image
            height={25}
            width={25}
            src={plusFilled}
            className={style.svg}
          />
        </div>
      <input 
        type="text" 
        placeholder="Type a message"
        ref={inputRef}
        className={style.input}
        onKeyDown={onKeyDown} 
      />

      <div className={style.svgContainer}>
          <Image height={25} width={25} src={gift} className={style.svg} />
        </div>
        <div className={style.svgContainer}>
          <Image height={25} width={25} src={gif} className={style.svg} />
        </div>
        <div className={style.svgContainer}>
          <Image height={25} width={25} src={sticker} className={style.svg} />
        </div>
        <div className={style.svgContainer}>
          <Image height={25} width={25} src={smiley} className={style.svg} />
        </div>
      </div>
    </div>

  );
};

export default Input;