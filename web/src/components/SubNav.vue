<template>
  <div class="sub-menu">
    <a href="#" class="cur">{{navName}}</a>
  </div>
</template>

<script>
export default {
   props: ['navName']
}
</script>

<style scoped>
.sub-menu{
  max-width:1000px;
  margin:20px 50px 0 50px;
  height:50px;
  line-height:50px;
  background:#fff;
  /*position:fixed;
  left:150px;
  right:0;
  top:0;*/
  border-bottom:2px solid #d9d9d9;
}
.sub-menu a{
  display:inline-block;
  font-size:14px;
  color:#999999;
}
.sub-menu .cur{
  color:#333;
  border-bottom:2px solid #3f51b5;
}
</style>
