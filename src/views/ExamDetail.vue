<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import { isProxy, setTransitionHooks, toRaw } from 'vue'
import QuestionDetail from "../components/QuestionDetail.vue";

export default {
  name: "ExamDetail",
  components: { AuthenticatedLayout, QuestionDetail },
  data: () => {
    return {
      exam: null,
      loading: false,
      answers: {},
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
      for (let a in this.answers) {
        if (this.answers[a].status == 'attempted') {
          totalAttempt++;
        }
      }
      this.totalAttempt = totalAttempt;
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
          this.answers = {};
          result.data.forEach((a) => {
            this.answers[a.question] = a;
          })
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
    <div class="card">
      <h2 class="text-[32px] font-semibold leading-7 mb-4 mt-4">
        Survey Details
        <router-link to="/survey">
          <Button label="Back" severity="secondary" />
        </router-link>
      </h2>
      <p class="text-blue-700 font-bold text-[18px]">Total Seen: {{ answers.length }}, Total Attempt : {{ totalAttempt
      }}</p>
      <hr class="mt-6" />
      <Accordion :activeIndex="0">
        <AccordionTab v-for="(question, index) in questions" :key="index" :header="(index + 1) + '. ' + question.title">
          <QuestionDetail
            :question="question"
            :answer="answers[question._id]"
            :attachment="attachments[question._id]"
            :feedback="feedbacks[question._id]"
          />
        </AccordionTab>
      </Accordion>
    </div>
  </AuthenticatedLayout>
</template>