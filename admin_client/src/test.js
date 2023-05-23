import Home from "~/pages/Home";
import SignIn from "~/pages/SignIn/SignIn";
import Products from "~/pages/Home/Products/Products";
import Users from "~/pages/Users/Users";

export const publicRoutes = [
    { path: '/admin/login', component: SignIn, layout: null },
]

// Private Routes
export const privateRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/users', component: Users },
]

export default [
    publicRoutes,
    privateRoutes
];