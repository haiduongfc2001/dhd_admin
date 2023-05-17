// Public Routes
import Home from "~/pages/Home";
import Following from "~/pages/Following";
import CreateDefaultAdmin from "~/components/CreateAccountAdmin/CreateAccountAdmin";
import SignIn from "~/pages/SignIn/SignIn";
import Test from "~/test";
import Products from "~/pages/Home/Products/Products";
import Users from "~/pages/Users/Users";
import Orders from "~/pages/Orders/Orders";
import Register from "~/pages/Register/Register";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/account', component: CreateDefaultAdmin },
    { path: '/admin/signin', component: SignIn, layout: null },
    { path: '/test', component: Test, layout: null },
    { path: '/products', component: Products },
    { path: '/users', component: Users },
    { path: '/orders', component: Orders },
    { path: '/register', component: Register },
]

// Private Routes
const privateRoutes = [

]

export { publicRoutes, privateRoutes }