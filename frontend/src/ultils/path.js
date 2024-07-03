const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    REGISTER: 'register',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',
    PRODUCTS__CATEGORY: ':category',
    BLOGS__CATEGORY: 'blogs/:category',
    DETAIL_BLOG__CATEGORY__PID__TITLE: 'blogs/:category/:bid/:titleBlog',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: 'products/:category/:pid/:titleProduct',
    BLOGS: 'blogs',
    ABOUT_US: 'about-us',
    FAQ: 'faq',
    DETAIL_CART: 'my-cart',
    CHECKOUT: 'checkout',
    PRODUCTS: 'products',

    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',
    CREATE_BLOG: 'create-blog',
    MANAGE_BLOGS: 'manage-blogs',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_CART: 'my-cart',
    HISTORY: 'order-history',
    WISHLIST: 'wishlist',
    RESET_PASS: 'resetpass',
}

export default path;