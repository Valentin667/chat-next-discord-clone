import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import style from "@/styles/login.module.scss"

const Login = () => {
    const [error,setError] = useState({});
    const inputRef = useRef();
    const {push} = useRouter();

    console.log(inputRef);

    const onKeyDown = (e) => {
        if (e.keyCode === 13){
            console.log(inputRef.current.value);

            localStorage.setItem("username", inputRef.current.value);
            inputRef.current.value = "";

            push('/');
        }
    }

    useEffect(() => {
        console.log(typeof localStorage.getItem("error"));

        if(localStorage.getItem('error') == 200) {
            console.log("error is present");

            setError('Server is down atm')
        }
    }, []);

    const displayError = () => {
        if ( error !== "") {
            return <h2>error</h2>
        }
    }

    const getClassname = () => {
        let finalClassname = `${style.title} `;
        if (error !== "") {
            finalClassname += `${style.error} `;
        }

        return finalClassname;
    }

    return (
        <div className={style.loginContainer}>
            <h1 className={`${getClassname()}`} >Welcome 👋</h1>
            <p className={style.text}>Set a username to get started</p>
            <input className={style.enter} ref={inputRef} type="text" placeholder="Username" onKeyDown={onKeyDown}/>
            {/* <input type="submit" value="enter" ref={inputRef} onKeyDown={onKeyDown}/> */}
            {displayError()}
        </div>
    )
}

export default Login;