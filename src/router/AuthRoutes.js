// ***** start - import from files *****
import LoginForm from '../../src/view/form/LoginForm'
import RegisterForm from '../../src/view/form/RegisterForm'
// ***** end - import from files *****

const AuthRoutes = [
    {
        path: '/',
        component: <LoginForm />,
        isPrivate: false
    },
    {
        path: '/register',
        component: <RegisterForm />,
        isPrivate: false
    }
]

export default AuthRoutes
