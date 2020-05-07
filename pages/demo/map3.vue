<template>

  <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="16" :markers="markers"></map> 
</view>
</template>

<script>
		import amapFile from '@/utils/amap-wx.js';  
	export default {
		data() {
			return {
			
				    markers: [],
				    latitude:31.457368,
				    longitude:104.716187,
				    textData: {}
				 ,
			};
		},
		onLoad() {
				 var that = this;
				    var myAmapFun = new amapFile.AMapWX({key:'397ef4d46fe080d26d44620dbbd15056'});
				       wx.getSystemInfo({
				         success: function(data){
				           var height = data.windowHeight;
				           var width = data.windowWidth;
				           var size = width + "*" + height;
				           myAmapFun.getStaticmap({
				             zoom: 8,
				             size: size,
				             scale: 2,
				             markers: "mid,0xFF0000,A:116.37359,39.92437;116.47359,39.92437",
				             success: function(data){
				               that.setData({
				                 src: data.url
				               })
				             },
				             fail: function(info){
								
				                  console.log(info)
				             }
				           })
				   
				         }
				       })
					// myAmapFun.getRegeo({
					// 	iconPath:'https://uniapp.dcloud.io/h5/static/location.png',
					// 	location:'104.716187,31.457368',
				 //      success: function(data){
				 //        //成功回调
				 //      },
				 //      fail: function(info){
				 //        //失败回调
				 //        console.log(info)
				 //      }
				 //    })
		}
	}
</script>

<style lang="scss">
.map_container{position:absolute;top:0;bottom:80px;left:0;right:0;}
.map{width:100%;height:100%;}
</style>
