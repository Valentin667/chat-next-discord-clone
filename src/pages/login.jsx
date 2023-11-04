import { useRouter } from "next/router";
import React, { useState, useRef, useEffect} from 'react';
import style from "@/styles/login.module.scss"
import Image from "next/image";
import bg from "../../public/assets/images/loginpage/bgdiscordlogin.svg"
import Qrcode from "../../public/assets/images/loginpage/qrcode.png"
import loader from "../../public/assets/images/loginpage/loading_image.gif"
import Loader from "@/components/loader/Loader";

const Login = () => {
    const inputRef = useRef();
    const {push} = useRouter();

    const handleLoginClick = () => {
        onKeyDown({ keyCode: 13 });
    }

    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {

    const loaderFinish = () => {
        setLoading(false); // Charger le contenu principal après que le loader ait terminé
      };

      setTimeout(() => {
        loaderFinish(); // Appeler loaderFinish lorsque le chargement est terminé
      }, 2000);

    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

    console.log(inputRef);

    const onKeyDown = (e) => {
        if (e.keyCode === 13){
            console.log(inputRef.current.value);

            localStorage.setItem("username", inputRef.current.value);
            inputRef.current.value = "";

            push('/');
        }
    }

    return (
        <div>
            {loading ? (
           <Loader onLoaderFinish={() => setLoading(false)} />
           ) : (
        <div>
            <Image draggable="false" alt="" className={style.bg} src={bg} />
                <div className={style.form_group}>
                    <div className={style.form_left}>
                        <h1>Welcome !</h1>
                        <p>We are happy to see you !</p>
                        <div className={style.form}>
                            <div className={style.form_login}>
                                <label htmlFor="username">USERNAME <span>*</span></label>
                                <input ref={inputRef} type="username" id="username" onKeyDown={onKeyDown}/>
                            </div>
                            <button className={style.button} onClick={handleLoginClick}>Login</button>
                        </div>
                    </div>
                    <div className={style.form_right}>
                        <div className={style.qr}>
                        {showLoader ? (
                            <Image className={style.image_loaded} src={loader} alt="" />
                        ) : (
                            <Image className={style.qrcode} draggable="false" alt="Qrcode to connect with your phone" src={Qrcode} />
                        )}
                        </div>
                        <div className={style.text}>
                            <h1>Login with a QR code</h1>
                            <p><span>Scan it</span> to quickly connect <br /> with your <span>phone</span></p>
                        </div>
                    </div>
                </div>
            </div>
             )}
        </div>
    )
}

export default Login;