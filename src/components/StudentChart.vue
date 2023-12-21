<script>
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "StudentChart",
  props: {
    type: String,
    exam: {
      type: Object
    },
    questions: {
      type: [Array, Object]
    }
  },
  components: { Bar, Pie },
  data: () => {
    return {
      totalRead: 0,
      totalAttempt: 0,
      totalCorrect: 0,
      indexAxis: 'x',
    };
  },
  computed: {
    chartData() {
      return {
        labels: [ 'Total Read', 'Total Attempt', 'Total Correct' ],
        datasets: [
          {
            label: 'Exam Stats',
            backgroundColor: "#2452ae",
            data: [
              this.totalRead,
              this.totalAttempt,
              this.totalCorrect
            ]
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        indexAxis: this.indexAxis
      }
    }
  },
  mounted() {
    this.totalRead = this.exam.questions.length;

    this.exam.questions.forEach((q) => {
      if (q.status == 'attempted') {
        this.totalAttempt ++;
      }
      const question = this.questions.find((q1) => q1._id == q.questionId && q1.answer == q.optionId);
      if (question) {
        this.totalCorrect ++;
      }
    });
  },
};
</script>
<template>
    <div class="space-y-12 ml-6 w-1/2">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mb-4 mt-4">
          Exam Details of student <span class="text-emerald-500">{{ exam.studentId.name }}</span>
        </h2>
        <p class="text-blue-700 font-bold text-[18px] float-left">Total Opened: {{ totalRead }}, Total Attempt : {{ totalAttempt }}, Total Correct : {{ totalCorrect }}</p>
        <button type="button" class="px-4 py-2 bg-amber-600 float-right mb-8" @click="$emit('back')">Back</button>
        <br>
        <br>
        <br>
        <p v-if="type == 'bar'" class="block flex-inline">
          <span>Index Axis: </span> <button type="button" :class="`py-2 px-3 ${ indexAxis == 'x' ? 'bg-green-400' : 'bg-slate-300' } text-blue-500 rounded-md ml-8`" @click="indexAxis = 'x'">X</button>
          <button type="button" :class="`py-2 px-3 ${ indexAxis == 'y' ? 'bg-green-400' : 'bg-slate-300' } text-blue-500 rounded-md ml-8`" @click="indexAxis = 'y'">Y</button>
        </p>
        <Bar v-if="type == 'bar'" :data="chartData" :options="chartOptions" :key="Math.random() + 1"/>
        <Pie v-if="type == 'pie'" :data="chartData" :options="chartOptions" :key="Math.random() + 1"/>
      </div>
  </div>
</template>