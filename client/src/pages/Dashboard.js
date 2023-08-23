import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {List} from '../components/List';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { onLogout,} from '../api/auth';
import '../style/Dashboard.css';


export const Dashboard = () => {
    const dispatch = useDispatch();

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
        <div className="dashboard">
            <div className="todo feature">
                <h3 className="todo">My Tasks: </h3>
                <List
                    className="todo"
                    listType="todo"
                />
            </div>

            <div className="quote feature">
                <p className="quote">Insert quote here</p>
            </div>

            <div className="habits feature">
                <h3 className="habits">My Habits:</h3>
                <List
                    className="habits-list"
                    listType="habits"
                />
            </div>

            <div className="goals feature">
                <h3 className="goals">My Goals:</h3>
                <List
                    className="goals-list"
                    listType="goals"
                />
            </div>

            <div className="extra feature">
                <h3 className="extra">Controls:</h3>
                <button className="logout" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};