<!-- 地块管理 -->
<template>
	<view>

		<view class="drawMap">
			<map id="map" :longitude="longitude" :latitude="latitude" scale="10" show-location style="width: 100%; height: 100%;">
			</map>
		</view>
		<view class="draw-content">
			<view class="cark" style="left: 90rpx;"></view>
			<view class="cark cark-right"></view>
			<view style="background-color: #fff;padding: 0px 30rpx;">
				<view class="item-top display-flex ">
					<view class="left">
						<view class="cu-avatar lg round" v-bind:style="{'backgroundImage':'url('+user.headPortrait+')'}"></view>
						<view class="text-lg">{{user.name}}</view>
				
					</view>
					<view class=" display-flex justify-content-flex-justify" style="flex: 1;">
						<view>
							<view>地块总数：{{resultData.landParcelCount}}</view>
							<view>地块总面积：{{resultData.acreages}}亩</view>
						</view>
						<view class="tc">
							<navigator url="/pages/plantManage/landManage/addLand">
								<view class="tc"><text class="iconfont ">&#xe6c4;</text></view>
								<view>添加地块</view>
							</navigator>
				
						</view>
					</view>
				
				
				</view>
			</view>

			
			<view class="">
				<view class=" list-model" v-for="(item, index) in listData" :key="index">
					<view class="label display-flex justify-content-flex-justify">
						<view>
							<text class="line"></text><text style="font-size: 34rpx;">{{item.name}}</text>
						</view>
						<view>
							<navigator :url='"/pages/plantManage/landManage/addLand?landId="+item.id'>
							<text class="iconfont iconxiugaixiang" style="font-size: 30px;    vertical-align: middle;"></text><text>编辑</text>
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

			</view>

		<view>

</view>
</view>

		


		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				param: {		
					baseId: '',
					pageNo:1,
					organUserId:''

				},
				listData: [],
				item1: 0,
				user: {},
				resultData:{},
				longitude:'',
				latitude:'',
				
			}
		},
		onLoad(option) {
			let _this = this
	uni.getLocation({
	    type: 'wgs84',
	    success: function (res) {
		
			_this.latitude = res.latitude
			_this.longitude= res.longitude
	      
	    }
	});
	
			
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
			this.param.baseId = option.baseId
	       this.param.organUserId = uni.getStorageSync('organUserId');
		},
		onShow(){
		
		this.$nextTick(function(){
			  this.initList();
		})
		},
		onReady() {
		
		
		
		},
		methods: {
			initList() {
				this.$api.getLandparcelsList(this.param).then(res => {
					
					this.listData = res.data.data.data
					

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
		height: 25vh;
	}

	.draw-content {

		height: 75vh;
		position: relative;


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
			position: relative;

			top: -50rpx;

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
</style>
