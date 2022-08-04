<template>
  <div>
    <!-- 搜索区 -->
    <Search :loading="loading" v-model="queryModel.query"
     @click="addModel={};visible=true;"
     @search="queryModel.pagenum=1;searchUser()"
     title="添加用户"
     ></Search>
      <!-- <div class="search">
         <el-input class="search-input" placeholder="请输入内容" v-model="queryModel.query">
    <el-button slot="append" icon="el-icon-search" @click="queryModel.pagenum=1;searchUser()" :loading="loading"></el-button>
  </el-input>
  <el-button type="primary" @click="addModel={};visible=true;">添加用户</el-button>
      </div> -->
      <!-- 列表 表格 -->
      <!-- 双向绑定page change事件包含pagesize和pagenum的改变 -->
      <Table :data="list" :cols="cols" :total="total" v-model="queryModel" @change="searchUser">
        <!-- 状态 -->
        <template v-slot:state="{row}">
          <el-switch @change="(value)=>changeState(row,value)"
              v-model="row.mg_state"  active-color="#13ce66"
                        inactive-color="#ff4949"
            ></el-switch>
        </template>
        <!-- 操作 -->
        <template v-slot:action="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="addModel={...row};visible=true;"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delUser(row)"></el-button>
          <el-button type="warning" size="small" icon="el-icon-s-tools" :loading="roleLoading" @click="addModel={...row};getRolesList();"></el-button>
        </template>
      </Table>
      <!-- <el-table stripe border :data="list" row-key="id">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态" :width="80">
          <template v-slot="{row}">
           <el-switch @change="value=>changeState(row,value)" v-model="row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="addModel={...row};visible=true;"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delUser(row)"></el-button>
          <el-button type="warning" size="small" icon="el-icon-s-tools" :loading="roleLoading" @click="addModel={...row};getRolesList();"></el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- 分页 -->
      <!-- <el-pagination
      @size-change="(size)=>{
        queryModel.pagesize=size;
        searchUser();
      }"
      @current-change="(num)=> {
        queryModel.pagenum=num;
        searchUser();
      }"
      class="pagination"
      :current-page="queryModel.pagenum"
      :page-size="queryModel.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->


      





    <!-- 添加弹窗 -->
    <el-dialog :close-on-click-modal="false" label-width="70px" :visible.sync="visible" :title="(isAdd ? '添加' : '编辑')+'用户'">
      <el-form ref="form" :model="addModel" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input :disabled="!isAdd" :maxlength="10" v-model="addModel.username"></el-input>
        </el-form-item>
        <el-form-item v-if="isAdd" label="密码" prop="password">
          <el-input :maxlength="16" type="password" v-model="addModel.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input :maxlength="20" v-model="addModel.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input :maxlength="11" v-model="addModel.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
          <el-button @click="visible=false">取消</el-button>
          <el-button @click="addUser" :loading="addLoading" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <!-- 角色 -->
    <el-dialog :close-on-click-modal="false" label-width="70px" :visible.sync="assignVisible" title="分配角色">
      <p>当前的用户:{{addModel.username}}</p>
      <p>当前的角色:{{addModel.role_name}}</p>
      <p>
        分配新角色:<el-select placeholder="请选择角色" v-model="addModel.role_name">
                     <el-option 
                     v-for="item in roleList"
                     :key="item.id"
                     :label="item.roleName"
                     :value="item.id"
                     ></el-option>
                   </el-select>
      </p>
      <div slot="footer">
          <el-button @click="assignVisible=false">取消</el-button>
          <el-button @click="assignUserRole" :loading="addLoading" type="primary">确定</el-button>
      </div>
    </el-dialog> 
 </div>
</template>

<script>
import {
  search,
  switchState,
  add,
  update,
  deleteUser,
  assignRole
} from "@/api/user";
import { getRoles } from "@/api/role";

// import Pagination from "@/components/Pagination"


const cols = [
  {
    title: "#",
    type: "index"
  },
  {
    title: "姓名",
    name: "username"
  },
  {
    title: "邮箱",
    name: "email"
  },
  {
    title: "电话",
    name: "mobile"
  },
  {
    title: "角色",
    name: "role_name"
  },
  {
    title: "状态",
    slot: "state",
    width:80
  },
  {
    title:'操作',
    slot:'action',
    align:'center'
  }
];

