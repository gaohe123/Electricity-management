<template>
  <div>
      <!-- 添加角色 -->
      <Search title="添加角色" @click="model={};$refs.dialog.show()"></Search>
      <!-- <div class="top">
          <el-button type="primary" @click="model={};$refs.dialog.show()">添加角色</el-button>
      </div> -->
      <Table
       :tree-props="{children: 'wzh'}" 
       :cols="cols"
       :data="list">
       <!-- 操作 -->
       <template v-slot:action="{row}">
           <!-- <el-button size="mini" type="primary" @click="model={...row};$refs.dialog.show();">编辑</el-button> -->
           <!-- <el-button size="mini" type="primary" @click="delRole(row)">删除</el-button> -->
           <!-- <el-button size="mini" type="primary" @click="getRgiths(row)" :loading="assignLoading">分配权限</el-button> -->
            <el-button type="primary" size="small" icon="el-icon-edit" @click="model={...row};$refs.dialog.show();"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delRole(row)"></el-button>
          <el-button type="warning" size="small" icon="el-icon-s-tools" :loading="assignLoading" @click="getRgiths(row)"></el-button>
       </template>
       <!-- 展开列 -->
       <template v-slot:expand="{row}">
           <Tag @update="getRoleList" :roleId="row.id" :children="row.children" />
       </template>
       </Table>
       <!-- 添加修改 -->
       <DF @confirm="confirm" :title="title+'角色'" ref="dialog" :value="model" :opts="opts" />
       <!-- <Dialog @confirm="confirm" :title="title+'角色'" ref="dialog">
           <Form ref="form" :value="model" :opts="opts"></Form>
       </Dialog> -->
       <!-- 分配权限 -->
       <Dialog ref="assign" title="分配权限" @confirm="modifyRights">
         <el-tree
         default-expand-all
         ref="tree"
         :default-checked-keys="defaultCheckedKeys"
         :data="rightsList"
         show-checkbox
         node-key="id"
         :props="{
          children: 'children',
          label: 'authName'
        }">
        </el-tree>
       </Dialog>
 </div>
</template>

<script>
import { getRoles, addRole, updateRole, deleteRole ,getRightsList ,updateRights} from "@/api/role";
import Tag from "./components/Tag";
const opts = {
  roleName: {
    title: "角色名称",
    tag: "input",
    max: 18,
    dis: false,
    value: "",
    required: true,
    rules: [
      {
        min: 2,
        max: 10
      }
    ]
  },
  roleDesc: {
    title: "角色描述",
    tag: "input",
    max: 100,
    dis: false,
    value: "",
    required: true
  }
};
const rules = {
  roleName: [
    {
      required: true,
      message: "角色名称不能为空"
    },
    {
      min: 2,
      max: 10,
      message: "角色名称长度为2-10位"
    }
  ]
};
const cols = [
  {
    title: "#",
    type: "index"
  },
  {
    title: "",
    type: "expand",
    slot: "expand"
  },
  {
    title: "角色名称",
    name: "roleName",
    align: "center"
  },
  {
    title: "角色描述",
    name: "roleDesc",
    align: "center"
  },
  {
    title: "操作",
    width:280,
    align:'center',
    slot: "action"
  }
];
export default {
  name: "RoleList",
  data() {
    return {
      opts,
      /**
       * 规则
       */
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空" },
          { min: 2, max: 8, message: "角色名称长度为2-8位" }
        ],
        roleDesc: [
          { required: true, message: "角色描述不能为空" },
          { max: 100, message: "角色描述最大为100" }
        ]
      },
      /**
       * 添加修改的数据模型
       */
      model: {},
      /**
       * 角色列表
       */
      list: [],
      /**
       * 权限列表
       */
      rightsList:[],
      /**
       * 权限loading
       */
      assignLoading:false,
      /**
       * 默认选中
       */
      defaultCheckedKeys:[],
      cols
    };
  },
  methods: {
    /**
     * 修改权限
     */
    async modifyRights(){
      const d=this.$refs.assign;
      try {
        const tree=this.$refs.tree;
        const keys=[...tree.getCheckedKeys(),tree.getHalfCheckedKeys()];
        d.start();
        await updateRights(this.model.id,keys.toString());
        d.hide();
        this.$m.success('权限修改成功');
        this.getRoleList();
      } catch (error) {
        
      }
      d.stop()
    },
    /**
     * 获取权限列表
     */
    async getRgiths(row){
      try {
        this.model=row;
        this.defaultCheckedKeys=[];
        const deep=(children)=>{
          for(const item of children){
            if(!item.children){
              this.defaultCheckedKeys.push(item.id);
              continue;
            }
            if(item.children.length){
              deep(item.children)
            }
          }
        };
        deep(row.children);
        this.assignLoading=true
        this.rightsList=await getRightsList();
        this.$refs.assign.show();
      } catch (error) {
        console.log(error);
      }
      this.assignLoading=false
    },
    /**
     * 删除
     */
    async delRole(row) {
      let res;
      try {
        res = await this.$confirm(`您确定要删除【${row.roleName}】吗？`);
        await deleteRole(row.id);
        this.$m.success("删除成功");
        this.getRoleList();
      } catch (error) {}
      res && res();
    },
    /**
     * 提交
     */
    async confirm(model) {
      const d = this.$refs.dialog;
      try {
        // const model = await this.$refs.form.validate();
        d.start();
        await (model.id ? updateRole : addRole)(model);
        this.$m.success(this.title + "成功");
        this.getRoleList();
        d.hide();
      } catch (error) {
        console.log(error);
      }
      d.stop();
    },
    /**
     * 获取角色列表
     */
    async getRoleList() {
      try {
        this.list = await getRoles();
      } catch (error) {}
    }
  },
  created() {
    this.getRoleList();
  },
  mounted() {},
  components: { Tag },
  computed: {
    /**
     * 标题
     */
    title() {
      return this.model.id ? "编辑" : "添加";
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
