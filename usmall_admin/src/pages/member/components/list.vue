<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="昵称" width="180"></el-table-column>
      <el-table-column prop="Mobilphone" label="手机号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <!-- <el-button type="info" v-else>禁用</el-button> -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestMemberDelete, requestMemberDetail } from "../../../util/request";
import { successAlert,warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "member/requestList",
    }),
    //点击了编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    // del(id) {
    //   this.$confirm("你确定要删除吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       requestmemberDelete({ id: id }).then(res=>{
    //         if(res.data.code==200){
    //           successAlert(res.data.msg);
    //           this.requestList()
    //         }else{
    //           warningAlert(res.data.msg)
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    // 封装删除
  //   dele(id){
  //     requestMenuDelete({id:id}).then((res)=>{
  //       if(res.data.code == 200){
  //         successAlert(res.data.msg);
  //         this.requestList();
  //       }else{
  //         warningAlert(res.data.msg);
  //       }
  //     });
  //   },
  // },
   mounted() {
     this.requestList();
   },
  }
};
</script>
<style scoped>
</style>