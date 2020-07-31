<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="70px">
            <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px" v-if="form.id!==0">
            <el-upload
            
            ></el-upload>
        </el-form-item>

        <el-form-item label="昵称" label-width="80px">
            <el-input v-model="form.username"></el-input>
        </el-form-item>

      <el-form-item label="密码" label-width="80px">
            <el-input v-model="form.password" show-password></el-input>
        </el-form-item>

      <el-form-item label="状态" label-width="80px">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button> -->
        <el-button type="primary" @click="update" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters,mapActions} from "vuex";
import {
  // requestMemberAdd,
  // requestMemberDetail,
  // requestMemberUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
     roleList:"role/list"
    }),
  },
  data() {
    return {
      //后端
      form:{
          roleid:"",
          username:"",
          password:"",
          status:1,
      },
    };
  },
  mounted(){
      if(this.roleList.length === 0){
          this.requestRoleList();
      }
  },
  methods: {
    ...mapActions({
      requestList: "role/requestList",
      requestMemberList:"member/requestList",
      requestTotal:"member/requestTotal"
    }),
    //置空
    empty() {
      this.form = {
          roleid:"",
          username:"",
          password:"",
           status: 1,
      };
    },
    //取消
    cancel() {
      this.info.show = false;
      if(!this.info.isAdd){
        this.empty()
      }
    },
    //点击了添加按钮
    add() {
      requestMemberAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.requestMemberList();
          //重新获取总的数量
          this.requestTotal()  
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取某一条数据
    getDetail(id) {
      requestMemberDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password= "";
      });
    },
    //修改
    update() {
      requestMemberUpdate(this.form).then((res) => {
        if(res.data.code==200){
          successAlert("修改成功")
          this.empty()
          this.cancel()
          this.requestMemberList()
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
  },
};
</script>
<style scoped>
</style>