export default {
  name: "List",
  // components:{Pagination},
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "用户名不能为空" },
          { min: 3, max: 10, message: "用户名长度为3-10位" }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 15, message: "密码长度为6-15位" }
        ],
        email: [
          { required: true, message: "邮箱不能为空" },
          {
            validator(rule, value, callback) {
              if (/^[\w-+\.]+@[\w-+]+\.[a-z0-9]+$/i.test(value)) {
                return callback();
              }
              callback(new Error("邮箱格式错误"));
            }
          }
        ],
        mobile: [
          { required: true, message: "手机号不能为空" },
          {
            validator(rule, value, callback) {
              if (/^1[3-9]\d{9}$/.test(value)) {
                return callback();
              }
              callback(new Error("手机号格式错误"));
            }
          }
        ]
      },
      /**
       * 角色loading
       */
      roleLoading: false,
      /**
       * 角色列表
       */
      roleList: [],
      /**
       * 分配角色是否显示
       */
      assignVisible: false,
      /**
       * 添加模型
       */
      addModel: {},
      /**
       * 添加显示隐藏
       */
      visible: false,
      /**
       * 搜索状态
       */
      loading: false,
      /**
       * 添加的loading
       */
      addLoading: false,
      /**
       * 用户列表
       */
      list: [],
      /**
       * 总条数
       */
      total: 0,
      /**
       * 搜索模型
       */
      queryModel: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      /**
       * 列
       */
      cols
    };
  },
  methods: {



//     handleSizeChange(val) {
//             this.queryModel.pagesize = val
//                       this.getGoods();   

//         },
//         handleCurrentChange(val) {
//             this.queryModel.pagenum = val
//                       this.getGoods();  

//         },
    /**
     * 分配用户角色
     */
    async assignUserRole() {
      try {
        this.addLoading = true;
        await assignRole(this.addModel.id, this.addModel.role_name);
        this.$m.success("角色分配成功");
        this.assignVisible = false;
      } catch (error) {}
      this.addLoading = false;
    },
    /**
     * 获取角色列表
     */
    async getRolesList() {
      try {
        this.roleLoading = true;
        this.roleList = await getRoles();
        this.assignVisible = true;
        this.searchUser();
      } catch (error) {}
      this.roleLoading = false;
    },
    /**
     * 删除用户
     */
    async delUser(row) {
      let close;
      try {
        close = await this.$confirm(`您确定要删除【${row.username}】吗？`);
        await deleteUser(row.id);
        this.$m.success("删除成功");
        this.searchUser();
      } catch (error) {}
      close && close();
    },
    /**
     * 添加用户
     */
    async addUser() {
      try {
        await this.$refs.form.validate();
        this.addLoading = true;
        await (this.isAdd ? add : update)(this.addModel);
        this.$m.success(this.isAdd ? "添加成功" : "修改成功");
        this.visible = false;
        this.searchUser();
      } catch (error) {}
      this.addLoading = false;
    },
    /**
     * 修改状态
     */
    async changeState(row, value) {
      try {
        await switchState(row.id, value);
        this.$m.success("状态变更成功");
        this.searchUser();
      } catch (error) {}
    },
    /**
     * 搜索用户
     */
    async searchUser() {
      try {
        this.loading = true;
        const { total, users } = await search(this.queryModel);
        this.list = users;
        this.total = total;
      } catch (error) {}
      this.loading = false;
    }
  },
  created() {
    this.searchUser();
  },
  mounted() {},
  components: {},
  computed: {
    /**
     * 是否为添加
     */
    isAdd() {
      //如果做修改的时候，吧行数据赋值给addModel 行数据中有id，username等字段，那么可以依据其中的一个字段
      //做判断 如果是添加的话 我们会把对象清空，所以就没有id username等字段
      return this.addModel.id ? false : true;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.search {
  margin-bottom: 15px;
  .search-input {
    width: 400px;
    margin-right: 20px;
  }
  & > button {
  }
}
.pagination {
  margin-top: 15px;
}
</style>
