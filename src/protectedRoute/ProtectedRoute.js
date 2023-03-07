import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({auth, children}) => {
    
  return auth === null ?  <Navigate to={'/'} /> : children

}

export default ProtectedRouter