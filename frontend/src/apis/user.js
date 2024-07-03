import axios from '../axios';

export const apiRegister = (data) => axios({
    url: '/users/register',
    method: 'post',
    data
});

export const apiFinalRegister = (token) => axios({
    url: '/users/finalregister/' + token,
    method: 'put'
});

export const apiLogin = (data) => axios({
    url: '/users/login',
    method: 'post',
    data
});

export const apiForgotPassword = (data) => axios({
    url: '/users/forgotpassword',
    method: 'post',
    data
});

export const apiResetPassword = (data) => axios({
    url: '/users/resetpassword',
    method: 'put',
    data
});

export const apiUpdatePassword = (data) => axios({
    url: '/users/password-update',
    method: 'put',
    data
});

export const apiGetInforUser = (data) => axios({
    url: '/users/infor',
    method: 'get'
});

export const apiGetAllUsers = (params) => axios({
    url: '/users/admin',
    method: 'get',
    params
});

export const apiGetUsers = () => axios({
    url: '/users/admin/all',
    method: 'get',
});

export const apiUpdateUser = (data, uid) => axios({
    url: '/users/admin/' + uid,
    method: 'put',
    data
});

export const apiDeleteUser = (uid) => axios({
    url: '/users/admin/' + uid,
    method: 'delete',
});

export const apiUpdateInfor = (data) => axios({
    url: '/users/infor',
    method: 'put',
    data
});

export const apiUpdateCart = (data) => axios({
    url: '/users/cart',
    method: 'put',
    data
});

export const apiRemoveCart = (pid) => axios({
    url: '/users/remove-cart/' + pid,
    method: 'delete',
});

export const apiUpdateWishlist = (pid) => axios({
    url: '/users/wishlist/' + pid,
    method: 'put'
});

