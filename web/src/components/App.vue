<template>
  <div id="app">
    <leftNav></leftNav>
    
    <div class="box">
      <router-view></router-view>
    </div>


      <!-- <banner></banner>
      <subNav></subNav>
      <div class="container">
          <router-view></router-view>
      </div> -->

      
    
    
  </div>
</template>

<script>
import LeftNav from './LeftNav.vue'
export default {
  name: 'app',
  components: {
    LeftNav
  }
}
</script>
<style>
    @import '../assets/iconfont.css';
</style>
<style>
    @import '../assets/reset.css';
</style>
<style>
.box{
  margin:0 0 0 150px;
}
</style>
