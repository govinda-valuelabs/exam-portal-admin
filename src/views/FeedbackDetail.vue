<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import { isProxy, toRaw } from 'vue'

export default {
  name: "FeedbackDetail",
  components: { AuthenticatedLayout, Loader },
  data: () => {
    return {
      feedback: null,
      loading: false,
    };
  },
  mounted() {
    this.getFeedbackDetails();
  },
  methods: {
    async getFeedbackDetails() {
      try {
        const result = await axios.post('http://localhost:8080/feedback/detail/' + this.$route.params.id);
        if (result.status == 200) {
          this.feedback = result.data;
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="space-y-12 ml-6 w-full">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mb-4 mt-4">
          Feedback Details
          <router-link to="/feedback"
            class="text-xs font-semibold leading-6 text-gray-900 bg-slate-500 px-3 py-2 rounded-sm float-right">
            Back
          </router-link>
        </h2>
        <hr class="mt-6" />
        <Loader v-if="loading" class="mt-10" />
        <div v-if="feedback" class="relative overflow-x-auto p-4">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Student</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{{ feedback.student.name }}</td>
              </tr>
              <tr>
                <td class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Question</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{{ feedback.question.title }}</td>
              </tr>
              <tr>
                <td class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Comment</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{{ feedback.comment }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>