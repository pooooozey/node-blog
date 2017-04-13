<template>
  <div>
    <SubNav :navName="navName"></SubNav>
    <div class="container">
      <ul class="list">
        <Item v-for="item in contents" :key="item._id" :id="item._id" :category="item.category" :title="item.title" :views="item.views" :time="item.addTime" :description="item.description" :content="item.content"></Item>
      </ul>
    </div>

  </div>
</template>

<script>
import $ from 'jQuery'
import Item from './Item.vue'
import SubNav from './SubNav.vue'

export default {
  data () {
    return {
      navName : 'loading',
      contents : []
    }
  },
  methods: {
    getData() {
      var This = this;
      console.log(This.$route.query.id)
      $.ajax({
        type : 'post',
        url : 'api/getList',
        data : {
          page : 1,
          limit : 10,
          whereId : This.$route.query.id||''
        },
        dataType : 'json',
        success : function(result){
          console.log(result)
          if(result.code === 0){
            This.contents = result.res.contents;
            This.navName = This.contents[0].category.name;
            console.log(This.navName)
          }
        },
        error : function(err){
          console.log(err)
        }
      });
    }
  },
  mounted () {
    this.getData();
  },
  components : {
    Item,
    SubNav
  },
  watch: {
    '$route' (to, from) {
      this.getData();
    }
  }
}
</script>

<style scoped>

</style>
