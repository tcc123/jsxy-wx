exports.returnPage = function(model) {
    console.log("*************util*********", model);
  
    var user = uni.getStorageSync('User');
    if(!user){
      uni.navigateTo({
        url: '/pages/login/index',
      });
      return;
    }
  
    var type = model.jumpType;
    var jumpPath = model.jumpPath;
   console.log(type,'ll');
    if(type == 0){
      uni.navigateTo({
        url: '/pages/course/index?courseId='+jumpPath,
      });
    }else if(type == 1){
      uni.navigateTo({
        url: '/pages/vip/index',
      });
    }else if(type == 2){
      uni.navigateTo({
        url: '/pages/webview/index?url='+jumpPath,
      });
    }else if(type == 3){
      uni.navigateTo({
        url: '/pages/category/index?categoryStr='+jumpPath,
      });
    }else if(type == 4){
      uni.navigateTo({
        url: '/pages/login/index',
      });
    }
  };