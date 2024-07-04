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
                path: '/All-Art-&-Craft-Items',
                element: <AllArtAndCraftItems></AllArtAndCraftItems>,
                loader: () => fetch('http://localhost:5000/crafts')
            },
            {
                path: '/craft/:id',
                element: <Craft></Craft>,
                loader: ({params}) => fetch(`http://localhost:5000/craft/${params.id}`)
            },
            {
                path: '/Add-Craft-Item',
                element: <AddCraftItem></AddCraftItem>
            },
            {
                path: '/My-Art-&-Craft-List',
                element: <MyArtAndCraftList></MyArtAndCraftList>
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