import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import Root from './components/Root';
import { Login } from './pages/Login';


const router = createBrowserRouter( createRoutesFromElements( 
  <>
    <Route path="/login" element={ <Login /> } />
    <Route path="/" element={ <Root /> }>

      {/* <Route path="login" element={ <Login /> } /> */}
      {/* <Route path="profile" element={ <Profile /> } /> */}

      <Route path="dashboard" element={ <Dashboard /> } />

      {/* Change back to dashboard */}
      <Route path="" element={<Navigate to="/dashboard" />} /> 

    </Route>
  </>
));

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <RouterProvider router={ router } /> 
    </div>
  );
}

export default App;