<!-- 选择加入基地  or 创建基地 -->
<template>
	<view class="choose-land tc">
		
		
			<image src="/static/plant/pic_nodata@2x.png" class="null-img"></image>

		
		<view class="cr3 f20 "> 暂无数据</view>
		<view>只有创建或者加入基地（合作社或者个人），<br/>
			才能进行进一步的种植管理。</view>
			<button class="cu-btn block bg-green  lg">创建基地</button>
			<button class="cu-btn block   lg line-green">加入基地</button>
			


	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.tc {
		text-align: center;
	}

	.choose-land {
		background-color: #fff;
		padding: 30rpx;
		height: calc(100vh - 70rpx) ;
		overflow: hidden;
	.cu-btn{
			
			margin-top: 50rpx;
		
		}
		

		.null-img {
			height: 293rpx;
			width: 243rpx;

		}
	}
</style>
