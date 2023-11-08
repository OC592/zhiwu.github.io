import request from '@/utils/request'

export default{
    //根据token获取用户信息
    getLoginUserInfo(){
        return request({
            url:`/educenter/member/getMemberInfo`,
            method: 'get'
        })
    },
    
    //登录的方法
    submitLoginUser(loginInfo){
        return request({
            url:`/educenter/member/login`,
            method: 'post',
            data: loginInfo
        })
    }
}