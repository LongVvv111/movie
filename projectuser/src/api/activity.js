import servie from "@/untils/request.js"
//查询活动列表
export function ListAllActivity() {
    return servie({
        url: '/api/activity',
        method: 'get',
    })
}

//查询活动列表
export function AddRegistration(data) {
    return servie({
        url: '/api/registration',
        method: 'post',
				data:data,
    })
}