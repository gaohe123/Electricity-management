<template>
  <div class="wrapper">
    <!-- {{$store.state.user}} -->
     <div class="box">
       <div class="logo">
         <img src="@/assets/logo.png" alt="">
       </div>
       <div class="from">
         <el-form ref="form" :model="model" :rules="rules">
           <el-form-item prop="username">
             <!-- 用户名 -->
             <el-input :maxlength="10" v-model="model.username" style="300px"><i slot="prefix" class="el-input__icon el-icon-user-solid"></i></el-input>
           </el-form-item>
           <el-form-item prop="password">
             <!-- 密码 -->
             <el-input type="password" :maxlength="15" v-model="model.password" style="300px"><i slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
           </el-form-item>
           <!-- 按钮 -->
           <el-form-item>
             <el-button @click="userLogin" type="primary" :loading="loading" class="dl">登录</el-button>
             <el-button @click="reset">重置</el-button>
           </el-form-item>
         </el-form>
       </div>
     </div>
 </div>
</template>

<script>
import { login } from "@/api/user";
import { getMenus} from "@/api/menu";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      /**
       * 登录loading
       */
      loading:false,
      /**
       * 规则
       */
      rules:{
        /**
         * 用户名规则
         */
        username:[
          {
            required:true,
            message:'用户名不能为空'
          },
          {
            min:3,
            max:10,
            message:'用户名长度为3-10位'
          }
        ],
        /**
         * 用户名规则
         */
        password:[
          {
            required:true,
            message:'密码不能为空'
          },
          {
            min:6,
            max:15,
            message:'用户名长度为6-15位'
          }
        ]
      },
      /**
       * 登录数据模型
       */
      model:{
        username:'admin',
        password:'123456'
      }
    };
  },
  methods: {
    ...mapMutations(['setMenus',"setUser"]),
    /**
     * 用户登录
     */
    async userLogin(){
      try{
        this.loading=true;
        const data=await login(this.model);
        this.setUser(data);  //登陆成功  把登录后的信息放到vuex中
        const menus=await getMenus();  //菜单数据
        this.setMenus(menus)
        this.$router.push({name:'homelayout'});
        console.log(data);
      } catch(error){
        console.log(error);
      }
      this.loading=false;
    },
    /**
     * 重置
     */
    reset(){
      this.model={
        username:'',
        password:''
      }
      this.$refs.form.resetFields();
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
};
import "../../styles/index.scss";
</script>

<style lang='scss' scoped>
  .from{
    margin-top: 100px;
    margin-left: 20px;
  }
  .dl{
    margin-left: 250px;
  }
  .el-input{
    width: 400px;
  }
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .box{
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .logo{
      width: 152px;
      height: 152px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #eee;
      position: absolute;
      left: 50%;
      top: -76px;
      margin-left: -76px;
      box-shadow: 0 0 10px #ddd;
      padding: 10px;
      img{
        width: 100%;
        height: 100%;
        background-color: #eee;
        border-radius: 50%;
      }
    }
  }
}
</style>
