<template>
    <view>
        <view class="top">
            <view class="titleName">{{ categoryBean.courseClassName }}</view>
            <view class="more" @click="_toMore" :data-str="categoryBean.courseClassId">更多></view>
        </view>
        <view class="section">
            <view class="tui-table-view">
                <view class="tui-col-3" v-for="(item,index) in categoryBean.courseModels" :key="index" @click="_toCourse(item)">
                    <view v-if="item.courseType == 1">
                        <image class="courseImage" :src="item.resourceModel.resourceCover"></image>
                    </view>
                    <view v-else class="albumPic">
                        <image class="album" src="/static/images/album.png"></image>
                        <image class="courseImage" :src="item.picSquare?item.picSquare:item.coursePic"></image>
                    </view>
                    <view :class="['courseName','txt-cut']">{{ item.courseName }}</view>
                    <view :class="['courseDesc','one-txt-cut']">{{ item.courseTitle }}</view>
                </view>
            </view>
        </view>
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
            if(!user){
                uni.navigateTo({
                    url: '/pages/login/index',
                });
                return;
            }
            let url=item.courseType == 1?'/pages/course/index?courseId=':'/pages/course/album?courseId=';
            uni.navigateTo({
                url: url + item.courseId
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
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
}

.courseName{
  font-size: 12px;
  height: 68rpx;
  color: #454545;
  width: 200rpx;
  text-align: left;
}
.courseDesc{
  font-size: 10px;
  color: #999999;
  width: 200rpx;
  margin-top: 10rpx;
  text-align: left;
}

.padding{
  background: #EFEFEF;
  height: 10rpx;
}


.tui-table-view{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.tui-col-3{
  flex: 0 0 auto;
  width: 33.333333%;
  text-align: center;
  color: #797979;
  padding: 40rpx 0;
  font-size: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>