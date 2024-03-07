import "../App.css";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom";
import { Firestore } from "firebase/firestore";

{/* <Link to="/Dashboard"> Dashboard </Link> */}
function Auth({user, setUser}) {
    if(user != null) return <Navigate to=".."/>
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    async function register() {
       
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
        } catch (err){
            alert(err)
        }
    }

    async function login() {
        try{
            const user = signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch(err) {
            console.log(error);
        }
    }

    return (
    <>
        <div className="w-full fixed h-full flex flex-col items-center justify-center">
            
            <div className="h-1/2 bg-slate-800 py-10 px-14 flex flex-col items-start">
                {/* <button className="absolute">back</button> */}
                <h1 className="mb-5 font-mono">Login</h1>
                <input
                className="mb-5 font-mono textInput"
                type='email'
                id='email'
                placeholder="E-mail"
                // name='title'
                onChange={(e) => setEmail(e.target.value)}
                // value={loginEmail}
                // placeholder='Enter title'/>
                />
                <input 
                    className="mb-12 font-mono textInput"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-between w-full">
                    <button
                    className="font-mono btn hover:animate-pulse" onClick={login}>Log in</button>
                    <button
                    className="font-mono btn hover:animate-pulse" onClick= {register}>Sign up</button>
                </div>
            </div>
        </div>
    </>)
}

export default Auth;