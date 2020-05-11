<template>
	<view class="container">
		<scroll-view class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="item.value==TabCur?'text-orange cur':''" v-for="(item,index) in tab" :key="index"
				 @tap="tabSelect" :data-id="item.value">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		
		<scroll-view v-bind:style="{height:(windowHeight-50)+'px'}" class="scroll-container" scroll-y="true"  :refresher-triggered="triggered"
		            :refresher-threshold="100" @scrolltoupper="scrolltoupper"  @scrolltolower="loadingData"
		           >
					<view class="list-item" v-for="item in newsList" :key="item">				
						<view class="flex align-items-center">
							<img src="@/static/plant/icon_plant@2x.png" alt="">
							<view>作物：川麦冬</view>
						</view>
						<view class="flex align-items-center">
							<img src="@/static/plant/icon_plan@2x.png" alt="">
							<view>种植计划：川麦冬计划</view>
						</view>
						<view class="flex align-items-center">
							<img src="@/static/plant/icon_date@2x.png" alt="">
							<view>种植年份：2020</view>
						</view>
						<view class="flex align-items-center">
							<img src="@/static/plant/icon_land@2x.png" alt="">
							<view>地块数量：3</view>
						</view>
						<view class="flex align-items-center">
							<img src="@/static/plant/icon_area@2x.png" alt="">
							<view>地块面积：3亩</view>
						</view>
					</view>
					
					</scroll-view>
					<view>{{contentText.contentdown}}</view>
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" @click="toadd">
			新建批次</button>
	</view>
</template>

<script>
	var _self,
		page = 1,
		timer = null;
	export default {
		data() {
			return {
				TabCur: 1,
				scrollLeft: 0,
				tab: [{
					name: '进行中',
					value: '1'
				}, {
					name: '已结束',
					value: '2'
				}, {
					name: '全部',
					value: '3'
				}],
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				newsList: 4,
				loadingText: '加载中...',
				loadingType: 0,
				triggered: false,
				lastTime:0,
				windowHeight:300
			}
		},
		onLoad: function() {
			_self = this;
			 this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			 console.log('gaodu ',windowHeight)
			//页面一加载时请求一次数据
			// this.getData();
		},
		methods: {
			scrolltoupper(){
				console.info('下拉')
			},
			loadingData(e){			
				if(e.timeStamp-this.lastTime>5000){
					console.log('触底了',e)
					this.lastTime=e.timeStamp
					let _self=this
					setTimeout(function(){
						_self.newsList =8;
					},2000)
				}else{
					console.log('重复 了',e)
					return
				}
				
			},
			toadd(){
				uni.navigateTo({
					url: 'addBatch'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container,page {
		height: 100vh;
		background: #fff !important;

		.list-container {
			padding: 10rpx 30rpx;
		}

		.positon-btn {
			position: fixed;
			bottom: 20rpx;
			z-index: 111;
			width: 93%;
			left: 25rpx;
		}
	}
	.scroll-container{
		padding-bottom: 60px;
	}
	.list-item {
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		background: #fff;
		padding: 30rpx;
		margin-bottom: 30rpx;

		img {
			width: 18px;
			height:18px;
			margin-right: 20rpx;
		}
	}
</style>
