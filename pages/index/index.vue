<template>
	<view class="content">
		<code-elf-guide v-if="guidePages"></code-elf-guide>
	</view>
</template>

<script>
	import codeElfGuide from '@/components/code-elf-guide/code-elf-guide.vue'
	export default {
		components: {
			codeElfGuide
		},
		data() {
			return {
				guidePages: true
			}
		},
		onLoad() {
			//this.loadExecution()
		},
		onShow() {
			setTimeout(function() {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}, 2000)
			// uni.hideHomeButton()
		},
		methods: {
			loadExecution: function() {
		
				/**
				 * 获取本地存储中ddwbFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					// 获取本地存储中ddwbFlag标识
					const value = uni.getStorageSync('ddwbFlag');
					console.log(value)
					if (value) {
						// ddwbFlag=true直接跳转到首页
						// 查看用户是否登录过
						const obj = uni.getStorageSync('ddwb');
						if(obj){
							if (obj.landOrgan.length > 0) {
								uni.switchTab({
									url: '../plantManage/plantManage'
								});
								uni.setStorage({
									key: 'organId',
									data: obj.landOrgan[0].organ.id,
								})
							} else {
								uni.redirectTo({
									url: '../plantManage/baseLand/chooseHandle'
								});
							}
						}else{
							uni.redirectTo({
								url: '/pages/login/login'
							});
						}
					} else {
						// ddwbFlag!=true显示引导页
						this.guidePages = true
						uni.setStorage({
							key: 'ddwbFlag',
							data: true,
							success() {
								setTimeout(function() {
									uni.redirectTo({
										url: '/pages/login/login'
									});
								}, 3000)
							}
						});
					}
				} catch (e) {					
					// error 
					this.guidePages = true
					uni.setStorage({
						key: 'ddwbFlag',
						data: true,
						success() {
							setTimeout(function() {
								uni.redirectTo({
									url: '/pages/login/login'
								});
							}, 3000)
						}
					});
				}
			}
		}
	}
</script>

<style>
	page,
	.content {
		width: 100%;
		height: 100%;
		padding: 0;
		background: #fff;
	}

	.bg {
		height: 100%;
		width: 100%;
		background-image: url('@/static/loading.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}
</style>
