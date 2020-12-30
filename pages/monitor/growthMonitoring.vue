<!-- 生长监测 -->
<template>
	<view class="workOrder">
		<view>
			<scroll-view v-bind:style="{ height: windowHeight + 'px' }" style="overflow: hidden;" class="list-container"
			 scroll-y="true" @scroll="scroll">
				<view class="map-container">
					<view class="map-top-box flex align-items-center justify-content-flex-justify">
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.proportion }}%</view>
							<view class="small-text">{{ obj.crops }}</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.remaining }}</view>
							<view class="small-text">剩余时间(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.growth }}</view>
							<view class="small-text">已成长(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.date }}</view>
							<view class="small-text">种植日期</view>
						</view>
					</view>
					<image v-if="!showVideo&&deviceList[index].deviceName!=='鲜仓宝'&&deviceList[index].deviceName!=='水精灵'" style="width:100%;height: 600rpx;" mode="aspectFit" src="https://xyznv1.oss-cn-beijing.aliyuncs.com/daditanzheng.jpg"></image>
					<image v-if="!showVideo&&deviceList[index].deviceName=='水精灵'" style="width:100%;height: 600rpx;" mode="aspectFit" src="https://xyznv1.oss-cn-beijing.aliyuncs.com/shuijingling.jpg"></image>
					<image v-if="!showVideo&&deviceList[index].deviceName=='鲜仓宝'" style="width:100%;height: 600rpx;" mode="aspectFit" src="https://xyznv1.oss-cn-beijing.aliyuncs.com/xiancangbao.jpg"></image>
					<video v-if="showVideo" id="myVideo" ref="myVideo" autoplay="true" custom-cache="false" controls style="width:100%;height: 600rpx;"
					 :poster="LiveUrl.liveCoverUrl" @loadedmetadata="loadedmetadata" :src="LiveUrl.hlsLivePlayUrl"></video>

					<view class="map-bottom-box">
						<view class="list-item">
							<view class="flex  align-items-center justify-content-flex-justify">
								<view class="flex  align-items-center">
									<image class="land-img" src="../../static/imgs/location.png" mode=""></image>
									<view class="item-title">
										<view class="order-title" style="font-weight: bold;">NO.{{ obj.massifNo }} {{ obj.massifName }}</view>
										<view class="order-title small-text">当前设备：{{ picker[index] }}</view>
										<view class="order-title small-text">{{ data.farmName }}</view>
									</view>
								</view>
								<picker @change="PickerChange" :value="index" :range="picker">
									<view class="picker bg-green text-white" style="padding: 10px;">
										<!-- {{picker[index]}} -->
										<text>切换设备</text>
									</view>
								</picker>
							</view>
							<view class="box-margin flex align-items-center flex-wrap">
								<view class="item-content-box" v-for="(item, n) in monitorings" :key="n">
									<view class="item-num">
										{{ item.value || '-' }}
										<span class="small-txt">{{ item.unit || '' }}</span>
									</view>
									<text class="small-text">{{ item.operation }}</text>
								</view>
							</view>
							<view class="flex align-items-center">
								<view class="progress"><text class="progressing" v-bind:style="'width:' + obj.proportion + '%'"></text></view>
								<text class="progress-txt">
									<text style="font-size: 16px;font-weight: bold;">{{ obj.proportion }}</text>
									<text class="small-txt">%</text>
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view>
						<!-- <text style="font-size: 16px;">数据监测</text> -->
						<view class="flex text-center">
							<view class="cu-item flex-sub" :class="item.id == TabCur ? 'text-white cur bg-green ' : ''" v-for="(item, index) in tabs"
							 :key="index" @tap="tabSelect" :data-id="item.id" style="height: 80rpx;line-height: 80rpx;">
								{{ item.name }}
							</view>
						</view>
					</view>
					<view style="height: 100%;background-color: #FFFFFF;">
						<template v-if="TabCur == 1">
							<view style="padding-top:20rpx" v-if="chartsList.length > 0">
								<view class="" v-for="(item, n) in chartsList" :key="n">
									<line-chart :title="item.operation" :width="cWidth * 2" :height="cHeight * 2" :style="{ width: cWidth + 'px', height: cHeight + 'px' }"
									 :canvasId="item.field + 'Line'" chartType="line" :opts="item.opts" :unit="item.unit" :max="item.max" :min="item.min" />
								</view>
							</view>
						</template>
						<template v-if="TabCur == 2">
							<view class="uni-list" style="margin:10rpx 0;">
								<view class="uni-list-cell">
									<view class="uni-list-cell-left " style="width: 50%;text-align: center;">切换日期</view>
									<view class="uni-list-cell-db ">
										<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
											<view class="uni-input" style="height: 80rpx;text-align: center;">{{ date }}</view>
										</picker>
									</view>
								</view>
							</view>
							<view class="text-center">
								<text>{{ textMsg }}</text>
							</view>
							<auxograph :imgsArr="imgsArr" />
						</template>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-modal" :class="shoeModel ? 'show' : ''" @click="hideModal">
			<view class="cu-dialog">
				<view class="bg-img" style="padding:40rpx">
					<image :src="modelImg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LineChart from '@/components/u-charts/u-charts/component.vue';
	import Auxograph from '@/components/auxograph.vue';
	import http from '@/utils/request.js';
	import {
		formatDate
	} from '@/utils/index.js';
	export default {
		components: {
			LineChart,
			Auxograph
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				date: currentDate,
				isTitme: true,
				textMsg: '最近15天成长记录',
				chartsList: [],
				data: {},
				obj: {},
				tabs: [{
						id: 1,
						name: '数据分析'
					},
					{
						id: 2,
						name: '成长记录'
					}
				],
				TabCur: 1,
				windowHeight: 300,
				massifId: '',
				scrollTop: 0,
				cWidth: '',
				cHeight: '',
				openid: '',
				isLike: false,
				num: 0,
				shoeModel: false,
				modelImg: '',
				monitorings: [], //有的检测类型
				deviceList: [],
				deviceId: null, //当前设备ID
				imgsArr: [], //生长历程
				index: 0,
				picker: [],
				// imgUrl:'' ,//非直播设备的图片地址
				LiveUrl: {}, // 设备直播地址
				showVideo: false,
				urlTrue:false,//视频源是否加载成功
				timer:null
			};
		},
		onShareAppMessage: function() {
			return {
				title: '快来看看我的地块生长情况吧！',
				desc: '',
				path: 'pages/monitor/growthMonitoring?massifId=' + this.massifId // 路径，传递参数到指定页面。
			};
		},
		watch: {
			deviceId(v, n) {
				console.info('有监听了')
				// this.deviceCommand(1);
				this.deviceGetDetails();
				this.deviceList.forEach(item => {
					if (item.deviceId == v) {
						if (item.deviceName == '生态智慧树') {
							var that = this;
							setTimeout(function() {
								console.info('这里有调用？？')
								that.deviceGetLivePath();
							}, 5000);
						} else {
							this.showVideo=false
							if(this.timer){
								clearTimeout(this.timer)
							}
							this.LiveUrl = {};
						}
					}
				})

			}
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
			if (option.scene) {
				this.massifId = option.scene;
			} else {
				this.massifId = option.massifId;
			}
		},
		onShow() {
			this.findMassifIdByDevice(); //获取作物
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.openid = getApp().globalData.openid;
		},
		onUnload() {
			if(this.timer){
				clearTimeout(this.timer)
			}
			var data = uni.getStorageSync('video');
			data.forEach(item => {
				if (item.deviceName == '生态智慧树') {
					this.$api.deviceCommand({
						deviceSn: item.deviceSn,
						action: 0,
					}).then(res => {})
				}
			})
		},
		mounted() {},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// // 视频出错（注意需真机测试）
			// VideoError(e) {			
			// 	this.showVideo = false
			// 	let _this=this
			// 	uni.showToast({
			// 		title: '视频源错误，将重新加载',
			// 		icon: 'none',
			// 		success: function(){
			// 			setTimeout(()=>{
							
			// 				_this.deviceGetLivePath()
			// 			},800)
			// 		}
			// 	})
				
			// },
			loadedmetadata(){//只有视频源被成功加载才会执行，依此条件来判断是否需要再次加载直播
				this.urlTrue=true
			},
			PickerChange(e) {
				this.index = e.detail.value;
				this.deviceId = this.deviceList[this.index].deviceId;
				this.chartsList = [];
				this.deviceCommand(1);
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if (this.TabCur == 2 && this.imgsArr.length == 0) {
					this.deviceetScopeImage(); //设备生长历程
				}
			},
			// onShareTimeline(){},//分享朋友圈需要定义的方法
			// 手动授权方法
			getCode() {
				let _this = this;
				if (_this.openid) {
					_this.getLikes();
				} else {
					wx.login({
						success(res) {
							if (res.code) {
								//发起网络请求
								var code = res.code;
								// 这里通过code获取openid
								_this.$api
									.decodeUserInfo({
										code: code
									})
									.then(res => {
										getApp().globalData.openid = res.data.data.openid;
										_this.openid = res.data.data.openid;
										_this.getLikes();
									});
							}
						}
					});
				}
			},
			shareFunc() {
				//显示小程序码
				let obj = {
					scene: this.massifId,
					page: 'pages/monitor/growthMonitoring',
					width: '250'
				};

				this.$api.getUnlimited(obj).then(res => {
					this.shoeModel = true;
					this.modelImg = 'https://xyzn.tree-iot.com' + res.data.path;
				});
			},
			hideModal() {
				this.shoeModel = false;
			},
			getLikes() {
				//进入获取点赞状态
				let obj = {
					openid: this.openid,
					massifId: this.massifId
				};
				let _this = this;
				this.$api.getLikes(obj).then(res => {
					_this.num = res.data.data.likes;
					if (res.data.data.state == 1) {
						_this.isLike = true;
					} else {
						_this.isLike = false;
					}
				});
			},
			likesFunc() {
				//点赞
				let obj = {
					openid: this.openid,
					massifId: this.massifId
				};
				let _this = this;
				this.$api.likes(obj).then(res => {
					_this.num = res.data.data.likes;
					if (res.data.data.state == 1) {
						_this.isLike = true;
					} else {
						_this.isLike = false;
					}
				});
			},
			scroll: function(e) {
				this.scrollTop = e.detail.scrollTop;
			},

			findMassifIdByDevice() {
				this.$api.monitor({
					massifId: this.massifId
				}).then(res => {
					// 产品数据
					this.obj = res.data.data;
					this.massifGetOne();
				});
			},
			massifGetOne() {
				// 获取地块
				this.$api.massifGetOne({
					massifId: this.massifId
				}).then(res => {
					this.obj.massifName = res.data.data.massifName;
					this.obj.massifNo = res.data.data.massifNo;
					this.farmGetOne(res.data.data.farmId);
				});
			},
			farmGetOne(id) {
				// 根据地块查询农场
				this.$api.farmGetOne({
					farmId: id
				}).then(res => {
					this.data = res.data.data[0].farm;
					this.massifGetDeviceList();
				});
			},
			massifGetDeviceList() {
				// 根据地块获取设备列表
				this.$api.massifGetDeviceList({
					massifId: this.massifId
				}).then(res => {
					this.deviceList = res.data.data;
					if (this.deviceList.length > 0) {
						this.deviceId = this.deviceList[0].deviceId;
						this.picker = [];
						this.deviceList.map(item => {
							this.picker.push(item.deviceName);
						});
						uni.setStorage({
							key: 'video',
							data: this.deviceList,
							success() {}
						});
						this.deviceCommand(1);
						// this.deviceGetPresentData(); //设备数据
						// this.findRangeDatay(); //设备7天数据

					}

				});
			},
			deviceGetDetails() {
				this.$api.deviceGetDetails({
					deviceId: this.deviceId
				}).then(res => {
					res.data.data.presentData.forEach(item => {
						if (item.metric == "RainTendency") {
							if (item.value == 0) {
								item.value = "无雨";
							}
							if (item.value == 1) {
								item.value = "小雨"
							}
							if (item.value == 2) {
								item.value = "中雨"
							}
							if (item.value == 3) {
								item.value = "大雨"
							}
						}
					})
					this.monitorings = res.data.data.presentData;
					var chartsList = res.data.data.scopeData;
					// var chartsList = chart.filter(li => {
					// 	return li.sevenDays.data;
					// });
					chartsList.map(items => {
						// let orderDps = items.sevenDays.data[0].orderDps;
						let option = {
							//数字的图--折线图数据
							categories: this.GetTime(),
							series: [{
								name: '',
								data: items.dps,
							}]
						};
						items.dps.forEach(item => {
							if (item !== undefined && item) {
								// option.categories.push(formatDate(item.timestamp));
								option.series[0].data.push(parseFloat(item).toFixed(1));
							}
						});
						items.opts = option;
					});
					this.chartsList = [...chartsList];

				})
			},
			deviceGetLivePath() { // 直播
				this.showVideo = false
				this.$api.deviceGetLivePath({
					deviceId: this.deviceId
				}).then(res => {
					this.LiveUrl = res.data.data;				
					setTimeout(() => {
						this.showVideo = true						
					}, 500)
					this.timer=setTimeout(()=>{
						//如果视频源没有加载成功，再请求一次
						let _this=this
						if(!this.urlTrue){
							uni.showToast({
								title: '视频源错误，将重新加载',
								icon: 'none',
								success: function(){
									setTimeout(()=>{
										_this.showVideo = false
										_this.deviceGetLivePath()
									},800)
								}
							})				
						}else{
							clearTimeout(this.timer)
						}
					},9000)

					
				})

				// let video = document.getElementById("myVideo")
				// console.log(video)
				// video.addEventListener('error', function() {
				// 	console.log("播放出错");
				// });
				// video.addEventListener('stalled', function() {
				// 	console.log("获取媒体数据失败");
				// });
			},
			deviceetScopeImage() {
				//生长历程
				this.$api.deviceetScopeImage({
					device: {
						deviceId: this.deviceId,
					}
				}).then(res => {
					var Arrimgs = new Array();
					res.data.data.forEach(item => {
						Arrimgs.push({
							date: this.formats(item.time),
							picture: item.url,
							resArr: [item.url],
							deviceId: this.deviceId,
						});
					});
					this.imgsArr = Arrimgs;
				});
			},
			GetTime() { // 获取当前时间前7天
				var date = new Date();
				var base = Date.parse(date); // 转换为时间戳
				var year = date.getFullYear(); //获取当前年份
				var mon = date.getMonth() + 1; //获取当前月份
				var day = date.getDate(); //获取当前日
				var oneDay = 24 * 3600 * 1000
				var daytime = `${year}${mon >= 10 ? mon : '0' + mon}${day >= 10 ? day : '0' + day}`; //今日时间
				this.$data.daytime = daytime; // 今日时间赋值给变量

				var daytimeArr = []
				for (var i = 1; i < 7; i++) { //前七天的时间
					var now = new Date(base -= oneDay);
					var myear = now.getFullYear();
					var month = now.getMonth() + 1;
					var mday = now.getDate()
					daytimeArr.push([myear, month >= 10 ? month : '0' + month, mday >= 10 ? mday : '0' + mday].join('-'))
				}
				return daytimeArr
			},
			bindDateChange: function(e) {
				this.isTitme = false;
				this.date = e.target.value;

				var str = e.detail.value.split('-');
				var date = str[0] + str[1] + str[2];
				this.$api.deviceGetImage({
					device: {
						deviceId: this.deviceId
					},
					time: date
				}).then(res => {
					var Arrimgs = new Array();
					if (res.data.data) {
						res.data.data.forEach(item => {
							Arrimgs.push({
								date: this.formats(item.time),
								picture: item.url,
								resArr: [item.url],
								deviceId: this.deviceId,
							});
						});
						this.textMsg = e.target.value + '当天的成长记录';
						this.imgsArr = Arrimgs;
					} else {
						uni.showToast({
							title: this.date + '当天未获取到数据',
							icon: 'none',
						})
					}
				});
			},
			add0(m) {
				return m < 10 ? '0' + m : m;
			},
			formats(time) {
				//time是整数，否则要parseInt转换
				var time = new Date(time);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			deviceCommand(index) { // 控制直播设备开关
				if (index == 1 && this.deviceList[this.index].deviceName == '生态智慧树') {
					this.re(this.deviceList[this.index].deviceSn, index);
				} else if (index == 0 && this.deviceList[this.index].deviceName == '生态智慧树') {
					this.re(this.deviceList[this.index].deviceSn, index);
				}
			},
			re(num, i) {
				this.$api.deviceCommand({
					deviceSn: num,
					action: i
				}).then(res => {

				})
			}
			// showImg(url){
			// 	let list = new Array();
			// 	list.push(url);
			// 	uni.previewImage({
			// 		urls: list,
			// 	});
			// }
		}
	};
