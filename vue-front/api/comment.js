import request from '@/utils/request'

export default {
//条件分页课程查询的方法
getPageList(page,limit,courseId) {
    return request({
      url: `/eduservice/educomment/pageCommentInfo/${page}/${limit}`,
      method: 'get',
      params: courseId
    })
  },
  addComment(comment) {
    return request({
        url: `/eduservice/educomment/addCommentInfo`,
        method: 'post',
        data: comment
    })
    }
}