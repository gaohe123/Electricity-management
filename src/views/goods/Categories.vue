<template>
    <div>
        <Search title="添加分类" @click="model={};getCategiriesList()"></Search>
        <p></p>
        <Table rowKey='cat_id' :loading='loading' :cols="cols" :data='list' :total="total" v-model="queryModel" >
            <template v-slot:delete="{row:{cat_deleted}}">
                <i :style="{color:cat_deleted?'red':'green'}" :class="cat_deleted? 'el-icon-error':'el-icon-success'"></i>
            </template>
            <template v-slot:sort="{row:{cat_level:level}}">
                <el-tag :type="colors[level]">{{levels[level]}}级</el-tag>
            </template>
            <template v-slot:action="{row}">
                <el-button type="primary" size="mini" @click="model={...row};getCategiriesList()">编辑</el-button>
                <el-button type="danger" size="mini" @click="delCategory(row)">删除</el-button>

            </template>
        </Table>

        <DF :title="title+'分类'" ref='df' :opts="opts" :value="model" @confirm="confirm"></DF>
    </div>
</template>

<script>
import {getcategories,deleteCategory,addCategory,updatedCategorye} from "@/api/goods"
import {levels,colors} from '@/utils/common'
export default {
    name: 'Categories',

    data() {
        return {
            levels,
            colors,
            cols:[
                {
                    title:"#",
                    type:"index",
                },
                {
                    title:'分类名称',
                    name:'cat_name'
                },
                {
                    title:"是否有效",
                    slot:"delete"
                },
                {
                    title:"排序",
                    slot:'sort'
                },
                {
                    title:'操作',
                    slot:"action",
                    align:"center",
                    width:200
                }
            ],
            model:{},
            list:[],
            total:0,
            loading:false,
            queryModel:{
                type:3,
                pagenum:1,
                pagesize:10,
            },
            categoryList:[],
        };
    },

    mounted() {
        
    },

    methods: {



       async confirm(model){
           const df=this.$refs.df
           try {
               df.start()
               model.cat_pid=model.cat_pid || []
               const obj={
                   ...model,
                   cat_pid:[...model.cat_pid].pop(),
                   cat_level:model.cat_pid.length,
                   };
               await (this.model.cat_id ? updatedCategorye: addCategory)(obj)
               this.$m.success(this.title +"成功")
               this.getCategoryList()
               df.hide()
           } catch (error) {}
           df.stop()
       },



       //获取分类列表
       async getCategiriesList(){
           try {
               this.categoryList=await getcategories({type:2})
               this.$refs.df.show()
           } catch (error) {
               
           }
       },

        //删除
        async delCategory({cat_id,cat_name}){
            let res;
            try {
                res=await this.$confirm(`您确定要删除【${cat_name}】吗？`)
                await deleteCategory(cat_id)
                this.$m.success('删除成功')
                this.getCategoryList()
            } catch (error) {}
            res && res()
        },

        //获取数据
        async getCategoryList(){
            try {
                this.loading=true;
                const {total,result}=await getcategories(this.queryModel)
                this.total=total;
                this.list=result;
            } catch (error) {}
                this.loading=false;

        }
    },
    computed:{
        title(){
            return this.model.id? '修改':'添加'
        },

        opts(){
            return{
                cat_name:{
                    title:"分类名称",
                    required:true,
                    max:20
                },
                ...(this.model.cat_id ? {}:{
                    cat_pid:{
                        title:'父级分类',
                        tag:"cas",
                        props:{checkStrictly:true, label:'cat_name',value:'cat_id'},
                        value:this.categoryList,
                    }
                }) 
            }
        }
    },
    created(){
        this.getCategoryList()
    }
};
</script>

<style lang="scss" scoped>

</style>