import React, { useEffect, useState } from "react";
import style from "./Loader.module.scss";
import loader from "../../../public/assets/images/loginpage/discord_loader.gif";
import Image from "next/image";

const Loader = ({}) => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    // Après 2 secondes, affichez l'image en activant setShowImage
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="loader">
      {showImage && (
        <Image
          draggable="false"
          className={style.image_loaded}
          src={loader}
          alt="Loading"
        />
      )}
    </div>
  );
};

export default Loader;
