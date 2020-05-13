import http from '@/utils/request.js'

//设置请求结束后拦截器
http.interceptor.response = (response) => {
	uni.hideLoading();
	if(response.data.code!==200){
		uni.showToast({
		    title: response.data.msg,
			icon:'none'		
		})		
	}
	//判断返回状态 执行相应操作
	return response;
}
// 登录
export const login = (data) => {
	return http.request({
		url: 'userLogin/userLogin',
		method: 'post',
		data,
	})
}
// 注册
export const loginReg = (data) => {
	return http.request({
		url: 'userLogin/reg',
		method: 'post',
		data,
	})
}
// 获取验证码
export const captcha = (data) => {
	return http.request({
		url: 'userLogin/captcha',
		method: 'get',
		data,
	})
}
// 找回密码
export const modify = (data) => {
	return http.request({
		url: 'userLogin/modify',
		method: 'post',
		data,
	})
}
// 获取省
export const provinces = (data) => {
	return http.request({
		url: 'api/provinces/',
		method: 'get',
		data,
	})
}
// 获取市
export const getByProvinceCode = (data) => {
	return http.request({
		url: 'api/citys/getByProvinceCode/',
		method: 'get',
		data,
	})
}
// 获取区县
export const getByCityCode = (data) => {
	return http.request({
		url: 'api/areas/getByCityCode',
		method: 'get',
		data,
	})
}
// 获取用户信息
export const getUserById = (data) => {
	return http.request({
		url: 'api/users/'+data,
		method: 'get',
		data,
	})
}
// 完善用户信息
export const userPerfectInfo = (data) => {
	return http.request({
		url: 'api/users/userPerfectInfo',
		method: 'post',
		data,
	})
}
// /api/plantingBatchs/getPageByBaseId/{pageNo}

// 根据基地id查询种植批次信息（分页）
export const plantingBatchsPage = (page,data) => {
	return http.request({
		url: 'api/plantingBatchs/getPageByBaseId/'+page,
		method: 'get',
		data,
	})
}