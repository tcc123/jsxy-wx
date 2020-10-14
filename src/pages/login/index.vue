<template>
    <view class="content">
        <view class="topView">登录/注册</view>
        <input class="loginInput" v-model="value" placeholder="请输入手机号码"/>
        <view class="line" />
        <view class="yzmView">
            <input class="loginInput1" v-model="sms" placeholder="请输入短信验证码"/>
            <view class="ysmBtn" @click="onSms">{{ buttonTitle }}</view>
        </view>
        <view class="line" />
        <view class="loginBtn" @click="onLogin">登录</view>
            <view class="bottomView">
            <view class="tishiText">登录表示您已同意并愿意遵守精塾学院</view>
            <view> 
                <text class="xy" @click="toYx1">《使用协议》</text>
                <text class="tishiText">和</text>
                <text class="xy" @click="toYx2">《隐私协议》</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
data(){
    return{
        value: "",
        sms: "",
        disabled: false,
        buttonTitle:"获取验证码"
    };
},
methods:{
    onSms() {
        if(this.disabled){
            return;
        }
        if (this.value.length <= 0) {
            uni.showToast({
                title: '请输入手机号码',
                icon: 'none',
            });
            return;
        }
        if (this.value.length != 11) {
            uni.showToast({
                title: '手机号码不正确',
                icon: 'none',
            });
            return;
        }
        let url='third/msg/sendMsgCode?key=LOGIN&phone=' + this.value;
        this.$http.request({
            url,
            method: 'post',
        }).then(res => {
            if (res.code == 200) {
                uni.showToast({
                    title: '验证码发送成功',
                    icon: 'none',
                });
                var count = 60;
                var intervalId = setInterval(() => {
                    count -= 1;
                    this.buttonTitle=count + 's后重发',
                    this.disabled= true;
                    if (count == 0) {
                        clearInterval(intervalId); //倒计时结束，停止interval
                        this.buttonTitle='获取验证码',
                        this.disabled=false;
                    }
                }, 1000);
            } else {
                uni.showToast({
                    title: '验证码发送失败',
                    icon: 'none',
                });
            }
        });
    },
    onLogin() {
        if (this.value.length <= 0) {
            uni.showToast({
                title: '请输入手机号码',
                icon: 'none',
            });
            return;
        }
        if (this.value.length != 11) {
            uni.showToast({
                title: '手机号码不正确',
                icon: 'none',
            });
            return;
        }
        if (this.sms.length <= 0) {
            uni.showToast({
                title: '请输入验证码',
                icon: 'none',
            });
            return;
        }
        let url='api/apiAuth/loginCode?account=' + this.value+"&password="+this.sms+"&shareUserId=&source=xcx_wechar";
        this.$http.request({
            url,
            method: 'post',
        }).then(res => {
            if (res.code == 200) {
                uni.showToast({
                    title: '登录成功',
                    icon: 'none',
                });
                uni.setStorageSync('User', res.results.userModel);
                uni.setStorageSync('Token', res.results.token);
                uni.navigateBack({
                    delta: 1,
                });
            } else {
                uni.showToast({
                    title: res.msg,
                    icon: 'none',
                });
            }
        });
  },
    toYx1() {
        uni.navigateTo({
            url: '/pages/webview/index?url=http://manage.jingshuxueyuan.com:8099/user_sy.html',
        });
    },
    toYx2() {
        uni.navigateTo({
            url: '/pages/webview/index?url=http://manage.jingshuxueyuan.com:8099/user_ys.html',
        });
    },
}
};
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction: column;
  padding:50rpx;
  background: white;
}

.topView{

  color: #4968A0;
  font-weight: bold;
  font-size: 54rpx;
}

.loginInput{
  margin-top: 100rpx;
  width: 100%;
  height: 100rpx;
  font-size: 14px;
}


.yzmView{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.loginInput1{
  width: 75%;
  height: 100rpx;
  font-size: 14px;
}

.ysmBtn{
  width: 25%;
  height: 50rpx;
  background-color: #4968A0;
  border-radius: 30rpx;
  text-align: center;
  line-height: 50rpx;
  color: white;
  font-size: 12px;
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


.bottomView{
  margin-top: 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tishiText{
  font-size: 11px;
  color: #454545;
}

.xy{
  font-size: 11px;
  color: #4968A0;
}
</style>