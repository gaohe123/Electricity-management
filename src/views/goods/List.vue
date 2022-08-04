<template>
  <div>
      <Search :loading="loading" v-model="queryModel.query" @search="getGoods" @click="model={};$refs.df.show();" title="添加商品"></Search>
      <Table rowKey="goods_id" :data="list" :cols="cols" :total="total" v-model="queryModel"  @change="getGoods">
          <template v-slot:time="{row:{add_time}}">
              {{new Date(add_time*1000).format()}}
          </template>
          <template v-slot:action="{row}">
             <!-- <el-button size="mini" type="primary" @click="model={...row};$refs.df.show();">编辑</el-button> -->
             <el-button type="primary" icon="el-icon-edit"  size="mini" @click="model={...row};$refs.df.show();"></el-button>
             <el-button size="mini" type="danger" icon="el-icon-delete" @click="delshoop(row)"></el-button>
          </template>
      </Table>


      <!-- <Pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :total="total" :pagenum="queryModel.pagenum"></Pagination> -->
      


      <!-- 添加修改 -->
      <DF ref="df" @confirm="confirm" :title="title+'商品'" :value="model" :opts="opts"></DF>
 </div>
</template>

<script>
import { getGoodsList,addGoods,delgoods} from "@/api/goods";
// import { debuglog } from 'util';
// import Pagination from "@/components/Pagination"
/**
 * 列
 */
const cols = [
  {
    title: "#",
    type: "index"
  },
  {
    title: "商品名称",
    name: "goods_name"
  },
  {
    title: "商品价格(元)",
    name: "goods_price",
    width: 130
  },
  {
    title: "商品重量",
    name: "goods_weight",
    width: 100
  },
  {
    title: "创建时间",
    align: "cneter",
    width: 170,
    slot: "time"
  },
  {
    title: "操作",
    slot: "action",
    align: "cneter",
    width: 150
  }
];
export default {

  name: "GoodsList",
  // components:{Pagination},
  data() {
    return {
      /**
       * 添加修改模型
       */
      model: {},
      cols,
    //   opts,
      /**
       * 总条数
       */
      total: 0,
      loading: false,
      /**
       * 商品列表
       */
      list: [],
      /**
       * 查询模型
       */
      queryModel: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
      /**
       *商品删除
      */
     async delshoop(row){
       console.log(1111);
       let res;
       try {
        res=await this.$confirm(`您确定要删除【${row.goods_name}】吗？`)
         await delgoods(row.goods_id)
         this.$m.success('删除成功')
         this.getGoods(); 
       } catch (error) {
         console.log(222);
       }
       res && res();
     },

    // 分页事件

//      handleSizeChange(val) {
//             this.queryModel.pagesize = val
//                       this.getGoods();   

//         },
//         handleCurrentChange(val) {
//             this.queryModel.pagenum = val
//                       this.getGoods();  

//         },
      /**
       * 提交
       */
      async confirm(model){
          const df=this.$refs.df
          try {
              df.start();
              model.pics=model.pics.map(c=>({pic:c.response.data.tmp_path}))
              await addGoods(model);
              this.$m.success(this.title+'成功');
              this.getGoods();
              df.hide();
          } catch (error) {
              console.log(error);
          }
          df.stop();
      },
      /**
       * 获取商品列表
       */
    async getGoods() {
      try {
        this.loading = true;
        const { total, goods } = await getGoodsList(this.queryModel);
        this.total = total;
        this.list = goods;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    }
  },
  created() {
    this.getGoods();
  },
  mounted() {},
  components: {},
  computed: {
    /**
     * 表单配置项
     */
    opts() {
      return {
        goods_name: {
          title: "商品名称",
          required: true,
          max: 100
        },
        goods_number: {
          title: "商品数量",
          required: true,
          type: "number"
        },
        goods_price: {
          title: "商品价格",
          required: true,
          type: "number"
        },
        goods_weight: {
          title: "商品重量",
          required: true,
          type: "number"
        },
        ...(this.model.goods_id ? {} : {
            pics: {
          title: "上传图片",
          tag: "upload",
          action: "/shiyan/upload",
          headers:{
              Authorization:this.$store.getters.token,
          },
          value: [],
        }
        }),
        // pics: {
        //   title: "上传图片",
        //   tag: "upload",
        //   value: [],
        //   action: "/shiyan/upload",
        //   headers:{
        //       Authorization:this.$store.getters.token,
        //   }
        // }
      };
    },
    /**
     * 弹出框标题
     */
    title() {
      return this.model.goods_id ? "编辑" : "添加";
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
