<template>
    <view class="content">
        <textarea class="input" placeholder="请输入您的反馈意见" v-model="value"></textarea>
        <button class="sumbitBtn" bindtap="toSumbit">提交反馈</button>
</view>
</template>

<script>
export default {
    data(){
        return{
            value:""
        };
    },
    methods:{
        toSumbit(){
        if(this.value.length <= 0){
            uni.showToast({
                title: '请输入',
            });
            return;
        }
        let url='api/apiFeedBack/insert?content='+this.value;
            this.$http.request({
                url,
                method: 'post',
            }).then(res => {
                if (res.code == 200) {
                    uni.showToast({
                        title: '反馈成功',
                    });
                    uni.navigateBack({
                        delta: 1,
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
  align-items: center;
  width: 100%;
  background-color: #efefef;
}

.input{
    width: 600rpx;
    background-color: white;
    border-radius: 10rpx;
    margin-top: 20rpx;
    padding: 20rpx;
    color: #333333;
    font-size: 12px;
}

.sumbitBtn{
  width: 400rpx;
  height: 70rpx;
  margin-top: 50rpx;
  color: white;
  background-color: #e6ae59;
  border-radius: 70rpx;
  font-size: 14px;
}
</style>