import React from 'react';
import { 
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import Root from './components/Root';
import { Login } from './pages/Login';

const PrivateRoutes = () => {
  const isAuth = false;

  return <>{ isAuth ? <Outlet /> : <Navigate to="/login" />}</>
};

const RestrictedRoutes = () => {
  const isAuth = false;

  return <>{ !isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>
};

const router = createBrowserRouter( createRoutesFromElements( 
  <>
    
    <Route element={<PrivateRoutes />} >
      <Route path="/" element={ <Root /> }>
        <Route path="dashboard" element={ <Dashboard /> } />
        <Route path="" element={<Navigate to="/dashboard" />} /> 
      </Route> 
    </Route>

    <Route element={<RestrictedRoutes />} >
      <Route path="/login" element={ <Login /> } />
      {/* <Route path="" element={<Navigate to="/login" />} /> */}
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