import React, { useState, useEffect } from 'react';
import { AuthProvider } from './firebase/authContext';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
        Routes,
        Route,
        useLocation, 
        } from 'react-router-dom';  
import './App.css';

import Dashboard from './pages/dashboard/dashboard';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/header';

import Products from './pages/product/product'
import Report from './pages/report/report';
import Receiving from './pages/receiving/receiving';
import Employees from './pages/employees/employees';
import Signin from './pages/signin/Sign-in';
import Register from './components/register/register';
import VerifyEmail from './pages/verifyEmail/verifyEmail';


function App() {

  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
      <>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
      { pathname === '/' ? null: <Header /> }
      { pathname === '/' ? null: <Sidebar /> }
      <Routes >
      <Route path='/' element={<Signin />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/products' element={<Products />} />
      <Route path='/reports' element={<Report />} />
      <Route path='/receive' element={<Receiving />} />
      <Route path='/employees' element={<Employees />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verifyEmail' element={<VerifyEmail />} />
      {/*<Route path='*' element={<Error />} />*/}
      </Routes>
      </AuthProvider>
      </>
    
  );
}

export default App;
