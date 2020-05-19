<template>
	<view class="container">
		<!-- 新增巡查工单 -->
		<view class="cu-form-group">
			<input placeholder="请输入反馈标题" v-model="obj.name" ref="titleInput" name="input" @input="titleInput"></input>
		</view>
		<view class="cu-form-group">
			<textarea @input="textareaAInput" v-model="obj.feedbackContent" placeholder="请输入反馈内容" maxlength="100"></textarea>
		</view>
		<view class="cu-form-group" @click="toList">
			<view class="title">种植批次</view>
			<input disabled="true" v-model="obj.plantingBatchName" class="form-input-left" placeholder="请选择种植批次" name="input"></input>
			<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
		</view>
		<view style="width: 100%;">
			<button @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg add-btn">
				新建批次</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchB: true,
				obj: {
					name: '',
					baseId: '',
					workOrderType: 1,//1未处理
					feedbackContent: '', //巡查内容
					plantingBatchId: '', //批次ID
					plantingBatchName: '' ,//批次名称
					initiatorId:''
				}
			};
		},
		onLoad(option) {
			let _this = this
			uni.getStorage({
				key: 'baseId',
				success: function(res) {
					_this.obj.baseId = res.data
					_this.obj.plantingBatchName = option.name||''
					_this.obj.plantingBatchId = option.id||''
					_this.obj.feedbackContent = option.content||''
					_this.obj.name = option.title||''

				}
			});
			uni.getStorage({
				key: 'organUserId',
				success: function(res) {
					_this.obj.initiatorId = res.data 						
				}
			})
		},
		methods: {
			titleInput(e) {
				let _this = this
				setTimeout(() => {
					_this.obj.name = e.detail.value
				}, 0)
			},
			textareaAInput(e) {
				let _this = this
				setTimeout(() => {
					_this.obj.feedbackContent = e.detail.value
				}, 0)
			},
			toList() {			
				uni.navigateTo({
					url: 'selectBatch?id=' + this.obj.plantingBatchId + '&name=' + this.obj.plantingBatchName + '&title=' + this.obj
						.name +
						'&content=' + this.obj.feedbackContent
				});
			},
			addFunc(){
				this.$apiYZX.addOrganUserWorkOrderManage(this.obj).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							success() {
								uni.redirectTo({
									url: 'plantInspections'
								});
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		background: #fff;
		padding: 0 15rpx;
	}

	.right-jt {
		transform: rotate(180deg);
		width: 16px;
	}

	.add-btn {
		width: 90%;
		left: 5%;
		top: 500rpx;
		position: absolute;

	}
</style>
