<template>
   <div class="search">
         <el-input v-if="showInput" @keypress.enter.native="$emit('search')" class="search-input" placeholder="请输入内容" v-model="content">
    <el-button slot="append" icon="el-icon-search" @click="$emit('search')" :loading="loading"></el-button>
  </el-input>
  <el-button type="primary" v-if="title" @click="$emit('click')">{{title}}</el-button>
      </div>
</template>

<script>
export default {
    name:'Search',
    props:{
        /**
         * 搜索loading
         */
        loading:Boolean,
        /**
         * 值
         */
        value:String,
        /**
         * 按钮标题
         */
        title:String,
    },    
  data() {
    return {
        /**
         * 搜索内容
         */
        content:'',
    };
  },
  methods: {},
  created() {},
  mounted() {},
  components: {},
  computed: {
      /**
       * 是否显示input
       */
      showInput(){
          return typeof this.value!=='undefined';
      }
  },
  watch: {
      /**
       * 如果搜索内容有更改，则更新v-model绑定的数据
       */
      content(value){
          this.$emit('input',value);
      }
  }
};
</script>

<style lang='scss' scoped>
.search{
    margin-bottom: 15px;
}
.search-input {
    width: 400px;
    margin-right: 20px;
  }
</style>
