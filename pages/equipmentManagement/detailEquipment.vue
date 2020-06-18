<template>
	<view class="detail-container">
		<view class="detail-box">
			<view class="flex align-items-center justify-content-flex-justify">
				<view class="detail-name">
					<view><text style="font-weight: bold;font-size: 17px;">SN:{{obj.sn||''}}</text><text style="font-size: 13px;">{{obj.deviceName||''}}</text></view>
					<view class="detail-small-txt"><text>经度：{{obj.longitude||''}}</text><text>纬度：{{obj.latitude||''}}</text></view>
				</view>
				<view class="detail-img"  @click="toAdd">
					<image src="../../static/imgs/deit.png" mode="aspectFill"></image>
					<view>
						编辑
					</view>
				</view>
			</view>
			<view class="detail-bottom-box">
				<view class="flex align-items-center justify-content-flex-justify">
					<view class="font-size-16 width-item">
						<text class="color-grey">所属农场：</text><text>{{obj.farmName||''}}</text>
					</view>
					<view class="font-size-16 width-item"  style="padding-left:30rpx">
						<text class="color-grey">设备状态：</text><text :style="{'color':obj.statusTxt!=='在线'?'red':''}">{{obj.statusTxt||''}}</text>
					</view>
				</view>
				<view class="flex align-items-center justify-content-flex-justify">
					<view class="font-size-16 width-item">
						<text class="color-grey">版本信息：</text><text>{{obj.firmwareVersion}}</text>
					</view>
					<view class="font-size-16 width-item"  style="padding-left:30rpx">
						<text class="color-grey">设备电量：</text><text>{{obj.batteryLevel||''}}%</text>
					</view>
				</view>
			</view>
			<view class="color-grey" style="text-align: center;">数据更新于{{obj.newest||''}}</view>
		</view>
		<view class="bottom-lg-btn">删除设备</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: 'option1',
					id: 1
				}, {
					name: 'option2',
					id: 2
				}],
				optionValue: 0,
				deviceId:'',
				obj:{}
			}
		},
		onLoad(option) {
			this.deviceId=option.deviceId
			this.selectDevice()
		},
		methods: {
			toAdd(){//跳转编辑
				uni.navigateTo({
					url: 'addEquipment?deviceId='+this.deviceId
				})
			},
			selectDevice(){
				this.$api.selectDevice({deviceId:this.deviceId}).then(res=>{
					this.obj=res.data.data
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
			}
		}
	}
</script>

<style scoped>
	.detail-container{
		padding: 20rpx;
	}
	.bottom-lg-btn{
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width:80%;
		margin:50rpx auto;
		text-align: center;
		color:#fff;
	}
	.detail-name{
		width:75%;
		border-right:1px solid #eee;
	}
	.detail-small-txt{
		color:#999;
		font-size: 13px;
	}
	.detail-img{
		width:25%;
		text-align: center;
	}
	.detail-img image{
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
	.detail-bottom-box{
		padding:40rpx;
		margin-top:20rpx;
		border-top:1px solid #eee;
	}
	.width-item{
		width:49%;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
