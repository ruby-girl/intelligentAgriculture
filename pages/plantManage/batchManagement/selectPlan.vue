<template>
	<view class="container">
		<view class="cu-bar search solid-bottom">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索种植计划名称"
				 confirm-type="search"></input>
			</view>
		</view>
		<!-- 计划列表 -->
		<scroll-view scroll-y="true" style="padding:0 10px">
			<view class="padding-sm solid-bottom" v-for="i in 3">
				<view class="text-black">
					四川带带未本奥术大师阿萨德啊
				</view>
				<view class="small-txt text-gray">
					这是阿萨德暗示暗示的撒旦教爱神的箭爱神的箭爱神的箭阿萨德
					阿萨德啊实打实大声
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	var _self,
		page = 1,
		timer = null;
	export default {
		data() {
			return {}
		},
		onLoad: function() {},
		onReachBottom: function() {},
		methods: {}
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
</style>
