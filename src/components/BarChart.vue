<template>
  <Bar id="my-chart-id" title="Year Bar Chart" aria-label="Test Chart" aria-describedby="Govinda Mandal"
    :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    title: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{ label: 'Months', backgroundColor: "#f87979", data: [40, 20, 12] }]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'First Vue Chart'
          }
        }
      }
    }
  }
}
</script>