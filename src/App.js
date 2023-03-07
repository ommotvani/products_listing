import './App.css'
import RegisterForm from './view/form/RegisterForm'
import LoginForm from './view/form/LoginForm'
import { Routes, Route } from 'react-router-dom'
import Products from './components/Products'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRouter from './protectedRoute/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import EditProfile from './components/EditProfile'
import ResetPassword from './components/ResetPassword'
import ProductView from './components/ProductView'
import { useState } from 'react'


function App() {
const [flag, setFlag] = useState(false)

  /* Getting the data from local storage. */
  const authData = JSON.parse(localStorage.getItem("Auth"))

/* Checking if the user is logged in or not. If the user is logged in, it will redirect the user to the
products page. */
 

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm setFlag={setFlag} flag={flag}/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={
          <ProtectedRouter auth={authData}>
            <Products setFlag={setFlag}/>
          </ProtectedRouter>
        } />
        
        <Route path="/users/editprofile" element={
          <ProtectedRouter auth={authData}>
            <EditProfile />
          </ProtectedRouter>
        } />

        <Route path="/users/resetpwd" element={
          <ProtectedRouter auth={authData}>
            <ResetPassword />
          </ProtectedRouter>
        } />
        <Route path="/products/view/:id" element={
          <ProtectedRouter auth={authData}>
            <ProductView />
          </ProtectedRouter>
        } />

      </Routes>
      <ToastContainer />

    </>

  )
}

export default App
