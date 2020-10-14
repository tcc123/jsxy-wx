<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" :circular="true">
			<block v-for="(item,index) in banners" :key="index">
				<swiper-item>
					<image :src="item.pic" class="slide-image" mode="scaleToFill" :data-item="item" @click="toReturnType" />
				</swiper-item>
			</block>
		</swiper>
		<view class="section">
			<view class="tui-table-view">
				<view class="tui-col-3" v-for="(item,index) in menus" :key="index" @click="toReturnType">
					<image class="menu_img" :src="item.pic"></image>
					<text class="menu_text">{{ item.title }}</text>
				</view>
			</view>
		</view>
		<view class="padding" />
		<view v-for="(item,index) in courseList" :key="index">
			<view v-if="courseList[index].courseClassRegion == 2">
				<layout1 :category-bean="courseList[index]" />
			</view>
			<view v-if="courseList[index].courseClassRegion == 0">
				<layout2 :category-bean="courseList[index]" />
			</view>
			<view v-else>
				<layout3 :category-bean="courseList[index]" />
			</view>
		</view>
	</view>
</template>

<script>
const returnpage = require('../../utils/returnpage.js');
import layout1 from '../../components/layout1/index.vue';
import layout2 from '../../components/layout2/index.vue';
import layout3 from '../../components/layout3/index.vue';
export default {
	components:{
		layout1,
		layout2,
		layout3
	},
	data() {
		return {
			banners: [],
			menus:[],
			courseList:[]
		};
	},
	onLoad() {
		this.getBanner();
		this.getMenu();
		this.getHomeList();
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function(){
		this.getBanner();
		this.getMenu();
		this.getHomeList();
	},
	methods: {
		getBanner(){
			let url='api/apiAppContent/findListByCurrentEffect?viewRegionIn=1&isPage=0&limit=1000&no=1';
			this.$http.request({
				url,
				method: 'post',
			}).then(res => {
				this.banners=res.results;
			});
		},
		getMenu(){
			let url='api/apiAppContent/findListByCurrentEffect?viewRegionIn=4&isPage=0&limit=1000&no=1';
			this.$http.request({
				url,
				method: 'post',
			}).then(res => {
				this.menus=res.results;
			});
		},
		getHomeList(){
			let url='api/apiCourse/courseHome';
			this.$http.request({
				url,
				method: 'post',
			}).then(res => {
				this.courseList=res.results;
			});
		},
		toReturnType(e){
			console.log(e);
			returnpage.returnPage(e.currentTarget.dataset.item);
		},
	}
};
</script>

<style lang="scss">
.slide-image{
  width: 750rpx;
  height: 300rpx;
}

.menu_img{
  width: 100rpx;
  height: 100rpx;
}
.menu_text{
  color: #2A88C3;
  font-size: 22rpx;
}

.tui-table-view{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.tui-col-3{
  flex: 0 0 auto;
  width: 25%;
  text-align: center;
  color: #797979;
  padding: 40rpx 0;
  font-size: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
