<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import { isProxy, toRaw } from 'vue'

export default {
  name: "ExamDetail",
  components: { AuthenticatedLayout, Loader },
  data: () => {
    return {
      exam: null,
      loading: false,
      questions: [],
      totalRead: 0,
      totalAttempt: 0,
      totalCorrect: 0
    };
  },
  mounted() {
    this.getExamDetails();
    this.getQuestions();
  },
  methods: {
    calculateQuestions() {
      let totalAttempt = 0;
      let totalRead = 0;
      let totalCorrect = 0;
      this.exam.questions.forEach((q) => {
        totalRead ++;
        if (q.status == 'attempted') {
          totalAttempt ++;
        }

        const question = this.questions.find((q1) => q.questionId == q1._id);

        if (question.answer == q.optionId) {
          totalCorrect ++;
        }
      });
      console.log('totalRead ', totalRead);
      this.totalRead = totalRead;
      this.totalAttempt = totalAttempt;
      this.totalCorrect = totalCorrect;
    },
    getStudentAnswer(qst) {
      let question = isProxy(qst) ? toRaw(qst) : qst;
      this.exam = toRaw(this.exam);
      let examQuestion = this.exam?.questions.find(
        (q) => q.questionId == question._id
      );

      if (!examQuestion || examQuestion.status != 'attempted') {
        return null;
      }

      const options = isProxy(question.options) ? toRaw(question.options) : question.options;

      const selectedOption = options.find((o) => o._id == examQuestion.optionId);
      return selectedOption;
    },
    async getQuestions() {
      try {
        const result = await axios.get('http://localhost:8080/question');
        if (result.status == 200) {
          this.questions = result.data;
          this.calculateQuestions();
        }
      } catch (error) {

      }
    },
    async getExamDetails() {
      try {
        const result = await axios.get('http://localhost:8080/exam/' + this.$route.params.id);
        if (result.status == 200) {
          this.exam = result.data;
        }
      } catch (error) {

      }
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="space-y-12 ml-6 w-1/2">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mb-4 mt-4">
          Survey Details
        </h2>
        <p class="text-blue-700 font-bold text-[18px]">Total Seen: {{ totalRead }}, Total Attempt : {{ totalAttempt }}</p>
        <hr class="mt-6" />
        <Loader v-if="loading" class="mt-10" />
        <div v-else class="container p-4">
          <ul class="w-full">
            <li v-for="(question, index) in questions" :key="index" class="mb-4">
              <div class="flex flex-col">
                <p class="font-semibold text-[18px]">{{ (parseInt(index) + 1) }}. {{ question.title }}</p>
                <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 ml-6">
                  <li v-for="(option, p) in question.options" :key="parseInt(p) + 2" class="flex items-center">
                    <svg v-if="question.answer == option._id"
                      class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <svg v-else class="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {{ option.value }}
                  </li>
                </ul>
                <p v-if="getStudentAnswer(question)" :class="`p-2 font-semibold ${ question.answer == getStudentAnswer(question)?._id ? 'text-green-500' : ''}`">Student's Answer : {{ getStudentAnswer(question).value }} </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</AuthenticatedLayout></template>