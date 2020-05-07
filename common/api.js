import http from '@/utils/request.js'

//设置请求结束后拦截器
http.interceptor.response = (response) => {

	//判断返回状态 执行相应操作
	return response;
}



export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */

	return http.request({
		url: 'api/breeds/',
		method: 'GET',
		data,
	})
}

export const test1 = (data) => {

	return http.request({
		url: 'api/plantingPlans/pagingCriteriaQuery/'+data.pageNo,
		method: 'GET',
		data,
	})
}


export const test3 = (data) => {
	return http.request({
		url: 'api/years/getByPlantingPlanId/',
		method: 'POST',
		data,
	})
}
/* 种植管理 ----- 种植中批次 */
export const getPagingCriteriaQuery = (data) => {
	return http.request({
		url: 'api/plantingBatchs/pagingCriteriaQuery/'+data.pageNo,
		method: 'GET',
		data,
	})
}
 //http://localhost:8090/api/api/workOrders/pagingCriteriaQuery/1?plantingBatchCode=&pageNo=1&baseId=23&workOrderStatus=1
/* 种植管理 ----- 种植中批次 ---待处理工单*/
export const gerWorkOrders = (data) => {
	return http.request({
		url: 'api/workOrders/pagingCriteriaQuery/'+data.pageNo,
		method: 'GET',
		data,
	})
}

/*待处理工单详情*/
export const getByWorkId = (data) => {
	return http.request({
		url: 'api/workOrders/'+data.id,
		method: 'GET',
		data,
	})
}

/* 待处理工单详情 -- 人资费用*/
export const getByWorkOrderIdPerson = (data) => {
	return http.request({
		url: 'api/personResources/getByWorkOrderId',
		method: 'GET',
		data,
	})
}

/* 待处理工单详情 -- 设备费用*/
export const getByWorkOrderIdEqu = (data) => {
	return http.request({
		url: 'api/equitmenResources/getByWorkOrderId',
		method: 'GET',
		data,
	})
}

/* 待处理工单详情 -- 物料信息*/
export const getByWorkOrderIdSup = (data) => {
	return http.request({
		url: 'api/suppliesResources/getByWorkOrderId',
		method: 'GET',
		data,
	})
}
