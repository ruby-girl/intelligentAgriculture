<template>
	<view class="container">
		<view class="cu-bar search solid-bottom">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @blur="InputBlur"  :adjust-position="false" type="text" placeholder="搜索种植批次名称"
				 confirm-type="search"></input>
			</view>
		</view>
		<!-- 计划列表 -->
		<scroll-view v-bind:style="{height:(windowHeight-50)+'px'}" style="padding:0 10px" scroll-y="true"
		 :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper" @scrolltolower="loadingData">
			<view class="padding-sm solid-bottom" v-for="(item,i) in newsList" @click="toAdd(item.name,item.id)">
				<view class="text-black">
					{{item.name}}
				</view>
				<view class="small-txt text-gray">
					种植户：{{item.userName}}
				</view>
			</view>
			<view class="loading-more">{{contentdown}}</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	var _self,
		page = 1,
		timer = null;
	export default {
		data() {
			return {
				newsList: [],
				page:1,
				contentdown: '',
				windowHeight:500,
				obj:{
					baseId:'',				
					name:''
				},
				name:'',
				content:'',
				id:'',
				title:''
			}
		},
		onLoad: function(options) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			let _this=this
			uni.getStorage({
				key: 'baseId',
				success: function(res) {
					_this.obj.baseId=res.data
					_this.getData()
				}
			});
			this.title=options.title
			this.content=options.content
			this.loadingData = throttle(this.loadingData, 2000);
			
		},
		onReachBottom: function() {},
		methods: {
			scrolltoupper() {
				console.info('下拉')
			},
			loadingData(e) {
				this.lastTime = e.timeStamp
				if (this.loadingType) {
					this.page++
					this.contentdown = '加载中...'
					this.getData()
				}
			},
			InputBlur(e){
				if(this.obj.name==e.detail.value) return false
				this.obj.name = e.detail.value
				this.page=1
				this.loadingType = 0
				this.contentdown = ''
				this.newsList=[]
				this.getData()
			},
			getData() {
				this.$apiYZX.plantingBatchsQuery(this.page,this.obj).then(res => {
					this.newsList = this.newsList.concat(res.data.data.data)
					if(this.page==1&&this.newsList.length==0){
						this.loadingType = 0
						this.contentdown = '暂无数据'
					}else if(res.data.data.rowCount == this.newsList.length&&this.page==1&&this.newsList.length<3){
						this.contentdown = ''
						this.loadingType = 0
					}else if(res.data.data.rowCount == this.newsList.length&&this.page==1&&this.newsList.length>2){
						this.contentdown = '无更多数据'
						this.loadingType = 0
					}
					else if (res.data.data.rowCount == this.newsList.length) {
						this.loadingType = 0
						this.contentdown = '无更多数据'
					} else {
						this.contentdown = '上拉加载更多'
						this.loadingType = 1
					}
				})
			},
			toAdd(name,id){
				uni.redirectTo({
				    url: 'addPlantInspections?name='+name+'&id='+id+'&title='+this.title+'&content='+this.content
			})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #eee;
	}

	.container {
		background: #fff;
	}

	.radius {
		border-radius: 16px;
		background: #fff;
		border: 1px solid #eee;
	}
	.loading-more {
		text-align: center;
		color: #ddd;
		padding:15px 0 50rpx 0;
	}
</style>
