<!-- 生长监测 -->
<template>
	<view class="workOrder">
		<view>
			<scroll-view v-bind:style="{ height: windowHeight + 'px' }" style="overflow: hidden;" class="list-container" scroll-y="true" @scroll="scroll">
				<view class="map-container">
					<view class="map-top-box flex align-items-center justify-content-flex-justify">
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.proportion }}%</view>
							<view class="small-text">{{ obj.crop }}</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.surplus }}</view>
							<view class="small-text">剩余时间(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.already }}</view>
							<view class="small-text">已成长(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{ obj.creationTime }}</view>
							<view class="small-text">种植日期</view>
						</view>
					</view>
					<image v-if="picker[index] == '大地探针'" style="width:100%;height: 600rpx;" mode="aspectFit" src="../../static/imgs/The-probe.jpg"></image>
					<video
						v-else
						id="myVideo"
						autoplay="true"
						custom-cache="false"
						controls
						style="width:100%;height: 600rpx;"
						:poster="LiveUrl.liveCoverUrl"
						:src="LiveUrl.hlsLivePlayUrl"
					></video>
					<view class="map-bottom-box">
						<view class="list-item">
							<view class="flex  align-items-center justify-content-flex-justify">
								<view class="flex  align-items-center">
									<image class="land-img" src="../../static/imgs/location.png" mode=""></image>
									<view class="item-title">
										<view class="order-title" style="font-weight: bold;">NO.{{ obj.massifNo }} {{ obj.massifName }}</view>
										<view class="order-title small-text">当前设备：{{ picker[index] }}</view>
										<view class="order-title small-text">{{ obj.farmName }}</view>
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
										<span class="small-txt">{{ item.unit }}</span>
									</view>
									<text class="small-text">{{ item.name }}</text>
								</view>
							</view>
							<view class="flex align-items-center">
								<view class="progress"><text class="progressing" v-bind:style="'width:' + obj.proportion + '%'"></text></view>
								<text class="progress-txt">
									<text style="font-size: 16px;font-weight: bold;">{{ obj.proportion }}</text>
									<text class="small-txt">%</text>
								</text>
							</view>
							<view class="flex">
								<view class="map-bottom-tip">
									<view class="likes-box flex justify-content-flex-center align-items-center">
										<view class="flex justify-content-flex-center align-items-center likes-shere-box">
											<image v-if="isLike" src="../../static/imgs/like.png" mode="aspectFill" @click="likesFunc"></image>
											<image v-else src="../../static/imgs/no-like.png" mode="aspectFill" @click="likesFunc"></image>
											<button v-if="num !== 0" class="like-txt" lang="zh_CN" withCredentials="true" @click="likesFunc">{{ num }}人点赞</button>
											<button v-else class="like-txt" lang="zh_CN" withCredentials="true" @click="likesFunc">点赞</button>
										</view>
										<view style="height:25px;border-left:2px solid #eee;"></view>
										<view class="flex justify-content-flex-center align-items-center likes-shere-box">
											<image class="right-img" src="../../static/imgs/share.png" mode="aspectFill" @click="shareFunc"></image>
											<button class="like-txt" lang="zh_CN" withCredentials="true" @click="shareFunc">分享二维码</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view>
						<!-- <text style="font-size: 16px;">数据监测</text> -->
						<view class="flex text-center">
							<view
								class="cu-item flex-sub"
								:class="item.id == TabCur ? 'text-white cur bg-green ' : ''"
								v-for="(item, index) in tabs"
								:key="index"
								@tap="tabSelect"
								:data-id="item.id"
								style="height: 80rpx;line-height: 80rpx;"
							>
								{{ item.name }}
							</view>
						</view>
					</view>
					<view style="height: 100%;background-color: #FFFFFF;">
						<template v-if="TabCur == 1">
							<view style="padding-top:20rpx" v-if="chartsList.length > 0">
								<view class="" v-for="(item,n) in chartsList" :key="n">
									<line-chart :title="item.name" :width="cWidth*2" :height="cHeight*2" :style="{'width':cWidth+'px','height':cHeight+'px'}"
									 :canvasId="item.field+'Line'" chartType="line" :opts="item.opts" :unit="item.unit" />
								</view>
							</view>
						</template>
						<template v-if="TabCur == 2">
							<view class="text-center"><text>最近30天成长记录</text></view>
							<auxograph :imgsArr="imgsArr" />
						</template>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-modal" :class="shoeModel ? 'show' : ''" @click="hideModal">
			<view class="cu-dialog">
				<view class="bg-img" style="padding:40rpx"><image :src="modelImg" mode="aspectFit"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
