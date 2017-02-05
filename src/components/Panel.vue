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

    <div class="chart" v-el:chart>

    </div>
  </div>
</template>


<script>
import moment from 'moment'
import echarts from 'echarts'
import groupBy from 'lodash/groupBy'

let chart

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
  },

  watch: {
    '$store.getters.lines' (lines) {
      const group = groupBy(lines.features, feature => feature.properties.date)

      const data = Object.keys(group)
        .map(date => [date, group[date].length])
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))

      chart.setOption({
        series: [{
          data
        }]
      })
    }
  },

  attached () {
    chart = echarts.init(this.$els.chart)

    chart.setOption({
      title: {
        text: '人流量时间序列',
        left: 'center',
        textStyle: {
          color: '#657180',
          fontSize: 15,
          fontWeight: 'normal'
        }
      },
      dataZoom: [{
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty'
      }, {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty'
      }],
      xAxis: {
        type: 'time'
      },
      yAxis: {
        min: 0,
        minInterval: 1
      },
      series: [{
        name: '人次',
        type: 'line',
        data: []
      }]
    })
  }
}
</script>


<style scoped>
/** {
  outline: red solid 1px;
}*/

.number {
  width: 50%;
  height: 150px;
  float: left;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-right: 1px solid #d7dde4;
  border-bottom: 1px solid #d7dde4;
}

.chart {
  width: 100%;
  height: 350px;
  clear: both;
  position: relative;
  top: 20px;
}

.title {
  font-size: 1.25em;
}

.value {
  font-size: 5em;
  color: #3399ff;
}
</style>
