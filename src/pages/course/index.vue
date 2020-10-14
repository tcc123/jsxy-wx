<template>
    <view class="content">
      <view>
          <view class="top" v-if="courseType==0">
            <view class="top_title">{{ courseSmall.courseName }}</view>
            <view class="top_desc">{{ courseSmall.courseTitle }}</view>
            <view class="center">
                <image class="center_bg" mode="aspectFill" :src="courseSmall.coursePic"></image>
            </view>
            <view style="display: flex;align-items: center;">
                <image class="seekIcon" src="/static/images/seekL.png" @click="seekPlay(-15)"></image>
                <view id="progressBar">  
                    <view ref="playProgressText" id="playProgressText" :style="{left:progressTextLeft}" v-if="progressText"> {{ progressText }}</view>
                    <view ref="playProgressBar" :style="{width:progressBarWidth}" id="playProgressBar"></view>
                </view>
                <image class="seekIcon" src="/static/images/seekR.png" @click="seekPlay(15)"></image>
            </view>
            <view class="progress_view">
                <image class="progress_change1" src="/static/images/play_left.png" @click="onPlayPre"></image>
                <image class="center_play" :src="isPlaying?pauseIcon:playIcon" @click="onPlayUrl"></image>
                <image class="progress_change2" src="/static/images/play_right.png" @click="onPlayNext"></image>
            </view>
            <view class="listIcon" @click="show = true">
              <image src="/static/images/resourceList.png" style="width:31rpx;height:30rpx;margin: 0 auto;"></image>
              <text>播放列表</text>
            </view>
          </view>
          <view v-else style="width:100%">
              <view class="video">
                <video id="myVideo" ref="myVideo" 
                    :src="courseSmall.resourceModel.resourcePath"
                    :poster="courseSmall.coursePic"
                    object-fit="cover"
                    controls
                    style="width:100%;height:100%"
                    >
                </video>
              </view>
              <view class="top_title" style="padding: 30rpx 44rpx 0">{{ courseSmall.courseName }}</view>
              <view class="listIcon" @click="show = true">
                <image src="/static/images/resourceList.png" style="width:31rpx;height:30rpx;margin: 0 auto;"></image>
                <text>播放列表</text>
              </view>
          </view>
      </view>
      <uPopup v-model="show" mode="bottom" border-radius="30" height="620rpx" width="100%">
        <view style="padding:32rpx 44rpx 0">
          <course-list :play-index="playIndex" :normal-price="normalPrice" :vip-free="vipFree" :resource-list="resourceList" @clickCourse="clickCourse"></course-list>
        </view>
      </uPopup>
        <!-- <view class="vip" bindtap="toDownload">
            <image class="vip_bg" src="/static/images/bg_play_vip.png"></image>
            <view class="vip_info"> -->
                <!-- <image class="vip_icon" src="/static/images/icon_play_vip.png"></image> -->
                <!-- <text class="vip_text">试听6分钟，下载APP体验完整课程</text> -->
            <!-- </view> -->
        <!-- </view> -->
      <view class="padding"></view>
      <view class="tabs">
          <view :class="hiddle?'tabtext':'tabtext_select'" @click="onChange" data-id="0">详情</view>
          <view :class="hiddle?'tabtext_select':'tabtext'" @click="onChange" data-id="1">课后练习</view>
      </view>
      <view v-if="!hiddle">
          <scroll-view id="intro" ref="intro" class="intro" scroll-y>
              <rich-text :nodes="courseSmall.courseInfo"></rich-text>
          </scroll-view>
      </view>
      <view v-else>
        <u-empty text="数据为空" mode="data"></u-empty>
      </view>
    </view>
</template>

