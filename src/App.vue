<template>
  <div id="app">
    <nav>
      <router-link class="router-wrap" to="/moveTrack">路径动画demo</router-link>
      <router-link class="router-wrap" to="/audioTrack">音频轨道demo</router-link>
      <router-link class="router-wrap" to="/gsapMove">GsapDemo</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-wrap{  margin: 10px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
