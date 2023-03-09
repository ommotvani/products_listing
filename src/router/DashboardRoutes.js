// ***** start - import from files *****
import ProductView from '../../src/components/ProductView'
import Products from '../../src/components/Products'
import EditProfile from '../../src/components/EditProfile'
import ResetPassword from '../../src/components/ResetPassword'
// ***** end - import from files *****

const DashboardRoutes = [
    {
        path: '/products',
        component: <Products />,
        isPrivate: true
    },
    {
        path: '/users/editprofile',
        component: <EditProfile />,
        isPrivate: true
    },
    {
        path: '/users/resetpwd',
        component: <ResetPassword />,
        isPrivate: true
    },
    {
        path: '/products/view/:id',
        component: <ProductView />,
        isPrivate: true
    }
]

export default DashboardRoutes
