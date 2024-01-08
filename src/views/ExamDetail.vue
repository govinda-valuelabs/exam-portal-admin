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
      answers: [],
      questions: [],
      feedbacks: {},
      attachments: {},
      totalAttempt: 0,
    };
  },
  mounted() {
    this.getExamDetails();
  },
  methods: {
    calculateQuestions() {
      let totalAttempt = 0;
      this.answers.forEach((a) => {
        if (a.status == 'attempted') {
          totalAttempt++;
        }
      });
      this.totalAttempt = totalAttempt;
    },
    getStudentAnswer(questionId) {
      let ans = '';
      const answer = this.answers.find((a) => a.question == questionId);
      if (answer) {
        if (answer.answer) {
          return answer.answer;
        }
        answer.option.forEach((o) => {
          ans += o.value + ', '
        });
      }

      if (ans) {
        ans = ans.slice(0, -2);
      }

      return ans;
    },
    async getQuestions() {
      try {
        const result = await axios.get('http://localhost:8080/question/exam/' + this.exam.category);
        if (result.status == 200) {
          this.questions = result.data;
        }
      } catch (error) {
        console.log('error q ', error.message);
      }
    },
    async getExamDetails() {
      try {
        const result = await axios.get('http://localhost:8080/exam/' + this.$route.params.id);
        if (result.status == 200) {
          this.exam = result.data;
          this.getQuestions();
          this.getAnswers();
          this.getAttachments();
          this.getFeedbacks();
        }
      } catch (error) {
        console.log('Error ' + error.message);
      }
    },
    async getFeedbacks() {
      try {
        const result = await axios.get('http://localhost:8080/feedback', { student: this.exam.studentId });
        if (result.status == 200) {
          result.data.forEach((f) => {
            this.feedbacks[f.question._id] = f.comment;
          })
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    },
    async getAttachments() {
      try {
        const result = await axios.get('http://localhost:8080/attachment/attachments', { exam: this.$route.params.id });
        if (result.status == 200) {
          result.data.forEach((a) => {
            this.attachments[a.question] = 'http://localhost:8080/' + a.path;
          })
        }
      } catch (error) {
        console.log('Error : ', error.message);
      }
    },
    async getAnswers() {
      try {
        const result = await axios.post('http://localhost:8080/answer/exam/' + this.$route.params.id);
        if (result.status == 200) {
          this.answers = result.data
          this.calculateQuestions();
        }
      } catch (error) {
        console.log('Error : ' + error.message);
      }
    }
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="space-y-12 ml-6 w-full">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mb-4 mt-4">
          Survey Details
          <router-link to="/survey"
            class="text-xs font-semibold leading-6 text-gray-900 bg-slate-500 px-3 py-2 rounded-sm float-right">
            Back
          </router-link>
        </h2>
        <p class="text-blue-700 font-bold text-[18px]">Total Seen: {{ answers.length }}, Total Attempt : {{ totalAttempt
        }}</p>
        <hr class="mt-6" />
        <Loader v-if="loading" class="mt-10" />
        <div v-else class="container p-4">
          <ul class="w-full">
            <li v-for="(question, index) in questions" :key="index" class="mb-4">
              <div class="flex flex-col">
                <p class="font-semibold text-[18px]">{{ (parseInt(index) + 1) }}. {{ question.title }}</p>
                <div class="w-1/2">
                  <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 ml-6">
                    <li v-for="(option, p) in question.options" :key="parseInt(p) + 2" class="flex items-center">
                      <svg v-if="question.answer == option._id"
                        class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <svg v-else class="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      {{ option.value }}
                    </li>
                  </ul>
                </div>
                <div class="w-1/2">
                  <img v-if="attachments[question._id]" :src="attachments[question._id]" class="attachment" alt="attachment">
                  <img v-if="attachments[question._id]" :src="attachments[question._id]" class="attachment-preview" alt="attachment">
                </div>
                <p v-if="getStudentAnswer(question._id)" class="p-2 font-semibold text-green-500">User's Answer : {{
                  getStudentAnswer(question._id) }} </p>
                <p v-if="feedbacks[question._id]" class="p-2 font-semibold text-green-500">User's Feedback : {{
                  feedbacks[question._id] }} </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</AuthenticatedLayout></template>