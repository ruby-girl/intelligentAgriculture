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

// 根据基地id查询种植批次信息（分页）
export const plantingBatchsPage = (page,data) => {
	return http.request({
		url: 'api/organUserPlantingBatchManage/getPlantingBatchs/'+page,
		method: 'get',
		data,
	})
}

// 根据用户id和基地id查询地块
export const getByUserIdAndBaseId = (data) => {
	return http.request({
		url: 'api/landparcels/getByUserIdAndBaseId',
		method: 'get',
		data,
	})
}

// 页面条件分页查询获取种植计划(根据作物-计划模糊查询)
export const pagingCriteriaQuery = (page,data) => {
	return http.request({
		url: 'api/plantingPlans/pagingCriteriaQuery/'+page,
		method: 'get',
		data,
	})
}
// 获取品种下拉框数据
export const getBreedsAll = () => {
	return http.request({
		url: 'api/breeds/',
		method: 'get'
	})
}

//新增批次
export const addPlantingBatchs = (data) => {
	return http.request({
		url: 'api/plantingBatchs/',
		method: 'post',
		data
	})
}
// 工单列表获得批次
export const getWorkOrderManage = (data) => {
	return http.request({
		url: 'api/organUserPlantingBatchManage/getBatchByUserIdAndBaseId',
		method: 'get',
		data
	})
}

// 工单列表
export const getWorkOrderManageList = (page,data) => {
	return http.request({
		url: 'api/organUserWorkOrderManage/getWorkOrders/'+page,
		method: 'get',
		data
	})
}// 通过id获取数据（组合设备、农资、人资和设备资源、农资资源、人资资源信息）
export const organUserWorkOrderManageGetById = (data) => {
	return http.request({
		url: 'api/organUserWorkOrderManage/getById',
		method: 'get',
		data
	})
}
// 巡查工单工单列表
export const getFeedBackWorkOrdersList = (page,data) => {
	return http.request({
		url: 'api/organUserWorkOrderManage/getFeedBackWorkOrders/'+page,
		method: 'get',
		data
	})
}

// 种植批次模糊查询分页
export const plantingBatchsQuery = (page,data) => {
	return http.request({
		url: 'api/organUserPlantingBatchManage/appletCriteriaQuery/'+page,
		method: 'get',
		data
	})
}

// 添加巡视工单
export const addOrganUserWorkOrderManage = (data) => {
	return http.request({
		url: 'api/organUserWorkOrderManage/',
		method: 'post',
		data
	})
}