<template>
  <div>
    <div class="i-modal-mask i-class-mask" :class="visible ? 'i-modal-mask-show' : '' "></div>
    <div class="i-class i-modal" :class=" visible ? 'i-modal-show' : ''">
      <div class="i-modal-main">
        <div class="i-modal-content">
          <div class="i-modal-title" v-if="modalOption.title">{{ modalOption.title }}</div>
          <div class="i-modal-actions" v-if="actions && actions.length">
            <div v-if="actionMode === 'horizontal' ">
              <i-grid i-class="i-modal-grid">
                <i-grid-item
                  :class="actions.length === (index + 1) ? 'i-modal-grid-item-last' : 'i-modal-grid-item' "
                  v-for="(item,index) in actions" :key="item.name ">
                  <i-button long type="ghost" :data-index="index" v-on:click.stop="handleClickItem">
                    <view class="i-modal-btn-loading" v-if="item.loading"></view>
                    <i-icon v-if="item.icon" :type="item.icon" i-class="i-modal-btn-icon"></i-icon>
                    <view class="i-modal-btn-text" :style="item.color ? 'color: ' + item.color : '' ">{{ item.name }}
                    </view>
                  </i-button>
                </i-grid-item>
              </i-grid>
            </div>
            <div v-else>
              <div class="i-modal-action-vertical" v-for="(item,index) in actions" :key="item.name">
                <i-button long type="ghost" :data-index="index" v-on:click="handleClickItem">
                  <view class="i-modal-btn-loading" v-if="item.loading"></view>
                  <i-icon v-if="item.icon" :type="item.icon" i-class="i-modal-btn-icon"></i-icon>
                  <view class="i-modal-btn-text" :style="item.color ? 'color: ' + item.color : '' ">{{ item.name }}
                  </view>
                </i-button>
              </div>
            </div>
          </div>
          <div class="i-modal-actions" v-else>
            <i-grid i-class="i-modal-grid" v-if="showOk || showCancel">
              <i-grid-item i-class="i-modal-grid-item" v-if="showCancel">
                <i-button i-class="i-modal-btn-cancel" long type="ghost" v-on:click="handleClickCancel">{{ cancelText }}
                </i-button>
              </i-grid-item>
              <i-grid-item i-class="i-modal-grid-item-last" v-if="showOk">
                <i-button i-class="i-modal-btn-ok" long type="ghost" v-on:click="handleClickOk">{{ okText }}</i-button>
              </i-grid-item>
            </i-grid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-modal',
    props: {
      visible: {
        type: Boolean,
        value: false
      },
      modalOption: {
        type: Object,
        value: {}
      },
      showOk: {
        type: Boolean,
        value: true
      },
      showCancel: {
        type: Boolean,
        value: true
      },
      okText: {
        type: String,
        value: '确定'
      },
      cancelText: {
        type: String,
        value: '取消'
      },
      // 按钮组，有此值时，不显示 ok 和 cancel 按钮
      actions: {
        type: Array,
        value: []
      },
      // horizontal || vertical
      actionMode: {
        type: String,
        value: 'horizontal'
      },
      default: () => ({})
    },
    methods: {
      handleClickItem ({ currentTarget = {} }) {
        const dataset = currentTarget.dataset || {}
        const { index } = dataset
        if (index === 0) {
          this.handleClickCancel()
        } else {
          this.modalOption.clickEvent()
        }
      },
      handleClickCancel (evt) {
        this.$emit('click', evt)
        this.$emit('input', false)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../_sass/reset";

  .i-modal {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    display: flex;
    outline: 0;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transform: translateZ(1px);
    opacity: 0;
    visibility: hidden
  }

  .i-modal-show {
    visibility: visible;
    opacity: 1
  }

  .i-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .7);
    z-index: 1000;
    transition: all .2s ease-in-out;
    opacity: 0;
    visibility: hidden
  }

  .i-modal-mask-show {
    opacity: 1;
    visibility: visible
  }

  .i-modal-main {
    width: 270px;
    position: relative
  }

  .i-modal-content {
    border-radius: 7px;
    padding-top: 15px;
    position: relative;
    background-color: #fff;
    border: 0;
    background-clip: padding-box;
    text-align: center;
    height: 100%;
    overflow: hidden
  }

  .i-modal-body {
    max-height: 100px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #80848f;
    height: 100%;
    line-height: 1.5;
    overflow: auto
  }

  .i-modal-title {
    padding: 6px 15px 15px;
    margin: 0;
    font-size: 18px;
    line-height: 1;
    color: #1c2438;
    text-align: center
  }

  .i-modal-actions {
    margin: 0 1px
  }

  .i-modal-action-vertical {
    position: relative
  }

  .i-modal-action-vertical:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e9eaec;
    border-top-width: 1px
  }

  .i-modal-grid {
    border-radius: 0 0 7px 7px;
    border-left: none
  }

  .i-modal-grid-item, .i-modal-grid-item-last {
    padding: 0;
    border-bottom: none
  }

  .i-modal-grid-item-last {
    border-right: none
  }

  .i-modal-btn-ok {
    color: #2d8cf0 !important
  }

  .i-modal-btn-loading {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 12px;
    height: 12px;
    background: 0 0;
    border-radius: 50%;
    border: 2px solid #e5e5e5;
    border-color: #666 #e5e5e5 #e5e5e5 #e5e5e5;
    animation: btn-spin .6s linear;
    animation-iteration-count: infinite
  }

  .i-modal-btn-text {
    display: inline-block;
    vertical-align: middle
  }

  .i-modal-btn-icon {
    font-size: 14px !important;
    margin-right: 4px
  }

  @keyframes btn-spin {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }

</style>
