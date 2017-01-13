<template>
  <Row class="header" type="flex" justify="space-between" align="middle">
      <i-col span="4">
        <h1>室内地图分析系统</h1>
      </i-col>
      <i-col span="6">
        <Date-picker type="daterange" :value="value" placeholder="选择统计时段" :options="options" @on-change="handleChange"></Date-picker>
      </i-col>
      <i-col class="right" span="4">
        <Poptip trigger="hover" placement="bottom">
          <i-button><a href="/app-debug.apk">APP 下载</a></i-button>
          <img slot="content" src="../assets/QR.png">
        </Poptip>
      </i-col>
  </Row>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      options: {
        shortcuts: [{
          text: '最近一周',
          value () {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          }
        }, {
          text: '最近一个月',
          value () {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          }
        }, {
          text: '最近三个月',
          value () {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          }
        }]
      }
    }
  },

  computed: {
    value () {
      return [this.$store.state.start, this.$store.state.end]
    }
  },

  methods: {
    handleChange (daterange) {
      const start = daterange[0] ? moment(daterange[0]).format() : 0
      const end = daterange[1] ? moment(daterange[1]).endOf('day').format() : 0

      this.$store.dispatch('fetchLocations', {start, end})
    }
  }
}
</script>

<style scoped>
.header {
  height: 100%;
  background-color: #464c5b;
  padding: 0 40px;
}

h1 {
  color: #fff;
  font-size: 16px;
}

.right {
  display: flex;
  justify-content: flex-end;
}

img {
  display: block;
  height: 200px;
  width: 200px;
}
</style>
