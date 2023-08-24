import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import "../style/features/Login.css";
import { onRegistration, onLogin } from '../api/auth';
import { authenticateUser } from '../redux/slices/authSlice';

export const Login = () => {

    //State
    const [toggleLogin, setToggleLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const dispatch = useDispatch();

    //Event handlers
    const onSignupForm = async (e) => {
        e.preventDefault();
        try {

            const { data } = await onRegistration({
                username: username,
                email: email,
                password: password
            });

            setError('');
            // setSuccess(data.message);

            setToggleLogin(true);

        } catch (error) {
            console.error(error); // Log the entire error object for debugging
            console.error(error.response); // Log the response object for debugging

            // Check the structure of error.response and adjust the following line accordingly
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]) {
                setError(error.response.data.errors[0].msg);
            } else {
                setError("An error occurred during registration.");
            }
            // setSuccess('');
        }
    };

    const onLoginForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await onLogin({
                email: email,
                password: password
            });
            dispatch(authenticateUser());
            localStorage.setItem('isAuth', 'true'); //Store user session in local storage

            setError('');
            setSuccess(data.message);

            setEmail('');
            setPassword('');
            setUsername('');

        } catch (error) {
            console.error(error.response.data.errors[0].msg);
            setError(error.response.data.errors[0].msg);
            setSuccess('');
        }
    };

    const onChangePage = () => {
        const toggle = toggleLogin;

        setError('');
        setSuccess('');
        setToggleLogin(!toggle);
    }
            


    return toggleLogin ? (
        <div className="login">
            <div className="left">
                <h1>Life Manager</h1>
            </div>

            <div className="right">
                <h1>Life Manager</h1>
                <div className="form">
                    <h2>Login</h2>
                    <form onSubmit={onLoginForm}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>

                        <div style={{color: 'red', margin: '10px 0'}}>
                            {error}
                        </div>

                        <input type="submit" value="Login"></input>
                        
                    </form>
                    <p>New to Life Manager? <button onClick={() => onChangePage()

                        }>Create an account</button></p>
                </div>
            </div>
        </div>
    ) : (
        <div className ="signup">
            <div className="left">
                <h1>Life Manager</h1>
            </div>

            <div className="right">
                <h1>Life Manager</h1>
                <div className="form">
                    <h2>Sign Up</h2>
                    <form onSubmit={onSignupForm}>
                        <input 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        ></input>
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>

                        <div style={{color: 'red', margin: '10px 0'}}>
                            {error}
                        </div>

                        <input type="submit" value="Sign Up"></input>
                    </form>
                    <p>Already have an account? <button onClick={() => onChangePage()}>Login</button></p>
                </div>
            </div>
        </div>
    )
};