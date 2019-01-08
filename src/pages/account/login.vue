<template>
  <div class="login">
    <button open-type="openSetting">
      授权
    </button>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfos">
      获取用户信息
    </button>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {}
    },
    method: {
      getUserInfos () {
        let that = this
        console.log(that)
        wx.getUserInfo({
          withCredentials: true,
          success (res) {
            if (that.isTokenTimeOut() || !wx.getStorageSync('token')) {
              that.WxToLogin(res)
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

</style>
