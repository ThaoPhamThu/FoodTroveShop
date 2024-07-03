import axios from '../axios';

export const apiGetBlogs = (params) => axios({
    url: '/blogs/',
    method: 'get',
    params
});

export const apiGetBlogCategories = () => axios({
    url: '/category-blogs/',
    method: 'get'
})

export const apiGetBlog = (bid) => axios({
    url: '/blogs/' + bid,
    method: 'get',
});

export const apiUpdateLike = (bid) => axios({
    url: '/blogs/like/' + bid,
    method: 'put',
});

export const apiUpdateDislike = (bid) => axios({
    url: '/blogs/dislike/' + bid,
    method: 'put',
});

export const apiCreateBlog = (data) => axios({
    url: '/blogs/new',
    method: 'post',
    data
});

export const apiDeleteBlog = (bid) => axios({
    url: '/blogs/' + bid,
    method: 'delete',
});

export const apiUpdateBlog = (data, bid) => axios({
    url: '/blogs/update/' + bid,
    method: 'put',
    data
});