import "../App.css";
import { useEffect, useState } from "react";
import { auth, db, loginWithEmailAndPassword } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { Navigate,Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Login({user, setUser}) {
    if(user != null) return <Navigate to=".."/>
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    return (
    <>
        <div className="w-full fixed h-full flex flex-col items-center justify-center">
            
            <div className="h-1/2 bg-slate-800 py-10 px-12 flex flex-col items-start">
                <h1 className="mb-5 font-mono">Login</h1>
                <input
                className="mb-5 font-mono textInput"
                type='email'
                id='email'
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="mb-12 font-mono textInput"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-between w-full mb-1">
                    <button
                    className="font-mono btn hover:animate-pulse" onClick={() => signInWithEmailAndPassword(auth, email, password)}>Log in</button>
                    <Link to="/register">
                    <button
                    className="font-mono btn hover:animate-pulse">Sign up</button>
                    </Link>
                    
                </div>

              <button className="btn font-mono">Sign in with google</button>

            </div>
        </div>
    </>)
}

export default Login;