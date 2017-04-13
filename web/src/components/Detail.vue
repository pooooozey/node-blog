<template>
  <div class="container">
    <div class="detail">
      <a @click.prevent="back" class="backBtn">
        <div class="lineBox">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <span>返回列表</span>
        </a>

      <div class="title">{{content.title}}</div>
      <p class="info">{{content.addTime?content.addTime.split('T')[0]:""}}</p>
      <div class="cont">
        {{content.content}}
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jQuery'
export default {
  data () {
    return {
      content : {
        title : 'loading',
        time : 'loadingT',
        views : '',
        content : '',
      }
    }
  },
  methods: {
    back() {
        this.$router.go(-1)
    }
  },
  updated (){
    $(".cont").html($(".cont").text());
  },
  mounted () {
    var This = this;
    $(function(){


      setTimeout(function () {
        $(".backBtn").addClass("backBtnShow").find("div").each(function () {
            $(this).css({ "transition": "400ms " + ($(this).index() * 60 + 200) + "ms", "top": 0, "left": 0 });
        });
      }, 100);

      setTimeout(function () {
          $(".back,.btnLeft,.btnRight").css({ "transition": "300ms" });
          $(".backBtn span").css({ "transition": "300ms" });
          $(".backBtn div").each(function () {
              $(this).css({ "transition": "600ms " });
          });

      }, 1000);


      $.ajax({
        type : 'post',
        url : 'api/contentDetail',
        data : {
          id : This.$route.query.id
        },
        dataType : 'json',
        success : function(result){
          console.log(result)
          if(result.code === 0){
            This.content = result.res.content;
            
          }
        },
        error : function(err){
          console.log(err)
        }
      });


    $(document).on("click",".cont a",function(){
      
    });


    })
  }
}
</script>

<style>
.container{
  max-width:1000px;
  padding:10px 50px 0 50px;
}
.detail {
    position: relative;
    max-width: 800px;
    color: #666;
}
.backBtn {
    width: 90px;
    color: #035C6E;
    line-height: 30px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 50;
    cursor:pointer;
}

.lineBox {
    width: 30px;
    height: 30px;
    position:relative;
    float: right;
}

.lineBox div {
    transition: 600ms;
    width: 8px;
    height: 8px;
    margin: 1px;
    background: #7B421B;
    position: relative;
    float: left;
    opacity: 0;
    transform: scale(2);
    -webkit-transform: scale(2);
}

.backBtnShow .lineBox div {
    opacity: 1;
    transform: scale(1);
    -webkit-transform: scale(1);
    background: #a5a5a5;
}

.lineBox div:nth-child(1) {
    left: -10px;
    top: -10px;
}

.lineBox div:nth-child(2) {
    left: 0;
    top: -10px;
}

.lineBox div:nth-child(3) {
    left: 10px;
    top: -10px;
}

.lineBox div:nth-child(4) {
    left: -10px;
    top: 0;
}

.lineBox div:nth-child(5) {
    left: 0;
    top: 0;
}

.lineBox div:nth-child(6) {
    left: 10px;
    top: 0;
}

.lineBox div:nth-child(7) {
    left: -10px;
    top: 10px;
}

.lineBox div:nth-child(8) {
    left: 0;
    top: 10px;
}

.lineBox div:nth-child(9) {
    left: 10px;
    top: 10px;
}

.backBtn span {
    transition: 600ms 700ms;
    width: 60px;
    display: inline-block;
    opacity: 0;
    color: #a5a5a5;
    position: absolute;
    left: -20px;
    top: 0;
}

.backBtnShow span {
    left: 0px;
    opacity: 1;
}

.backBtn:hover .lineBox {
    -webkit-transform: rotate(90deg) scale(0.5);
    transform: rotate(90deg) scale(0.5);
}

.backBtn:hover .lineBox div {
    background: #035C6E;
}

.backBtn:hover span {
    left: 5px;
    color: #035C6E;
}

.backBtn:hover .lineBox div:nth-child(2) {
    left: 20px !important;
    top: -10px !important;
}

.backBtn:hover .lineBox div:nth-child(4) {
    left: -10px !important;
    top: -20px !important;
}

.backBtn:hover .lineBox div:nth-child(6) {
    left: 10px !important;
    top: 20px !important;
}

.backBtn:hover .lineBox div:nth-child(8) {
    left: -20px !important;
    top: 10px !important;
}

.detail .title {
    font-size: 24px;
    text-align: center;
    line-height: 30px;
    margin: 20px 0;
}

.detail .info {
    text-align: center;
    font-size: 12px;
    color: #999;
}

.detail .cont {
    margin: 20px 0 0 0;
    font-size: 14px;
    line-height: 24px;
}

.detail .cont img {
    max-width: 100%;
    display: block;
}

</style>
