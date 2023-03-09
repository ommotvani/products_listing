import DashboardRoutes from './DashboardRoutes'
import AuthRoutes from './AuthRoutes'


// ** Default Route
const DefaultRoute = '/products'

// ** Merge Routes
const Routers = [...AuthRoutes, ...DashboardRoutes]

export { DefaultRoute, Routers }