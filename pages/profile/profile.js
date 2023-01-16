// pages/profile/profile.js
import config from "../../config/config"
import { request } from "../../utils/network";
Page({
  data: {
    show: false,
    focusing: false,
    id: "",
    password: "",
  },

  onLoad(options) {
    if (!wx.getStorageSync("userInfo")) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },

  async logout() {
    const url = config.host + "user/my/logout";
    await request(url, {}, 'GET');
    wx.clearStorageSync();
    wx.showToast({
      title: '注销成功',
    })
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }, 1000)
  },  
  device() {
    wx.navigateTo({
      url: '/pages/device/device',
    })
  },
  register() {
    this.setData({show: true});
  },
  inputMsg(event) {
    let type = event.currentTarget.id;
    this.setData({[type]: event.detail.value});
  },
  async toRegister() {
    const {id, password} = this.data;
    const url = config.host + "user/my?id=" + id + "&password=" + password;
    const result = await request(url, {}, "PUT");
    wx.showToast({
      title: '绑定成功',
    });
    this.setData({show: false});
  }
})