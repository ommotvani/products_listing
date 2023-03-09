import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRouter = ({  children }) => {
  
  const local = JSON.parse(localStorage.getItem("Auth"))

  return local === null ? <Navigate to={'/'} /> : children

}

export default ProtectedRouter