// Public Routes
import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Upload from "~/pages/Home/Upload";
import Header from "~/components/Layout/components/Header";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: null },
    { path: '/header', component: Header },
]

// Private Routes
const privateRoutes = [

]

export { publicRoutes, privateRoutes }