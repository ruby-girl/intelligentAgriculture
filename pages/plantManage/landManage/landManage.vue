<!-- 地块管理 -->
<template>
	<view>

		<!-- <view class="drawMap">
			<map id="map" :longitude="longitude" enable-satellite="true" :polygons="polygons" :latitude="latitude" scale="12"
			 show-location style="width: 100%; height: 100%;">

			</map>
		</view> -->
		<view class="draw-content" >
			<view class="cark" style="left: 90rpx;"></view>
			<view class="cark cark-right"></view>
			<view style="padding: 0px 30rpx; margin-bottom: 10px;">
				<view class="item-top display-flex ">
					<view class="left">
						<view class="cu-avatar lg round" v-bind:style="{'backgroundImage':'url('+user.headPortrait+')'}"></view>
						<view class="text-lg " style="font-size: 13px;">{{user.name}}</view>

					</view>
					<view class=" display-flex justify-content-flex-justify" style="flex: 1;">
						<view>
							<view>地块总数：{{resultData.landCount}}</view>
							<view>地块总面积：{{resultData.acreages}}亩</view>
						</view>
						<view class="tc">
							<navigator url="/pages/plantManage/landManage/addLand" hover-class="none">
								<view class="tc"><text class="iconfont ">&#xe6c4;</text></view>
								<view>添加地块</view>
							</navigator>

						</view>
					</view>


				</view>
			</view>

			<view class="">
				<scroll-view v-bind:style="{height:windowHeight-85+'px'}"  scroll-y="true"
				 refresher-enabled="true"
				   @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
				  @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
				  @scrolltolower="loadingData">
				
				<view class=" list-model" v-for="(item, index) in listData" :key="index">
					<view class="label display-flex justify-content-flex-justify">
						<view>
							<text class="line"></text><text style="font-size: 34rpx;">{{item.name}}</text>
						</view>
						<view>
							<navigator :url='"/pages/plantManage/landManage/addLand?landId="+item.id'>
								<text class="iconfont " style="font-size: 30px;    vertical-align: middle;">&#xe615;</text><text>编辑</text>
							</navigator>
						</view>

					</view>
					<view class="content">

						<view><text class="cr3 mr10">地块面积
							</text>{{item.acreage || '-'}}</view>
						<view><text class="cr3 mr10">
								种植品种 </text>{{item.breedName || '-'}}</view>
						<view><text class="cr3 mr10"> 当前批次
							</text>{{item.plantingBatchName || '-'}}</view>

					</view>
				</view>
				<view class="loading-more">{{contentdown}}</view>
</scroll-view>
			</view>

			<view>

			</view>
		</view>

	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	export default {
		data() {
			return {
				params: {
					baseId: '',
					pageNo: 1,
					organUserId: ''

				},
				listData: [],
				item1: 0,
				user: {},
				resultData: {
					acreages: '',
					landCount: ''
				},
				longitude: '',
				latitude: '',
				polygons: [],
				windowHeight: 300,
				contentdown: '',
				loadingType: 0,
				triggered: false,
				_freshing: false

			}
		},
		onLoad(option) {
			let _this = this
				this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			// uni.getLocation({
			// 	type: 'gcj02',
			// 	success: function(res) {

			// 		_this.latitude = res.latitude
			// 		_this.longitude = res.longitude

			// 	}
			// });


			uni.getStorage({
				key: 'ddwb',
				success: function(res) {
					_this.user = {
						name: res.data.name || '',
						phone: res.data.phone || '',
						headPortrait: res.data.headPortrait
					}

				}
			});
			this.params.baseId = option.baseId || uni.getStorageSync('baseId')
			this.params.organUserId = uni.getStorageSync('organUserId');
			this.resultData.acreages = option.acreages
			this.resultData.landCount = option.landCount
		},
		mounted() {
			this.loadingData = throttle(this.loadingData, 2000);
		},
		onShow() {
			
			this.listData = [];
			this.polygons = [];
			
			this.$nextTick(function() {
				this.initList();
			})
		},
		onReady() {



		},
		methods: {	onPulling() {},
			onRefresh() {
			
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered){//界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true;
				}
				let _this=this
				setTimeout(() => {
					this.triggered = false; //触发onRestore，并关闭刷新图标
					this._freshing = false;
					_this.params.pageNo=1
					_this.loadingType=1
					_this.listData=[]
					_this.contentdown=''
					_this.initList()		
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
			scrolltoupper() {
				console.info('下拉')
			},
			loadingData(e) {
             
				if (this.loadingType) {
	
					this.params.pageNo++
					this.contentdown = '加载中...'
					this.initList()
				}
				
			},
			initList() {
				let _this =  this;
				this.$api.getLandparcelsList(this.params).then(res => {
					this.listData = this.listData.concat(res.data.data.data)
					if(this.params.pageNo==1&&this.listData.length==0){
						this.loadingType = 0
						this.contentdown = '暂无数据'
					}else if(res.data.data.rowCount == this.listData.length&&this.params.pageNo==1&&this.listData.length<3){
						this.contentdown = ''
						this.loadingType = 0
					}else if(res.data.data.rowCount == this.listData.length&&this.params.pageNo==1&&this.listData.length>2){
						this.contentdown = '无更多数据'
						this.loadingType = 0
					}
					else if (res.data.data.rowCount == this.listData.length) {
						this.loadingType = 0
						this.contentdown = '无更多数据'
					} else {
						this.contentdown = '上拉加载更多'
						this.loadingType = 1
					}
					
					let mapdata = res.data.data.data
					let arr = []
					 let reg=new RegExp('path','g')
					mapdata.forEach((a,b)=>{
					
						a.mapAddr = a.mapAddr.replace(/path/g,'points')
					
						a.mapAddr = a.mapAddr.replace(/lng/g,'longitude')
						a.mapAddr  = a.mapAddr.replace(/lat/g,'latitude')
				
						this.polygons.push(JSON.parse(a.mapAddr))
					
					})
				


				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.tc {
		text-align: center;
	}

	.drawMap {
		width: 100vw;
		height: 30vh;
	
	}

	.draw-content {
		height: 100vh;
		position: relative;

		.cu-avatar {
			width: 60rpx;
			height: 60rpx;
		}

		.iconfont {
			display: inline-block;
			color: #00AE66;
			font-size: 40rpx;
			line-height: normal;


		}

		.cark {
			width: 6px;
			height: 17px;
			background-color: #f1f0f0;
			position: absolute;
			top: -70rpx;
			z-index: 2;
			border-radius: 6px;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

		}

		.cark-right {

			right: 90rpx;
		}

		.item-top {

			padding: 20rpx 30rpx;
			background-color: #fff;
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
			border-radius: 6px;
			margin-top: 30rpx;
			.left {
				border-right: 1px solid #dcdcdc;
				padding-right: 30rpx;
				margin-right: 30rpx;
			}

			image {
				width: 80rpx;
				height: 80rpx;
			}
		}

		.list-model {
			background: #fff;
			padding: 30rpx;
			margin-bottom: 10px;

			.mr10 {
				margin-right: 10px;
			}

			.label {
				border-bottom: 1px solid #E1E1E1;
				padding-bottom: 16rpx;
				margin-bottom: 20rpx;

				.line {
					display: inline-block;
					width: 4px;
					height: 33rpx;
					background-color: $uni-text-color-primary;
					margin-right: 8px;
					vertical-align: text-top;
				}
			}

		}

	}
	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 10px;
	}
</style>
