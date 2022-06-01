import servie from "@/untils/request.js"
//查询我的购物车
export function MyCart(uid) {
    return servie({
        url: '/api/cart?uid='+uid,
        method: 'get',
    })
}

//查看我的订单
export function MyOrder(uid) {
    return servie({
        url: '/api/order/user/id?uid='+uid,
        method: 'get',
    })
}

//查看我的订单
export function AddMyOrder(data) {
    return servie({
        url: '/api/order/add',
        method: 'post',
		data:data,
    })
}


