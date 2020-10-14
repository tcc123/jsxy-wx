/**
* 时间戳转日期时间
* @param {Number} time: 时间戳
* @param {String} format: 日期时间格式
* 使用方式: timestampToTime(1557285692393, 'Y-M-D h:m:s') // 2019-05-08 11:21:32
*/
function timestampToTime(time, format) {
  let timestamp;
  timestamp = time.length === 10 ? time * 1000 : time;
  if (!format) {
    format = "Y-M-D h:m:s";
  }
  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];
  let date = new Date(timestamp);
  returnArr.push(date.getFullYear());
  let m = date.getMonth() + 1;
  returnArr.push(m < 10 ? ('0' + m) : m);
  let d = date.getDate();
  returnArr.push(d < 10 ? ('0' + d) : d);
  let h = date.getHours();
  returnArr.push(h < 10 ? ('0' + h) : h);
  m = date.getMinutes();
  returnArr.push(m < 10 ? ('0' + m) : m);
  let s = date.getSeconds();
  returnArr.push(s < 10 ? ('0' + s) : s);
  for (let i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/**
* 时间戳转日期时间
* @param {Number} time: 时间戳
* @param {String} formatDay: 日期时间格式
* 使用方式: formatDay(1557285692393, 'Y年M月D日') // 2019年5月8日
*/
function formatDay(time, day) {
  let timestamp;
  timestamp = time.length === 10 ? time * 1000 : time;
  if (!day) {
    day = "Y日M月D日";
  }
  let formateArr = ['Y', 'M', 'D'];
  let returnArr = [];
  let date = new Date(timestamp);
  returnArr.push(date.getFullYear());
  let m = date.getMonth() + 1;
  returnArr.push(m);
  let d = date.getDate();
  returnArr.push(d);
  for (let i in returnArr) {
    day = day.replace(formateArr[i], returnArr[i]);
  }
  return day;
}

function getCookie(key) {
  let objCookie = {};
  let arrCookie = document.cookie.split(';') || [];
  arrCookie.forEach(item => {
    let arrItem = item.split('=');
    objCookie[arrItem[0].trim()] = arrItem[1];
  });
  return objCookie[key];
}
const getLongToTime = during => {
  var s = Math.floor(during / 1) % 60;
  if (s < 10) {
    s = '0' + s;
  }
  let i = Math.floor(during / 60);
  if (i < 10) {
    i = '0' + i;
  }
  during = Math.floor(during / 60);
  // var h = during % 24;
  during = Math.floor(during / 24);
  // var d = during;
  // return d + '天' + h + '时' + i + '分' + s + '秒';
  return i + ':' + s;
};
const getLongToTime1 = during => {
  var h = Math.floor(during / 3600);
  during = during % 3600;
  var m = Math.floor(during / 60);
  if (h > 0) {
    return h + '小时' + m + '分钟';
  } else {
    return m + '分钟';
  }
};
const geFormatTime = during => {
  var s = Math.floor(during / 1) % 60;
  if (s < 10) {
    s = '0' + s;
  }
  during = Math.floor(during / 60);
  // var i = during % 60;
  if (during < 10) {
    during = '0' + during;
  }
  return during + ':' + s;
};
// 对外暴露方法和内容
export const util = {
  timestampToTime: timestampToTime, // 时间戳转日期时间
  formatDay: formatDay, //时间戳转换日期格式（年月日）
  getCookie: getCookie,
  getLongToTime:getLongToTime,
  getLongToTime1:getLongToTime1,
  geFormatTime:geFormatTime
};
export default {
  install(Vue) {
      Vue.prototype.$util = util;
  }
};