<template>
	<view class="content">
		<view class="title">添加书童微信<text class="appName">领取21天国学会员</text></view>
		<block v-for="(item,index) in wxList" :key="index">
			<view class="wx_item">
			<view class="tishi">微信号：<text class="appName">{{ item }}</text> 
			</view>
			<button class="copyBtn" @click="onCopy" :data-id="index">复制</button>
			</view>
		</block>
		<view class="title">下载方式1</view>
		<image class="ewm" :src="url" @click="toGallery"></image>
		<view class="tishi1">点击图片，然后长按，选择保存图片，打开微信扫描保存的二维码进行下载</view>
		<view class="title">下载方式2</view>
		<view class="tishi">手机应用市场搜索<text class="appName">精塾学院</text>下载</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"/static/images/jingshuxueyuan.png",
				list:["/static/images/jingshuxueyuan.png"],
				wxList: ["18149203352", "15529235637"]
			};
		},
		methods: {
			toGallery() {
				var that = this;
				uni.previewImage({
					current: that.data.url, // 当前显示图片的http链接
					urls: that.data.list // 需要预览的图片http链接列表
				});
			},
			onCopy(e){
				console.log(e);
				var index = e.currentTarget.dataset.id;
				uni.setClipboardData({
					//准备复制的数据
					data: this.wxList[index],
					success: ()=> {
						uni.showToast({
							title: '微信复制成功',
						});
					}
				});
			},
		}
	};
</script>

<style lang="scss">
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30rpx;
}

.title{
  font-size: 16px;
  font-weight: bold;
  margin-top: 100rpx;

}

.ewm{
  width: 300rpx;
  height: 300rpx;
  margin-top: 20rpx;
}

.wx_item{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 50rpx;
  margin-right: 50rpx;
  margin-top: 20rpx;
}

.tishi{
  font-size: 12px;
  color: #777777;
  text-align: center;
}

.tishi1{
  font-size: 12px;
  color: #777777;
  text-align: center;
  margin-left: 50rpx;
  margin-right: 50rpx;
  margin-top: 20rpx;
}

.appName{
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #2A88C3;
  margin-left: 5rpx;
  margin-right: 5rpx;
}

.copyBtn{
  width: 100rpx;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 9px;

}
</style>
