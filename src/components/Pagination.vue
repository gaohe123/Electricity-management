<template>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[4, 8, 10, 20]"  layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
   name: 'Pagination',
props:['total','pagenum'],
    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {
        handleSizeChange(val) {
            this.$emit('handleSizeChange', val);
        },
        handleCurrentChange(val){
             this.$emit('handleCurrentChange', val);
        }
    },
};
</script>

<style lang="scss" scoped>
</style>