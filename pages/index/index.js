// index.js
import {formatTime} from '../../utils/util'
import config from '../../config/config'
import { request } from '../../utils/network'

// 获取应用实例
const app = getApp()

Page({
  data: {
    point: "",
    show: false
  },  
  onLoad() {
    if (wx.getStorageSync('userInfo') == "") {
      wx.showToast({
        title: '你还没有登录！',
        icon: 'error',
      })
      return;
    } else if (wx.getStorageSync('deviceId') == "") {
      wx.showToast({
        title: '请选择设备！',
        icon: 'error',
      })
      return;
    }
    const id = wx.getStorageSync('deviceId');
    this.interval = setInterval(async () => {
      let time = formatTime(new Date());
      const url = config.host + 'user/my/data?id=' + id + '&earliestTime=' + time;
      console.log("fetch");
      const result = await request(url, {noSign: true}, 'GET');
      this.setData({point: result.matrixStream, show: true});
    }, 1000);
  },
  onUnload() {
    clearInterval(this.interval);
  }
})
