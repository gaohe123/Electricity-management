<template>
      <el-dialog 
      :close-on-click-modal="false"
      :visible.sync="visible" 
      :title="title">
      <slot></slot>
      <!-- 按钮 -->
      <div slot="footer">
          <slot name="footer">
              <el-button @click="visible=false">取消</el-button>
              <el-button @click="$emit('confirm')" :loading="loading" type="primary">确定</el-button>
          </slot>
      </div>
    </el-dialog>
</template>

<script>
export default {
    name:'Dialog',
    props:{
        /**
         * 标题
         */
        title:String
    },
  data() {
    return {
        /**
         * 显示隐藏
         */
        visible:false,
        /**
         * loading
         */
        loading:false,
    };
  },
  methods: {
      /**
       * 开始loading
       */
      start(){
          this.loading=true;
      },
      /**
       * 停止loading
       */
      stop(){
          this.loading=false;
      },
      /**
       * 显示
       */
      show(){
          this.visible=true;
      },
      /**
       * 隐藏
       */
      hide(){
          this.visible=false;
      },
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
