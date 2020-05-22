<template>
	<view class="flex align-items-center title-height">
		<view class="shu-box">
		</view>
		<view class="title-txt">
			{{title}}  
		</view>
	</view>
</template>

<script>
	export default {
		props:['title'],
		name: "TileItem",
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title-txt{
		font-size: 17px;
		font-weight: bold;
		
	}
	.shu-box{
		height:20px;
		width:4px;
		background: #00AE66;
		margin-right: 20rpx;
	}
	.title-height{
		height:90rpx;
		padding: 30rpx;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
</style>
