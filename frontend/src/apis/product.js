import axios from '../axios';

export const apiGetProducts = (params) => axios({
    url: '/products/',
    method: 'get',
    params
});

export const apiGetDetailProduct = (pid) => axios({
    url: '/products/' + pid,
    method: 'get',
});

export const apiCreateReview = (data) => axios({
    url: '/products/reviews',
    method: 'put',
    data
});

export const apiCreateProduct = (data) => axios({
    url: '/products/new',
    method: 'post',
    data
});

export const apiUpdateProduct = (data, pid) => axios({
    url: '/products/update/' + pid,
    method: 'put',
    data
});

export const apiDeleteProduct = (pid) => axios({
    url: '/products/delete/' + pid,
    method: 'delete'
});

export const apiGetAllProducts = () => axios({
    url: '/products/admin',
    method: 'get'
});