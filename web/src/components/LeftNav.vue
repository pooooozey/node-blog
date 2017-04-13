<template>
  <div class="nav">
      <ul class="menu">
        <li><a href="#" class="active"><i class="iconfont icon-home"></i>首页</a></li>
        <!-- <li><a href="#"><i class="iconfont icon-wenzhang"></i>文章</a></li>
        <li><a href="#"><i class="iconfont icon-xiangmu"></i>作品</a></li>
        <li><a href="#"><i class="iconfont icon-guanyu"></i>关于</a></li> -->
        <li v-for="item in nav">
          <router-link :to="{ path: 'list', query: { id: item._id }}"><i  class="iconfont" v-bind:class="item.className"></i>{{ item.name }}</router-link>
        </li>
      </ul>
  </div>
</template>

<script>
import $ from 'jQuery'

export default {
  data () {
    return {
      nav : []
    }
  },
  mounted () {
    var This = this;
    $.ajax({
      type : 'post',
      url : 'api/getNav',
      data : {
        page : 1,
        limit : 10
      },
      dataType : 'json',
      success : function(result){
        console.log(1,result)
        if(result.code === 0){
          This.nav = result.res.categories;
        }
      },
      error : function(err){
        console.log(err)
      }
    });

    $(document).on("click",".menu li a",function(){
      $(".menu li a").removeClass("active");
      $(this).addClass("active");
    });

  }
}
</script>

<style scoped>
.nav{
  width:150px;
  height:100%;
  background:#2a2a2a;
  position:fixed;
  left:0;
  top:0;
  z-index:10;
}
.menu{
  line-height:20px;
}
.menu a{
  padding:10px 15px;
  color:#999999;
  font-size:14px;
  display:block;
  transition:300ms;
}
.menu .active,.menu a:hover{
  color:#fff;
  background:#035C6E;
}
.menu .iconfont{
  width:20px;
  margin:0 5px 0 0;
  text-align:center;
  font-size:16px;
  display:inline-block;
  position:relative;
  top:2px;
}
.menu .icon-home{
  position:relative;
  top:3px;
}
</style>
