import axios from '../axios';

export const apiCreateOrders = (data) => axios({
    url: '/orders/new',
    method: 'post',
    data
});

export const apiGetOrders = (params) => axios({
    url: '/orders/admin',
    method: 'get',
    params
});

export const apiGetUserOrders = (params) => axios({
    url: '/orders/me',
    method: 'get',
    params
});

export const apiGetDetailOrder = (oid) => axios({
    url: '/orders/me/' + oid,
    method: 'get'
});

export const apiCancelOrder = (oid) => axios({
    url: '/orders/me/' + oid,
    method: 'put'
});

export const apiUpdateOrder = (oid, data) => axios({
    url: '/orders/admin/' + oid,
    method: 'put',
    data
});

export const apiGetAllOrders = () => axios({
    url: '/orders/admin/all',
    method: 'get',
});

export const apiGetInCome = () => axios({
    url: '/orders/admin/income',
    method: 'get',
});