// Public Routes
import Home from "~/pages/Home";
import Following from "~/pages/Following";
import CreateDefaultAdmin from "~/components/CreateAccountAdmin/CreateAccountAdmin";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    // { path: '/upload', component: Upload, layout: null },
    { path: '/account', component: CreateDefaultAdmin },
]

// Private Routes
const privateRoutes = [

]

export { publicRoutes, privateRoutes }