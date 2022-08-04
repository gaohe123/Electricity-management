<template>
    <div>``
      
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>数据统计</el-breadcrumb-item>
  <el-breadcrumb-item>数据报表</el-breadcrumb-item>
</el-breadcrumb>
        <el-card>
                <div id="main" style="width: 600px;height:400px;"></div>
        </el-card>
    
    </div>
</template>
<script>
var echarts = require('echarts')
export default {
    mounted(){  
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
    this.$axios.get('reports/type/1').then(res=>{
        console.log(res) 
        myChart.setOption(res.data.data);
    })

      // 使用刚指定的配置项和数据显示图表。
     
    }
}
</script>