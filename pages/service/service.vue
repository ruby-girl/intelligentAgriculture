<!-- 服务管理 -->
<template>
	<view class="service-model">
		<view class="section title">
			<text @click="downSelect">00000 <image src="/static/plant/img001.png" class="imgSize" :class="{'degimg':isShow}"></image></text>

		</view>
		<view class="select-model" :class="{'showModel':isShow}">
			<view v-for="item in 5" class="select-li" @click="selectedFun(item)">{{item}}</view>
		</view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
	
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="section">
			<label ><b>基地管理</b></label>
			<view class="cu-list grid col-3 no-border" >
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="toPlant(item.url)">
			           <view class="cu-img">
						   <image :src="item.imgUrl" style="height: 100%;" ></image>
						   
					   </view>
					
					<text>{{item.name}}</text>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				isShow: false,
			
					cuIconList: [{
						cuIcon: 'cardboardfill',
					    imgUrl:'/static/service/icon_basemanagement@2x.png',
						url:'',
						name: '基地信息'
					}, {
						cuIcon: 'recordfill',
					     imgUrl:'/static/service/icon_environmentalmonitoring@2x.png',
						 url:'',
						name: '环控基站'
					}, {
						cuIcon: 'picfill',
						imgUrl:'/static/service/icon_plantinspection@2x.png',
						url:'/pages/service/plantInspections',
						name: '种植巡查'
					}, {
						cuIcon: 'noticefill',
						url:'',
					   imgUrl:'/static/service/icon_Financialbudget@2x.png',
						name: '财务预算'
					}]
			};
			
		},
		onLoad() {
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			downSelect() {
				this.isShow = !this.isShow
			},
			toPlant(url){
				if(!url) return
				uni.navigateTo({
				    url:url
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-model{
		.title{
			text-align: right;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #fff;
		}
		.cu-img{
			text-align: center;
				height: 120rpx;
			image{
				width: 120rpx;
			
			}
			
		}
		.section{
			background-color: #fff;
		
			label{
				padding: 0px 30rpx;
			}
	
		}
	}
	.select-model {
		background-color: #fff;
		width: 100vw;
		max-height: 0;
		overflow: auto;
		transition: max-height .25s;
		position: absolute;
		z-index: 9999;
		left: 0;
		top: 100rpx;

		.select-li {
			color: #666;
			padding: 10px 6px;
			border-bottom: 1px solid #dddedd;

		}

		box-shadow:1px 4px 8px #f0f0f0;
	}
	.imgSize {
		width: 48rpx;
		height: 48rpx;
		vertical-align: text-bottom;
		transition: transform 0.2s ease-in;
	
	}
	
	.degimg {
		transform: rotate(180deg);
	}
	
	.showModel {
		max-height: 20vh;
	}
</style>
