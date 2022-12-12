// pages/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    email: '',
    password: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputMsg(event) {
      let type = event.currentTarget.id;
      this.setData({[type]: event.detail.value});
    },
    toLogin() {
      let {email, password} = this.data;
      wx.request({
        url: 'http://localhost:8080/user/api/login',
        method: 'POST',
        data: {
          'email': email,
          'password': password
        },
        success: (result) => {
          console.log(result.data)
        }
      });

    }
  }
})
