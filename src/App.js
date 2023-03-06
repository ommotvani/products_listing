import './App.css';
import RegisterForm from './view/form/RegisterForm';
import LoginForm from './view/form/LoginForm';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Products from './components/Products';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import ProtectedRouter from './protectedRoute/ProtectedRoute';
import ProductDetail from './components/ProductView';
import { ToastContainer } from 'react-toastify';
import EditProfile from './components/EditProfile';
import ResetPassword from './components/ResetPassword';
import ProductView from './components/ProductView';


function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // let authData = null
  
  useEffect(() => {
    setUser(JSON.stringify(localStorage.getItem('Auth')))
  }, [])

  let authData =  JSON.parse(localStorage.getItem("Auth"));

  
  return (
<>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/products" element={
        <ProtectedRouter auth={authData}>
          <Products />
        </ProtectedRouter>
      } />
      <Route path="/productsDetail" element={
        <ProtectedRouter auth={authData}>
          <ProductDetail />
        </ProtectedRouter>
      } />
      <Route path="/users/editprofile" element={
        <ProtectedRouter auth={authData}>
          <EditProfile />
        </ProtectedRouter>
      }/>
  
    <Route path="/users/resetpwd" element={
        <ProtectedRouter auth={authData}>
          <ResetPassword />
        </ProtectedRouter>
      }/>
      <Route path="/products/view/:id" element={
        <ProtectedRouter auth={authData}>
          <ProductView />
        </ProtectedRouter>
      }/>
     
    </Routes>
      <ToastContainer />

      </>

  );
}

export default App;
