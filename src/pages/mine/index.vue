<template>
    <view class="content">
        <view class="bgView"></view>
        <view class="userView">
            <view class="topView" @click="toUserDetail">
                <image class="userIcon" :src="userIcon"></image>
                <view>
                    <view class="userName">{{ userName }}</view>
                    <view class="userVipTime">{{ userSlogin }}</view>
                </view>
            </view>
            <view class="bottomView">
                <view class="oneView">
                    <view class="oneTop">{{ todayTime }}</view>
                    <view class="oneBottom">今日学习</view>
                </view>
                <view class="oneView">
                    <view class="oneTop">{{ allTime }}</view>
                    <view class="oneBottom">历史时长</view>
                </view>
                <view class="oneView">
                    <view class="oneTop">{{ xuefen }}</view>
                    <view class="oneBottom">学分</view>
                </view>
            </view>
        </view>
        <view class="vipView" @click="toVip">
            <image src="/static/images/icon_play_vip.png" class="icon_vip"></image>
            <text class="text_vip">成为精塾国学VIP 每年300期精品好课免费听</text>
        </view>
        <view class="menuView">
            <view class="cell" @click="toInvent">
                <text class="left_text">渠道加盟</text> <text class="right_text">人人参与的好项目</text> <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
            <view class="line"/>
            <view class="cell" @click="toDownload">
                <text class="left_text">下载APP体验完整版</text> <text class="right_text">新用户领7天VIP</text> <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
            <view class="line"/>
            <view class="cell" @click="toReport">
                <text class="left_text">意见反馈</text> <text class="right_text"></text> 
                <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
            <view class="line"/>
            <view class="cell" @click="toSetting">
                <text class="left_text">设置</text> 
                <text class="right_text"></text> 
                <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
            <view class="line"/>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return{
            userName:"点击登录",
            userSlogin:"国学，从启蒙到精塾",
            userIcon:"",
            todayTime:"0",
            allTime:"0",
            xuefen:"0"
        };
    },
    onLoad: function(){
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            let url='api/apiAppUser/getUser';
            this.$http.request({
                url,
                method: 'post',
            }).then(res => {
                if (res.code == 200) {
                    uni.setStorageSync('UserInfo', res.results);
                    this.userName=res.results.userName?res.results.userName:res.results.phone,
                    this.userIcon=res.results.face,
                    this.todayTime=res.results.studyLengthNumToday?this.$util.getLongToTime1(res.results.studyLengthNumToday):'0分钟',
                    this.allTime=res.results.studyLengthNumAll?this.$util.getLongToTime1(res.results.studyLengthNumAll):'0分钟',
                    this.xuefen=res.results.creditScore;

                }else {
                    this.userName="点击登录",
                    this.userSlogin="国学，从启蒙到精塾",
                    this.userIcon="",
                    this.todayTime="0",
                    this.allTime="0",
                    this.xuefen="0";
                }
            });
        },
        toInvent(){
            var user = uni.getStorageSync('User');
            if(!user){
                uni.navigateTo({
                    url: '/pages/login/index',
                });
                return;
            }
            uni.navigateTo({
                url: '/pages/invent/index',
            });
        },
        toVip(){
            var user = uni.getStorageSync('User');
            if(!user){
                uni.navigateTo({
                    url: '/pages/login/index',
                });
                return;
            }
            uni.navigateTo({
                url: '/pages/vip/index',
            });
        },
        toUserDetail(){
            var user = uni.getStorageSync('User');
            if(!user){
                uni.navigateTo({
                    url: '/pages/login/index',
                });
            }
        },
        toReport(){
            var user = uni.getStorageSync('User');
            if(!user){
                uni.navigateTo({
                    url: '/pages/login/index',
                });
                return;
            }else{
                uni.navigateTo({
                    url: '/pages/report/index',
                });
            }
        },
        toSetting(){
            var user = uni.getStorageSync('User');
            if(!user){
                uni.navigateTo({
                    url: '/pages/login/index',
                });
                return;
            }
            uni.navigateTo({
                url: '/pages/setting/index',
            });
        },
        toDownload(){
            var user = uni.getStorageSync('User');
            if(!user){
                uni.navigateTo({
                    url: '/pages/login/index',
                });
                return;
            }
            uni.navigateTo({
                url: '/pages/appdownload/index',
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.content{
    background: #EFEFEF;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bgView{
    background: #2A88C3;
    height: 300rpx;
    width: 100%;
}

.userView{
    width: 662rpx;
    height: 330rpx;
    background: white;
    border-radius: 30rpx;
    margin-top: -260rpx;
    display: flex;
    flex-direction: column;
}

.topView{
    display: flex;
    flex-direction: row;
    margin-top: 45rpx;
    margin-left: 45rpx;
    height: 115rpx;
    align-items: center;
    width: 100%;
}

.userIcon{
    width: 115rpx;
    height: 115rpx;
    background: #EFEFEF;
    margin-right: 10rpx;
    border-radius: 115rpx;
}
.userName{
    font-size: 20px;
    font-weight: bold;
    color: #222222;
}
.userVipTime{
    font-size: 11px;
    color: #777777;
    margin-top: 10rpx;
}
.bottomView{
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 170rpx;
    align-items: center;
}
.oneView{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33%;
}
.oneTop{
    font-size: 15px;
    font-weight: bold;
    color: #222222;
}

.oneBottom{
    font-size: 10px;
    color: #777777;
    margin-top: 10rpx;
}

.menuView{
    width: 100%;
    margin-top: 20rpx;
}

.cell{
    width: 100%;
    height: 80rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    padding-left: 30rpx;
    padding-right: 30rpx;
}

.left_text{
    width: 60%;
    font-size: 14px;
    color: #222222;
}

.right_text{
    font-size: 12px;
    color: #777777;
    width: 28%;
    text-align: right;
}

.right_arrow{
    width: 30rpx;
    height: 30rpx;
}

.vipView{
    width: 662rpx;
    height: 90rpx;
    background: #FFEFD6;
    border-radius: 10rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20rpx;
}

.icon_vip{
    width: 40rpx;
    height: 32rpx;
}

.text_vip{
    font-size: 13px;
    color: #D58E04;
    margin-left: 10rpx;
}

</style>