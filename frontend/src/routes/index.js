import routesConfig from '../config/routes';

//import pages
import Home from '../pages/Customer/Home';
import Login from '../pages/Customer/Login';
import Signup from '../pages/Customer/Signup';

import Post from '../pages/Customer/Post';
import UserDetail from '../pages/Customer/UserDetail';
import Cart from '../pages/Customer/Cart';
import Checkout from '../pages/Customer/Checkout';
import LayoutSell from '../pages/Sell/LayoutSell';
import SellHome from '../pages/Sell/Home';
import SellOrder from '../pages/Sell/Order';
import ProductList from '../pages/Sell/Product/ProductList';
import ProductCreate from '../pages/Sell/Product/ProductCreate';
import ProductDetail from '../pages/Sell/Product/ProductDetail/ProductDetail';
import ProductUpdate from '../pages/Sell/Product/ProductUpdate/ProductUpdate';
import Ship from '../pages/Sell/Ship';
import PaymentSetting from '../pages/Sell/PaymentSetting';
import Statistics from '../pages/Sell/Statistics';


//import layout


//public route

const publicRoutes = [
    { path: routesConfig.home , component: Home },
    { path: routesConfig.login, component: Login, layout: null },
    { path: routesConfig.register, component: Signup, layout: null },
    { path: routesConfig.userDetail, component: UserDetail },
    { path: routesConfig.postDetail, component: Post },
    { path: routesConfig.cart, component: Cart },
    { path: routesConfig.checkout, component: Checkout },
    { path: routesConfig.selling, component: SellHome, layout: LayoutSell },
    { path: routesConfig.sellOrder, component: SellOrder, layout: LayoutSell },
    { path: routesConfig.sellProduct, component: ProductList, layout: LayoutSell },
    { path: routesConfig.sellProductCreate, component: ProductCreate, layout: LayoutSell },
    { path: routesConfig.sellProductDetail, component: ProductDetail, layout: LayoutSell },
    { path: routesConfig.sellProductUpdate, component: ProductUpdate, layout: LayoutSell },
    { path: routesConfig.sellShip, component: Ship, layout: LayoutSell },
    { path: routesConfig.sellPayment, component: PaymentSetting, layout: LayoutSell },
    { path: routesConfig.sellStatistics, component: Statistics, layout: LayoutSell },

];

const privateRoutes = [
    // { path: routesConfig.dashboard , component: Dashboard, layout: null },
    // { path: routesConfig.category, component: Category },
    // { path: routesConfig.categoryItem, component: CategoryDetail },
    // { path: routesConfig.categoryCreate, component: CategoryCreate },
];

export { publicRoutes, privateRoutes };
