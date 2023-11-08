import request from '@/utils/request'

export default{
    //添加banner
    addBanner(banner){
        return request({
            url: `/educms/banneradmin/addBanner`,
            method: 'post',
            data: banner
            })
    },
    //修改banner
    updateBannerInfo(banner){
        return request({
            url: `/educms/banneradmin/updateBanner`,
            method: 'post',
            data: banner
        })
    },
    //删除banner
    deleteBanner(id){
        return request({
            url: `/educms/banneradmin/removeBanner/${id}`,
            method: 'delete',
        })
    },
    //根据id查询banner
    getBanner(id){
        return request({
            url: `/educms/banneradmin/getBanner/${id}`,
            method: 'get',
        })
    },
    //1 Banner(条件查询分页)
    getBannerListPage(page,limit,bannerQuery){
        return request({
            // url: '/table/list/'+page+"/"+limit,
            url: `/educms/banneradmin/pageBannerCondition/${page}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端用RequestBody 获取数据
            //data 表示把对象转换json进行传递到接口里面
            data: bannerQuery
            })
    },

}