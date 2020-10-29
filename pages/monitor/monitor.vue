<!-- 预警与监测 -->
<template>
	<view class="workOrder">
		<view class="top">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view
						class="cu-item flex-sub"
						:class="item.id == TabCur ? 'text-green cur' : ''"
						v-for="(item, index) in tabs"
						:key="index"
						@tap="tabSelect"
						:data-id="item.id"
					>
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="isLogin">
			<view v-if="TabCur == 1">
				<scroll-view
					v-bind:style="{ height: windowHeight + 'px' }"
					class="list-container"
					scroll-y="true"
					refresher-enabled="true"
					refresher-background="#eee"
					@refresherpulling="onPulling"
					@refresherrefresh="onRefresh"
					@refresherrestore="onRestore"
					@refresherabort="onAbort"
					:refresher-triggered="triggered"
					:refresher-threshold="100"
					@scrolltoupper="scrolltoupper"
					@scrolltolower="loadingData"
				>
					<view class="" v-for="(item, index) in newsList" :key="index" @tap="toUrl(item.massifId)">
						<monitor-land :itemObject="item" />					
					</view>
					<view class="loading-more">{{ contentdown }}</view>
				</scroll-view>
			</view>
			<view v-bind:style="{ height: windowHeight - 40 + 'px', padding: '10px 0',paddingTop:'100rpx' }" v-else>
				<scroll-view v-bind:style="{ height: windowHeight - 40 + 'px', backgroundColor: '#f0f0f0', padingTop:0 }" class="list-containers" scroll-y="true">
					<view style="height: 100%;background-color: #FFFFFF;">
						<view class="cu-timeline" v-if="timeList.length > 0">
							<view class="cu-item text-olive" v-for="(item, i) in timeList" :key="i">
								<text class="small-text">{{ item.createTime }}</text>
								<view class="flex  align-items-center">
									<view class="timeline-box">
										<view style="color:#333">{{ item.farmName }} NO.{{ item.massifNo }} {{item.massifName}} </view>
										<view style="color:red">{{ item.warnName }}</view>
									</view>
									<button size="mini" class="bg-green" @click="showModel(item.warnMessage)">查看</button>
								</view>
								
							</view>
						</view>
						<view class="loading-more" v-else><image src="../../static/imgs/No.png" mode="aspectFit" style="height: 80%;"></image></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="" v-else><not-login /></view>
		<popup :content="modelContent" align="center" :show="popupShow" :showCancel="false" confirmText="我知道了" @close="closePopup" />
	</view>
</template>

