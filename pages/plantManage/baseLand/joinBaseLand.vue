<!-- 基地列表 -->
<template>
	<view class="baseLand-list">
 <view class="cu-bar search solid-bottom">
 	<view class="search-form radius">
 		<text class="cuIcon-search"></text>
 		<input @blur="InputBlur"  :adjust-position="false" type="text" placeholder="请输入基地名称(至少三个字)"
 		 confirm-type="search"></input>
 	</view>
 </view>
		<scroll-view v-bind:style="{height:(windowHeight)+'px'}" class="list-container" scroll-y="true"
		 :refresher-triggered="triggered" refresher-enabled="true" :refresher-threshold="100" @scrolltoupper="scrolltoupper" @scrolltolower="loadingData">
		<view class="display-flex justify-content-flex-justify item-list" v-for="(item,index) in listData" :key='index'>
			<view>
				<view>{{item.name || '-'}}</view>
				<text class="iconfont iconziyuan1 cr"></text><text class="cr2">{{item.provinceName}}-{{item.cityName}}-{{item.areaName}}</text>
			</view>
			<view>
				<button class="cu-btn  line-green" @click="joinFun(item.organId)"> 加入</button>
			</view>
			
		</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	export default {
		data() {
			return {
				loadingType: 0,
				triggered: false,
				lastTime: 0,
				windowHeight: 300,
				params:{
					pageNo:1,
					userId:uni.getStorageSync('ddwb').userid,
					organName:''
				},
				listData:[],
				joinParam:{
					userId:'',
					organId:''
				}
			};
		},
	
		onLoad: function() {
		
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			//页面一加载时请求一次数据
				this.initData()
		},
		mounted() {
			this.loadingData = throttle(this.loadingData, 2000);
		},
		methods:{
			InputBlur(e){
				if(this.params.organName==e.detail.value) return false
				this.params.organName = e.detail.value
				this.params.pageNo=1
				this.loadingType = 0
				this.listData=[]
				this.initData()
			},
			scrolltoupper() {
				alert()
				console.info('下拉')
			}, 
			loadingData(e) {
				this.lastTime = e.timeStamp
				if (this.loadingType) {
					this.params.pageNo++
					this.contentdown = '加载中...'
					this.initData()
				}
			},
			initData(){
				this.$api.getBaseLandPage(this.params).then(res=>{
					this.listData = this.listData.concat(res.data.data.data)
					this.contentdown = '上拉加载更多'
					this.loadingType = 1
					// if(this.params.pageNo==1&&this.listData.length==0){
					// 	this.loadingType = 0
					// 	this.contentdown = '暂无数据'
					// }else if(res.data.data.rowCount == this.listData.length&&this.params.pageNo==1){
					// 	this.contentdown = ''
					// 	this.loadingType = 0
					// }
					// else if (res.data.data.rowCount == this.listData.length) {
					// 	this.loadingType = 0
					// 	this.contentdown = '无更多数据'
					// } else {
					// 	this.contentdown = '上拉加载更多'
					// 	this.loadingType = 1
					// }
					
				})
			},
			joinFun(id){
				this.joinParam.userId = uni.getStorageSync('ddwb').userid;
				this.joinParam.organId = id;
				this.$api.joinBaseInfo(this.joinParam).then(res=>{
					uni.showToast({
						title: '加入成功',
						icon: 'success',
						success() {
						
							uni.switchTab({
								url: '/pages/plantManage/plantManage'
							});
						}
						})
					
				})
			}
			
		}
	}
</script>


<style lang="scss">
   .baseLand-list{
	    .search-form{
			background-color: #ffffff;
		}
	   .item-list{
		      padding: 30rpx;
		   background-color: #FFFFFF;
		   margin-bottom: 10px;
		   .cu-btn{
			   margin-top: 20rpx;
		   }
	   }
   }
</style>
