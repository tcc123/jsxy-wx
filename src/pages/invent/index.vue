<template>
    <view class="content">
        <image class="imageBg" src="/static/images/bg_jiameng.jpg"></image>
        <view class="inputView">
            <input class="loginInput" v-model="userName" placeholder="请输入您的姓名" />
            <view class="line" />
            <input class="loginInput1" v-model="userTel" placeholder="请输入手机号码" />
            <view class="line" />
            <input class="loginInput1" v-model="userAddress" placeholder="请输入加盟区域，如：陕西西安" />
            <view class="line" />
            <view class="loginBtn" @click="onLogin">提交申请</view>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return{
            userName: "",
            userTel: "",
            userAddress:""
        };
    },
    methods:{
        onLogin() {
            if (this.userName.length <= 0) {
                uni.showToast({
                    title: '请输入您的姓名',
                    icon: 'none',
                });
                return;
            }
            if (this.userTel.length <= 0) {
                uni.showToast({
                    title: '请输入您的手机号码',
                    icon: 'none',
                });
                return;
            }
            if (this.userTel.length != 11) {
                uni.showToast({
                    title: '手机号码不正确',
                    icon: 'none',
                });
                return;
            }
            if (this.userAddress.length <= 0) {
                uni.showToast({
                    title: '请输入想加盟的区域',
                    icon: 'none',
                });
                return;
            }
            var applyContent = this.userName + "," + this.userTel + "," + this.userAddress;
            let url='api/apiApply/submitApply?applyType=0&applyContent=' + applyContent;
			this.$http.request({
				url,
				method: 'post',
			}).then(res => {
				if (res.code == 200) {
                    uni.showToast({
                        title: '申请提交成功，请耐心等待审核',
                        icon: 'none',
                    });
                    this.userName="",
                    this.userTel="",
                    this.userAddress="";
                }else if (res.code == 400){
                    uni.navigateTo({
                        url: '/pages/login/index',
                    });
                }else {
                    uni.showToast({
                        title: res.msg,
                        icon: 'none',
                    });
                }
			});
        }
    }
};
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction: column;
  padding:20rpx;
  align-items: center;
  width: 100%;
}

.imageBg{
  width: 500rpx;
  height: 800rpx;
}

.inputView{
  display: flex;
  flex-direction: column;
  width: 80%;
  font-size: 12px;
}

.loginInput{
  margin-top: 20rpx;
  width: 100%;
  height: 80rpx;
  font-size: 12px;
}
.loginInput1{
  width: 100%;
  height: 80rpx;
}
.loginBtn{
  margin-top: 50rpx;
  width: 100%;
  height: 100rpx;
  background-color: #4968A0;
  border-radius: 100rpx;
  text-align: center;
  line-height: 100rpx;
  color: white;
}

</style>