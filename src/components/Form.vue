<template>
  <div>          
      <el-form ref="form" :label-width="lw" :model="model">
        <el-form-item :rules="item.rules" v-for="(item,key) in options"
         :key="key" :label="item.title" :prop="key">
         <!-- {{item.value}} -->
          <el-input v-model="model[key]" v-if="item.tag==='input'" :type="item.type" :maxlength="item.max" :disabled="item.dis" ></el-input>
          <!-- 生成选择器 -->
          <el-select   v-else-if="item.tag==='select'"></el-select>
          <!-- 生产级联选择器 -->
          <el-cascader 
          :options="item.value" 
          :props="item.props" 
          :clearable="item.clearable"
          v-model="model[key]" 
          v-else-if="item.tag==='cas'"
          ></el-cascader>
          
          <!-- 生成Upload -->
          <el-upload
          v-else-if="item.tag==='upload'"
            class="upload-demo"
            :action="item.action"
            :headers="item.headers"
            :on-remove="(file,fileList)=>handleRemove(key,fileList)"
            :on-success="(response, file, fileList)=>uploadSuccess(key,fileList)"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
 </div>
</template>

<script>
// const opts = {
//   roleName: {
//     title: "角色名称",
//     tag: "input",
//     max: 18,
//     dis: true,
//     value: "",
//     required: true,
//     rules: [
//       {
//         min: 2,
//         max: 10
//       }
//     ]
//   },
//   roleDesc: {
//     title: "角色描述",
//     tag: "input",
//     max: 100,
//     dis: true,
//     value: ""
//   }
// };
export default {
  name: "Form",
  props: {
    /**
     * 宽度
     */
    lw: {
      type: String,
      default: "90px"
    },
    /**
     * form表单
     */
    value: Object,
    /**
     * 配置项
     */
    opts: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      /**
       * 模型数据
       */
      model: {}
    };
  },
  methods: {
    /**
     * 图片上传成功
     */
    uploadSuccess(key,fileList){
      this.model[key]=fileList;
      console.log(this.model);
    },
    /**
     * 处理删除
     */
    handleRemove(key,fileList){
      this.model[key]=fileList;
      console.log(this.model);
    },
    /**
     * 判断是否为数字类型
     */
    isNumber(value) {
      return typeof value === "number";
    },
    /**
     * 验证
     */
    async validate() {
      await this.$refs.form.validate();
      return { ...this.model };
    }
    
  },
  created() {},
  mounted() {},
  components: {},
  computed: {
    /**
     * 表单配置项
     */
    options() {
      const obj = JSON.parse(JSON.stringify(this.opts)); //深拷贝
      for (const key in obj) {
        if (!Object.hasOwnProperty.call(obj, key)) continue;
        const item = obj[key]; //值
        item.tag = item.tag || "input";
        item.rules = item.rules || []; //如果之前有规则就用之前的，如果没有则赋值一个空数组
        // 如果有required字段则添加reuiqred规则
        if (
          item.required === true &&
          !item.rules.some(c => c.required === true)
        ) {
          item.rules.unshift({
            required: true
          });
        }
        // 添加规则消息
        for (const rule of item.rules) {
          if (rule.message) continue;
          if (rule.required) {
            rule.message = `${item.title}不能为空`;
          } else if (this.isNumber(rule.min) && this.isNumber(rule.max)) {
            rule.message = `${item.title}必须为${rule.min}-${rule.max}位`;
            item.max = item.max || rule.max;
          } else if (this.isNumber(rule.min)) {
            rule.message = `${item.title}最小长度为${rule.min}`;
          } else if (this.isNumber(rule.max)) {
            rule.message = `${item.title}最大长度为${rule.max}`;
            item.max = item.max || rule.max;
          } else if (rule.type) {
            rule.message = `${item.title}格式不正确`;
          }
        }
      }
      return obj;
    }
  },
  watch: {
    /**
     * 值有变化
     */
    value(value) {
      this.model = { ...value };
    }
  }
};
</script>

<style lang='scss' scoped>



 
 

</style>
