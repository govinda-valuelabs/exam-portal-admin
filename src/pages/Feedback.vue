<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import IconDetail from '../components/icons/IconDetail.vue';
export default {
  components: { AuthenticatedLayout, ConfirmModal, Loader, IconDetail },
  name: "Feedback",
  data: () => {
    return {
        feedbacks: [],
        loading: false,
        total: 0
    }
  },
  mounted() {
    this.getFeedbacks();
  },
  methods: {
    async getFeedbacks() {
        this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/feedback");
        if (results.status == 200) {
          this.feedbacks = results.data;
          this.total = results.data.length
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
      this.loading = false;
    },
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <ConfirmModal v-if="showModal" @confirm="confirmDelete()" @cancel="showModal = false">
      <p class="text-sm text-gray-500">Are you sure want to delete question?</p>
    </ConfirmModal>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Feedback ({{ total }})</h1>
        
      </div>
      <Loader v-if="loading" />
      <table
        v-else
        class="w-full text-sm text-left rtl:text-right text-slate-950 dark:text-slate-950"
      >
        <thead
          class="text-xs text-slate-950 uppercase bg-gray-50 dark:text-slate-950"
        >
          <tr>
            <th scope="col" class="px-6 py-3">S.No</th>
            <th scope="col" class="px-6 py-3">User</th>
            <th scope="col" class="px-6 py-3">Question</th>
            <th scope="col" class="px-6 py-3">Comment</th>
            <th scope="col" class="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(feedback, index) in feedbacks"
            :key="index"
            class="bg-white border-b dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ index + 1 }}.</td>
            <td class="px-6 py-4">{{ feedback.student.name }}</td>
            <td class="px-6 py-4">{{ feedback.question.title }}</td>
            <td class="px-6 py-4">{{ feedback.comment }}</td>
            <td class="px-3 py-2 text-right">
              <router-link
                :to="`/feedback/detail/${feedback._id}`"
                class="text-white float-left"
                ><IconDetail /></router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AuthenticatedLayout>
</template>