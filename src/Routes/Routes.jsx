import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import About from "../Pages/About/About";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllArtAndCraftItems from "../Pages/AllArtAndCraftItems/AllArtAndCraftItems";
import AddCraftItem from "../Pages/AddCraftItem/AddCraftItem";
import MyArtAndCraftList from "../Pages/MyArtAndCraftList/MyArtAndCraftList";
import Craft from "../Pages/Craft/Craft";
import PrivateRoute from "./PrivateRoute";
import EditCraftItem from "../Pages/EditCraftItem/EditCraftItem";
import Profile from "../Pages/Profile/Profile";
import Settings from "../Pages/Settings/Settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>
            },
            {
                path: '/crafts',
                element: <AllArtAndCraftItems></AllArtAndCraftItems>
            },
            {
                path: '/craft/:id',
                element: <PrivateRoute><Craft></Craft></PrivateRoute>,
                loader: ({params}) => fetch(`https://wizarding-crafts-server.vercel.app/craft/${params.id}`)
            },
            {
                path: '/edit-craft/:id',
                element: <PrivateRoute><EditCraftItem></EditCraftItem></PrivateRoute>,
                loader: ({params}) => fetch(`https://wizarding-crafts-server.vercel.app/craft/${params.id}`)
            },
            {
                path: '/add-craft',
                element: <PrivateRoute><AddCraftItem></AddCraftItem></PrivateRoute>
            },
            {
                path: '/mycrafts/:email',
                element: <PrivateRoute><MyArtAndCraftList></MyArtAndCraftList></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/settings',
                element: <PrivateRoute><Settings></Settings></PrivateRoute>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
            },
        ]
    }
]);

export default router;