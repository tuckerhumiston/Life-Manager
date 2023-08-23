import React from 'react';
import '../style//structure/Header.css';

export const Header = () => {
            
            return (
                <div className="header">
                    <a href="/">
                        <img src={require("../style/images/temp-logo.png")} alt="logo"></img>
                    </a>
                    <h1>Life Manager</h1>
                    <img src={require("../style/images/profile-icon.png")} alt="logo"></img>
                </div>
            );
};