<script>
import { throttle } from '@/utils/index.js';
import monitorLand from '@/components/monitorLand.vue';
import popup from '@/components/neil-modal/neil-modal.vue';
import notLogin from '@/components/notLogin/notLogin.vue';
export default {
	components: {
		monitorLand,
		popup,
		notLogin
	},
	data() {
		return {
			orderList: [],
			tabs: [
				{
					id: 1,
					name: '监测'
				},
				{
					id: 2,
					name: '预警'
				}
			],
			
			list: [
				{
					name: 'asdasd'
				},
				{
					name: 'asdasd'
				},
				{
					name: 'asdasd'
				}
			],
			TabCur: 1,
			WarningTabCur: 1,
			newsList: [],
			baseId: '',
			page: 1,
			moreHeight: 30,
			windowHeight: 300,
			contentdown: '',
			loadingType: 0,
			triggered: false,
			_freshing: false,
			popupShow: false,
			timeList: [],
			pestsList: [], // 病虫害数据
			isLogin: false,
			modelContent: ''
		};
	},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		// if(this.isLogin){
		// 	this.initData()
		// 	this.warningAll()
		// }
	},
	onShareAppMessage: function() {
		return {
			title: '星鸦智农',
			desc: '',
			path: 'pages/monitor/monitor' // 路径，传递参数到指定页面。
		};
	},
	onShow() {
		if (!this.isLogin) {
			//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
			this.isLogin = getApp().globalData.isLogin;
			if (this.isLogin) {
				this.initData(1);
			}
		} else {
			this.initData(1);
		}
	},
	mounted() {
		this.loadingData = throttle(this.loadingData, 2000);
		// 测试openid
		getApp().globalData.openId = 'XXXXXXXXXXXXX';
	},
	methods: {
		showModel(txt) {
			this.modelContent = txt;
			this.popupShow = true;
		},
		closePopup() {
			this.popupShow = false;
		},
		warningAll() {
			this.$api.warnMsgGetAll().then(res => {
				this.timeList = res.data.data;
				this.timeList.reverse();
				if (this.timeList.length > 0) {
					this.tabs[1].name = `预警（${this.timeList.length}）`;
				}
			});
		},
		
		toUrl(id) {
			//跳转监测详情
			uni.navigateTo({
				url: 'growthMonitoring?massifId=' + id
			});
		},
		onPulling() {},
		onRefresh() {
			if (this._freshing) return;
			this._freshing = true;
			if (!this.triggered) {
				//界面下拉触发，triggered可能不是true，要设为true
				this.triggered = true;
			}
			let _this = this;
			setTimeout(() => {
				this.triggered = false; //触发onRestore，并关闭刷新图标
				this._freshing = false;
				_this.initData();
			}, 1000);
		},
		onRestore() {
			this.triggered = false; // 需要重置
			this._freshing = false;
		},
		onAbort() {
			this.triggered = false; //触发onRestore，并关闭刷新图标
			this._freshing = false;
		},
		initData(n) {
			this.newsList = [];
			this.page = 1;
			this.loadingType = 1;
			this.contentdown = '';
			this.getData();
			this.warningAll();
		},

		delOrganUserWorkOrderManage(id) {
			//删除
			let _this = this;
			this.$apiYZX.delOrganUserWorkOrderManage(id).then(res => {
				if (res.data.code == 200) {
					uni.showToast({
						title: '删除成功',
						duration: 2000,
						success() {
							_this.initData();
						}
					});
				}
			});
		},
		scrolltoupper() {
			console.info('下拉');
		},
		loadingData(e) {
			this.lastTime = e.timeStamp;
			if (this.loadingType) {
				this.page++;
				this.contentdown = '加载中...';
				this.getData();
			}
		},
		getData(n) {
			
			this.$api.selectMassif().then(res => { // 获取地块
				this.farmGetOne(0,res.data.data);
			})
		},
		farmGetOne(index,array){// 根据地块查询农场
			if (array.length > 0) {
				this.$api.farmGetOne({farmId:array[index].farmId}).then(res => {
					array[index].address = res.data.data[0].farm.provinceName + res.data.data[0].farm.cityName + res.data.data[0].farm.countyName + res.data.data[0].farm.address;
					if(++index < array.length){
						this.farmGetOne(index,array);
					} else {
						this.massifGetDeviceList(0,array);
					}
				})
			}
		},
		massifGetDeviceList(index,array) { // 获取设备
				this.$api.massifGetDeviceList({massifId:array[index].massifId}).then(res => {
					array[index].device = res.data.data;
					if(++index < array.length){
						this.getData(index,array);
					} else {
						this.monitor(0,array);
					}
				})
		},
		monitor(index,array){
			this.$api.monitor({massifId:array[index].massifId}).then(res => {
				array[index].proportion = res.data.data.proportion;
				array[index].crops = res.data.data.crops;
				if(++index < array.length){
					this.monitor(index,array);
				} else {
					this.getOneData(0,0,array);
				}
			})
		},
		getOneData(index,num,array){// 根据id获取设备详情
				this.$api.selectDevice({deviceId:array[index].device[num].deviceId}).then(res => {
						if(res.data.data.Details.status=='ONLINE'){
							array[index].device[num].statusTxt='在线'
						}else if(res.data.data.Details.status=='OFFLINE'){
							array[index].device[num].statusTxt='离线'
						}else if(res.data.data.Details.status=='UNACTIVE'){
							array[index].device[num].statusTxt='未激活'
						}else if(res.data.data.Details.status=='DISABLE'){
							array[index].device[num].statusTxt='禁用'
						}
					if (++num < array[index].device.length) {
						this.getOneData(index,num,array);
					} else if(++index < array.length){
						num = 0;
						this.getOneData(index,num,array);
					} else {
						this.newsList = array;
					}
				})
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			// if (e.currentTarget.dataset.id == 1) {
			// 	this.listObj.initiatorId = this.obj.organUserId
			// } else {
			// 	this.listObj.initiatorId = ''
			// }
			// this.initData()
		},
		warningTabSelect(e) {
			this.WarningTabCur = e.currentTarget.dataset.id;
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.workOrder {
	background: #eee;

	.list-container {
		padding: 10rpx 30rpx;
		padding-top: 100rpx;
	}
	.list-containers{
		padding: 10rpx 30rpx;
		padding-top: 0;
	}
}

.flex {
	display: flex;
	justify-content: space-between;
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

.box-margin {
	padding-top: 10px;
}

.loading-more {
	text-align: center;
	color: #ddd;
	padding-bottom: 50rpx;
	padding-top: 20px;
	height: 100%;
}

.order-title {
	line-height: 20px;
}

.small-text {
	color: #999999;
	font-size: 26rpx;
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

.item-content-box {
	width: 30%;
	text-align: center;

	.item-num {
		font-size: 18px;
		font-weight: bold;
	}
}

.timeline-box {
	text {
		color: red;
	}
}
.cu-timeline {
	padding: 30rpx 0;
}
.cu-nav .cu-items {
	height: 90rpx;
	display: inline-block;
	line-height: 90rpx;
	padding: 0 20rpx;
	white-space: nowrap;
	color: #9a9a9a;
}

.color-black {
	color: #000000 !important;
}
</style>
