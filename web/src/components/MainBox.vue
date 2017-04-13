<template>
	<div>
		<banner></banner>
		<SubNav navName='最新动态'></SubNav>
		<container></container>
	</div>
</template>

<script>

import Container from './Container.vue'
import Banner from './Banner.vue'
import SubNav from './SubNav.vue'
export default {
  components: {
    Banner,
    SubNav,
    Container
  }
}
</script>

<style>

</style>
