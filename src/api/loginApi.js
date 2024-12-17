import request from '../utils/axios.js'

//注册
export function addUser(data) {
    return request({
        url: '/users/api/addUser',
        method: 'post',
        data: data
    });
}


//登录
export function loginApi(data) {
    return request({
        url: '/users/api/login',
        method: 'post',
        data: data
    });
}

// export function getOrderList(query) {
//     return request({
//         url: '/api/login',
//         method: 'get',
//         params: query
//     });
// }