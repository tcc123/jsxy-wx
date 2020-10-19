<template>
    <view class="content">
        <view class="top">
            <img :src="courseInfo.coursePic" class="coursePic">
            <view class="courseBig">
				<image :src="courseInfo.coursePic" style="width:240rpx; height:180rpx;">
				</image>
				<view>
					<view class="courseName">{{ courseInfo.courseName }}</view>
					<view class="courseTitle">{{ courseInfo.courseTitle }}</view>
                    <view class="collectStatus">
                        <image class="star" mode="aspectFill" :src="courseInfo.isCollection?'/static/images/collect.png':'/static/images/uncollect.png'"></image>
                        <text class="collect" @click="collection">{{ courseInfo.isCollection ?'已收藏':'收藏' }}</text>
                    </view>
                    <view>
                        <view class="periodsTotal" v-if="courseInfo.periodsTotal>0">{{ '已更新'+courseInfo.courseNum+'期/共'+courseInfo.periodsTotal+'期' }}</view>
                        <view class="periodsTotal" v-else >{{ '已更新'+courseInfo.courseNum+'期' }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view :class="['bottom','wrap']">
            <uTabs ref="uTabs" :list="courseInfo.videoShowFlag==1?tabListOne:tabListTwo" :is-scroll="false" bar-height="5" active-color="#4494CC" inactive-color="#888" :current="current" @change="tabsChange" swiper-width="626"></uTabs>
            <swiper 
            :duration="100" 
            :current="swiperCurrent"
            @transition="transition"
            @animationfinish="animationfinish"
            class="swiper-box"
            >
                <swiper-item class="swiper-item">
                    <scroll-view id="intro" ref="intro" class="intro" scroll-y style="height: 100%;width: 100%;">
                        <rich-text :nodes="courseInfo.courseInfo" class="richText"></rich-text>
                    </scroll-view>
                </swiper-item>
                <swiper-item class="swiper-item">
                    <scroll-view id="catalogue" ref="catalogue" class="intro" scroll-y style="height: 100%;width: 100%;">
                        <course-list :play-index="playIndex" :normal-price="courseInfo.normalPrice" :vip-free="courseInfo.vipFree" :resource-list="audioList" @clickCourse="clickCourse"></course-list>
                    </scroll-view>
                </swiper-item>
                <swiper-item v-if="courseInfo.videoShowFlag==1" class="swiper-item">
                    <scroll-view id="catalogue" ref="catalogue" class="intro" scroll-y style="height: 100%;width: 100%;">
                        <course-list :play-index="playIndex" :normal-price="courseInfo.normalPrice" :vip-free="courseInfo.vipFree" :resource-list="videoList" @clickCourse="clickCourse"></course-list>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
import uTabs from 'uview-ui/components/u-tabs-swiper/u-tabs-swiper';
import courseList from '../../components/courseList/index';
export default {
    components:{
        uTabs,
        courseList
    },
    onLoad: function(options){
        this.courseId=options.courseId;
    },
    onShow(){
        uni.$on('changeCourse',(index)=>{
            this.playIndex=index;
        });
    },
    onUnload() {  
        // 移除监听事件  
        uni.$off('changeCourse');  
    },
    async mounted(){
        await this.getCourseInfo(this.courseId);
        await this.getResource('0');
        if(this.courseInfo.videoShowFlag==1){
            await this.getResource('1');
        }
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom(){
        if(this.current==1){
            if( this.queryAudio.no<Math.ceil(this.audioTotal/10)){
                this.queryAudio.no++;
                uni.showToast({
                    title: '加载中',
                    icon: 'loading'
                });
                this.getResource('0');
            }
        }else if(this.current==2){
            if( this.queryVideo.no<Math.ceil(this.videoTotal/10)){
                this.queryVideo.no++;
                uni.showToast({
                    title: '加载中',
                    icon: 'loading'
                });
                this.getResource('1');
            }
        }
    },
    data(){
        return{
            courseInfo:{},
            courseId:'',
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0,
            tabListOne:[{name:'详情'},{name:'听音频'},{name:'看视频'}],
            tabListTwo:[{name:'详情'},{name:'听音频'}],
            videoList:[],
            audioList:[],
            queryAudio: {
                no: 1,
                limit: 10,
            },
            queryVideo: {
                no: 1,
                limit: 10,
            },
            audioTotal: 0,
            videoTotal:0,
            playIndex:-1
        };
    },
    methods:{
        async getCourseInfo(courseId) {
            let url='api/apiCourse/courseInfoSelf?courseId=' + courseId;
			let res=await this.$http.request({
				url,
				method: 'post',
            });
            if(res.code==200){
                this.courseInfo= res.results,
                //格式化富文本img
                this.courseInfo.courseInfo=this.courseInfo.courseInfo.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
			}
        },
        async getResource(resourceType) {
            let url='api/apiCourse/course?parentId='+ this.courseId +'&resourceType=' + resourceType;
            let query=this.current===1? this.queryAudio:this.queryVideo;
            let res=await this.$http.request({
                url,
                method: 'post',
                params: query
            });
            if(res.code==200){
                if(resourceType==='0'){
                    this.audioList=[...this.audioList,...res.results];
                    this.audioTotal=res.total;
                }else{
                    this.videoList=[...this.videoList,...res.results];
                    this.videoTotal=res.total;
                }
            }
        },
        collection(){
            let url='api/apiCollection/collection?collectContentId=' + this.courseId;
			this.$http.request({
				url,
				method: 'post',
			}).then(res => {
                if(res.code==200){
                    this.getCourseInfo(this.courseId);
                }
            });
        },
        animationfinish(e){
            let current = e.detail.current;
            this.$refs.uTabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
        },
        // tabs通知swiper切换
        tabsChange(index) {
            this.swiperCurrent = index;
        },
        // swiper-item左右移动，通知tabs的滑块跟随移动
        transition(e) {
            let dx = e.detail.dx;
            this.$refs.uTabs.setDx(dx);
        },
        clickCourse(item,index){
            this.playIndex=index,
            uni.navigateTo({
                url: "/pages/course/index?courseId=" + this.courseId+'&courseIndex='+index+'&resourceType='+item.resourceModel.resourceType+'&normalPrice='+this.courseInfo.normalPrice+'&vipFree='+this.courseInfo.vipFree
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.top{
    height: 391rpx;
    position: relative;
}
.coursePic{
    width: 100%;
    height: 100%;
    -webkit-filter: blur(10rpx);
}
.courseBig{
    position: absolute;
    top: 146rpx;
    left: 44rpx;
    display: flex;
    align-items: center;
    .courseName{
        font-size:30rpx; 
        color:#fff;
        font-weight:500;
        padding-left: 22rpx;
        line-height: 100%;
    }
    .courseTitle{
        font-size:22rpx; 
        color:#fff;
        padding-left: 22rpx;
        line-height: 100%;
        margin: 15rpx 0 30rpx;
    }
    .collectStatus{
        position: relative;
        margin-left: 22rpx;
    }
    .collect{
        background: #FFFFFF;
        border-radius: 20rpx;
        padding: 9rpx 15rpx 9rpx 49rpx;
        font-size: 22rpx;
        line-height: 100%;
        color: #E8A850;
        display: inline-block;
    }
    .star{
        width: 30rpx;
        height: 28rpx;
        position: absolute;
        left: 12rpx;
        top:8rpx
    }
}
.bottom{
    border-radius: 30rpx;
    height: 100%;
    width: 100%;
    background: #fff;
    position: absolute;
    padding-top:23rpx;
    top:371rpx;
}
.nuter{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nomal{
    font-weight: 500;
    color: #888;
    font-size: 30rpx;
    line-height: 100%;
    display: inline-block;
    padding:23rpx 0;
}
.active{
    color: #a9b3b9;
    border-bottom: 5rpx solid #4494CC;
    transition:border-bottom 1s ease-in 0.5s ;
}
.periodsTotal{
    font-size: 20rpx;
    // color: #888888;
    padding-top: 10rpx;
    color:#fff;
    padding-left: 22rpx;
}
.intro{
    color: #454545;
    font-size: 24rpx;
    line-height: 40rpx;
    margin: 0 auto;
}
// .catalogue{
//     display:flex;
//     align-items: center;
//     justify-content:space-between;
//     padding-bottom:56rpx
// }
// .courseBigName{
//     width: 471rpx;
//     font-size:26rpx;
//     line-height:100%;
//     color:#343434;
//     padding-bottom:14rpx;
//     overflow: hidden;
//     text-overflow:ellipsis;
//     white-space: nowrap;
// }
// .lock{
//     width: 90rpx;
//     background: #4494CC;
//     border-radius: 19rpx;
//     font-size: 24rpx;
//     color: #FFFFFF;
//     text-align: center;
// }
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
    flex: 1;
    -webkit-overflow-scrolling: touch;
    padding:43rpx 53rpx 0;
}
.swiper-item {
    height: 100%;
}
</style>