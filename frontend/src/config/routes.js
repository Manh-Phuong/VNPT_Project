const routes = {
    home : '/',
    login : '/login',
    register : '/register',
    userDetail: '/:user_id',
    postDetail: '/:author_id/posts/:post_id',
    cart: '/cart',
    checkout: '/checkout',
    selling: '/selling',
    sellShip: '/sell_ship',
    sellOrder: '/sell_order',
    sellProduct: '/sell_product',
    sellProductCreate: '/sell_product/create',
    sellProductDetail: '/sell_product/detail/:id',
    sellProductUpdate: '/sell_product/update/:id',
    sellPayment: '/sell_payment',
    sellStatistics: '/sell_statistics',
}

export default routes;