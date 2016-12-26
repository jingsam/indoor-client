<template>
  <Row class="header" type="flex" justify="space-between" align="middle">
      <i-col span="4">
        <h1>室内地图分析系统</h1>
      </i-col>
      <i-col span="6">
        <Date-picker type="daterange" placeholder="选择统计时段" :options="options"></Date-picker>
      </i-col>
      <i-col class="right" span="4">
        <i-Button>APP下载</i-Button>
      </i-col>
  </Row>
</template>

<script>
export default {
  data() {
    return {
      options: {
        shortcuts: [{
          text: '最近一周',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          }
        }, {
          text: '最近一个月',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          }
        }, {
          text: '最近三个月',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          }
        }]
      }
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
</style>
