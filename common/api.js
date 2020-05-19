import http from '@/utils/request.js'

//设置请求结束后拦截器
http.interceptor.response = (response) => {

	//判断返回状态 执行相应操作
	return response;
}



export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */

	return http.request({
		url: 'breeds/',
		method: 'GET',
		data,
	})
}

export const test1 = (data) => {

	return http.request({
		url: 'plantingPlans/pagingCriteriaQuery/'+data.pageNo,
		method: 'GET',
		data,
	})
}


export const test3 = (data) => {
	return http.request({
		url: 'years/getByPlantingPlanId/',
		method: 'POST',
		data,
	})
}
/*获取baseId */
export const getBaseId = (data) => {
	return http.request({
		url: 'api/bases/getByOrganId/',
		method: 'GET',
		data,
	})
}
/* 种植管理 ----- 种植中批次 */
export const getPagingCriteriaQuery = (data) => {
	return http.request({
		//url: 'api/plantingBatchs/pagingCriteriaQuery/'+data.pageNo,
		url: 'api/appletIndex/appletIndex',
		method: 'GET',
		data,
	})
}
 //http://localhost:8090/workOrders/pagingCriteriaQuery/1?plantingBatchCode=&pageNo=1&baseId=23&workOrderStatus=1
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




/* 添加农事信息   -- 获取操作类型*/
export const getFarmWorkItems = (data) => {
	return http.request({
		url: 'api/farmWorkItems/',
		method: 'GET',
		data,
	})
}

/* 地块管理---获取所有地块*/
export const getLandparcelsList = (data) => {
	return http.request({
		url: 'api/organUserLandParcelManage/getLandParcels/'+data.pageNo,
		method: 'GET',
		data,
	})
}

/* 添加农事记录 --- 获取种植批次*/
export const getFarmWorkSelect = (data) => {
	return http.request({
		url: 'api/organUserPlantingBatchManage/getBatchByUserIdAndBaseId',
		method: 'GET',
		data,
	})
}

/* 获取 添加农事记录 --默认人工农资设备信息 */
export const getFarmWorkTabelList = (data) => {
	return http.request({
		url: 'api/organUserFarmWorkRecordManage/getResourceByWorkOrderId/',
		method: 'GET',
		data,
	})
}

/* 添加农事记录 第一步 */
export const addFarmWorkBase = (data) => {
	return http.request({
		url: 'api/organUserFarmWorkRecordManage/',
		method: 'POST',
		data,
	})
}


/* 添加农事记录 第二步 添加人工 */
export const addPersonResources = (data) => {
	return http.request({
		url: 'api/personResources/',
		method: 'POST',
		data,
	})
}

/* 添加农事记录 第二步 添加农资 */
export const addSuppliessResources = (data) => {
	return http.request({
		url: 'api/suppliess/',
		method: 'POST',
		data,
	})
}

/* 添加农事记录 第二步 添加设备 */
export const addEquitmenResources = (data) => {
	return http.request({
		url: 'api/equitmenResources/',
		method: 'POST',
		data,
	})
}


/* 添加农事记录 第二步 生产厂家 */
export const getSuppliersCompany = (data) => {
	return http.request({
		url: 'api/suppliers/',
		method: 'GET',
		data,
	})
}

/* 添加农事记录 第二步 单位 */
export const getSuppliersUnits = (data) => {
	return http.request({
		url: 'api/units/',
		method: 'GET',
		data,
	})
}


/* 农事记录列表 */
export const getFarmWorkList = (data) => {
	return http.request({
		url: 'api/organUserFarmWorkRecordManage/getByExecutionUserId/'+data.pageNo,
		method: 'GET',
		data,
	})
}


/* 基地列表 */
export const getBaseLandPage = (data) => {
	return http.request({
		url: 'api/organs/pageNotByUserIdAndName/'+data.pageNo,
		method: 'GET',
		data,
	})
}

/* 加入基地 */
export const joinBaseInfo = (data) => {
	return http.request({
		url: 'api/appletBases/joinBaseInfo',
		method: 'POST',
		data,
	})
}


/* 获取已加入基地列表 */
export const getJoinOkList = (data) => {
	return http.request({
		url: 'api/organs/getByUserId',
		method: 'GET',
		data,
	})
}