<script>
import uPopup from 'uview-ui/components/u-popup/u-popup.vue';
import uEmpty from 'uview-ui/components/u-empty/u-empty.vue';
import courseList from '../../components/courseList/index';
const innerAudioContext = uni.createInnerAudioContext();
export default {
    components:{
      uPopup,
      uEmpty,
      courseList
    },
    data(){
        return {
            courseSmall: {},
            courseInfo:'',
            courseId:'',
            coueseSmallId:'',
            courseType:'',
            resourceList:[],
            pageTotal:0,
            query: {
                no: 1,
                limit: 10,
            },
            progressTextLeft:'',
            progressBarWidth:'',
            currentTime:0,
            waitFlag:false,
            show:false,
            hiddle:false,
            playIndex: -1,
            isPlaying: false,
            playIcon: "/static/images/play_play.png",
            pauseIcon: "/static/images/play_plase.png",
            progressText:"00:00/00:00",
            normalPrice:0,
            vipFree:0
        };
    },
    onLoad: function(options){
        this.courseId=options.courseId;
        this.coueseIndex=Number(options.coueseIndex);
        this.courseType=options.courseType;
        this.normalPrice=options.normalPrice;
        this.vipFree=options.vipFree;
        this.getResourceList();
    },
    onUnload(){
        this.isPlaying=false;
        innerAudioContext.pause();
    },
    methods:{
        onChange(e){
            var id = e.currentTarget.dataset.id;
            if(id == 0){
              this.hiddle=false;
            }else{
              this.hiddle=true;
            }
        },
        getResourceList() {
            let url='api/apiCourse/course?parentId='+ this.courseId +'&resourceType=' + this.courseType+'&isPage=0';
            this.$http.request({
                url,
                method: 'post',
                params: this.query
            }).then(res=>{
              if(res.code==200){
                  this.resourceList=res.results;
                  this.resetRecourse(res.results[this.coueseIndex],this.coueseIndex);
                  if(this.courseType==0){
                    this.onPlayUrl();
                  }

              }
            });
        },
        onPlayPre() {
            if (this.playIndex == 0) {
                uni.showToast({
                    title: '没有更多',
                    icon: 'none',
                });
            }
            var index=this.playIndex-1;
            var course = this.resourceList[index];
            this.resetRecourse(course,index);
            this.onPlayUrl();
        },
        onPlayNext() {
            if (this.playIndex == this.resourceList.lenght - 1) {
                uni.showToast({
                    title: '没有更多',
                    icon: 'none',
                });
            }
            var index=this.playIndex+1;
            var course = this.resourceList[index];
            this.resetRecourse(course,index);
            this.onPlayUrl();
        },
        changeAudioStatus(){
          // 解决在触发onWaiting回调后会导致onTimeUpdate失效问题
          innerAudioContext.onWaiting(() => {
            innerAudioContext.pause(); // 等待网络的时候音频暂停
            this.waitFlag= true; // 标明是onWaiting触发的暂停
          });
          // 音频准备就绪的回调
          innerAudioContext.onCanplay(() => {
            if (this.waitFlag) { // 如果是onWaiting触发的暂停，就立即播放
                innerAudioContext.play(); // play()方法看上去能重新触发onTimeUpdate()回调
                this.waitFlag= false; // 取消相应的flag标志位
            }
          });
          innerAudioContext.onTimeUpdate(() => {
              this.currentTime=innerAudioContext.currentTime;
              this.progressText=this.$util.getLongToTime(innerAudioContext.currentTime)+'/'+this.$util.getLongToTime(this.courseSmall.resourceModel.resourceDuration);
              let sp = 350/ 2 / innerAudioContext.duration ;
              let swidth =  (sp*innerAudioContext.currentTime) + "px";
              this.progressBarWidth = swidth;
              this.progressTextLeft=swidth;
          });
        },
        onPlayUrl() {
            if(innerAudioContext.paused){
                this.isPlaying=true;
                innerAudioContext.play();
            }else{
                this.isPlaying=false;
                innerAudioContext.pause();
            }
            this.changeAudioStatus();
        },
        seekPlay(time){
          innerAudioContext.play();
          this.isPlaying=true;
          this.currentTime=this.currentTime+time;
          if(this.currentTime<0){
            innerAudioContext.seek(0);
          }else if(this.currentTime>this.courseSmall.resourceModel.resourceDuration){
            innerAudioContext.seek(innerAudioContext.duration);
          }else{
            innerAudioContext.seek(this.currentTime);
          }
          this.changeAudioStatus();
        },
        resetRecourse(item,index){
          uni.$emit('changeCourse',index);
          this.playIndex=index;
          this.courseSmall=item;
          if(this.courseType==0){
            this.currentTime=0;
            innerAudioContext.src = this.courseSmall.resourceModel.resourcePath;
            this.courseInfo=this.courseSmall.courseInfo.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
            this.progressText=this.$util.getLongToTime(0)+'/'+this.$util.getLongToTime(this.courseSmall.resourceModel.resourceDuration);
          }
        },
        clickCourse(item,index){
          this.resetRecourse(item,index);
          this.onPlayUrl();
          this.show=false;
        },
        toDownload(){
            uni.navigateTo({
                url: '/pages/appdownload/index',
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.top{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50rpx;
  margin-bottom: 25rpx;
}

.top_title{
  font-weight: bold;
  color: #222222;
  font-size: 14px;
}

.top_desc{
  font-size: 12px;
  color: #777777;
  margin-top: 10rpx;
}

.center{
  width: 400rpx;
  height: 228rpx;
  padding:16rpx 0 25rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center_bg{
  width: 360rpx;
  height: 260rpx;
}

.intro{
    color: #3A3A3A;
    width: 659rpx;
    font-size: 22rpx !important;
    height: 461rpx;
    margin: 0 auto;
}
.progress_view{
  display: flex;
  flex-direction: row;
  width: 545rpx;
  align-items: center;
  justify-content: center;
  margin-top: 50rpx;
}

.progress_change1{
  width: 40rpx;
  height: 40rpx;
  margin-right: 100rpx;
}
.progress_change2{
  width: 40rpx;
  height: 40rpx;
  margin-left: 100rpx;
}

.center_play{
  position: absolute;
  width: 80rpx;
  height: 80rpx;
 
}
.seekIcon{
  width: 42rpx;
  height: 38rpx;
}
#progressBar{
    width:480rpx;
    height:5rpx;
    background:#B9BABA;
    margin:51rpx 17rpx 40rpx;
    position: relative;
}
#playProgressBar{
    background:red;
    opacity:0.95;
    border-radius:15rpx;
    position: absolute;
    top:0;
    left:0;
}
#playProgressText{
    width:130rpx;
    height:30rpx;
    background:rgba(98,101,102,1);
    opacity:0.95;
    border-radius:15rpx;
    text-align:center;
    font-size:20rpx;
    line-height: 30rpx;
    position: absolute;
    transform: translateY(-50%);;
    color: #fff;
}
.padding{
  background: #EFEFEF;
  height: 4rpx;
  width: 100%;
  margin-top: 50rpx;
}

.video{
    height:414rpx;
    width:100%;
    margin: 0 auto;
    position: relative;
}

.vip{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50rpx;
}

.vip_bg{
  width: 661rpx;
  height: 60rpx;
}

.vip_info{
  position: absolute;
  display: flex;
  height: 60rpx;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.vip_icon{
  width: 40rpx;
  height: 32rpx;
}

.vip_text{
  color: #D58E04;
  font-size: 12px;
  margin-left: 5rpx;
  margin-bottom: 5rpx;
}
.tabs{
  width: 100%;
  height: 80rpx;
  display: flex;
  flex-direction: row;
}

.tabtext{
  width: 50%;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  color: #777777;
  font-size: 14px;
}

.tabtext_select{
  width: 50%;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  color: #2A88C3;
  font-size: 14px;
}
.listIcon{
  position: absolute;
  right:55rpx;
  bottom: -12rpx;
  text-align: center;
  font-size: 20rpx;
  color: #888;
}
</style>