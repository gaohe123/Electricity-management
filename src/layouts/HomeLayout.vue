<template>
  <div class="wrapper">
      <header>
        <h2 style="color:#fff">&emsp;电商管理平台</h2>
        <el-button @click="exit" type="" class="tcdl">退出</el-button>
      </header>
      <div class="bottom">
        <!-- 左侧导航 -->
          <aside>
            <el-menu router background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :unique-opened='true'>
      <el-submenu v-for="item in menus" :index="item.id+''" :key="item.id">
        <span slot="title">{{item.authName}}</span>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children"
           :key="child.id"
            :index="child.id+''"
            :route="'/'+child.path"
            >{{child.authName}}</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
    </el-menu>
          </aside>
          <main>
            <el-breadcrumb v-if="parentName" class="breadcrumb" separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{parentName}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{childName}}</el-breadcrumb-item>
</el-breadcrumb>
            <div class="content">
              <router-view />
            </div>
          </main>
      </div>
 </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "HomeLayout",
  data() {
    return {
      /**
       * 父菜单名称
       */
      parentName:'',
      /**
       * 子菜单名称
       */
      childName:''
    };
  },
  methods: {
    /**
     * 查找菜单
     */
    findMenu(){
      const path =this.$route.path.replace("/","");  //当前路径
      for(const parent of this.menus){  //遍历第一级菜单
        for(const child of parent.children){  //遍历第二级菜单
          if(child.path===path){
            //如果第二级菜单的路径跟当前页面的路径一致
            this.childName=child.authName
            this.parentName=parent.authName
            console.log(child,parent);
            return;
          }
        }
      }
      // console.log(path);
    },


    async exit() {
      try {
        await this.$mb.confirm("您确定退出吗？");
        this.$store.dispatch("exit");
      } catch (error) {}
    }
  },
  created() {},
  mounted() {
    this.findMenu();
  },
  updated() {  
    this.findMenu()
  },
  components: {},
  computed: {
    ...mapState(['menus'])
  },
  watch: {}
};
</script>

<style lang='scss' scoped>


  .tcdl{
    position: absolute;
    right: 50px;
    top: 10px
  }
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    background-color: #373d41;
    height: 60px;
    flex-shrink: 0;
  }

  .bottom {
    flex: 1;
    display: flex;
    overflow: hidden;
    main {
      flex: 1;
      height: 100%;
      overflow: hidden;
      background-color: #eaedf1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      .content {
        flex: 1;
        margin-top: 15px;
        overflow: auto;
        // max-height: 100%;
        background-color: #fff;
        border-radius: 3px;
        padding: 20px;
        border:1px solid #ebeef5;
        box-shadow: 0 1px 1px rgba(0,0,0,0.15);
      }
      .breadcrumb{
        font-size: 12px;
      }
    }
    aside {
      width: 200px;
      background-color: #333744;
      & > ul {
        overflow: hidden;
      }
    }
  }
}
</style>
