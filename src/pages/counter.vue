<template>
  <!-- <div class="counter-warp"> -->
    <i-row>
      <i-col span="6" i-class="col-class">
        <i-cell-group>
          <!-- <i-cell title="全部"></i-cell> -->
          <block v-for="(item,index) in classify0" :key="index">
            <i-cell
              :title="item.name"
              i-class="no-active"
              @click="getChildClassifies(item.id)"
              :class="{active:item.id==active}"
            ></i-cell>
          </block>
        </i-cell-group>
      </i-col>
      <i-col span="18" i-class="col-class">
        <i-row>
          <block v-for="(item,index) in childClassifies" :key="index">
            <i-col span="8" i-class="col-class">
              <i-grid i-class="item-border">
                <i-grid-item i-class="item-border">
                  <i-grid-icon>
                    <image :src="item.img" />
                  </i-grid-icon>
                  <i-grid-label i-class="item-font">{{item.name}}</i-grid-label>
                </i-grid-item>
              </i-grid>
            </i-col>
          </block>
        </i-row>
      </i-col>
    </i-row>
  <!-- </div> -->
</template>

<script>
export default {
  config: {
    navigationBarTitleText: "商品分类"
  }, // 这个可以不在这写
  data() {
    return {
      // init
      active: 0,
      classifiesData: [],
      classify0: [
        {
          id: 0,
          img: "",
          name: "全部"
        }
      ],
      childClassifies: []
    };
  },
  /*
  生命周期开始
  */
  created() {
    this.getClassifiesEqZero();
    // 获取全部pid != 0 的
    this.getAllClassifiesNeqZero();
  },

  methods: {
    // init event
    async getClassifiesEqZero() {
      try {
        let data = await this.getClassifuies(0);
        console.log("data: ", data);
        this.classify0 = this.classify0.concat(data);
      } catch (e) {
        console.log(e);
      }
    },
    // click event
    async getChildClassifies(id) {
      this.active = id;

      try {
        if(id != 0){
          let data = await this.getClassifuies(id);
          console.log("data: ", data);
          this.childClassifies = data;
        }else{
          this.getAllClassifiesNeqZero();
        }
      } catch (e) {
        console.log(e);
      }
    },
    // get data
    getClassifuies(pid = 0) {
      return new Promise((resolve, reject) => {
        this.$ajax
          .getGoodsClassify({ pid })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    getAllClassifiesNeqZero() {
      new Promise((resolve, reject) => {
        this.$ajax
          .getAllClassify({ sum:99 })
          .then(({ data }) => {
            // resolve(data);
            console.log(data)
            this.childClassifies = data
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};
</script>
<style>
.counter-warp {
  background-color: #fff;
  text-align: center;
  /* margin-top: 10px; */
}
.item-border {
  border: none !important;
}
.item-font {
  font-size: 30rpx !important;
}
.no-active {
  background-color: #f1f1f1 !important;
}
.active {
  color: red;
  background-color: #ffffff !important;
  font-weight: bold;
}
</style>