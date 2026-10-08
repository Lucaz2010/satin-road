import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import {CategoryPage} from "./pages/CategoryPage";
import VendorPage from "./pages/VendorPage";
import ItemProductPage from "./pages/ItemProductPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "@/pages/AdminPage.tsx";
import CreateListingPage from "@/pages/CreateListingPage.tsx";



const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <LandingPage/>
            },

            {
                path: "/products",
                element: <ProductsPage/>
            },

            {
                path: "/products/:productId",
                element: <ItemProductPage/>,
            },

            {
                path: "/category/:categoryId",
                element: <CategoryPage/>
            },

            {
                path: "/vendor/:vendorId",
                element: <VendorPage/>
            },

            {
                path: "/login",
                element: <LoginPage/>
            },

            {
                path: "/admin",
                element: <AdminPage/>
            },

            {
              path: "/create-listing",
              element: <CreateListingPage/>  
            },
        ],
    },
]);

export function App() {
    return <RouterProvider router={router}/>
}
