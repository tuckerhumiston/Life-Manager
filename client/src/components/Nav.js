import React from 'react';
import { Navlink } from 'react-router-dom';

import '../style/structure/Nav.css';

export const Nav = () => {
            
    return (
        <div className="nav">
            <p>Nav Link #1</p>
            <p>Nav Link #2</p>
            <p>Nav Link #3</p>
            <p>Nav Link #4</p>
            <p>Nav Link #5</p>

            {/* Replace */}
            {/* <Navlink to="/profile">Profile</Navlink> */}
        </div>
    );
};