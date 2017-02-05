<template>
  <div>
    <div class="number">
      <p class="title">总人流量</p>
      <p class="value">{{ total }}</p>
      <p>人次</p>
    </div>

    <div class="number">
      <p class="title">平均人流量</p>
      <p class="value">{{ avg }}</p>
      <p>人次/天</p>
    </div>

    <div class="chart">

    </div>
  </div>
</template>


<script>
import moment from 'moment'

export default {
  computed: {
    total () {
      return this.$store.getters.lines.features.length
    },

    avg () {
      const start = moment(this.$store.state.start)
      const end = moment(this.$store.state.end)
      const days = end.diff(start, 'days')

      if (days === 0) return 0

      return (this.total / days).toFixed(2)
    }
  }
}
</script>


<style scoped>
* {
  outline: red solid 1px;
}

div {
  width: 300px;
  height: 100%;
}

.number {
  width: 150px;
  height: 150px;
  float: left;
  text-align: center;
  border-right: 1px solid #d7dde4;
  border-bottom: 1px solid #d7dde4;
}

.chart {
  width: 300px;
  height: 300px;
  clear: both;
}

.title {
  font-size: 1.25em;
}

.value {
  font-size: 5em;
  color: #3399ff;
}
</style>
