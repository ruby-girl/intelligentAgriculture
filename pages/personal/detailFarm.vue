<!-- 农场详情 -->
<template>
	<view class="workOrder">
		<view class="top">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.id==TabCur?'text-green cur':''" v-for="(item,index) in tabs" :key="index"
					 @tap="tabSelect" :data-id="item.id">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 农场详情 -->
		<view v-show="TabCur==1">
			<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true">

				<view class="map-container">
					<map style="width:100%;height:300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
					<view class="map-top-box flex align-items-center justify-content-flex-justify">
						<view class="detail-name">
							<view><text style="font-weight: bold;font-size: 16px;">{{farmDetail.farmName}}</text></view>
							<view class="detail-small-txt">
								<image style="width: 17px;height: 20px;" src="../../static/imgs/location-2.png" mode="aspectFill"></image>
								{{farmAddress}}
							</view>
						</view>
						<view class="detail-img" @click="editFarm">
							<image src="../../static/imgs/deit.png" mode="aspectFill"></image>
							<view>
								编辑
							</view>
						</view>
					</view>
					<view class="map-bottom-box">
						<text style="font-weight: bold;font-size: 16px;">农场负责人</text>
						<view class="flex align-items-center justify-content-flex-justify">
							<view class="detail-name flex align-items-center" style="border:none;">
								<!-- <image style="width: 30px;height: 30px;" src="../../static/imgs/deit.png" mode="aspectFill"></image> -->
								<view class="cu-avatar lg round" :style="{'backgroundImage':'url('+imgUrl+farmDetail.masterPicture+')'}"></view>
								<view style="line-height:18px;margin-right: 5px;">
									<view>{{farmDetail.master}}</view>
									<view class="detail-small-txt">{{farmDetail.fphone}}</view>
								</view>
							</view>
							<view class="detail-img">
								<image @click="callPhone(farmDetail.fphone)" style="width: 30px;height: 30px;" src="../../static/imgs/phone.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view><text style="font-size: 16px;">农场介绍</text></view>
					<view class="detail-small-txt">{{farmDetail.introduce||''}}</view>
					<view class="flex align-items-center imgs-box">
						<view v-for="(item,i) in imgArr" class="cu-avatar lg" :style="{'backgroundImage':'url('+imgUrl+item+')'}"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-show="TabCur==2">
			<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true" refresher-enabled="true"
			 refresher-background="#eee" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
			 @scrolltolower="loadingData">
				<view class="list-item" v-for="(item,index) in newsList" :key="index" @tap="toUrl(item)">
					<land-block :itemObject="item" />
				</view>
				<view class="loading-more">{{contentdown}}</view>
			</scroll-view>
		</view>
		<view v-bind:style="{height:(windowHeight-20)+'px',padding:'10px 0'}" v-show="TabCur==3">
			<scroll-view v-bind:style="{height:(windowHeight-20)+'px'}" class="list-container" scroll-y="true">
				<view class="cu-timeline" v-if="timeList.length>0">
					<view class="cu-item text-olive" v-for="(item,i) in timeList" :key="i">
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
			</scroll-view>
			<popup :content='modelContent' align='center' :show='popupShow' :showCancel='false' confirmText='我知道了' @close="closePopup"/>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '@/static/qqmap-wx-jssdk.min.js';
	import {
		throttle
	} from "@/utils/index.js"
	import landBlock from '@/components/landBlock.vue'
	import popup from "@/components/neil-modal/neil-modal.vue"
	var qqmapsdk;
	export default {
		components: {
			landBlock,
			popup
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
				imgUrl: getApp().globalData.imgUrl,
				TabCur: 1,
				newsList: [],
				page: 1,
				moreHeight: 30,
				windowHeight: 300,
				contentdown: '',
				loadingType: 0,
				triggered: false,
				_freshing: false,
				timeList:[],
				popupShow:false,
				modelContent:'',
				imgArr:[]
			};
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			qqmapsdk = new QQMapWX({
				key: 'TN7BZ-YJKCP-OMTD3-LQKOM-2C5KZ-AWFUQ'
			});
			let _this=this
			uni.getStorage({
				key: 'farmId',
				success: function(res) {
					_this.farmId = res.data
					_this.getFarmDetail()
					_this.getData()
					_this.massifFindFarmId()
				}
			})
		},
		mounted() {
			this.loadingData = throttle(this.loadingData, 2000);
		},
		methods: {
			callPhone(phone){
				if(!phone) return;
				uni.makePhoneCall({			 	
				 	// 手机号
				    phoneNumber: phone
				  });
			},
			showModel(txt){
				this.modelContent=txt
				this.popupShow=true
			},
			closePopup(){
				this.popupShow=false
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
			},
			initData() {
				this.newsList = []
				this.page = 1
				this.loadingType = 1
				this.contentdown = ''
				this.getData()
			},
			scrolltoupper() {
				console.info('下拉')
			},
			loadingData(e) {
				this.lastTime = e.timeStamp
				if (this.loadingType) {
					this.page++
					this.contentdown = '加载中...'
					this.getData()
				}
			},
			massifFindFarmId(){//获取农场下所有预警
				let obj={
					pageNum:1,
					pageSize:100,
					farmId:this.farmId
				}
				this.$api.massifFindFarmId(obj).then(res=>{
					this.timeList=res.data.data.massifs
					if(this.timeList.length>0){
						this.tabs[2].name=`预警（${this.timeList.length}）`
					}
				})
			},
			getData() {//获取农场下所有地块
				let obj = {
					pageNum: this.page,
					pageSize:10,
					farmId:this.farmId
				}
				this.$api.massifSelectFarmId(obj).then(res => {
					this.newsList = this.newsList.concat(res.data.data.massifs)
					this.newsList.forEach((item,i)=>{
						if(this.newsList[i].status=='ONLINE'){
							this.newsList[i].statusTxt='在线'
						}else if(this.newsList[i].status=='OFFLINE'){
							this.newsList[i].statusTxt='离线'
						}else if(this.newsList[i].status=='UNACTIVE'){
							this.newsList[i].statusTxt='未激活'
						}else if(this.newsList[i].status=='DISABLE'){
							this.newsList[i].statusTxt='禁用'
						}
					})
					if (this.page == 1 && this.newsList.length == 0) {
						this.loadingType = 0
						this.contentdown = '暂无数据'
					} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length < 3) {
						this.contentdown = ''
						this.loadingType = 0
					} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length > 2) {
						this.contentdown = '无更多数据'
						this.loadingType = 0
					} else if (res.data.data.rowCount == this.newsList.length) {
						this.loadingType = 0
						this.contentdown = '无更多数据'
					} else {
						this.contentdown = '上拉加载更多'
						this.loadingType = 1
					}
				})
			},
			getFarmDetail() {
				this.$api.selectFarmId({
					farmId: this.farmId
				}).then(res => {
					this.farmDetail = res.data.data
					this.farmAddress = this.farmDetail.provinceName + this.farmDetail.cityName + this.farmDetail.arerName + (this.farmDetail
						.address||'')
					let area = this.farmDetail.provinceName + this.farmDetail.cityName + this.farmDetail.arerName
					this.imgArr=res.data.data.picture.split(",");//农场图片 
					this.atuoGetLocation(this.farmAddress, area)
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			atuoGetLocation(addr, area) { //根据地址获取经纬度
				let _this = this
				qqmapsdk.geocoder({
					address: addr,
					complete: res => {
						if (res.result) {
							this.latitude = res.result.location.lat
							this.longitude = res.result.location.lng
							this.covers=[{
								latitude: res.result.location.lat,
								longitude: res.result.location.lng
							}]
						} else {
							this.atuoGetLocation(area) //具体位置获取不到经纬度，用省市县地址获取
						}
					}

				});
			},
			editFarm(){
				uni.navigateTo({
					url: 'addMyFarm?id='+this.farmId
				})
			}
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

	.box-margin {
		padding-top: 10px;
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
		padding-top:20px;
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
		background: #49BA89;
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

	// 地图CSS
	.map-container {
		position: relative;
	}

	.detail-name {
		width: 75%;
		border-right: 1px solid #eee;
	}

	.detail-small-txt {
		color: #999;
		font-size: 13px;
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
		position: absolute;
		top: 0;
		width: 96%;
		background: #fff;
		padding: 10rpx 20rpx;
		left: 2%;
		border-radius: 4px;
	}

	.map-bottom-box {
		position: absolute;
		bottom: 15rpx;
		left: 2%;
		width: 96%;
		background: #fff;
		padding: 10rpx 20rpx;
		border-radius: 4px;
	}

	.farm-detail-box {
		padding: 20rpx 30rpx;
		background: #fff;

		.detail-small-txt {
			text-indent: 2em;
		}
	}
	.cu-timeline{
		padding:30rpx 0;
	}
	.imgs-box .cu-avatar.lg{
		width:23%;
		height:150rpx;
		margin-right: 6px;
	}
</style>
