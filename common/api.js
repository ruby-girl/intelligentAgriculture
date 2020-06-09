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
export const farmGetAll= (data) => {
	return http.request({
		url: 'farm/getAll',
		method: 'post',
		data:data
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
// 添加农场
export const  insertFarm= (data) => {
	return http.request({
		url: 'farm/insertFrom',
		method: 'post',
		data:data
	})
}
// 编辑农场
export const  updateFarm= (data) => {
	return http.request({
		url: 'farm/update',
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
// 添加设备
export const  insertDevice= (data) => {
	return http.request({
		url: 'device/insertDevice',
		method: 'post',
		data:data
	})
}
// 添加地块
export const  insertMassif= (data) => {
	return http.request({
		url: 'massif/insertMassif',
		method: 'post',
		data:data
	})
}
// 编辑地块
export const updateMassif= (data) => {
	return http.request({
		url: 'massif/updateMassif',
		method: 'post',
		data:data
	})
}
// 获取未绑定地块设备列表
export const  devicegetNoBangAll= (data) => {
	return http.request({
		url: 'device/getAll',
		method: 'post',
		data:data
	})
}
// 获取地块列表
export const  selectMassif= (data) => {
	return http.request({
		url: 'massif/selectMassif',
		method: 'post',
		data:data
	})
}
//删除地块
export const  deleteMassif= (data) => {
	return http.request({
		url: 'massif/deleteMassif',
		method: 'post',
		data:data
	})
}

//获取地块详情
export const  selectIdAll= (data) => {
	return http.request({
		url: 'massif/selectIdAll',
		method: 'post',
		data:data
	})
}



// TAB 获取设备列表

export const  findByDevice= (data) => {
	return http.request({
		url: 'device/findByDevice',
		method: 'post',
		data:data
	})
}