import LineChart from '@/components/u-charts/u-charts/component.vue';
import Auxograph from '@/components/auxograph.vue';
import http from '@/utils/request.js';
import { formatDate } from '@/utils/index.js';
export default {
	components: {
		LineChart,
		Auxograph
	},
	data() {
		return {
			chartsList: [],
			baseId: '',
			obj: {
				proportion: '0'
			},
			tabs: [
				{
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
			LiveUrl: [] ,// 设备直播地址
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
			this.findDeviceData();
			this.findRangeDatay();
			this.GetDeviceImageData();
		}
	},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		if (option.scene) {
			this.massifId = option.scene;
		} else {
			this.massifId = option.massifId;
		}
		this.videoContext = wx.createVideoContext('myVideo');
	},
	onShow() {
		this.getData();
		this.findMassifIdByDevice(); //获取设备
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.openid = getApp().globalData.openid;
		this.getCode();
	},
	mounted() {},
	methods: {
		PickerChange(e) {
			this.index = e.detail.value;
			this.deviceId = this.deviceList[this.index].deviceId;
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
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
		getData() {
			//获取检测详情
			this.$api
				.massifMonitor({
					massifId: this.massifId
				})
				.then(res => {
					this.obj = res.data.data;
					// 处理该设备有的检测类型
					// this.monitorings = res.data.data.monitorings
					//*** */
					console.log(res);
					let arr = this.obj.creationTime.split(' ');
					let YMD = arr[0];
					let MD = YMD.split('-');
					this.obj.creationTime = MD[1] + '-' + MD[2];
					if (this.obj.status == 'ONLINE') {
						this.obj.statusTxt = '在线';
					} else if (this.obj.status == 'OFFLINE') {
						this.obj.statusTxt = '离线';
					} else if (this.obj.status == 'UNACTIVE') {
						this.obj.statusTxt = '未激活';
					} else if (this.obj.status == 'DISABLE') {
						this.obj.statusTxt = '禁用';
					} else {
						this.obj.statusTxt = '-';
					}
				});
		},
		findMassifIdByDevice() {
			//设备
			this.$api.findMassifIdByDevice({ massifId: this.massifId, pageNum: 1, pageSize: 20 }).then(res => {
				this.deviceList = res.data.data;
				if (this.deviceList.length > 0) {
					this.deviceId = this.deviceList[0].deviceId;
					this.picker = [];
					this.deviceList.map(item => {
						this.picker.push(item.deviceName);
					});
					// this.findDeviceData()
					// this.findRangeDatay()
				}
			});
		},
		findDeviceData() {
			//根据设备ID拿监测数据
			this.$api
				.findDeviceData({
					deviceId: this.deviceId
				})
				.then(res => {
					this.monitorings = res.data.data.monitorings;
					this.LiveUrl = res.data.data;
					console.log('设备数据：', this.monitorings);
				});
		},
		GetDeviceImageData() {
			//生长历程
			this.$api.GetDeviceImageData({ deviceId: this.deviceId }).then(res => {
				this.imgsArr = res.data.data;
				this.imgsArr.map(item => {
					let f = item.picture.split('[')[1];
					let t = f.split(']')[0];
					let arr = t.split(',');
					arr.forEach((li, n) => {
						if (li.charAt(0) == ' ') {
							li = li.split(' ')[1];
						}
						arr[n] = li;
					});
					item.resArr = arr;
				});
				this.imgsArr.reverse();
				// this.imgUrl = http.config.imgUrl + this.imgsArr[0].resArr[0]; //非直播获取图片
			});
		},
		findRangeDatay() {
			//折线图所有数据集合
			this.$api
				.findRangeData({
					deviceId: this.deviceId
				})
				.then(res => {
					var chart = res.data.data;
					var chartsList = chart.filter(li => {
						return li.sevenDays.data;
					});
					chartsList.map(items => {
						let orderDps = items.sevenDays.data[0].orderDps;
						let option = {
							//数字的图--折线图数据
							categories: [],
							series: [
								{
									name: '',
									data: []
								}
							]
						};
						orderDps.forEach(item => {
							if (item.value !== undefined && item.timestamp) {
								option.categories.push(formatDate(item.timestamp));
								option.series[0].data.push(parseFloat(item.value).toFixed(1));
							}
						});
						items.opts = option;
					});
					this.chartsList = [...chartsList];
					console.log('折线数据，', this.chartsList);
				});
		},
		
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
