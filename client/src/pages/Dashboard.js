import React from 'react';

import { List } from '../components/List';
import { Quote } from '../components/Quote';
import '../style/Dashboard.css';


export const Dashboard = () => {
    
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
                <Quote />
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
                <h4> More features coming soon!</h4>
            </div>
        </div>
    );
};