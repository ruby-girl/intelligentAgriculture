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
				  <view>
					  <image src="/static/plant/icon_artificial@2x.png" class="imgIcon"></image>人工费用</view>
			    <view>
					<view><text class="cr2">人工（亩）：</text> sss</view>
					<view><text class="cr2">
                                工价（元）：
                            </text> sss</view>
					<view><text class="cr2">
                                总面积（亩）：
                            </text> sss</view>
					<view><text class="cr2">
                                总人工（人）：
                            </text> sss</view>
							<view><text class="cr2">
                                总费用（元）： 
                            </text> sss</view>
				</view>
			  </view>
			  
		  </view>
		  		<navigator :url="'/pages/plantManage/addFram?id='+id">	
		  <button class="cu-btn block bg-green  lg">立即执行</button>
		  </navigator>
	</view>
</template>

<script>    
	export default {
		data() {
			return {
				id:''
			};
		},
		onLoad(option) {
			debugger
			this.id =  option.id
		},
		methods:{
			
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
			 height: 45rpx;
			 vertical-align: middle;
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
		.cu-btn{
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;
		}
	}

</style>
