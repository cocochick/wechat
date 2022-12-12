// pages/device/device.js
import config from "../../config/config"
import { request } from "../../utils/network";
Page({
  data: {
    deviceList: [],
  },
  async onLoad(options) {
    const url = config.host + "user/my?page=1&pageSize=10";
    const result = await request(url, {}, "GET");
    const list = [];
    result.records.forEach((id) => {
      list.push(id);
    })
    this.setData({deviceList: list});
  },
  onTap(event) {
    wx.setStorageSync('deviceId', event.target.dataset.deviceid);
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }

})