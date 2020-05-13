<!-- 地块管理 -->
<template>
	<view>

		<view class="drawMap">
			<!-- <map id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location style="width: 100%; height: 100%;">
			</map> -->
		</view>
		<view class="draw-content">
			<view class="cark" style="    left: 90rpx;"></view>
			<view class="cark cark-right"></view>
			<view class="item-top display-flex ">
				<view class="left">
					<view class="cu-avatar lg round" v-bind:style="{'backgroundImage':'url('+user.headPortrait+')'}"></view>
					<view class="text-lg">{{user.phone}}</view>
					
				</view>
				<view class=" display-flex justify-content-flex-justify" style="flex: 1;">
					<view>
						<view>地块总数：{{listData.length}}</view>
						<view>地块总面积：{{item1}}亩</view>
					</view>
					<view class="tc">
						<navigator url="/pages/plantManage/landManage/addLand">
							<view class="tc"><text class="iconfont ">&#xe6c4;</text></view>
							<view >添加地块</view>
						</navigator>
					
					</view>
				</view>
				

			</view>
			<view class="list-model">
				<label class="title">所有地块</label>
					<view >
				
					
							<view v-for="(item, index) in listData" :key="index" class="item-view">
				
								<view class="item-title">？</view>
								<view style="padding: 10px 0;">
									<view class="inline content">
										<view class="f20">
											{{item.name}}
										</view>
										<view class="cr2 f12">地块名称</view>
									</view>
									<view class="inline line"></view>
									<view class="inline content">
										<view class="f20">
											{{item.acreage}}
										</view>
										<view class="cr2 f12">地块面积</view>
									</view>
				
									<view class="inline line"></view>
									<view class="inline content">
										<view class="f20">
											？
										</view>
										<view class="cr2 f12">品种</view>
									</view>
				
								</view>
				
						
						</view>
				
					</view>
				
				
			</view>
			</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				param: {
					name: '',
					statusing: '',
					baseId: '',
					pageNo: 1
				},
				listData: [],
				item1:0,
				user:{}
			}
		},
		onLoad(option) {
			let _this= this
		uni.getStorage({
		key: 'ddwb',
		success: function (res) { 
			_this.user= {			
				name: res.data.name || '',
				phone:res.data.phone||'',
				headPortrait:res.data.headPortrait
			}
		}
		});
			this.param.baseId = option.baseId
			this.initList();
		},
		onReady() {

		},
		methods: {
			initList() {
				this.$api.getLandparcelsList(this.param).then(res => {
							this.listData = res.data.data.data
					    let acreage = this.listData.filter(item => {
					          return item.acreage;
					        });
							 this.item1 = 0;
							        acreage.forEach(element => {
							          this.item1 += parseFloat(element.acreage);
							        });
							        if (this.item1) {
							          this.item1 = this.item1.toFixed(3);
							        }
			
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.tc{
		text-align: center;
	}
	.drawMap {
		width: 100vw;
		height: 25vh;
	}

	.draw-content {

		height: 75vh;

		box-sizing: content-box;

		box-sizing: content-box;
		background-color: #fff;
		position: relative;
		padding: 0px 30rpx;
  .iconfont{
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
		.list-model{
			.inline {
				display: inline-block;
				text-align: center;
			}
			
			.content {
				width: 32%;
				line-height: 25px;
			}
			
			.line {
				width: 2px;
				height: 35px;
				background-color: #D1D1D1;
			}
			.item-view {
				box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
				margin-bottom: 20px;
				border-radius: 6px;
			}
			.item-title {
				padding: 6px 16px;
				background-color: #EEFEF0;
			}
		}

	}
</style>
