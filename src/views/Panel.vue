<template>
  <div></div>
</template>


<script>
export default {
  computed: {
    start () {
      return [this.$store.state.start, this.$store.state.end]
    }
  }
}
</script>


<style scoped>
div {
  width: 300px;
  height: 100%;
}
</style>
