import Image from "next/image";
import personPlus from "../../../public/assets/icons/person-plus.svg";
import video from "../../../public/assets/icons/video.svg";
import inbox from "../../../public/assets/icons/inbox.svg";
import phone from "../../../public/assets/icons/phone.svg";
import help from "../../../public/assets/icons/help.svg";
import pin from "../../../public/assets/icons/pin.svg";
import at from "../../../public/assets/icons/at.svg";
import style from "../chatheader/ChatHeader.module.scss";
import { useContext } from "react";
// import { DiscordContext } from '../context/context'

const ChatHeader = () => {
  //   const { roomName, currentAccount, connectWallet } = useContext(DiscordContext)
  return (
    <div className={style.chatHeader}>
      <div className={style.roomNameContainer}>
        <Image
          draggable="false"
          height={20}
          width={20}
          src={at}
          className={style.svg}
          alt=""
        />
        {/* <h3 className={style.title}>roomname</h3> */}
        <p className={style.title}>General</p>
        <div className={style.chatHeaderStatus} id="online" />
      </div>
      <div className={style.headerIconsContainer}>
        <div
          className={`${style.headerItem} ${style.tipper_boi}`}
          data-tip="Start a voice call"
        >
          <Image
            draggable="false"
            height={25}
            width={25}
            src={phone}
            className={style.svg}
            alt=""
          />
        </div>
        <div className={style.headerItem}>
          <Image
            draggable="false"
            height={25}
            width={25}
            src={video}
            className={style.svg}
            alt=""
          />
        </div>
      </div>
      <div className={style.headerItem}>
        <Image
          draggable="false"
          height={25}
          width={25}
          src={pin}
          className={style.svg}
          alt=""
        />
      </div>
      <div className={style.headerItem}>
        <Image
          draggable="false"
          height={25}
          width={25}
          src={personPlus}
          className={style.svg}
          alt=""
        />
      </div>
      <div className={style.headerItem}>
        <input type="search" placeholder="Search" />
      </div>
      <div className={style.headerItem}>
        <Image
          draggable="false"
          height={25}
          width={25}
          src={inbox}
          className={style.svg}
          alt=""
        />
      </div>
      <div className={style.headerItem}>
        <Image
          draggable="false"
          height={25}
          width={25}
          src={help}
          alt=""
          className={style.svg}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
