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

export const test4 = (data) => {
	return http.request({
		url: 'api/plantingBatchs/pagingCriteriaQuery/'+data.pageNo,
		method: 'GET',
		data,
	})
}
