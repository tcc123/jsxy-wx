<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
export default {
    data(){
        return{
            url: ""
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options){
        this.url=options.url;
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(){
        var url = this.url;
        return {
            url: url,
            path: 'pages/webview/webview?url=' + url
        };
    }
};
</script>

<style lang="scss" scoped>

</style>