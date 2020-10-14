<template>
    <view class="content">
		<view class="loginBtn" @click="onLoginOut">退出登录</view>
	</view>
</template>

<script>
export default {
    data(){
        return{

        };
    },
    methods:{
        onLoginOut(){
            uni.clearStorageSync();
            uni.navigateBack({
                delta: 1
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.content{
  padding: 50rpx;
}
.loginBtn{
  margin-top: 50rpx;
  width: 100%;
  height: 100rpx;
  background-color: #ff0000;
  border-radius: 100rpx;
  text-align: center;
  line-height: 100rpx;
  color: white;
}
</style>