</script>

<style lang="scss" scoped>
	page,
	.workOrder {
		background: #eee;
	}

	.flex {
		display: flex;
	}

	.workOrder {
		height: 100%;

		.top {
			position: fixed;
			background-color: #fff;
			width: 100%;
			z-index: 1;
		}
	}

	.likes-shere-box {
		width: 49%;
		text-align: center;
	}

	.box-margin {
		padding-top: 5px;
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
		padding-top: 20px;
	}

	.order-title {
		line-height: 20px;
	}

	.small-text {
		color: #999999;
		font-size: 13px;
	}

	.state-box {
		position: relative;
		right: -15px;
		padding: 3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		background: #49ba89;
		color: #fff;
	}

	.state-box-error {
		position: relative;
		padding: 3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right: -20rpx;
		background: #fdb523;
		color: #fff;
	}

	.item-content-box {
		width: 32%;
		text-align: center;
		line-height: 18px;

		.item-num {
			font-size: 16px;
			font-weight: bold;
		}
	}

	.timeline-box {
		text {
			color: red;
		}
	}

	// 地图CSS
	.map-container {
		position: relative;
	}

	.detail-name {
		width: 75%;
		border-right: 1px solid #eee;
	}

	.small-txt {
		font-size: 12px;
	}

	.detail-img {
		width: 25%;
		text-align: center;
	}

	.detail-img image,
	.detail-name image {
		width: 30rpx;
		height: 30rpx;
	}

	.detail-box {
		padding: 20rpx;
		background: #fff;
		border-radius: 6px;
	}

	.color-grey {
		color: #999;
	}

	.font-size-16 {
		font-size: 15px;
	}

	.map-top-box {
		// position: absolute;
		// top: 10rpx;

		background: #fff;
		padding: 10rpx 20rpx;
		// left: 2%;
	}

	.map-bottom-box {
		background: #fff;
		padding: 10rpx 20rpx;
		border-bottom: 10px solid #f9f9f9;

		image {
			width: 28px;
			height: 28px;
			margin-right: 20rpx;
			position: relative;
		}

		.content {
			padding: 30rpx;
			overflow-y: auto;
			position: relative;
			padding-top: 200rpx;

			.item {
				padding: 30rpx;
				line-height: 30rpx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
				margin-bottom: 30rpx;

				.flex {
					margin-bottom: 20rpx;
				}
			}

			.imgIcon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10px;
			}
		}

		.order-title {
			line-height: 20px;
		}

		.small-text {
			color: #999999;
			font-size: 13px;
		}

		.list-item {
			background: #fff;
			border-radius: 8px;
			margin-bottom: 20rpx;
		}

		.state-box {
			position: relative;
			padding: 3px 6px;
			border-top-left-radius: 15px;
			border-bottom-left-radius: 15px;
			right: -20rpx;
			background: #49ba89;
			color: #fff;
		}

		.item-content-box {
			width: 32%;
			text-align: center;

			.item-num {
				font-size: 18px;
				font-weight: bold;
			}
		}
	}

	.farm-detail-box {
		padding: 20rpx 30rpx;
		background: #fff;
		// border-top: 440rpx solid #F5F5F5;
	}

	.map-bottom-tip {
		width: 100%;
		text-align: center;
		margin-top: 5rpx;
		color: #999;

		image {
			width: 31rpx;
			height: 27rpx;
		}

		.right-img {
			width: 36rpx;
			height: 33rpx;
		}
	}

	.map-top-item {
		width: 25%;
		text-align: center;
	}

	.play-box {
		width: 100%;
		text-align: right;
		padding: 500rpx 20rpx 10rpx 0;

		image {
			width: 88rpx;
			height: 68rpx;
		}
	}

	.like-txt {
		background: #fff;
		border: none;
		font-size: 28rpx;
		display: inline-block;
		margin: 0 !important;
		padding: 0 !important;
		margin-top: 14rpx;
	}

	button::after {
		border: none;
	}

	.likes-box {
		text-align: center;
	}

	.progress {
		width: 70%;
		height: 16px;
		background: rgba(255, 255, 255, 0.2);
		margin: 12px 15px;
		border-radius: 10px;
		text-align: center;
		color: #fff;
		border: 1px solid #49ba89;

		.progressing {
			position: relative;
			float: left;
			margin: 0 auto;
			height: 15px;
			background: #49ba89;
			border-radius: 10px;
		}
	}
</style>
