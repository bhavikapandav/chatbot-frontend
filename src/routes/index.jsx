import { lazy } from "react";

const debugLazyLoad = (importFun, componentName) => {
    return lazy(() => {
        return importFun().then((module) => {
            if (!module || !module.default) {
                throw new Error(
                    `Module ${componentName} does not have a default export`
                );
            }
            return module;
        }).catch((error) => {
            console.error(`Failed to load ${componentName}:`, error);
            throw error;
        });
    });
}

const Dashboard = debugLazyLoad(() => import("../pages/Dashboard"), "Dashboard");

const NotFound = debugLazyLoad(() => import("../pages/NotFound"), "NotFound");

const Register = debugLazyLoad(() => import("../pages/Register"), "Register");

const Login = debugLazyLoad(() => import("../pages/Login"), "Login");

export const routeList = [
    {
        id: 1,
        path: "*",
        name: "Not Found",
        component: <NotFound />,
        isAuth: false,
        layout: "auth"
    },
    {
        id: 2,
        path: "/",
        name: "Dashboard",
        component: <Dashboard />,
        isAuth: true,
        layout: "dashboard"
    },
    {
        id: 3,
        path: "/login",
        name: "login",
        component: <Login />,
        isAuth: false,
        layout: "auth"
    },
    {
        id: 4,
        path: "/register",
        name: "register",
        component: <Register />,
        isAuth: false,
        layout: "auth"
    },
]
