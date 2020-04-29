<!-- 工單操作方法 -->
<template>
	<view class="workMethod">
		<view class="method-top">
			<label><text class="line"></text>采收</label>
			<view>机械采收，人工辅助</view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
			                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
			                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
			                   <image src="/static/timg.jpg"lazy-load="true" mode="aspectFill"></image>
			                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
			                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
			                 </scroll-view> 
		</view>
	      <view class="method-center">
			  <label><text class="line"></text>人物资料</label>
			  <view>
				  <label>
					  <image src="/static/plant/icon_artificial@2x.png" class="imgIcon"></image> 人工费用</label>
			  </view>
			  
		  </view>
		
		  
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

<style lang="scss">
	.workMethod{
      .method-center{
		  margin-top: 30rpx;
		 background-color: #fff;
		 padding: 30rpx; 
		 .imgIcon{
			 width: 40rpx;
			 height: 40rpx;
		 }
	  }
		.method-top{
			background-color: #fff;
			padding: 30rpx;
			.scroll-view_H{
				       padding: 20rpx 0;
				      height: 140rpx;
					      white-space: nowrap;
				box-sizing: content-box;
				width:calc(100vw - 60rpx);  
				    image{
					   display: inline-block;
					   width: 200rpx;
					   height: 100%;
					   margin-right: 10rpx;
					   border-radius: 3px;
					
				   }
			}
		}
		label{
			display:block;
			font-size: 34rpx;
			border-bottom: 1px solid #E1E1E1;
			padding-bottom: 16rpx;
			margin-bottom: 20rpx;
			.line{
				display: inline-block;
				width: 4px;
				height: 33rpx;
				background-color: $uni-text-color-primary;
				margin-right: 8px;
				vertical-align: text-top;
			}
		}
	}

</style>
