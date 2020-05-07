<template>
	<view>
		<title-item title="基础信息"/>
		<view class="container-input">
			<form>
				<view class="cu-form-group">
					<view class="title">作物</view>
					<input class="form-input-left" placeholder="请输入作物名称" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">种植年份</view>
					<view class="disabled-txt">2020</view>
				</view>
				<view class="cu-form-group">
					<view class="title">种苗企业</view>
					<input disabled="true" class="form-input-left" placeholder="请选择种苗企业" name="input"></input>
					<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
				</view>
			</form>
		</view>
		<view class="item-border container-input">
			<title-item title="种植计划"/>
			<view class="flex flex-wrap">
				<view :class="{'btn-box':true,'btn-box-action':action==i}" @click="setAction(i)" v-for="(item,i) in 8">
					地块1
				</view>
			</view>
		</view>
		<view class="item-border container-input">
			<title-item title="种植计划"/>
			<view class="cu-form-group" @click="toPlan">
				<view class="title">种植计划</view>
				<input disabled="true" class="form-input-left" placeholder="请选择种植计划" name="input"></input>
				<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
			</view>
		</view>
		<button class="cu-btn block bg-green margin-tb-sm lg" style="margin:40px 20px 0 20px">
			新建批次</button>
	</view>
</template>

<script>
	import TitleItem from "@/components/title-item/TitleItem.vue"
	export default {
		components:{
			TitleItem
		},
		data(){
			return {
				index:'',
				action:1
			}
		},
		methods:{
			setAction(i){
				console.log(i)
				this.action=i
			},
			toPlan(){
				uni.navigateTo({
				    url: 'selectPlan'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color:#fff;
	// }
	.form-input-left{
		text-align: right;
	}
	.container-input{
		padding:0 25rpx;
		background: #fff;
	}
	.cu-form-group{
		padding:1px 0;
	}
	.disabled-txt{
		padding-right: 20rpx;
	}
	.right-jt{
		transform:rotate(180deg);
		width:16px;
	}
	.item-border{
		border-top:16rpx solid #eee;
		background: #fff;
	}
	.btn-box{
		border:1px solid #eee;
		padding:4px 8px;
		border-radius: 4px;
		margin:20rpx 30rpx 20rpx 0;
	}
	.btn-box-action{
		border:1px solid #00AE66;
		color:#00AE66;
	}
</style>
