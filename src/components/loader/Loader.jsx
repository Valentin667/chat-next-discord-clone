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
        <img className={style.image_loaded} src="/discord_loader.gif" alt="Loading" />
      )}
    </div>
  );
};

export default Loader