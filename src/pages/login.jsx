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
            <h1 className={`${getClassname()}`} >Login Page</h1>
            <p>Enter username</p>
            <div className={style.inputContainer}>
                <input ref={inputRef} type="text" placeholder="username" onKeyDown={onKeyDown}/>
                <img src="./images/enterButton.gif" alt="" />
            </div>
            {displayError()}
        </div>
    )
}

export default Login;