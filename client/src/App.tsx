import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import {CategoryPage} from "./pages/CategoryPage";
import VendorPage from "./pages/VendorPage";
import ItemProductPage from "./pages/ItemProductPage";


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
        ],
    },
]);

export function App() {
    return <RouterProvider router={router}/>
}
