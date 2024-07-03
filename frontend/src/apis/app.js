import axios from '../axios';

export const apiGetCategories = () => axios({
    url: '/categories/',
    method: 'get'
})

export const apiGetVietNam = () => axios({
    url: '/vietnam/',
    method: 'get'
})