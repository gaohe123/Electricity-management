<template>
  <Dialog @confirm="confirm" :title="title" ref="dialog">
      <Form ref="form" v-bind="$attrs"></Form>
  </Dialog>
</template>

<script>
export default {
  name: "DF",
  props: {
    /**
     * 标题
     */
    title: String,
    // /**
    //  * 表单实体
    //  */
    // value: {
    //   required: true,
    //   type: Object
    // },
    // /**
    //  * 表单配置项
    //  */
    // opts: {
    //   required: true,
    //   type: Object
    // }
  },
  data() {
    return {};
  },
  methods: {
      /**
       * 开始loading
       */
      start(){
          this.$refs.dialog.start();
      },
      /**
       * 停止loading
       */
      stop(){
          this.$refs.dialog.stop();
      },
      /**
       * 显示
       */
      show(){
          this.$refs.dialog.show();
      },
      /**
       * 隐藏
       */
      hide(){
          this.$refs.dialog.hide();
      },
    async confirm() {
      try {
        const model = await this.$refs.form.validate();
        this.$emit("confirm", model);
      } catch (error) {}
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
