import http from '@/utils/request.js'

//设置请求结束后拦截器
http.interceptor.response = (response) => {
	uni.hideLoading();
	if(response.statusCode!=200){
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