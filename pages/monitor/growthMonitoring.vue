<!-- 生长监测 -->
<template>
	<view class="workOrder">
		<view>
			<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true" @scroll="scroll">
				<view class="map-container">
				<video custom-cache="false" autoplay="true" controls style="width:100%;height: 600rpx;" :poster='obj.liveCoverUrl' src="http://pili-live-hls.tree-iot.com/zhslive/0018DE743E31C1.m3u8">
				</video>
					
					<view class="map-top-box flex align-items-center justify-content-flex-justify">		
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.surplus}}</view>
							<view class="small-text">剩余时间(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.already}}</view>
							<view class="small-text">已成长(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.creationTime}}</view>
							<view class="small-text">种植日期</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.proportion||'-'}}%</view>
							<view class="small-text">种植进度</view>
						</view>
					</view>
					<!-- <view  class="play-box">
						<image src="../../static/imgs/play.png" mode=""></image>
					</view> -->
					<view class="map-bottom-box">					
						<view class="list-item">
							<view class="flex  align-items-center justify-content-flex-justify">
								<view class="flex  align-items-center">
									<image class="land-img" src="../../static/imgs/location.png" mode=""></image>
									<view class="item-title">
										<view class="order-title">{{obj.massifNo}}</view>
										<view class="order-title small-text">{{obj.farmName}}</view>
									</view>
								</view>
								<view class="state-box" v-if="obj.statusTxt=='在线'">
									{{obj.statusTxt||''}}
								</view>
								<view class="state-box-error" v-else>
									{{obj.statusTxt||''}}
								</view>
							</view>
							<view class="box-margin flex justify-content-flex-justify align-items-center">
								<view class="item-content-box">
									<view class="item-num">
										{{obj.proportion||'-'}}<span class="small-txt">%</span>
									</view>
									<text class="small-text">冬瓜</text>
								</view>
								<view class="item-content-box">
									<view class="item-num">
										{{obj.temperature||'-'}}<span class="small-txt">℃</span>
									</view>
									<text class="small-text">空气温度</text>
								</view>
								<view class="item-content-box">
									<view class="item-num">
										{{obj.humidity||'-'}}<span class="small-txt">%</span>
									</view>
									<text class="small-text">空气湿度</text>
								</view>
							</view>
							<view class="box-margin flex justify-content-flex-justify align-items-center">
								<view class="item-content-box">
									<view class="item-num">
										{{obj.care||'-'}}<span class="small-txt">LX</span>
									</view>
									<text class="small-text">光照强度</text>
								</view>
								<view class="item-content-box">
									<view class="item-num">
										{{obj.soilTemperature||'-'}}<span class="small-txt">℃</span>
									</view>
									<text class="small-text">土壤温度</text>
								</view>
								<view class="item-content-box">
									<view class="item-num">
										{{obj.soliMoistrue||'-'}}<span class="small-txt">%</span>
									</view>
									<text class="small-text">土壤水分</text>
								</view>
							</view>
						   <view class="flex">
							   <view class="map-bottom-tip">
								   <image src="../../static/imgs/like.png" mode="aspectFill"></image>
								   <text>20人点赞</text>
							   </view>
							   <view class="map-bottom-tip">
							   	  <image src="../../static/imgs/code.png" mode="aspectFill"></image>
							   	  <text>分享二维码</text>		   
							   </view>
						   </view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view><text style="font-size: 16px;">数据监测</text></view>
					<view style="font-size: 14px;padding-bottom:10rpx;">
						<text style="font-weight: bold;width:50%;text-align:left;display: inline-block;">空气温度变化记录</text>
						<text class="item-num" style="width:50%;text-align: right;display: inline-block;color:#999;font-size:13px">最近7日数据</text>
					</view>				
					<view class="">
						<line-chart :width="cWidth*2" :height="cHeight*2" :style="{'width':cWidth+'px','height':cHeight+'px'}" ref="line" :opts="option" chartType="line" option/>
					</view>
				</view>		   
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import LineChart from '@/components/u-charts/u-charts/component.vue';
	import {formatDate} from "@/utils/index.js" 
	export default {
		components: {		
			LineChart		
		},
		data() {
			return {
				option:{
					
						//数字的图--折线图数据
						categories: ['2020/6/13', '2020/6/14', '2020/6/15', '2020/6/16', '2020/6/17', '2020/6/18','2020/6/19'],
						series: [
							{ name: '', data: [35, 8, 25, 37, 4, 20,18]}
						]
					
				},
				baseId: '',
				obj: {},
				windowHeight: 300,
				imgUrl:require('../../static/imgs/location.png'),//冬瓜图片
				massifId:'',
				scrollTop:0,
				cWidth:'',
				cHeight:''
			};
		},
		onShareAppMessage: function () {	
		    return {
		        title: '快来看看我的地块生长情况吧！',
		        desc: '分享页面的内容',
		        path: 'pages/monitor/growthMonitoring?massifId='+this.massifId // 路径，传递参数到指定页面。
		    }	
		},
		onShow(){
			
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			this.massifId=option.massifId
			this.getData()
			this.findRangeData()
			this.cWidth=uni.upx2px(750);
						this.cHeight=uni.upx2px(500);
		},
		mounted() {
		},
		methods: {
			scroll: function(e) {
								this.scrollTop = e.detail.scrollTop
						},
			getData() {//获取检测详情
				this.$api.massifMonitor({massifId:this.massifId}).then(res => {
					this.obj =res.data.data
					let arr=this.obj.creationTime.split(' ')
					let YMD=arr[0]
					let MD=YMD.split('-')
					this.obj.creationTime=MD[1]+'-'+MD[2]
					if(this.obj.status=='ONLINE'){
						this.obj.statusTxt='在线'
					}else if(this.obj.status=='OFFLINE'){
						this.obj.statusTxt='离线'
					}else if(this.obj.status=='UNACTIVE'){
						this.obj.statusTxt='未激活'
					}else if(this.obj.status=='DISABLE'){
						this.obj.statusTxt='禁用'
					}
				})
			},
			findRangeData(){
				this.$api.findRangeData({massifId:this.massifId}).then(res=>{
					
				})
			}
		}
	}
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

	.box-margin {
		padding-top: 5px;
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
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
	.state-box-error{
		position: relative;
		padding:3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right:-20rpx;
		background: #FDB523;
		color:#fff;
	}
	.item-content-box {
		width: 30%;
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
		height:600rpx;
	}
	.detail-name{
		width:75%;
		border-right:1px solid #eee;
	}
	.small-txt{
		font-size: 12px;
	}
	.detail-img{
		width:25%;
		text-align: center;
	}
	.detail-img image,.detail-name image{
		width:30rpx;
		height:30rpx;
	}
	.detail-box{
		padding:20rpx;
		background: #fff;
		border-radius: 6px;
	}
	.color-grey{
		color:#999;
	}
	.font-size-16{
		font-size: 15px;
	}
    .map-top-box{
		position: absolute;
		top:10rpx;
		width:96%;
		background: #fff;
		padding:10rpx 20rpx;
		left:2%;
		border-radius: 4px;
	}
	 .map-bottom-box{
		position: absolute;
		bottom:-420rpx;
		left:2%;
		width:96%;
		background: #fff;
		padding:10rpx 20rpx;
		border-radius: 4px;
		image {
				width: 28px;
				height: 28px;
				margin-right: 20rpx;
				position: relative;
				top: 3px;
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
		.small-text{
			color:#999999;
			font-size: 13px;
		}
		.list-item{
			background: #fff;
			border-radius: 8px;
			margin-bottom: 20rpx;
		}
		.state-box {
			position: relative;
			padding:3px 6px;
			border-top-left-radius: 15px;
			border-bottom-left-radius: 15px;
			right:-20rpx;
			background: #49BA89;
			color:#fff;
		}
		.item-content-box{
			width:30%;
			text-align: center;
			.item-num{
				font-size: 18px;
				font-weight: bold;
			}
		}
	}
	.farm-detail-box{
		padding: 20rpx 30rpx;
		background: #fff;
		border-top: 440rpx solid #F5F5F5;
	}
	.map-bottom-tip{
		width:50%;
		text-align: center;
		margin-top:5rpx;
		color:#999;
		image{
			width: 31rpx;
			height: 27rpx;
		}
	}
	.map-top-item{
		width:25%;
		text-align: center;
	}
	.play-box{
		width:100%;
		text-align: right;
		padding:500rpx 20rpx 10rpx 0;
		image{
			width:88rpx;
			height:68rpx;
		}
	}
</style>
