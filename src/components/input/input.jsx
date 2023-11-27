import { socket } from "@/utils/socket";
import { useRef, useState } from "react";
import Image from "next/image";
import plusFilled from "../../../public/assets/icons/plus-filled.svg";
import sticker from "../../../public/assets/icons/sticker.svg";
import cool_face from "../../../public/assets/images/main/emoji/cool_face.png";
import face_with_tongue from "../../../public/assets/images/main/emoji/face_with_tongue.png";
import grin from "../../../public/assets/images/main/emoji/grin.png";
import innocent from "../../../public/assets/images/main/emoji/innocent.png";
import laughing from "../../../public/assets/images/main/emoji/laughing.png";
import slight_smile from "../../../public/assets/images/main/emoji/slight_smile.png";
import smile from "../../../public/assets/images/main/emoji/smile.png";
import grinning from "../../../public/assets/images/main/emoji/grinning.png";
import star_struck from "../../../public/assets/images/main/emoji/star_struck.png";
import upside_down from "../../../public/assets/images/main/emoji/upside_down.png";
import disguised_face from "../../../public/assets/images/main/emoji/disguised_face.png";
import partying_face from "../../../public/assets/images/main/emoji/partying_face.png";
import rolling_on_the_floor_laughing from "../../../public/assets/images/main/emoji/rolling_on_the_floor_laughing.png";
import nerd_face from "../../../public/assets/images/main/emoji/nerd_face.png";
import face_with_monocle from "../../../public/assets/images/main/emoji/face_with_monocle.png";
import kissing_heart from "../../../public/assets/images/main/emoji/kissing_heart.png";
import tired_face from "../../../public/assets/images/main/emoji/tired_face.png";
import kissing_closed_eyes from "../../../public/assets/images/main/emoji/kissing_closed_eyes.png";
import persevere from "../../../public/assets/images/main/emoji/persevere.png";
import confounded from "../../../public/assets/images/main/emoji/confounded.png";
import smiling_face from "../../../public/assets/images/main/emoji/smiling_face.png";
import miam from "../../../public/assets/images/main/emoji/miam.png";
import smiling_face_with_heart_eyes from "../../../public/assets/images/main/emoji/smiling_face_with_heart_eyes.png";
import smiling_face_with_tear from "../../../public/assets/images/main/emoji/smiling_face_with_tear.png";
import face_with_raised_eyebrow from "../../../public/assets/images/main/emoji/face_with_raised_eyebrow.png";
import kissing_smiling_eyes from "../../../public/assets/images/main/emoji/kissing_smiling_eyes.png";
import unamused from "../../../public/assets/images/main/emoji/unamused.png";
import frowning_face from "../../../public/assets/images/main/emoji/frowning_face.png";
import disappointed from "../../../public/assets/images/main/emoji/disappointed.png";
import face_with_diagonal_mouth from "../../../public/assets/images/main/emoji/face_with_diagonal_mouth.png";
import gift from "../../../public/assets/icons/gift.svg";
import gif from "../../../public/assets/icons/gif.svg";
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

  const images = [
    grinning,
    cool_face,
    face_with_tongue,
    grin,
    innocent,
    laughing,
    slight_smile,
    smile,
    star_struck,
    upside_down,
    disguised_face,
    partying_face,
    rolling_on_the_floor_laughing,
    nerd_face,
    face_with_monocle,
    kissing_heart,
    tired_face,
    kissing_closed_eyes,
    persevere,
    confounded,
    smiling_face,
    miam,
    smiling_face_with_heart_eyes,
    smiling_face_with_tear,
    face_with_raised_eyebrow,
    kissing_smiling_eyes,
    unamused,
    frowning_face,
    disappointed,
    face_with_diagonal_mouth,
  ];

  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

  const handleHover = () => {
    setIsHovered(true);

    // Choisir un nouvel indice d'image aléatoire
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
    setHoveredImageIndex(randomIndex);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    // <div className={style.chatInputContainer}>
    <div className={style.chatInputWrapper}>
      <div className={style.svgContainer}>
        <Image
          draggable="false"
          height={25}
          width={25}
          src={plusFilled}
          className={style.svg}
          alt=""
        />
      </div>
      <input
        type="text"
        placeholder="Type a message"
        ref={inputRef}
        className={style.input}
        onKeyDown={onKeyDown}
      />

      <div
        className={`${style.svgContainer} ${style.tipper_boi}`}
        data-tip="Take your friends to the next level! Give them great chat perks with Nitro."
      >
        <Image
          draggable="false"
          height={25}
          width={25}
          src={gift}
          className={style.svg}
          alt=""
        />
      </div>
      <div className={style.svgContainer}>
        <Image
          draggable="false"
          height={25}
          width={25}
          src={gif}
          className={style.svg}
          alt=""
        />
      </div>
      <div className={style.svgContainer}>
        <Image
          draggable="false"
          height={25}
          width={25}
          src={sticker}
          className={style.svg}
          alt=""
        />
      </div>
      <div
        className={style.svgContainer}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <Image
          draggable="false"
          height={25}
          width={25}
          src={
            isHovered ? images[hoveredImageIndex] : images[currentImageIndex]
          }
          className={style.emoji}
          alt=""
        />
      </div>
    </div>
    // </div>
  );
};

export default Input;
