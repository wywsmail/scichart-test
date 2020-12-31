<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="5">
          <div id="nav">
            <router-link to="/">inCare</router-link> |
            <router-link to="/diagnoses">Diagnoses</router-link> |
            <router-link to="/chart">Chart</router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div id="nav">
            <router-link to="/login">Login</router-link>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main><router-view /></el-main>
    <el-footer>inCare © 2020</el-footer>
  </el-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
