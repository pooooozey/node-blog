<template>
	<div class="container">
    	<homeList></homeList>
    </div>
</template>

<script>
import HomeList from './HomeList.vue'

export default {
  components: {
    HomeList
  }
}
</script>

<style>
.container{
  max-width:1000px;
  padding:10px 50px 0 50px;
}
</style>
