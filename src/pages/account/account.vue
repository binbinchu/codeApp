<template>
  <div class="account">
    <button open-type="openSetting">
      授权
    </button>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
     登录
    </button>
  </div>
</template>

<script>
  export default {
    name: 'account',
    methods: {
      ToLogin () {
        wx.login({
          success (res) {
            console.log(res)
          }
        })
      },
      getUserInfo (e) {
        wx.getUserInfo({
          success (res) {
            console.log(res)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
