<template>
	<view>

<view class="drawMap">
	<!-- <map id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location style="width: 100%; height: 100%;">
	</map> -->
</view>
<view class="draw-content">
	<view class="tr">
		<button class="cu-btn     line-green">清空</button>
		
				<button class="cu-btn     line-green" style="margin: 0px 10px;">撤销</button>
		<button class="cu-btn  bg-green  ">开始圈地</button>		
	</view>
	<view class="gutter-blank"></view>
	<view style="padding: 30rpx; box-sizing: content-box;">
		<text class="f20">填写基地信息</text>
		<view class="cu-form-group ">
			<view class="title">
                                基地名称    
                            </view>
			<input placeholder="
                                基地名称    
                            " name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">
                                基地面积    
                            </view>
			<input placeholder="
                                基地面积    
                            " name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">
                                基地面积    
                            </view>
							<picker mode="multiSelector" :value="multiIndex" :range="multiArray">
								<view class="picker">
									{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
								</view>
							</picker>
			
		</view>
		<button class="cu-btn  bg-green    lg block">	添加地块</button>
		
	</view>

	
</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

				latitude: "24.47951",
				longitude: "118.08948",
					multiIndex: [0, 0, 0],
 multiArray: [
 	['无脊柱动物', '脊柱动物'],
 	['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
 	['猪肉绦虫', '吸血虫']
 ],
			}
		},

		methods: {
			
  bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.target.value)
            this.index = e.target.value
        },
		}
	}
</script>

<style lang="scss" scoped>
	.drawMap{
		width: 100vw;
		height: 45vh;
	}
	.draw-content{
		width: 100vw;
	height: 50vh;
		box-sizing: content-box;
		
		box-sizing: content-box;
		background-color: #fff;
		.tr{
			padding: 20rpx;
			text-align: right;
		}
		.gutter-blank{
			width: 100vw;
			height: 20rpx;
			background-color: #F2F2F2;
		}
	}
</style>
