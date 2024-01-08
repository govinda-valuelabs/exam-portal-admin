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
        const result = await axios.get('http://localhost:8080/feedback/' + this.$route.params.id);
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
    <div class="space-y-12 ml-6 w-1/2">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mb-4 mt-4">
          Feedback Details
        </h2>
        <hr class="mt-6" />
        <Loader v-if="loading" class="mt-10" />
        <div v-else class="container p-4">
          <p>Question: <b></b></p>
        </div>
      </div>
  </div>
</AuthenticatedLayout></template>