<template>
  <div>
      <!-- template 是抽象组件  不渲染出来 -->
      <!-- <template v-if="!hasChildren">
          <el-tag v-for="item in children" :key="item.id">{{item.authName}}</el-tag>
      </template> -->
      <!-- <div>
          <div class="left"></div>
          <div class="right"></div>
      </div> -->
      
      <component :is="hasChildren ? 'div' : 'el-tag'"
       :class="{box:hasChildren}" 
       closable
       @close="delTag(item)"
       effect="dark"
       type='warning'
       v-for="item in children" 
       :key="item.id">
        <template v-if="hasChildren">
          <div class="left">
              <el-tag closable @close="delTag(item)" effect="dark"  type='success'>{{item.authName}}</el-tag>
          </div>
          <div class="right">
              <Tag v-on="$listeners" :roleId="roleId" v-if="item.children" :children="item.children"  effect="dark"  type='primary'/>
          </div>
        </template>
            <template v-else>
               {{item.authName}}
            </template>
      </component>
 </div>
</template>

<script>
//递归，就是自己调用自己
//组件递归  组件调用自身组件
//递归结束条件
import { deleteTag } from "@/api/role";
export default {
    name:'Tag',  //其中的一个作用就是组件递归
    props:{
        /**
         * 角色数据
         */
        roleId:{
            required:true,
            type:Number
        },
        /**
         * 子数据
         */
        children:{
            type:Array,
            default:()=>[],
        },
    },
  data() {
    return {};
  },
  methods: {
      /**
       * 删除标签
       */
      async delTag(row){
          let res;
          try {
              res=await this.$confirm(`您确定要删除【${row.authName}】吗？`);
              await deleteTag(this.roleId,row.id);
              this.$m.success('删除成功');
              this.$emit('update');
          } catch (error) {
              
          }
          res && res();
      },
  },
  created() {},
  mounted() {},
  components: {},
  computed: {
      /**
       * 是否有下一层
       */
      hasChildren(){
          return this.children[0] && !!this.children[0].children
      },
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.box{
    display: flex;
    align-items: center;
    border: 1px solid #efefef;
    .left{
        padding: 20px;
    }
    .right{
        flex: 1;
        .el-tag{
            margin-right: 10px;
        }
    }
}
</style>
