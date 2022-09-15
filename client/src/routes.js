import {BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, INFO, PublicStatistic} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Content";
import Auth from "./pages/Auth";
import Info from "./pages/Info";
import AllResult from "./pages/AllResult";

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: INFO,
        Component: Info
    },
    {
        path: PublicStatistic,
        Component: AllResult
    },
]
