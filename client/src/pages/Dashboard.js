import React from 'react';

import {TodoList} from '../components/TodoList';

import '../style/Dashboard.css';

export const Dashboard = () => {
        
        return (
            <div className="dashboard">

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
                </div>

            </div>
        );
};