// Public Routes
import Home from "~/pages/Home";
import Following from "~/pages/Following";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following }
]

// Private Routes
const privateRoutes = [

]

export { publicRoutes, privateRoutes }