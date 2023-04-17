 import React from 'react';
import { AuthContextProvider } from './firebase/authContext';
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
import ProtectedRoute from './components/ProtectedRoute';
import Dispatch from './pages/dispatch/dispatch';
import Remittance from './pages/remittance/remittance';


function App() {

  const { pathname } = useLocation();


  return (
      <>
      <AuthContextProvider>
      { pathname === '/' ? null: <Header /> }
      { pathname === '/' ? null: <Sidebar /> }
      <Routes >
      <Route path='/' 
              element={<Signin />} />
      <Route path='/dashboard' 
              element={<ProtectedRoute>
                      <Dashboard />
                      </ProtectedRoute>} />
      <Route path='/products' 
              element={<ProtectedRoute>
                        <Products />
                        </ProtectedRoute>} />
      <Route path='/reports' 
              element={<ProtectedRoute>
                        <Report />
                        </ProtectedRoute>} />
      <Route path='/receive' 
              element={<ProtectedRoute>
                        <Receiving />
                        </ProtectedRoute>} />
        <Route path='/dispatch' 
              element={<ProtectedRoute>
                        <Dispatch />
                        </ProtectedRoute>} />
      <Route path='/employees' 
              element={<ProtectedRoute>
                        <Employees />
                        </ProtectedRoute>} />
      <Route path='/register' 
              element={<ProtectedRoute>
                        <Register />
                        </ProtectedRoute>} />
      <Route path='/verifyEmail' 
              element={<ProtectedRoute>
                        <VerifyEmail />
                        </ProtectedRoute>} />
        <Route path='/remit' 
              element={<ProtectedRoute>
                        <Remittance />
                        </ProtectedRoute>} />
      {/*<Route path='*' element={<Error />} />*/}
      </Routes>
      </AuthContextProvider>
      </>
    
  );
}

export default App;
