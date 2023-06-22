// Public Routes
import Home from "~/pages/Home";
import CreateDefaultAdmin from "~/components/CreateAccountAdmin/CreateAccountAdmin";
import SignIn from "~/pages/SignIn/SignIn";
// import Test from "~/test";
import Products from "~/pages/Products/Products";
import Users from "~/pages/Users/Users";
import Companies from "~/pages/Companies/Companies";
import NotFound from "~/components/NotFound/NotFound";
import Suppliers from "~/pages/Supplier/Supplier";
import ForgotPassword from "~/pages/SignIn/ForgotPassword/ForgotPassword";
import ResetPassword from "~/pages/SignIn/ForgotPassword/ResetPassword";
import Movies from "~/pages/Movies/Movies";
import Ratings from "~/pages/Ratings/Ratings";

export const publicRoutes = [
    { path: '/admin/login', component: SignIn, layout: null },
    { path: '/admin/forgot-password', component: ForgotPassword, layout: null },
    { path: '/admin/reset-password', component: ResetPassword, layout: null },
    // { path: '/test', component: Test, layout: null },
    { path: '/not-found', component: NotFound, layout: null },
]

// Private Routes
export const privateRoutes = [
    { path: '/', component: Home },
    { path: '/account', component: CreateDefaultAdmin },
    { path: '/products', component: Products },
    { path: '/movies', component: Movies },
    { path: '/users', component: Users },
    { path: '/companies', component: Companies },
    { path: '/supplier', component: Suppliers },
    { path: '/ratings', component: Ratings },
]

const errorRoutes = [
    { path: '/not-found', component: NotFound },
    // ... other error routes
];

export default [
    publicRoutes,
    privateRoutes,
    errorRoutes
];