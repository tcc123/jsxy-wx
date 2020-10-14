<script>
	export default {
		onLaunch: function() {
			// #ifndef H5
      // 小程序检测版本升级
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log("版本检查", res.hasUpdate);
      });
      updateManager.onUpdateReady(function() {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
      // #endif

      // 展示本地存储能力
      var logs = uni.getStorageSync('logs') || [];
      logs.unshift(Date.now());
      uni.setStorageSync('logs', logs);

      // 登录
      uni.login({
        // success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // }
      });
      // 获取用户信息
      uni.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            uni.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo;

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res);
                }
              }
            });
          }
        }
      });
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
    globalData: {
      userInfo: null
    }
	};
</script>

<style lang="scss" >
@import "../node_modules/uview-ui/index.scss";
/*每个页面公共css */
page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
image {
  display: block;
}
view {
  box-sizing: border-box;
}
button::after {
  border: none;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
 /* 公用样式 */
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-row-start {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.flex-col-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/*单行溢出*/
.one-txt-cut {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/*多行溢出*/
.txt-cut {
  overflow : hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} 
.padding{
  background: #EFEFEF;
  height: 10rpx;
}
.nodata{
  width: 100%;
  padding-top: 500rpx;
  text-align: center;
  line-height: 100%;
  color: #999999;
}
.line{
  width: 100%;
  height: 1px;
  background-color: #efefef;
}
</style>
