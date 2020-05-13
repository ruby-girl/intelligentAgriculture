
export default {
	config: {
		baseUrl: "http://192.168.101.30:8088/",
		header: {
			 'Content-Type':'application/json',
			 'Authorization':''
		},  
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		withCredentials:true,
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	}, 
	request(options) {
		let _this =  this;
		uni.showLoading({
		    title: '加载中'
		});
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || _this.config.baseUrl
		options.dataType = options.dataType || _this.config.dataType
		options.url = options.baseUrl + options.url
		
		options.data = options.data || {}
		options.method = options.method || _this.config.method
		//TODO 加密数据	
		//TODO 数据签名
		  options.header = {'Authorization':uni.getStorageSync('ddwb').token || ''}

		return new Promise((resolve, reject) => {
			let _config = null
		
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
			
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(response)
				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					reject(response)
				}
			}
 
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
 
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 统一的请求日志记录
			_reqlog(_config)
 
			if (process.env.NODE_ENV === 'development') {
				
				if (_config.data) {
					
				}
			}
 
			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}
function getToken(){
		uni.getStorage({
		key:'ddwb',
		success(e){
		return e.data.token//这就是你想要取的token
		}
		})
	}
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	// if (process.env.NODE_ENV === 'development') {
	// 	console.log("【" + req.requestId + "】 地址：" + req.url)
	// 	if (req.data) {
	// 		console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
	// 	}
	// }
	//TODO 调接口异步写入日志数据库
}
 
/**
 * 响应接口日志记录
 */
function _reslog(res) {
	// let _statusCode = res.statusCode;
	// if (process.env.NODE_ENV === 'development') {
	// 	console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
	// 	if (res.config.data) {
	// 		console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
	// 	}
	// 	console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	// }
	// //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	// switch(_statusCode){
	// 	case 200:
	// 		break;
	// 	case 401:
	// 		break;
	// 	case 404:
	// 		break;
	// 	default:
	// 		break;
	// }
}
