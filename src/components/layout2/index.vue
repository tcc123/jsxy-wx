<template>
    <view>
        <view class="top">
            <view class="titleName">{{ categoryBean.courseClassName }}</view>
            <view class="more" @click="_toMore" :data-str="categoryBean.courseClassId">更多></view>
        </view>
        <scroll-view :scroll-y="true">
            <view class="course">
                <view class="courseItem" v-for="(item,index) in categoryBean.courseModels" :key="index" @click="_toCourse(item)">
                    <view v-if="item.courseType == 1">
                        <image class="courseImage" :src="item.resourceModel.resourceCover"></image>
                    </view>
                    <view v-else class="albumPic">
                        <image class="album" src="/static/images/album.png"></image>
                        <image class="courseImage" :src="item.picSquare?item.picSquare:item.coursePic"></image>
                    </view>
                    <view class="courseRight">
                        <view class="courseName">{{ categoryBean.courseModels[index].courseName }}</view>
                        <view class="courseDesc">{{ categoryBean.courseModels[index].courseTitle }}</view>
                        <view v-if="item.courseType == 1">
                            <text class="courseZhuanlan">{{ item.parentCourseModel.courseName }}</text>
                        </view>
                        <view v-else>
                            <text class="courseNum">已更新至{{ item.courseNum?item.courseNum:0 }}期</text>
                        </view>
                        <view class="playnoView">
                            <view class="weight"></view>
                            <image class="playnoImage" src="/static/images/icon_n_playno.png"></image>
                            <text class="playnoText">{{ item.coursePlayNum }}</text>
                        </view>
                    </view>
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
            var str = e.currentTarget.dataset.str;
            uni.navigateTo({
                url: '/pages/category/index?categoryStr=' + str,
            });
        },
        _toCourse: function(item){
            var user = uni.getStorageSync('User');
            if (!user) {
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
.albumPic{
  position: relative;
}
.album{
  width: 64rpx;
  height: 30rpx;
  position: absolute;
  top:0;
  left: 0;
}
.more{
  width: 80rpx;
  font-size: 12px;
  color: #727272;
}
.course{
  display: flex;
  flex-direction: column;
  width: 93%;
  margin-top: 20rpx;
  margin-left: 16rpx;
  margin-right: 20rpx;
}

.courseItem{
  display: flex;
  flex-direction: row;
  margin: 5rpx;
  padding: 5rpx;
  border: 1px solid #efefef;
  border-radius: 5px;
  width: 100%;
}
.courseImage{
  width: 240rpx;
  height: 180rpx;
  border-radius: 8rpx;
}
.courseRight{
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
  height: 180rpx;
  width: 60%;
}
.courseName{
  font-size: 13px;
  color: #222222;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.courseDesc{
  font-size: 10px;
  color: #727272;
  width: 100%;
  margin-top: 10rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10rpx;
}
.courseNum{
  font-size: 10px;
  color: #777777;
  border-radius: 40rpx;
  border: 1px solid #777777;
  padding-left: 14rpx;
  padding-right: 14rpx;
  padding-top: 5rpx;
  padding-bottom: 5rpx;

}
.courseZhuanlan{
  font-size: 10px;
  color: #727272;
  border-radius: 40rpx;
  background-color:#EFEFEF;
  padding-left: 14rpx;
  padding-right: 14rpx;
  padding-top: 5rpx;
  padding-bottom: 5rpx;
}
.playnoView{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20rpx;
  width: 100%;
}
.weight{
  width: 90%;
}
.playnoImage{
  width: 20rpx;
  height: 20rpx;
}
.playnoText{
  color: #4494CC;
  font-size: 10px;
  margin-left: 5rpx;
}
.padding{
  background: #EFEFEF;
  height: 10rpx;
}
</style>