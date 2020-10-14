<template>
    <view>
        <view :class="{'catalogue':true}" v-for="(item,index) in resourceList" :key="index" >
            <view>
                <view class="courseBigName">{{ item.courseName }}</view>
                <view style="display:flex;font-size:20rpx;color:#727272;line-height:100%;">
                    <view style="padding-right:11rpx;border-right:1rpx solid #727272;">{{ $util.geFormatTime(item.resourceModel.resourceDuration) }}</view>
                    <view style="padding-left:11rpx;">{{ item.coursePlayNum+'人学过' }}</view>
                </view>
            </view>
            <view v-if="item.isLock==0">
                <view v-if="item.courseTry==1">
                    <view :class="playIndex==index?'playing':'lock'" @click="_toCourse(item,index)">{{ playIndex===index?'正在播放':'试听' }} </view>
                </view>
                <view v-else>
                    <view :class="playIndex==index?'playing':'lock'" v-if="normalPrice==0&&vipFree==0" @click="_toCourse(item,index)">{{ playIndex===index?'正在播放':'播放' }}</view>
                    <image v-else src="/static/images/lock.png" style="width: 34rpx;height: 34rpx;"></image>
                </view>
            </view>
            <view v-else>
                <view :class="playIndex==index?'playing':'lock'" @click="_toCourse(item,index)">{{ playIndex===index?'正在播放':'播放' }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props:{
        normalPrice:{
            type:Number,
            default() {
				return 0;
			}
        },
        vipFree:{
            type:Number,
            default() {
				return 0;
			}
        },
        resourceList:{
            type:Array,
            default() {
				return [];
			}
        },
        playIndex:{
            type:Number,
            default() {
				return -1;
			}
        }
    },
    data(){
        return{
        };
    },
    methods:{
        _toCourse(item,index){
            this.$emit('clickCourse',item,index);
        }
    }  
};
</script>

<style lang="scss" scoped>
.intro{
    color: #454545;
    font-size: 24rpx;
    line-height: 40rpx;
    margin: 0 auto;
}
.catalogue{
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding-bottom:56rpx
}
.courseBigName{
    width: 471rpx;
    font-size:26rpx;
    line-height:100%;
    color:#343434;
    padding-bottom:14rpx;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.lock{
    width: 90rpx;
    background: #4494CC;
    border-radius: 19rpx;
    font-size: 24rpx;
    color: #FFFFFF;
    text-align: center;
}
.playing{
    width: 130rpx;
    background: linear-gradient(-11deg, #CAD4DA, #CBDAE4);
    border-radius: 19rpx;
    font-size: 24rpx;
    color: #FFFFFF;
    text-align: center;
}
</style>