// pages/login/login.js
import {request} from "../../utils/network"
import config from "../../config/config"
Page({
  data: {
    email: '',
    password: '',
    captcha: '',
    register: false,
  },

  onLoad() {
    
  },
  /**
   * 组件的方法列表
   */
  inputMsg(event) {
    let type = event.currentTarget.id;
    this.setData({[type]: event.detail.value});
  },
  async toLogin() {
    let {email, password} = this.data;
    let url = config.host + "user/api/login";
    let method = "POST";
    let data = {
      "email" : email,
      "password": password,
      "isLogin": true,
    };
    let result = await request(url, data, method);
    wx.showToast({
      title: '登录成功',
    });
    wx.setStorageSync('userInfo', JSON.stringify(result));
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/profile/profile',
      });
    }, 1000)
  },
  register() {
    this.setData({"register": !this.data.register});
  },
  async toGetCaptcha() {
    let {email} = this.data;
    let url = config.host + "user/api?email=" + email;
    let result = await request(url, {}, 'GET');
    wx.showToast({
      title: result,
    });
  },
  async toRegister() {
    let {email, password, captcha} = this.data;
    let url = config.host + "user/api";
    let method = "POST";
    let data = {
      "email" : email,
      "password": password,
      "captcha": captcha,
    };
    let result = await request(url, data, method);
    wx.showToast({
      title: '注册成功',
    });
    setTimeout(() => {
      this.setData({register: false});
    }, 1000)
  }
})
