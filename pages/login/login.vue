<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit">
				<view class="uni-form-item ">
                   
					<view class="title">账户</view>
					 <input class="uni-input" name="nickname" placeholder="这是一个输入框" />
					
				</view>
				<view class="uni-form-item ">
           
					<view class="title">密码</view>
					<input class="uni-input" name="passowr" type="password" placeholder="这是一个输入框" />
					
				</view>
			
				<view class="uni-form-item ">
					<button class="btn-submit" formType="submit" type="primary">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			formSubmit(e){
				var rule = [{
						name: "nickname",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "sd"
					},
				
				];
			
				var formData = e.detail.value;
				var checkRes = this.$validate.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title:  this.$validate.error,
						icon: "none"
					});
				}
			},
			
			
		}
	}
</script>



<style lang="less">
	.uni-form-item{
		    display: flex;
		    width: 100%;
		    padding: 5px 0;
			.title{
				    padding: 10px 0;
			}
			.uni-input {
			    height: 26px;
			    padding: 8px 13px;
			    line-height: 26px;
			    font-size: 14px;
			    background:#f8f8f8;
			    -webkit-box-flex: 1;
			    -webkit-flex: 1;
			    flex: 1;
				}
				.btn-submit{
					width: 80%;
				}
	}
	.uni-column{
		    flex-direction: column;
	}
</style>
