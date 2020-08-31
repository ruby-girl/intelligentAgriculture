import http from '@/utils/request.js'

// 登录
export const login = (data) => {
	return http.request({
		url: 'login',
		method: 'post',
		data,
	})
}

// 获取验证码
export const captcha = (data) => {
	return http.request({
		url: 'api/user/send',
		method: 'post',
		data,
	})
}

// 个人中心数据
export const  massifCount= (data) => {
	return http.request({
		url: 'api/massif/count',
		method: 'post'
	})
}
// 农场列表
export const farmGetAll= (data) => {
	return http.request({
		url: 'api/farm/getAll',
		method: 'post',
		data:data
	})
}
// 获取农场详情
export const  selectFarmId= (data) => {
	return http.request({
		url: 'api/farm/selectFarmId',
		method: 'post',
		data:data
	})
}
// 添加农场
export const  insertFarm= (data) => {
	return http.request({
		url: 'api/farm/insertFrom',
		method: 'post',
		data:data
	})
}
// 编辑农场
export const  updateFarm= (data) => {
	return http.request({
		url: 'api/farm/update',
		method: 'post',
		data:data
	})
}
// 获取省市区
export const  districts= (data) => {
	return http.request({
		url: 'api/districts',
		method: 'post',
		data:data
	})
}
// 添加设备
export const  insertDevice= (data) => {
	return http.request({
		url: 'api/device/insertDevice',
		method: 'post',
		data:data
	})
}
// 添加地块
export const  insertMassif= (data) => {
	return http.request({
		url: 'api/massif/insertMassif',
		method: 'post',
		data:data
	})
}
// 编辑地块
export const updateMassif= (data) => {
	return http.request({
		url: 'api/massif/updateMassif',
		method: 'post',
		data:data
	})
}
// 获取未绑定地块设备列表
export const  devicegetNoBangAll= (data) => {
	return http.request({
		url: 'api/device/getAll',
		method: 'post',
		data:data
	})
}
// 获取地块列表
export const  selectMassif= (data) => {
	return http.request({
		url: 'api/massif/selectMassif',
		method: 'post',
		data:data
	})
}
//删除地块
export const  deleteMassif= (data) => {
	return http.request({
		url: 'api/massif/deleteMassif',
		method: 'post',
		data:data
	})
}

//获取地块详情
export const  selectIdAll= (data) => {
	return http.request({
		url: 'api/massif/selectIdAll',
		method: 'post',
		data:data
	})
}

// TAB 获取设备列表

export const  findByDevice= (data) => {
	return http.request({
		url: 'api/device/findByDevice',
		method: 'post',
		data:data
	})
}
// T获取设备详情
export const  selectDevice= (data) => {
	return http.request({
		url: 'api/device/selectDevice',
		method: 'post',
		data:data
	})
}
// 编辑设备
export const  updateDevice= (data) => {
	return http.request({
		url: 'api/device/updateDevice',
		method: 'post',
		data:data
	})
}
// 首页监测
export const  selectMonitor= (data) => {
	return http.request({
		url: 'api/massif/selectMonitor',
		method: 'post',
		data:data
	})
}
// 监测详情==监控等数据
export const  massifMonitor= (data) => {
	return http.request({
		url: 'api/massif/massifMonitor',
		method: 'post',
		data:data
	})
}
// 预警列表
export const  findList= (data) => {
	return http.request({ 
		url: 'api/warning/findList',
		method: 'post',
		data:data
	})
}
// 预警列表 设置开关
export const  updateOpening= (data) => {
	return http.request({ 
		url: 'api/warning/updateOpening',
		method: 'post',
		data:data
	})
}
// 预警列表 设置值
export const  updateValue= (data) => {
	return http.request({ 
		url: 'api/warning/updateValue',
		method: 'post',
		data:data
	})
}
// 7日温度数据
export const  findRangeData= (data) => {
	return http.request({ 
		url: 'api/device/findRangeData',
		method: 'post',
		data:data
	})
}
//获取用户下所有预警
export const  warningAll= (data) => {
	return http.request({ 
		url: 'api/massif/warningAll',
		method: 'post',
		data:data
	})
}
//获取农场下所有地块
export const  massifSelectFarmId= (data) => {
	return http.request({ 
		url: 'api/massif/selectFarmId',
		method: 'post',
		data:data
	})
}
//获取农场下所有预警
export const  massifFindFarmId= (data) => {
	return http.request({ 
		url: 'api/massif/findFarmId',
		method: 'post',
		data:data
	})
}
//获取用户OPENID
export const  decodeUserInfo= (data) => {
	return http.request({ 
		url: 'api/wXLoginController/decodeUserInfo',
		method: 'post',
		data:data
	})
}

export const  likes= (data) => {
	return http.request({ 
		url: 'api/massif/likes',
		method: 'post',
		data:data
	})
}
// 查看点赞状态
export const  getLikes= (data) => {
	return http.request({ 
		url: 'api/massif/state',
		method: 'post',
		data:data
	})
}
//查询设备数量和在线设备数量
export const  deviceCount= () => {
	return http.request({ 
		url: 'api/device/count',
		method: 'post'
	})
}

//删除设备
export const  deleteDevice= (data) => {
	return http.request({ 
		url: 'api/device/deleteDevice',
		method: 'post',
		data:data
	})
}

//大气湿度7日数据
export const  atmosphericHumidity= (data) => {
	return http.request({ 
		url: 'api/device/atmosphericHumidity',
		method: 'post',
		data:data
	})
}
//土壤温度7日数据
export const  soilTemperature= (data) => {
	return http.request({ 
		url: 'api/device/soilTemperature',
		method: 'post',
		data:data
	})
}
//土壤湿度7日数据
export const  soilHumidity= (data) => {
	return http.request({ 
		url: 'api/device/soilHumidity',
		method: 'post',
		data:data
	})
}
//获取小程序码
export const  getUnlimited= (data) => {
	return http.request({ 
		url: 'api/wXLoginController/getUnlimited',
		method: 'post',
		data:data
	})
}
// 第二版***********************************
//查询附近100公里内的设备
export const  getNearbyDevice= (data) => {
	return http.request({ 
		url: 'api/device/nearbyDevice',
		method: 'post',
		data:data
	})
}