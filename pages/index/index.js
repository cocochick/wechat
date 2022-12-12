// index.js
import { createScopedThreejs } from 'threejs-miniprogram'
const { renderModel } = require('../../test-cases/test.js')

// 获取应用实例
const app = getApp()

Page({
  data: {
  },  
  onLoad() {
  },
  onTap() {
    wx.reLaunch({
      url: '/pages/profile/profile',
    })
  }

})
