<template>
  <apexchart
    type="heatmap"
    height="350"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import VueApexChart from 'vue-apexcharts'
export default {
  components: {
    apexchart: VueApexChart
  },
  props: {
    series: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartOptions() {
      const values = []
      this.series.forEach((seriesItem) => {
        seriesItem.data.forEach((item) => {
          values.push(item.y)
        })
      })
      const min = Math.min(...values)
      const max = Math.max(...values)
      return {
        dataLabels: {
          formatter: (val, opts) => {
            return (Math.round(val * 100) / 100).toFixed(2)
          },
          style: {
            colors: ['#222222']
          }
        },
        legend: {
          show: false
        },
        plotOptions: {
          heatmap: {
            colorScale: {
              ranges: [
                {
                  from: min,
                  to: min + 0.2 * (max - min),
                  color: '#ffdddd'
                },
                {
                  from: min + 0.2 * (max - min),
                  to: min + 0.4 * (max - min),
                  color: '#ffaaaa'
                },
                {
                  from: min + 0.4 * (max - min),
                  to: min + 0.6 * (max - min),
                  color: '#ff8080'
                },
                {
                  from: min + 0.6 * (max - min),
                  to: min + 0.8 * (max - min),
                  color: '#ff4040'
                },
                {
                  from: min + 0.8 * (max - min),
                  to: max,
                  color: '#ff0000'
                }
              ]
            }
          }
        },
        chart: {
          toolbar: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        }
      }
    }
  }
}
</script>
