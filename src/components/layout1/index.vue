<template>
    <view>
        <view class="top">
            <view class="titleName">{{ categoryBean.courseClassName }}</view>
            <view class="more" @click="_toMore" :data-str="categoryBean.courseClassId">更多></view>
        </view>
        <scroll-view :scroll-x="true" style="width: 100%;height:250rpx">
            <view class="course">
                <view class="courseItem" v-for="(item,index) in categoryBean.courseModels" :key="index" @click="_toCourse(item)">
                    <view v-if="item.courseType == 1">
                        <image class="courseImage" :src="item.resourceModel.resourceCover"></image>
                    </view>
                    <view v-else>
                        <image class="courseImage" :src="item.picSquare?item.picSquare:item.coursePic"></image>
                    </view>
                    <view class="courseName">{{ categoryBean.courseModels[index].courseName }}</view>
                </view>
            </view>
        </scroll-view>
        <view class="padding" />
    </view>
</template>

<script>
    export default {
        props:{
            categoryBean: {
                type: Object,
                value: {}
            },       
        },
        methods:{
            _toMore: function(e){
                console.log(e);
                var str = e.currentTarget.dataset.str;
                uni.navigateTo({
                    url: '/pages/category/index?categoryStr=' + str,
                });
            },
            _toCourse:function(item){
                var user = uni.getStorageSync('User');
                if(!user){
                    uni.navigateTo({
                        url: '/pages/login/index',
                    });
                    return;
                }
                let url=item.courseType == 1?'/pages/course/index?resourceType='+item.resourceModel.resourceType+'&courseSmallId='+item.courseId+'&courseType='+item.courseType+'&courseId='+item.parentCourseModel.courseId:'/pages/course/album?courseId='+item.courseId;
                uni.navigateTo({
                    url: url
                });
            }
        }
    };
</script>

<style lang="scss" scoped>

.top{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.titleName{
  width: 90%;
  margin-top: 20rpx;
  margin-left: 36rpx;
  font-weight: bold;
  font-size: 16px;
}

.more{
  width: 80rpx;
  font-size: 12px;
  color: #727272;
}
.course{
  display: flex;
  flex-direction: row;
  margin-top: 20rpx;
  margin-left: 16rpx;
  margin-right: 20rpx;
}

.courseItem{
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
  margin-right: 20rpx;
}

.courseImage{
  width: 180rpx;
  height: 180rpx;
  background-color: #fefefe;
}

.courseName{
  font-size: 12px;
  color: #454545;
  width: 180rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.padding{
  background: #EFEFEF;
  height: 10rpx;
}
</style>