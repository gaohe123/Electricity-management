<template>
  <div ref="div" style="height:500px;width:800px" id="report">
      <!-- <ECharts :options="options"></ECharts> -->
 </div>
</template>

<script>
var ECharts=require('eCharts')
// import eCharts from 'vue-echarts'
// import * as ECharts from 'vue-echarts';
// import "echarts-gl";
import {getReport} from '@/api/reports'
export default {
    name:'Reports',
  data() {
    return {
      /**
       * 配置项
       */
      options:{},
    };
  },
  methods: {
    async getReportInfo(){
      try {
        this.options=await getReport();
        const echart=ECharts.init(this.$refs.div);
        echart.setOption(this.options)
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {},
  mounted() {
    this.getReportInfo()
  },
  components: {
    // ECharts
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
