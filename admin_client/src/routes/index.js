// Public Routes
import Home from "~/pages/Home";
import CreateDefaultAdmin from "~/components/CreateAccountAdmin/CreateAccountAdmin";
import SignIn from "~/pages/SignIn/SignIn";
import Test from "~/test";
import Products from "~/pages/Home/Products/Products";
import Users from "~/pages/Users/Users";
import Orders from "~/pages/Orders/Orders";
import Register from "~/pages/Register/Register";
import NotFound from "~/components/NotFound/NotFound";

export const publicRoutes = [
    { path: '/admin/login', component: SignIn, layout: null },
    // { path: '/test', component: Test, layout: null },
    { path: '/not-found', component: NotFound, layout: null },
]

// Private Routes
export const privateRoutes = [
    { path: '/', component: Home },
    { path: '/account', component: CreateDefaultAdmin },
    { path: '/products', component: Products },
    { path: '/users', component: Users },
    { path: '/orders', component: Orders },
    { path: '/register', component: Register },
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