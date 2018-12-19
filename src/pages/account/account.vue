<template>
  <div class="account">
    <button open-type="openSetting">
      授权
    </button>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
      获取用户信息
    </button>
  </div>
</template>

<script>
  export default {
    name: 'account',
    methods: {
      getUserInfo (e) {
        console.log(e.mp.detail.userInfo)
      }
    }
  }
</script>

<style scoped>

</style>
