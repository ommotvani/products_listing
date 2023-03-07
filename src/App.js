import './App.css'
import RegisterForm from './view/form/RegisterForm'
import LoginForm from './view/form/LoginForm'
import {  Routes, Route, useNavigate } from 'react-router-dom'
import Products from './components/Products'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRouter from './protectedRoute/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import EditProfile from './components/EditProfile'
import ResetPassword from './components/ResetPassword'
import ProductView from './components/ProductView'
import { useEffect } from 'react'


function App() {
  
  const navigate = useNavigate()
  // const authData = null

  const authData =  JSON.parse(localStorage.getItem("Auth"))
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("Auth"))
    if (authData) {
        navigate("/products")
    }
}, [])

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

  )
}

export default App
