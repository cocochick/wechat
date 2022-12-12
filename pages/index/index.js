// index.js
import { createScopedThreejs } from 'threejs-miniprogram'
const { renderModel } = require('../../test-cases/test.js')

// 获取应用实例
const app = getApp()

Page({
  data: {
  },  
  onLoad() {
    /*
    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        this.canvas = canvas
        const THREE = createScopedThreejs(canvas)
        
        // renderSphere(canvas, THREE)
        // renderCube(canvas, THREE)
        // renderCubes(canvas, THREE)
        renderModel(canvas, THREE)
      })
      */
  },

})
