import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {TodoList} from '../components/TodoList';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { onLogout } from '../api/auth';
import '../style/Dashboard.css';


export const Dashboard = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); //Change to true after implementing protectedInfo()
    const [protectedData, setProtectedData] = useState(null);

    const logout = async () => {
        try {
            await onLogout();
            dispatch(unauthenticateUser());
            localStorage.removeItem('isAuth'); //Remove user session from local storage
        } catch (error) {
            console.error(error.response);
        }
    };

    //FIXME
    // const protectedInfo = async () => {
    //     try {
    //         const { data } = await fetchProtectedInfo(); //Add in api/auth.js
    //         setProtectedData(data);
    //         setLoading(false);
    //     } catch (error) {
    //         logout();
    //     }
    // };

    // useEffect(() => {
    //     protectedInfo();
    // }, []);
        
        return loading ? (
            <h3>Loading...</h3>
        ) : (
            <div className="dashboard">
                {/* <h2>{protectedData}</h2> */}

                <div className="todo feature">
                    <h3 className="todo">My Tasks: </h3>
                    <TodoList className="todo"/>
                </div>

                <div className="quote feature">
                    <p className="quote">Insert quote here</p>
                </div>

                <div className="habits feature">
                    <h3 className="habits">My Habits:</h3>
                </div>

                <div className="goals feature">
                    <h3 className="goals">My Goals:</h3>
                </div>

                <div className="extra feature">
                    <h3 className="extra">Insert extra here</h3>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>

            </div>
        );
};