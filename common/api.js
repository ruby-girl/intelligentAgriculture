import http from '@/utils/request.js'

//设置请求结束后拦截器
http.interceptor.response = (response) => {
	uni.hideLoading();
	if(response.statusCode!=200){
		uni.showToast({
		    title: response.msg,
			icon:'none'		
		})		
	}
	//判断返回状态 执行相应操作
	return response;
}
// 登录
export const login = (data) => {
	return http.request({
		url: 'user/login',
		method: 'post',
		data,
	})
}

// 获取验证码
export const captcha = (data) => {
	return http.request({
		url: 'user/send',
		method: 'post',
		data,
	})
}

// 个人中心数据
export const  massifCount= (data) => {
	return http.request({
		url: 'massif/count',
		method: 'post'
	})
}
// 农场列表
export const  findByFarm= (data) => {
	return http.request({
		url: 'farm/findByFarm',
		method: 'post'
	})
}
// 获取农场详情
export const  selectFarmId= (data) => {
	return http.request({
		url: 'farm/selectFarmId',
		method: 'post',
		data:data
	})
}
// 获取农场详情
export const  insertFarm= (data) => {
	return http.request({
		url: 'farm/insertFarm',
		method: 'post',
		data:data
	})
}
// 获取省市区
export const  districts= (data) => {
	return http.request({
		url: 'districts',
		method: 'post',
		data:data
	})
}
