import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { onLogout } from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice';


import '../style//structure/Header.css';

export const Header = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const dispatch = useDispatch();


    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    // User logout function
    const logout = async () => {
        try {
            await onLogout();
            dispatch(unauthenticateUser());
            localStorage.removeItem('isAuth'); //Remove user session from local storage
        } catch (error) {
            console.error(error.response);
        }
    };

            
    return (
        <div className="header">
            <a href="/">
                <img src={require("../style/images/temp-logo.png")} alt="logo" />
            </a>
            <h1>Life Manager</h1>
            <div className="profile-container">
                <img
                    src={require("../style/images/profile-icon.png")}
                    alt="profile"
                    onClick={toggleDropdown}
                />
                {isDropdownVisible && (
                    <ul className="dropdown">
                        <li onClick={logout}>Logout</li>
                    </ul>
                )}
            </div>
        </div>
    );
};