import servie from "@/untils/request.js"
//查询员工列表
export function WorkList() {
    return servie({
        url: '/api/worker',
        method: 'get',
    })
}

//查看我的评价
export function MyCritic(uid) {
    return servie({
        url: '/api/we?uid='+uid,
        method: 'get',
    })
}
//查看我的评价
export function MyCritic2(uid,wid) {
    return servie({
        url: '/api/we2?uid='+uid+"&wid="+wid,
        method: 'get',
    })
}
//添加评论
export function AddEvaluate(data) {
    return servie({
        url: '/api/addEvaluate',
        method: 'post',
				data:data
    })
}
//查询留言列表
export function LMessage() {
    return servie({
        url: '/api/lm',
        method: 'get',
    })
}