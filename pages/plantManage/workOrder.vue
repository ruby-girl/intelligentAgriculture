<!-- 待处理 -->
<template>
	<view class="workOrder ">
		<view class="top" id="mjltest">
			<view class="flex select-model">
				<view class="sel">
					<xfl-select
					            :list="list"
					            :clearable="false"
					            :showItemNum="5" 
					            :initValue="'苹果'"
								:style_Container="'height: 30px; font-size: 12px;border:0'"
					        >
					        </xfl-select>
				</view>
				<view  class="sel">
					<xfl-select
					            :list="list"
					            :clearable="false"
					            :showItemNum="5" 
					      :style_Container="'height: 30px; font-size: 12px;border:0'"
					      
					            :initValue="'苹果'"
					        >
					        </xfl-select>
				</view>
				
				<view  class="sel">
					<xfl-select
					            :list="list"
					            :clearable="false"
					            :showItemNum="5" 
					      :style_Container="'height: 30px; font-size: 12px;border:0'"
					      
					            :initValue="'苹果'"
					        >
					        </xfl-select>
				</view>
				
					
				
				<view class="sel">
				  <text class="f12">筛选</text><image src="../../static/plant/icon_screen@2x.png" class="img"></image>
				
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav" >
				<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect" :data-id="item.id">
					  {{item.name}}
				</view>
				</view>
			</scroll-view>
			
		</view>
	
		<view class="content" :style="{top:topHeight}">
		
			  <view class="item" v-for="item in 5">
				  <!-- 跟距狀態不一樣 字段不同-->
				   <view class="flex">
					   <view>
						   <image src="/static/plant/icon_fertilization@2x.png" class="imgIcon"></image>
						   <text>施肥</text><text class="f10 cr3">来自:工单</text>
					   </view>
					   <view><text class="cr">去zhixing</text></view>
					  </view>
			       <view>
					   <text class="cr3">开始时间：</text>10000
				   </view>
				   <view>
					   <text class="cr3">结束时间：</text>
				   </view>
					 <view>
					   <text class="cr3">作物：</text>
				   </view>
						<view>
					   <text class="cr3">地块：</text>
				   </view>
					   <view>
					   <text class="cr3">种植方案：</text>
				   </view>
			  </view>
			
		</view>
 <!-- <uni-popup ref="popup" type="top" class="ttt">
			<view class="popup-content">
			    <view>111</view>
			    <view>111</view>
			</view>
		 </uni-popup> -->
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [       //要展示的数据
				                '苹果',
				                {value: '香蕉', disabled: true},
				                '葡萄',
				                '芒果',
				                '大白菜',
				            ],
							tabs:[
								{id:'',name:'全部'},
								{id:1,name:'未开始'},
								{id:2,name:'待处理'},
								{id:3,name:'已结束'},
							],
							TabCur: 0,
							topHeight:''
			};
		},
		onReady() {
		    let me  = this
			//创建节点选择器
			var query = wx.createSelectorQuery();
			//选择id
			query.select('#mjltest').boundingClientRect()
			query.exec(function (res) {
			  //res就是 所有标签为mjltest的元素的信息 的数组
			  me.topHeight = res[0].height+'px'
			 
			  })

		},
	
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			  open(){
			         this.$refs.popup.open()
			      }
		}
	}
</script>

<style lang="scss">
  .flex{
	  display: flex;
	  justify-content: space-between;
  }
  .workOrder{
	  .top{
		  position: fixed;
		  background-color: #fff;
		  width: 100%;
		  z-index: 1; 
		 
	  }
  }
  .select-model{
	  height: 60rpx;
	  line-height: 60rpx;
	  .img{
	  	  width: 46rpx;
	  	  height: 46rpx;
		  vertical-align: middle;
	  }
	  .sel{
		  text-align: center;
		  width: 100%;
	  	    margin-left: 30rpx;
	  	  /deep/ .list-container{
	  		  width: 100%!important;
	  	  }
	  }
  }
  .content{
	  padding: 30rpx;
	  overflow-y: auto;
	    position: relative;
	  .item{
		  padding: 30rpx;
		  line-height: 30rpx;
		  background:rgba(255,255,255,1);
		  box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.15);
		  margin-bottom: 30rpx;
		  .flex{
			  margin-bottom: 20rpx;
		  }
	  }
	  .imgIcon{
		  width: 40rpx;
		  height: 40rpx;
		  margin-right: 10px;
	  }
  }
  
 //  .ttt{
	  
	//   /deep/ .uni-transition{
	// top: var(--window-top)!important;
	//   }
	//   .uni-popup__wrapper-box{
	// 	  top:50px
	//   }
 //  }
 //  .popup-content {
	
 //  	background-color: #fff;
 //  	padding: 15px;
 //  	font-size: 14px;
 //  }
  
</style>
