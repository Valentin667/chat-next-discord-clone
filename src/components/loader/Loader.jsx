import React, { useEffect, useState } from "react";
import style from "./Loader.module.scss"

const Loader = ({onLoaderFinish}) => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    // Après 2 secondes, affichez l'image en activant setShowImage
    const timeout = setTimeout(() => {
      setShowImage(false);
      onLoaderFinish();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="loader">
      {showImage && (
        <img draggable="false" className={style.image_loaded} src="assets/images/loginpage/discord_loader.gif" alt="Loading" />
      )}
    </div>
  );
};

export default Loader