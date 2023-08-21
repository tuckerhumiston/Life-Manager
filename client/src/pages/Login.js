import React, { useState } from 'react';

import "../style/features/Login.css";

export const Login = () => {

    const [toggleLogin, setToggleLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignupForm = async (e) => {
        e.preventDefault();
        try {
            const body = {
                username: username,
                email: email,
                password: password
            };      
            const response = await fetch("http://localhost:5000/profile/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            setToggleLogin(true);

        } catch (error) {
            console.error(error.message);
        }
    };

    const onLoginForm = async (e) => {
        e.preventDefault();
        try {
            const body = {
                email: email,
                password: password
            };
            const response = await fetch("http://localhost:5000/profile/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    };
            
    return toggleLogin ? (
        <div className="login">
            <div className="left">
                <h1>Life Manager</h1>
            </div>

            <div className="right">
                <div className="form">
                    <h2>Login</h2>
                    <form onSubmit={onLoginForm}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <a href="http://localhost:3000/">
                            <input type="submit" value="Login"></input>
                        </a>
                        
                    </form>
                    <p>New to Life Manager? <button onClick={() => setToggleLogin(false)}>Create an account</button></p>
                </div>
            </div>
        </div>
    ) : (
        <div className ="signup">
            <div className="left">
                <h1>Life Manager</h1>
            </div>

            <div className="right">
                <div className="form">
                    <h2>Sign Up</h2>
                    <form onSubmit={onSignupForm}>
                        <input 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <input type="submit" value="Sign Up"></input>
                    </form>
                    <p>Already have an account? <button onClick={() => setToggleLogin(true)}>Login</button></p>
                </div>
            </div>
        </div>
    )
};