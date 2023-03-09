// ***** start - import from files *****
import { Routes, Route } from 'react-router-dom'
import ProtectedRouter from '../protectedRoute/ProtectedRoute'
import {  Routers } from './index'
// ***** end - import from files *****

function Router() {
      const auth = JSON.parse(localStorage.getItem("Auth"))
    return (
        <Routes>
            {Routers.map((ele) => {
                return (
                    ele.isPrivate ? (
                        <Route key={ele.path} path={ele.path} element={
                            <ProtectedRouter  auth={auth}>
                                {ele.component}
                            </ProtectedRouter>
                        } />
                    ) : (
                        <Route key={ele.path} path={ele.path} element={ele.component} />
                    )
                )
            })}
        </Routes>
    )
}

export default Router