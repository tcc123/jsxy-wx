<template>
    <view class="content">
        <image class="vip_bg" src="/static/images/vip_bg.png"></image>
        <button class="buyBtn" @click="toBuy">加入精塾学院，免费听好课</button>
    </view>
</template>

<script>
export default {
data(){
    return{
        url:"",
        VipModel:{},
        commissionUserId:"" 
    };
},
onLoad: function(){
    var url = "http://sharres.jingshuxueyuan.com/#/?shareUserId=554022723488bfae6a995cf925f0e10b&shareType=0&shareContentId=&time=1591155377411&source=jsxy_h5&showType=0";
    this.url=url;
},
methods:{
    getCardList(){
        let url='api/apiCardType/submitOrder';
        this.$http.request({
            url,
            method: 'post',
        }).then(res => {
            if (res.code == 200) {
                if(res.results.length > 0){
                    for(var i = 0;i<res.results.length;i++){
                        if(res.results[i].remark == "-1"){
                            this.VipModel=res.results[i];
                            return;
                        }
                    }
                }
            }
        });
    },
    toBuy(){

    }
}
};
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vip_bg{
  width: 100%;
}
.buyBtn{
  width: 600rpx;
  height: 70rpx;
  border-radius: 70rpx;
  background-color: #e7ae57;
  text-align: center;
  line-height: 70rpx;
  color: white;
  font-size: 15px;
  position: fixed;
  bottom:0;
  margin-bottom: 50rpx;
  
}
</style>