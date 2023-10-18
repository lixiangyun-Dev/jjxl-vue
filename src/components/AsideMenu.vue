<template>
  <div>
    <div
      width="100px"
      style="background-color: rgb(228, 246, 246); border: 1px solid #eee"
    >
      <el-menu :default-openeds="['1', '4']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>用户信息管理</template
          >
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="employeeManager"
              >用户管理</el-menu-item
            >
            <el-menu-item index="1-2" @click="employeePerformance"
              >人员业绩</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>部门信息管理</template
          >
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="departmentManager"
              >部门名称</el-menu-item
            >
            <el-menu-item index="2-2" @click="departmentReport"
              >部门报表</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>系统信息管理</template
          >
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="dictionaryManager"
              >字典管理</el-menu-item
            >
            <el-menu-item index="3-2" @click="RoleManager"
              >权限管理</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "AsideMenu",
  data() {
    return {};
  },
  methods:{
    employeeManager() {
      this.$router.push("/employee");
    },
    employeePerformance() {
      this.$router.push("/employeePerformance");
    },
    departmentManager() {
      this.$router.push("/department");
    },
    departmentReport() {
      this.$router.push("/departmentReport");
    },
    dictionaryManager() {
      this.$router.push("/dictionaryManager");
    },
    RoleManager() {
      this.$router.push("/RoleManager");
    },
    
  }
};
</script>
  
<style lang="less" scoped>
</style>