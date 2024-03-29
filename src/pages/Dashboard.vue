<script>
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import axios from 'axios';
import {
	Bar,
	Pie,
	Doughnut
} from 'vue-chartjs'
import {
	Chart as ChartJS,
	ArcElement,
	RadialLinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale
} from 'chart.js';


ChartJS.register(
	ArcElement,
	RadialLinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale
);

import ChartConfig from '../config/ChartConfig.js';
import ExamList from '../components/ExamList.vue';
import StudentChart from '../components/StudentChart.vue'

export default {
	name: 'Dashboard',
	mixins: [ChartConfig],
	components: {
		AuthenticatedLayout,
		ExamList,
		Bar,
		Pie,
		Doughnut,
		StudentChart
	},
	data: function() {
		return {
			el: 'bar',
			filter: 'all',
			exam: null,
			openTab: 1,
			exams: [],
			questions: [],
			randomKey: Math.random(),
			data: {
				labels: [],
				datasets: [
					{
						label: 'Question Attempted',
						backgroundColor: "#2452ae",
						data: []
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: true,
						text: 'User Questions Attempt'
					}
				},
				onClick: this.handleClick
			},
			currentChart: null,
		}
	},
	mounted() {
		this.getQuestions();
		this.getExams();

	},
	methods: {
		toggleTabs(tabNumber) {
			this.openTab = tabNumber
		},
		async getExams() {
			const result = await axios.get('http://localhost:8080/exam');
			if (result.data) {
				this.exams = result.data
			}
			this.generateStudentChartData();
		},
		async getQuestions() {
			const result = await axios.get('http://localhost:8080/question');
			if (result.data) {
				this.questions = result.data
			}
		},
		generateStudentChartData() {
			const studentNames = [];
			const attemptQuestions = [];
			this.exams.forEach((ex) => {
				studentNames.push(ex.studentId.name);
				let attempted = ex.questions.filter((q) => q.status == 'attempted');

				attemptQuestions.push(attempted.length)
			});

			this.data.labels = studentNames;
			this.data.datasets[0].data = attemptQuestions;
			this.randomKey = Math.random()
			let colorCodes = [];
			for (let i in studentNames) {
				colorCodes.push(this.randomColorCode());
			}
			this.doughnut.labels = studentNames;
			this.doughnut.datasets[0].backgroundColor = colorCodes;
			this.doughnut.datasets[0].data = attemptQuestions;
			this.polarArea.labels = studentNames
			this.polarArea.datasets[0].data = attemptQuestions
			this.radar.labels = studentNames
			this.radar.datasets[0].data = attemptQuestions
		},
		randomColorCode() {
			return ('#' + (Math.floor(Math.random() * 16777215).toString(16)));
		},
		handleClick(event) {
			if (!['bar', 'pie'].includes(this.el)) {
				return false;
			}
			let chartInstance = this.$refs[this.el]
			this.currentChart = this.el;
			const studentName = chartInstance.chart.$context.chart.tooltip.title[0];
			const exam = this.exams.find((ex) => ex.studentId.name == studentName);
			this.exam = exam			
		}
	}
}
</script>
<template>
	<AuthenticatedLayout>
		<div class="flex flex-wrap w-full h-auto">
			<div class="w-full">
				<nav class="border-b text-sm flex justify-start">
						<a class="inline-block px-4 py-2 text-gray-700 hover:text-black cursor-pointer"
							@click="toggleTabs(1)"
							:class="{ 'text-pink-600 bg-white': openTab !== 1, 'text-white bg-pink-600': openTab === 1 }">
							Report
						</a>
						<a class="inline-block px-4 py-2 text-gray-700 hover:text-black cursor-pointer"
							@click="toggleTabs(2)"
							:class="{ 'text-pink-600 bg-white': openTab !== 2, 'text-white bg-pink-600': openTab === 2 }">
							Chart
						</a>
						<select v-if="openTab === 2" v-model="filter" class="float-right outline-none text-white bg-pink-600 border-l-2" @change="currentChart = null">
							<option selected value="all">All</option>
							<option value="bar">Bar</option>
							<option value="pie">Pie</option>
							<option value="doughnut">Doughnut</option>
						</select>
				</nav>
				<div class="relative flex flex-col break-words w-full shadow-lg rounded">
					<div class="px-4 py-2 chart-section">
						<div v-if="currentChart == null" class="tab-content tab-space">
							<div :class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
								<ExamList />
							</div>
							<div :class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
								<div class="container ml-6">
									<Bar
										v-if="['all', 'bar'].includes(filter)"
										class="student-chart ml-6"
										:options="options"
										:data="data"
										:key="randomKey"
										ref="bar"
										@click="el = 'bar'"
									/>
									<Pie
										v-if="['all', 'pie'].includes(filter)"
										class="student-chart ml-6"
										:options="options"
										:data="doughnut"
										:key="randomKey + 1"
										ref="pie"
										@click="el = 'pie'"
									/>
									<Doughnut
										v-if="['all', 'doughnut'].includes(filter)"
										class="student-chart ml-6"
										:options="options"
										:data="doughnut"
										:key="randomKey + 1"
										ref="doughnut"
										@click="el = 'doughnut'"
									/>
								</div>
							</div>
						</div>
						<StudentChart v-else :exam="exam" :questions="questions" :type="currentChart" @back="currentChart = null"/>
					</div>
				</div>
			</div>
		</div>
	</AuthenticatedLayout>
</template>