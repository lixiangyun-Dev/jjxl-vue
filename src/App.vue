<template>
  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Main from './components/Main.vue';
import AsideMenu from './components/AsideMenu.vue';
import Employee from './components/Employee.vue'
import Department from './components/Department.vue'

export default {
  name: 'App',
  components: {
    Login,
    Register,
    Main,
    AsideMenu,
    Employee,
    Department
  }
}
</script>

<style>
</style>
