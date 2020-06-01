import http from '@/utils/request.js'

//设置请求结束后拦截器
http.interceptor.response = (response) => {
	uni.hideLoading();
	if(response.data.state!==200){
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
		url: 'user/register',
		method: 'get',
		data,
	})
}

// 个人中心数据
export const  count= (data) => {
	return http.request({
		url: 'massif/count',
		method: 'get',
		data,
	})
}