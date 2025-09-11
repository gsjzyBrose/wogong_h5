
import { baseRequest } from '@/util/request'

const request = (url, ...arg) => baseRequest(url, ...arg)
/**
 * 定时任务
 *
 * @author yubaoshan
 * @date 2022-09-22 22:33:20
 */
export default {
    // 岗位列表
	getJobList(userId, data) {
       return request(`h5/recruit/list/${userId}`, data, 'get')
    },
    //岗位详情
    getJobDetail(id, data) {
       return request(`h5/recruit/job/${id}`, data, 'get')
    },
    // 记录岗位浏览 /h5/recruit/job/2/view
    postRecruitJob(id, data) {
        return request(`h5/recruit/job/${id}/view`, data, 'post')
    },
    // 获取文件地址 /common/upload/sign-url/{module}
    getfileAllPATH(data) {
       return request(`common/upload/sign-url/h5`, data, 'get')
    },
    // 获取企业详情 /h5/recruit/company/{id}
     getCompanyDetail(id) {
       return request(`h5/recruit/company/${id}`, '', 'get')
    },
    // 获取企业招聘列表 /h5/recruit/company/{id}/job-list
    getCompanyJobList(id, params) {
        return request(`h5/recruit/company/${id}/job-list`, params, 'get')
    }
}
