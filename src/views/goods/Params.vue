<template>
    <div>
        <div class="top">
            <span class="demonstration">选择商品分类: &nbsp;</span>
                <el-cascader
                    @change="getAttributeList"
                    v-model="value"
                    :options="list"  
                    :props="{label:'cat_name',value:'cat_id'}"
                    ></el-cascader>
        </div>
        <p></p>
        <div class="content"> 
             <el-tabs v-model="activeName" @tab-click='getAttributeList'>
                <el-tab-pane :key="item.type" v-for="(item, key) in types" :label="item.type + item.title" :name="key" >

                    <el-button type="primary" size="small" @click="model={};$refs.df.show()">添加{{item.title}}</el-button>
                </el-tab-pane>
                <p></p>
                <!-- <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane> -->
                <Table :cols="cols" :data='attributlist'>
                    <template v-slot:expand="{row}">
                        <el-tag @close="deleteTag(row,index)" closable  :disable-transitions="false" class="sdd" v-for="(item,index) in row.tags" :key='index'>
                            {{item}}
                        </el-tag>  
                        
                            <el-input
                            class="input-new-tag"
                            v-if="row.visible"
                            v-model="row.value"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(row)"
                            @blur="handleInputConfirm(row)"
                            >
                            </el-input>
                            <el-button v-else  size="small" @click="row.visible=true;$nextTick(()=>$refs.saveTagInput.focus())">+ New Tag</el-button>
                    </template> 


                     <template v-slot:action="{row}">
                        <!-- <el-button size="mini" type="primary" @click="model={...row};$refs.df.show();">编辑</el-button> -->
                        <el-button type="primary" icon="el-icon-edit"  size="mini"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" ></el-button>
                    </template>
                </Table>
            </el-tabs>
        </div>
        <DF ref='df' :title="'添加'+title" :value='model' :opts="opts" @confirm="confirm"></DF>
    </div>
</template>

<script>
import {getcategories,getAttributes,updatedAttribute,addAttribute} from "@/api/goods"

export default {
    name: 'Params',

    data() {
        return {

            
            model:{},

            // visible:false,
            // value:"",
            types:{
                many:{
                    type:"动态",
                    title:"参数"
                },
                only:{
                    type:"静态",
                    title:"属性"
                }
            },
            /**
             * 激活的名称
             */
            activeName:"many",
            value:[],//级联选择器（选中的值）
            list:[],//数据列表

            attributlist:[]
        };
    },

    mounted() {
        
    },
    computed:{

        opts(){
                return{
                    attr_name:{
                    title:this.title,
                    required:true,
                    max:20,
                    }
                }
            },


        title(){
            const item=this.types[this.activeName];
            return item.type+item.title;
        },
        /**
         * 分类id
         */
        catId(){ 
            return this.value.length >2 &&this.value[2]
        },
        cols(){
            return[
                {
                    title:"",
                    type:"expand",
                    slot:"expand"
                },
                {
                    title:"#",
                    type:"index"
                },
                {
                    
                    title:this.types[this.activeName]?.title+"名称",
                    name:"attr_name"
                },
                {
                    title:"操作",
                    align:"center",
                    width:200,
                    slot:"action"
                }
            ]
        }
    },

    methods: {

        async confirm(model){
            const df=this.$refs.df
            try {
                df.start()
                await addAttribute(this.catId,{...model,attr_sel:this.activeName})
                this.$m.success("属性添加成功")
                df.hide()

            } catch (error) {}
                df.stop()

        },
      /**
       * 删除标签
       */
      async deleteTag(row,index){
          try {
              const {attr_id,attr_name,attr_sel,tags}=row;
              row.tags.splice(index,1)
              const attr_vals=row.tags.join(' ');
                await updatedAttribute(this.catId,row.attr_id,{
                    attr_vals,
                    attr_name,
                    attr_sel,
                } )
                this.$m.success('修改参数成功')
                 this.getCategoryList()
          } catch (error) {
              
          }
      },
        



       async handleInputConfirm(row){
            const value =row.value?.trim();
            const {attr_name,attr_sel}=row 
            try{
                // const value=row.value.trim();
                if(!value) return;
                row.value=""
                const attr_vals=[...row.tags,value].join(" ");
                await updatedAttribute(this.catId,row.attr_id,{
                    attr_vals,
                    attr_name,
                    attr_sel,
                } )
                row.tags.push(value)
                this.$m.success('修改参数成功')
                 this.getCategoryList()
            }catch(error){

            }finally{
                 row.visible=false;
            }
        },
        /**
         * 获取属性
         */
        async getAttributeList(){
            // console.log(111);
                console.log(this.catId,this.activeName);

            try{
                if(!this.catId) return;
                this.attributlist=await getAttributes(this.catId,this.activeName)
                 this. attributlist.forEach((item)=>{ 
                     this.$set(item,'visible',false);
                     this.$set(item,'value',"");
                     item.tags=item.attr_vals?.split(",")?.filter((c)=>c) || [];
                 }) 
            }catch(errpr){}
        },
        /**
         * 获取级联选择器数据
         */
        async getCategoryList(){
            try {
                 this.list=await getcategories();
            } catch (error) {
                
            }
        }
    },
    created(){
        this.getCategoryList()
    }
};
</script>

<style lang="scss" scoped>
    .sdd{
        margin-left: 10px;
    }
    .input-new-tag{
        width: 100px;
    }
</style>