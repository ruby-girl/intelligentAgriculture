<template>
	<view>
		<view class="cu-form-group" style="position: relative;">
			<view class="title">设备序列号</view>
			<input placeholder="输入设备名称" v-model="obj.SN" name="input"></input>
			<image class="code-img" src="../../static/imgs/qr-code.png" mode=""></image>
		</view>
		<view class="cu-form-group">
			<view class="title">设备名称</view>
			<input placeholder="输入设备名称" v-model="obj.deviceName"  name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关联地块</view>
			<picker @change="pickerChange($event)" :value="optionValue" :range="massifsList" range-key="name">
				<view class="uni-input">{{massifsList[optionValue].massifName}}</view>
			</picker>
		</view>
		<view class="bottom-lg-btn" @click="toAdd">添加设备</view>
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
				obj:{
					deviceName:'',
					massifId:'',
					SN:'',
					deviceId:''
				},
				massifsList:[]
			}
		},
		onLoad(option) {
			if(option.deviceId){
				this.obj.deviceId=option.deviceId
			}
			this.selectMassif()
		},
		methods: {
			selectMassif(){//获取未绑定地块的设备
				this.$api.selectMassif({pageNum:1,pageSize:100}).then(res=>{
					this.massifsList=res.data.data.massifs
				})
			},
			pickerChange(e) {
				this.optionValue = e.target.value
				// let arr = this.breedList.filter((item, i) => {
				// 	return i == e.target.value
				// })
				// this.postData.breedId = arr[0].id
			},
			toAdd(){
				if(!this.obj.deviceName){
					uni.showToast({
					    title: '请输入设备名称',
						icon:'none'		
					})
					return
				}
				if(!this.obj.SN){
					uni.showToast({
					    title: '请输入设备序列号',
						icon:'none'		
					})
					return
				}
				this.$api.insertDevice(this.obj).then(res=>{
					if(this.obj.deviceId){
						uni.showToast({
							title: '编辑成功',
							duration: 2000,
							success() {
								 let pages = getCurrentPages(); // 当前页面
								 let beforePage = pages[pages.length - 2]; // 前一个页面
								uni.navigateBack({
								     success: function() {
								         beforePage.onLoad(); // 执行前一个页面的onLoad方法
								     }
								 });
							}
						});
					}else{
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							success() {
								let pages = getCurrentPages(); // 当前页面
								 let beforePage = pages[pages.length - 2]; // 前一个页面
								uni.navigateBack({
								     success: function() {
								         beforePage.onLoad(); // 执行前一个页面的onLoad方法
								     }
								 });
							}
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	.code-img {
		position: absolute;
		right: 20px;
		bottom: rpx;
		width: 35rpx;
		height: 35rpx;
	}
	.cu-form-group picker::after{
		line-height: 50rpx;
	}
	.uni-input{
		line-height: 18rpx;
		padding-left: 0;
	}
	.title{
		width:180rpx;
	}
	.bottom-lg-btn{
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width:80%;
		margin:40rpx auto;
		text-align: center;
		color:#fff;
	}
</style>
