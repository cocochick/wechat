export function request(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies') : ''
      },
      success: (result) => {
        if (data.isLogin) { // 登录请求
          // 将用户的cookie存入本地
          console.log(result.header["Set-Cookie"]);
          wx.setStorageSync('cookies', result.header["Set-Cookie"]);
        }
        resolve(result.data)
      },
      fail: (err) => {
        // console.log('请求失败', err)
        reject(err)
      }
    })
  })
}