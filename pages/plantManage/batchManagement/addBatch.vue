<template>
	<view>
		<title-item title="基础信息"/>
		<view class="container-input">
			<form>
				<view class="cu-form-group breed-select">
					<view class="title">作物</view>
					<picker @change="pickerChange($event)" :value="breed" :range="breedList" range-key="name">
						<view class="uni-input">{{breedList[breed].name}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">种植年份</view>
					<!-- <view class="disabled-txt">2020</view> -->
					<picker mode="date" :value="date" fields="year" start="2015" end="2030" @change="DateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">种苗企业</view>
					<input disabled="true" class="form-input-left" placeholder="请选择种苗企业" name="input"></input>
					<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
				</view>
			</form>
		</view>
		<view class="item-border">
			<title-item title="地块"/>
			<view class="flex flex-wrap container-input">
				<view v-bind:class="{'btn-box':true,'btn-box-action':item.isChecked}" @click="setAction(i)" :key="i" v-for="(item,i) in landList">
					{{item.name}}{{item.isChecked}}
				</view>
			</view>
		</view>
		<view class="item-border">
			<title-item title="种植计划"/>
			<view class="cu-form-group container-input" @click="toPlan">
				<view class="title">种植计划</view>
				<input disabled="true" v-model="planName" class="form-input-left" placeholder="请选择种植计划" name="input"></input>
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
				action:1,
				date:'2020',
				landList:[],
				obj:{
					baseId:'',
					userId:'',
					organUserId:''
				},
				landId:'',//选择的地块ID
				landIdArr:[],
				breedList:[],//作物列表
				breed:'0',//作物值
				planName:'',
				planId:'',
				postData:{
					baseId:'',
					userId:'',
					breed:'1',//作物值
					plantingTime:'2020',//种植时间
					landParcelIds:'',//地块
					plantingPlan:''//种植计划
				}
			}
		},
		onLoad(option){
			let _this=this
			uni.getStorage({
				key: 'baseId',
				success: function(res) {
					_this.obj.baseId = res.data
					_this.obj.userId=1//这里实际传的organUserId，应该从本地获取
					_this.postData.baseId = res.data
					_this.postData.userId=1//这里实际传的organUserId,应该从本地获取
					_this.getByUserIdAndBaseId()
				}
			});
			// 获取作物
			this.$apiYZX.getBreedsAll().then(res=>{
				this.breedList=res.data.data
				
					//选择计划后回显数据
				    this.planName=option.planName
					this.planId=option.planId
					this.date=option.plantingTime
					this.landId=option.landId
					let breed=option.breed
					let index = this.breedList.findIndex((item, i) => {
						return item.id == breed
					})
					if(index==-1) index=0
					this.breed=index
			})
		},
		methods:{
			getByUserIdAndBaseId(){//获取用户地块
				this.$apiYZX.getByUserIdAndBaseId(this.obj).then(res=>{
					res.data.data.forEach((item,i)=>{
						res.data.data[i].isChecked=false
					})		
					this.landList=res.data.data
				})
			},
		
			setAction(i){
				// this.landList=[{name:'123213',id:123}]
				// this.landList.map((item,i)=>{
				// 	return this.landList[i].isChecked='false'
				// })
				this.landList[i].isChecked=!this.landList[i].isChecked
			},
			test(){
				
			},
			toPlan(){		
				uni.navigateTo({
				    url: 'selectPlan?breed='+this.postData.breed+'&plantingTime='+this.date+'&landId='+this.landId+'&planName='+
					this.planName+'&planId='+this.planId
				});
			},
			DateChange(e) {
				this.date = e.detail.value			
				this.postData.plantingTime=e.detail.value
			},
			pickerChange(e){
				this.breed = e.target.value
				let arr=this.breedList.filter((item,i)=>{
					return i==e.target.value
				})
				this.postData.breed=arr[0].id
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
		padding:0 25rpx !important;
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
	.breed-select picker::after {
		 top: -10px;
	}
	.breed-select picker .picker {
		text-align: right;
	}
	.breed-select picker  .uni-input
	 {
		height: 30px;
		padding-right: 0;
		line-height: 20px;
		text-align: right;
	}
</style>
