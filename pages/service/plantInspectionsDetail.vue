<!-- 工单详情 -->
<template>
	<view class="work-detail">
		<view class="first">
			<view class="mb20">
				<label><text class="line"></text>工单信息</label>
				<view class="content">
					<view><text class="cr3">
							工单类型
						</text> <text>{{resultData.workOrderType==2?'巡查工单':'批次工单'}}</text>
						<text class="cr" :style="{'float':'right','color':resultData.workOrderStatus ==1?'red':'#00AE66'}">{{resultData.workOrderStatus === 1?"待处理" :"已处理" }}</text>
					</view>
					<view><text class="cr3">巡查标题
						</text>{{resultData.name || '-'}}</view>
					<view><text class="cr3">巡查时间
						</text>{{resultData.creDate || '-'}}</view>
					<view><text class="cr3">批次信息
						</text>{{resultData.plantingBatchName=='null'?'-':resultData.plantingBatchName}}</view>
					<view><text class="cr3">
							反馈内容
						</text>{{resultData.feedbackContent || '-'}}</view>
					<view><text class="cr3">
							反馈图片
						</text></view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							 <image :src="imgList[index]" mode="aspectFill"></image>						
							</view>					
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resultData: {},
				imgUrl:getApp().globalData.imgUrl,
				id: '',
				imgList:[]
			};
		},

		onLoad(option) {

			this.id = option.id;
			/* 基础信息 */
			this.initData(option.id);

		},
		methods: {
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			initData(id) {
				let _this=this
				this.$apiYZX.organUserWorkOrderManageGetById({
					id: id
				}).then(res => {
					this.resultData = res.data.data
					this.imgList=res.data.data.wordOrderPics.map((item=>{
						return _this.imgUrl+item.path
					}))
				})
			}
		}
	}
</script>

<style lang="scss">
	.work-detail {
		.cu-btn {
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}

		.mb20 {
			margin-bottom: 30rpx;
		}

		.first {
			background-color: #fff;
			padding: 30rpx;

			.method-top {
				background-color: #fff;

				.scroll-view_H {
					padding: 20rpx 0;
					height: 140rpx;
					white-space: nowrap;
					box-sizing: content-box;
					width: calc(100vw - 60rpx);

					image {
						display: inline-block;
						width: 200rpx;
						height: 100%;
						margin-right: 10rpx;
						border-radius: 3px;

					}
				}
			}

			.content {
				.cr3 {
					margin-right: 30rpx;
				}
			}
		}

		label {

			display: block;
			font-size: 34rpx;
			border-bottom: 1px solid #E1E1E1;
			padding-bottom: 16rpx;
			margin-bottom: 20rpx;
			font-weight: bold;

			.line {
				display: inline-block;
				width: 4px;
				height: 33rpx;
				background-color: $uni-text-color-primary;
				margin-right: 8px;
				vertical-align: text-top;
			}
		}
	}
	.img-box{
		width:150rpx;
		height:150rpx;
	}
</style>
