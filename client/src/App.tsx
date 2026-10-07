import {createBrowserRouter, Router, RouterProvider} from "react-router";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import {CategoryPage} from "./pages/CategoryPage";
import VendorPage from "./pages/VendorPage";
import ItemProductPage from "./pages/ItemProductPage";


const router = createBrowserRouter([

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
        element: <ItemProductPage />,
    },
    
    
    {
        path: "/category/:categoryId",
        element: <CategoryPage/>
    },

    {
        path: "/vendor/:vendorId",
        element: <VendorPage/>
    }
    
]);

export function App() {
    return <RouterProvider router={router}/>
}