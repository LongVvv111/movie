import request from "axios"
import config from "@/config"

const token=localStorage.getItem("token")
const servie = request.create({
    baseURL:config.API_URL,
    headers:{
        "Authorization":token,
        //"code": localStorage.getItem('code'),//验证码
    }
});

servie.interceptors.response.use(
    response=>{
        const res = response.data
        return res
    },

    error=>{
        console.log('err:'+error);
        return Promise.reject(error)
    }
);
export default servie
