<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header style="font-weight: bold; font-size: 40px"
        >新莉智能学习辅助系统</el-header
      >
      <el-container>
        <el-aside>
          <aside-menu/>
        </el-aside>
        <el-main>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件，将渲染在这里 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "../components/AsideMenu.vue"
export default {
  name: "Main",
  data() {
    return {};
  },
  components:{
    AsideMenu
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #8b8c96; */
  /* color: #333; */
  text-align: center;
  line-height: 50px;
  width: 30px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  line-height: 5px;
}
</style>