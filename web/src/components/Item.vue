<template>

  <li>
    <a @click.prevent="detail">
      <div class="cont">
        <p class="time">{{time.split('T')[0]}}</p>
        <div class="title"><span>[{{category.name}}]</span>{{title}}</div>
        <div class="synopsis">{{description}}</div>
        <!-- <p class="num">{{views}}</p> -->
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ['category','time','views','title','description','content','id'],
  methods : {
      detail (){
          this.$router.push({path:'/detail',query:{id:this.id}})
      }
  }
}
</script>

<style scoped>
li{
  padding:20px 0;
  overflow:hidden;
  border-bottom:1px dashed #d9d9d9;
  color:#333;
  cursor:pointer;
  transition:300ms;
}
li:hover{
  background:#eaf6f9;
  padding:20px 10px;
}
.cont{
  /*margin:0 120px 0 0;*/
}
.time{
  margin:0 0 10px 0;
}
.title{
  font-weight:bold;
  font-size:16px;
  margin:0 0 10px 0;
}
.title a{
  color:#666;
}
.title span{
  font-size:18px;
}
.synopsis{
  margin:0 0 10px 0;
  font-size:13px;
  line-height:20px;
}
.img{
  float:right;
  width:100px;
  height:100px;
}
.img img{
  width:100%;
  height:100%;
  display:block;
}
</style>
