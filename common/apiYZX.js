import http from '@/utils/request.js'

//设置请求结束后拦截器
http.interceptor.response = (response) => {

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

