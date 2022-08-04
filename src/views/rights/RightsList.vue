<template>
  <Table :data="list" :cols="cols">
      <template v-slot:level="{row}">
        <el-tag :type="colors[row.level]">{{level[row.level]}}级</el-tag>
      </template>
  </Table>
</template>

<script>
import {getRights} from '@/api/role';
/**
 * 等级
 */
const level=['一','二','三']
/**
 * 颜色
 */
const colors=['','success',"warning"]
/**
 * 列
 */
const cols=[
    {
        title:'#',
        type:'index'
    },
    {
        title:'权限名称',
        name:'authName'
    },
    {
        title:'路径',
        name:'path'
    },
    {
        title:'权限等级',
        slot:"level"
    },
]
export default {
    name:'Rights',
  data() {
    return {
        level,
        colors,
        cols,
        /**
         * 数据列表
         */
        list:[],
    };
  },
  methods: {
      async getRightsList(){
          try {
              this.list=await getRights()
          } catch (error) {
              
          }
      }
  },
  created() {
      this.getRightsList()
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
