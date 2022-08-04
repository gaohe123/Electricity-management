<template>
    <div>
        <Search :loading="loading" v-model="queryModel.query" @search="getOrderList"></Search>
        <p></p>
        <Table  :cols='cols' v-model="queryModel" :data="list" :total="total" @change="getOrderList">

             <template v-slot:time="{row:{create_time}}">
              {{new Date(create_time*1000).format()}}
          </template>

          <template v-slot:pay="{row}">
              <el-tag :type='row.pay_status==0 ? "danger" : "success"'>{{row.pay_status ==0 ? '未付款' :'已付款'}}</el-tag>
          </template>

            <template v-slot:action="{row}">
                <el-button type="primary" icon="el-icon-edit"  size="mini" @click="model={};$refs.df.show()"></el-button>
             <el-button size="mini" type="success" icon="el-icon-location"  @click="getExpressList"></el-button>
          </template>

        </Table>

        <DF ref='df' :opts='opts' @confirm="$refs.df.hide()" :value='model'></DF>
        <Dialog title="物流进度" ref='d'>
            <div class='box' v-for="(item, index) in expressList" :key="index">
                <div class="content">
                    {{item.context}}
                </div>
                <div class="time">
                    {{item.time}}
                </div>
            </div>
            <div slot='footer'></div>

        </Dialog>
    </div>
</template>

<script>
import {getOrders,getExpress} from '@/api/orders'
import cirty from '@/utils/cirty'
export default {
    name: 'List',

    data() {
        return {
            // loading:false,
            /**
             * 物流列表
             */
            expressList:[],
            model:{},
            opts:{
                city:{
                    title:'省/市区县',
                    required:true,
                    tag:"cas",
                    // size:"small",
                    value:cirty
                },
                address:{
                    title:"详细地址",
                    required:true,
                    max:50,
                }
            },

            cols:[
                {
                    title:"#",
                    type:"index"
                },
                {
                    title:"订单编号",
                    name:"order_number"
                },
                {
                    title:"订单价格",
                    name:"order_price"
                },
                {
                    title:"是否付款",
                    slot:"pay"
                },
                {
                    title:"是否发货",
                    name:"is_send"
                },
                 {
                    title:"下单时间",
                    slot:'time'
                },
                 {
                    title:"操作",
                    slot:"action",
                    align:"center",
                    width:200
                },
            ],

            
            queryModel:{
                query:"",
                pagenum:1,
                pagesize:10,
            },
            loading:false,
            list:[],
            total:0
        };
    },

    mounted() {
        
    },

    methods: {
        /**
         * 物流信息列表
         */
        async getExpressList(){
            try { 
                this.loading=true
                this.expressList=await getExpress()
                this.$refs.d.show()
            } catch (error) {}
            this.loading=false
        },

       

        async getOrderList(){
            try {
                this.loading=true
                const {goods,total}=await getOrders(this.queryModel)
                this.list=goods,
                this.total=total
            } catch (error) {}
            this.loading=false
        }
    },
    created(){
        this.getOrderList()
    }
};
</script>

<style lang="scss" scoped>
    .box{
        padding:0 0 20px 30px;
        border-left: 2px solid #e4e7ed;
        position: relative;

        &:last-child{
            border: none;
        }
        &::before{
            content: "";
            display: inline-block;
            position: absolute;
            width: 12px;
            height: 12px;
            // border-left:  #e4e7ed;
            background: #e4e7ed;
            left: -7px;
            top: -6px;
            border-radius: 50%

            
        }
    }
    .time{
        color: rgba(166, 170, 170, 0.527)
    }
</style>