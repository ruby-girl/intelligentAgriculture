<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="item.value==TabCur?'text-orange cur':''" v-for="(item,index) in tab" :key="index" @tap="tabSelect" :data-id="item.value">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="list-container">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 1,
				scrollLeft: 0,
				tab:[{name:'进行中',value:'1'},{name:'已结束',value:'2'},{name:'全部',value:'3'}]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>

</style>
