import { lazy } from "react";

const Home = lazy(()=> import("@/pages/home"))


export const publicRoutes = [
{ path: "/", element: <Home /> }
]
