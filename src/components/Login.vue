<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h3>登录</h3>
      <hr />
      <el-form-item font-s label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "admin",   //admin
        password: "123456",   //123456
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/api/login", this.ruleForm).then(res => {
            console.log(res.data.code)
            console.log(res.data.message)
            console.log(res.data)
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "登录成功",
              });
              this.$router.push("/employee");
            } else {
              alert("您输入的用户名或密码错误！");
            }
          });
        } else {
          console.log("error submit!!");
          this.$message({
            type: "error",
            message: res.message,
            // message: "fail"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 740px;
  background: url("../assets/0U4A0416.JPG") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.demo-ruleForm {
  background-size: cover;
  width: 400px;
  height: 300px;
  margin: 50px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 20px;
  font-weight: bold;
}

#password {
  margin-bottom: 5px;
}
h3 {
  color: #0babeab8;
  font-size: 24px;
  text-align: center;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
.el-button {
  width: 20%;
  margin-left: 60px;
  text-align: center;
}
</style>