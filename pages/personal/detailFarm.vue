<!-- 农场详情 -->
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
		<!-- 农场详情 -->
		<view v-show="TabCur == 1">
			<scroll-view v-bind:style="{ height: windowHeight + 'px' }" class="list-container" scroll-y="true">
				<view class="map-container">
					<map style="width:100%;height:300px;" :latitude="latitude" :longitude="longitude" :markers="covers" @callouttap="callouttapFunc">
						<!-- <cover-view slot="callout">
							<block>
								<cover-view class="customCallout" marker-id="1">
									
								</cover-view>
							</block>
						</cover-view> -->
					</map>
					<view class="map-top-box flex align-items-center justify-content-flex-justify">
						<view class="detail-name">
							<view class="detail-small-txt">
								<image style="width: 17px;height: 20px;" src="../../static/imgs/location-2.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="detail-img" @click="editFarm">
							<image src="../../static/imgs/deit.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="map-bottom-box">
						<text style="font-weight: bold;font-size: 16px;">农场负责人</text>
						<view class="flex align-items-center justify-content-flex-justify">
							<view class="detail-name flex align-items-center" style="border:none;">
								<!-- <image style="width: 30px;height: 30px;" src="../../static/imgs/deit.png" mode="aspectFill"></image> -->
								<view style="line-height:18px;margin-right: 5px;">
								</view>
							</view>
							<view class="detail-img">
							</view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view><text style="font-size: 16px;">农场介绍</text></view>
					<view class="flex align-items-center imgs-box">
					</view>
				</view>
			</scroll-view>
		</view>
			<view v-bind:style="{ height: windowHeight - 20 + 'px', padding: '10px 0',paddingTop:'200rpx' }" v-show="TabCur == 3">
			<scroll-view scroll-x class="cu-nav"  style="padding: 0 30rpx;position: fixed;z-index: 1;top: 90rpx;background-color: #F0F0F0;height: 120rpx;">
				<view class="flex text-center" style="margin-top: 30rpx;">
					<view
						class="cu-items flex-sub"
						:class="item.id == WarningTabCur ? 'bg-white cur color-black' : 'bg-gray'"
						v-for="(item, index) in waningTabs"
						:key="index"
						@tap="warningTabSelect"
						:data-id="item.id"
					>
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
			<scroll-view v-bind:style="{ height: windowHeight - 105 + 'px', backgroundColor: '#f0f0f0' }" class="list-containers" scroll-y="true">
				<view style="height: 100%;background-color: #FFFFFF;">
					<template v-if="WarningTabCur == 1">
						<view class="cu-timeline" v-if="pestsList.length > 0">
							<view class=" cu-item text-olive" v-for="(item, i) in pestsList" :key="i">
								<text class="small-text">{{ item.creationTime }}</text>
								<view class="flex justify-content-flex-justify align-items-center">
									<view class="timeline-box">
										<view style="color:#333">{{ item.farmName }} NO.{{ item.massifNo }}</view>
										<view style="color:red">{{ item.warningName }}</view>
									</view>
									<!-- <button class="cu-btn bg-green" @click="showModel(item.msg)">查看</button> -->
									<navigator class="cu-btn bg-green" :url="'WarningProcessing?item=' + encodeURIComponent(JSON.stringify(item))">查看</navigator>
								</view>
							</view>
						</view>
						<view class="loading-more" v-else><image src="../../static/imgs/No.png" mode="aspectFit" style="height: 80%;"></image></view>
					</template>
					<template v-if="WarningTabCur == 2">
						<view class="cu-timeline" v-if="timeList.length > 0">
							<view class="cu-item text-olive" v-for="(item, i) in timeList" :key="i">
								<text class="small-text">{{ item.creationTime }}</text>
								<text class="small-text">1</text>
								<view class="flex justify-content-flex-justify align-items-center">
									<view class="timeline-box">
										<view style="color:#333">{{ item.farmName }} NO.{{ item.massifNo }}</view>
										<view style="color:red">{{ item.warningName }}</view>
									</view>
									<navigator class="cu-btn bg-green" :url="'WarningProcessing?item=' + encodeURIComponent(JSON.stringify(item))">查看</navigator>
								</view>
							</view>
						</view>
						<view class="loading-more" v-else><image src="../../static/imgs/No.png" mode="aspectFit" style="height: 80%;"></image></view>
					</template>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '@/static/qqmap-wx-jssdk.min.js';
	import {
		throttle
	} from "@/utils/index.js"
	import landBlock from '@/components/landBlock.vue'
	var qqmapsdk;
	export default {
		components: {
			landBlock,
		},
		data() {
			return {
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: '',
					longitude: ''

				}],
				farmDetail: {},
				farmId: '',
				farmAddress: '',
				tabs: [{
						id: 1,
						name: '农场信息'
					}, {
						id: 2,
						name: '地块信息'
					},
					{
						id: 3,
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
						name: '农场'
					}
				],
				imgUrl: getApp().globalData.imgUrl,
				TabCur: 1,
				WarningTabCur: 1,
				newsList: [],
				page: 1,
				moreHeight: 30,
				windowHeight: 300,
				contentdown: '',
				loadingType: 0,
				triggered: false,
				_freshing: false,
				pestsList:[],
				popupShow:false,
				modelContent:'',
				imgArr:[],
				timeList: [],
				popupShow: false,
				modelContent: '',
				imgArr: [],
			};
		},
		onLoad() {		
			let _this = this
			uni.getStorage({
				key: 'farmId',
				success: function(res) {
					_this.farmId = res.data
					_this.getFarmDetail()
					_this.getData()
					_this.massifFindFarmId()
					_this.massifFindFarmPests()
				}
			})
		},
		mounted() {
			this.loadingData = throttle(this.loadingData, 2000);
		},
		methods: {
			callouttapFunc: function(e) {
				// uni.navigateTo({
				// 	url: 'nearTheEquipment?latitude='+this.latitude+'&longitude='+this.longitude+'&farmId='+this.farmId
				// })
				uni.navigateTo({
					url: 'nearTheEquipment?farmId='+this.farmId
				})
			},
			callPhone(phone) {
				if (!phone) return;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone
				});
			},
			showModel(txt) {
				this.modelContent = txt
				this.popupShow = true
			},
			closePopup() {
				this.popupShow = false
			},
			onPulling() {},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered) { //界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true;
				}
				let _this = this
				setTimeout(() => {
					this.triggered = false; //触发onRestore，并关闭刷新图标
					this._freshing = false;
					_this.initData()
				}, 1000)
			},
			onRestore() {
				this.triggered = false; // 需要重置
				this._freshing = false
			},
			onAbort() {
				this.triggered = false; //触发onRestore，并关闭刷新图标
				this._freshing = false;
			}
		},
		massifFindFarmPests() {
			// 获取农场下所有病虫害
			let obj = {
				pageNum: 1,
				pageSize: 100,
				farmId: this.farmId
			};
			this.$api.massifFindFarmPests(obj).then(res => {
				this.pestsList = res.data.data.massifs;
				if (this.pestsList.length > 0) {
					this.waningTabs[1].name = `病虫害（${this.pestsList.length}）`;
					}
				})
			},
			massifFindFarmPests(){ // 获取农场下所有病虫害
				let obj={
					pageNum:1,
					pageSize:100,
					farmId:this.farmId
				}
				this.$api.massifFindFarmPests(obj).then(res=>{
					this.pestsList=res.data.data.massifs
					if(this.pestsList.length>0){
						this.waningTabs[1].name=`病虫害（${this.pestsList.length}）`
					}
				})
			},
			getData() {//获取农场下所有地块
				let obj = {
					pageNum: this.page,
					pageSize: 10,
				}
		},
		getFarmDetail() {
			this.$api
				.selectFarmId({
					farmId: this.farmId
				})
					if (res.data.data.picture) {
						this.imgArr = res.data.data.picture.split(","); //农场图片
					} 
					this.atuoGetLocation(this.farmAddress, area)
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			warningTabSelect(e){
				this.WarningTabCur = e.currentTarget.dataset.id;
				console.log(this.WarningTabCur == 1)
			},
			atuoGetLocation(addr, area) { //根据地址获取经纬度
				let _this = this
				qqmapsdk.geocoder({
					address: addr,
					complete: res => {
						if (res.result) {
							this.latitude = res.result.location.lat
							this.longitude = res.result.location.lng
							this.covers = [{
								id: 111,
								latitude: this.latitude,
								longitude: this.longitude,
								callout: {
									content: '点击查看附近设备',
									color: '#333333',
									fontSize: 14,
									borderWidth: 1,
									borderRadius: 10,
									borderColor: '#aaaaaa',
									bgColor: '#fff',
									padding: 4,
									anchorY: -10,
									anchorX: 0,
									display: 'ALWAYS',
									textAlign: 'center'
								}
					}]
					}
					}
				});
			},
			dispose(row){// 预警处理
				uni.switchTab({
					url: '../personal/personal'
				});
			},
			editFarm(){
				uni.navigateTo({
					url: 'addMyFarm?id=' + this.farmId
				})
			}
		}
</script>

<style lang="scss" scoped>
	page,
	.workOrder {
		background: #eee;

		.list-container {
			padding: 10rpx 0;
			padding-top: 100rpx;
		}
			
		.list-containers{
			padding: 10rpx 20rpx;
			padding-top: 100rpx;
		}
	}

	

.cu-timeline {
	padding: 30rpx 0;
}

.imgs-box .cu-avatar.lg {
	width: 23%;
	height: 150rpx;
	margin-right: 6px;
}
.cu-nav .cu-items {
	height: 90rpx;
	display: inline-block;
	line-height: 90rpx;
	padding: 0 20rpx;
	white-space: nowrap;
	color: #9a9a9a;
}
.cu-navs{
	height: 90rpx;
	display: inline-block;
	line-height: 90rpx;
	padding:20rpx 30rpx 0 30rpx;
	white-space: nowrap;
	color: #9a9a9a;
}
.bg-white {
	background-color: #ffffff;
}

.color-black {
	color: #000000 !important;
}
.cu-btn {
	border-radius: 10rpx;
}
</style>
