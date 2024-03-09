import "../App.css";
import { useEffect, useState } from "react";
import { auth, db, registerWithEmailAndPassword } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { Navigate,Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Register({user, setUser}) {
    if(user != null) return <Navigate to=".."/>
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(user)
        if (user) history.replace("/");
    })
    
    return (
    <>
        <div className="w-full fixed h-full flex flex-col items-center justify-center">
            
            <div className="h-1/2 bg-slate-800 py-10 px-12 flex flex-col items-start">
                <h1 className="mb-5 font-mono">Sign Up</h1>
                <input
                className="mb-5 font-mono textInput"
                id='username'
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                />
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
                    className="font-mono btn hover:animate-pulse" onClick={() => registerWithEmailAndPassword(username, email, password)}>Sign up</button>
                    
                </div>

            </div>
        </div>
    </>)
}

export default Register;