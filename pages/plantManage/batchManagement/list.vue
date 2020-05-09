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
		<scroll-view scroll-y="true" class="list-container" style="height:1040rpx;">
			<view class="list-item" v-for="item in 4" :key="item">

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
				newsList: [],
				loadingText: '加载中...',
				loadingType: 0,

			}
		},
		onLoad: function() {
			_self = this;
			//页面一加载时请求一次数据
			this.getData();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			console.log('触底了~~~~~~~~~~~~~~~')
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_self.getData();
			}, 1000);
		},
		methods: {
			toadd(){
				uni.navigateTo({
					url: 'addBatch'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getData() {
				if (_self.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				_self.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				// uni.request({
				// 	url: 'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=' + page,
				// 	method: 'GET',
				// 	success: function(res) {
						
						// if (res.data == null) { //没有数据
						// 	_self.loadingType = 2;
						// 	uni.hideNavigationBarLoading(); //关闭加载动画
						// 	return;
						// }
						page++; //每触底一次 page +1
						let data=[{name:'183',id:123}]
						_self.newsList = _self.newsList.concat(data); //将数据拼接在一起
						_self.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
				// 	}
				// });
			},
			getnewsList: function() { //第一次回去数据
				page = 1;
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				// uni.request({
				// 	url: 'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=1',
				// 	method: 'GET',
				// 	success: function(res) {
						page++; //得到数据之后page+1
						_self.newsList = [{name:'123',id:123}];
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
					// }
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container,page {
		height: 100%;
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
