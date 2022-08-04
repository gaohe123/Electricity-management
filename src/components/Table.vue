<template>
  <div>
      <!-- 表格 -->
      <el-table stripe border :row-key="rowKey" :data="data" :tree-props="treeProps"> 
          <el-table-column v-for="(item,index) in cols"
          :key="index"
          :label="item.title"
          :type="item.type"
          :prop="item.name"
          :width="item.width"
          :align="item.align"
           >
           <template v-if="item.slot" v-slot="{row,$index,column}">
              <slot :name="item.slot" :row="row" :index="$index" :column="column"></slot>
           </template>
           </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      v-if="page.pagesize"
      @size-change="(size)=> change('pagesize',size)"
      @current-change="(num)=> change('pagenum',num)"
      class="pagination"
      :current-page="page.pagenum"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
export default {
    name:'Table',
    props:{
        /**
         * 对应table的rowKey
         */
        
        rowKey:{
            type:String,
            default:'id'
        },
        /**
         * 数据
         */
        data:{
            required:true,
            type:Array,
            default:()=>[]
        },
        /**
         * 列
         */
        cols:{
            required:true,
            type:Array,
            default:()=>[]
        },
        /**
         * 树形数据结构
         */
        treeProps:{
            type:Object,
            default:()=>({children: 'children', hasChildren: 'hasChildren'})
        },
        
        /**
         * 分页
         */
        value:{
            type:Object,
            default:()=>{}
        },
        /**
         * 总条数
         */
        total:Number,
    },
  data() {
    return {};
  },
  methods: {
      /** 
       * 分页或者每页显示条数变更
      */
      change(type,value){
          const obj={...this.value,[type]:value}
          this.$emit('input',obj)
          this.$emit('change', obj)
      },
  },
  created() {},
  mounted() {},
  components: {},
  computed: {
      /**
       * 分页
       */
      page(){
          return this.value || {};
      }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.pagination{
    margin-top: 15px;
}
</style>
