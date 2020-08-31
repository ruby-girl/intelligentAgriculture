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
					<view class="" v-for="(item, index) in newsList" :key="index" @tap="toUrl(item.massifId)"><land-block :itemObject="item" /></view>
					<view class="loading-more">{{ contentdown }}</view>
				</scroll-view>
			</view>
			<view v-bind:style="{ height: windowHeight - 20 + 'px', padding: '10px 0' }" v-else>
				<scroll-view v-bind:style="{ height: windowHeight - 20 + 'px' }" class="list-container" scroll-y="true">
					<scroll-view scroll-x class="cu-nav">
						<view class="flex text-center">
							<view
								class="cu-items flex-sub"
								:class="item.id == WarningTabCur ? 'bg-white cur color-black' : ''"
								v-for="(item, index) in waningTabs"
								:key="index"
								@tap="warningTabSelect"
								:data-id="item.id"
							>
								{{ item.name }}
							</view>
						</view>
					</scroll-view>
					<template v-if="WarningTabCur == 1">
						<view class="cu-timeline" v-if="pestsList.length > 0">
							<view class=" cu-item text-olive" v-for="(item,i) in pestsList" :key="i">
								<text class="small-text">{{item.creationTime}}</text>
								<view class="flex justify-content-flex-justify align-items-center">
									<view class="timeline-box">
										<view style="color:#333">{{item.farmName}} NO.{{item.massifNo}}</view>
										<view style="color:red">{{item.warningName}}</view>
									</view>
									<button class="cu-btn bg-green" @click="showModel(item.msg)">查看</button>
								</view>
							</view>
						</view>
						<view class="loading-more" v-else>暂无数据</view>
					</template>
					<template v-if="WarningTabCur == 2">
						<view class="cu-timeline" v-if="timeList.length > 0">
							<view class="cu-item text-olive" v-for="(item,i) in timeList" :key="i">
								<text class="small-text">{{item.creationTime}}</text>
								<text class="small-text">1</text>
								<view class="flex justify-content-flex-justify align-items-center">
									<view class="timeline-box">
										<view style="color:#333">{{item.farmName}} NO.{{item.massifNo}}</view>
										<view style="color:red">{{item.warningName}}</view>
									</view>
									<button class="cu-btn bg-green" @click="showModel(item.msg)">查看</button>
								</view>
							</view>
						</view>
						<view class="loading-more" v-else>暂无数据</view>
					</template>
				</scroll-view>
			</view>
		</view>
		<view class="" v-else><not-login /></view>
		<popup :content="modelContent" align="center" :show="popupShow" :showCancel="false" confirmText="我知道了" @close="closePopup" />
	</view>
</template>

<script>
import { throttle } from '@/utils/index.js';
import landBlock from '@/components/landBlock.vue';
import popup from '@/components/neil-modal/neil-modal.vue';
import notLogin from '@/components/notLogin/notLogin.vue';
export default {
	components: {
		landBlock,
		popup,
		notLogin
	},
	data() {
		return {
			orderList: [],
			tabs: [
				{
					id: 1,
					name: '监测信息'
				},
				{
					id: 2,
					name: '预警'
				}
			],
			waningTabs: [
				{
					id: 1,
					name: '病虫害'
				},
				{
					id:2,
					name:'环境'
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
			let obj = {
				pageNum: 1,
				pageSize: 3
			};
			this.$api.warningAll(obj).then(res => {
				this.timeList = res.data.data.massifs;
				if (this.timeList.length > 0) {
					this.tabs[1].name = `预警（${this.timeList.length}）`;
					this.waningTabs[1].name = `环境（${this.timeList.length}）`;
				}
			});
			
		},
		findPests(){ // 查询用户下所有病虫害
			let obj = {
				pageNum: 1,
				pageSize: 3
			};
			this.$api.findPests(obj).then(res => {
				this.timeList = res.data.data.massifs;
				if (this.pestsList.length > 0) {
					this.waningTabs[0].name = `病虫害（${this.pestsList.length}）`;
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
			this.getData(n);
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
			let obj = {
				pageNum: this.page,
				pageSize: 10
			};
			this.$api.selectMonitor(obj).then(res => {
				this.newsList = this.newsList.concat(res.data.data.massifs);
				this.newsList.forEach((item, i) => {
					if (this.newsList[i].status == 'ONLINE') {
						this.newsList[i].statusTxt = '在线';
					} else if (this.newsList[i].status == 'OFFLINE') {
						this.newsList[i].statusTxt = '离线';
					} else if (this.newsList[i].status == 'UNACTIVE') {
						this.newsList[i].statusTxt = '未激活';
					} else if (this.newsList[i].status == 'DISABLE') {
						this.newsList[i].statusTxt = '禁用';
					} else {
						this.newsList[i].statusTxt = '-';
					}
				});
				if (this.page == 1 && this.newsList.length == 0) {
					this.loadingType = 0;
					this.contentdown = '暂无数据';
				} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length < 3) {
					this.contentdown = '';
					this.loadingType = 0;
				} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length > 2) {
					this.contentdown = '无更多数据';
					this.loadingType = 0;
				} else if (res.data.data.rowCount == this.newsList.length) {
					this.loadingType = 0;
					this.contentdown = '无更多数据';
				} else {
					this.contentdown = '上拉加载更多';
					this.loadingType = 1;
				}
				if (n) {
					//列表接口请求时间过长，所以放在回调里再请求预警
					this.findPests();
					this.warningAll();
				}
			});
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
		warningTabSelect(e){
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
.cu-nav .cu-items{
	height: 90rpx;
	display: inline-block;
	line-height: 90rpx;
	padding: 0 20rpx;
	white-space: nowrap;
	color: #9A9A9A;
}
	
.color-black{
	color: #000000 !important;
}
</style>
