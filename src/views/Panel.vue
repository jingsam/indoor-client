<template>
  <Tabs type="card">
    <Tab-pane label="客流分析">{{start | json 2}}</Tab-pane>
    <Tab-pane label="轨迹分析">标签二的内容</Tab-pane>
    <Tab-pane label="趋势分析">标签三的内容</Tab-pane>
  </Tabs>
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
