import servie from "@/untils/request.js"

export function Login(data){
    return servie({
        url:"/api/user/login",
        method:'post',
        data:data
    })
}

export function Register(data){
    return servie({
        url:"/api/user/register",
        method:'post',
        data:data
    })
}

//验证用户名是否存在
export function IsExistUserName(data) {
    return servie({
        url: '/api/user/isExist',
        method: 'post',
        data:data
    })
}
//发送邮箱验证码
export function SendEmailCode(data) {
    return servie({
        url: '/api/common/email',
        method: 'post',
        data:data
    })
}

// export function UserInfo(id){
//     return servie({
//         url:"/api/user/"+id,
//         method:'get',
//     })
// }

export function UserInfo(){
    return servie({
        url:"/api/user/id?id="+localStorage.getItem("uid"),
        method:'get',
    })
}

export function SearchFilm(name){
    return servie({
        url: '/api/film/name?name='+name,
        method:'get',
    })
}

//查询电影列表
export function SearchFilmDetail() {
    return servie({
        url: '/api/film/id',
        method: 'get',
    })
}

export function CartInfo() {
    return servie({
        url: '/api/cart',
        method: 'get',
    })
}

//真正传参
export function ModifySelf(data) { //id自动
    return servie({
        url: '/api/user/modify',
        method: 'post',
		data:data
    })
}