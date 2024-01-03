<script>
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import moment from 'moment';

export default {
  components: { ConfirmModal, Loader },
  name: "ExamList",
  data: () => {
    return {
        exams: [],
        loading: false,
        examId: null,
        showModal: false,
        total: 0
    }
  },
  mounted() {
    this.getExams();
  },
  methods: {
    async getExams() {
        // this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/exam");
        if (results.status == 200) {
          this.exams = results.data;
          this.total = results.data.length
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
      this.loading = false;
    },
    formatDateTime(datestring) {
      return moment(datestring).format('YYYY-MM-DD HH:mm:ss a');
    },
    onClickDelete(examId) {
      this.examId = examId;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        const result = await axios.delete('http://localhost:8080/exam/' + this.examId);
        if (result.status == 204) {
          this.showModal = false;
          this.toaster.type = 'success';
          this.toaster.message = 'Successfully deleted exam!'
          this.getExams()
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    },
  }
};
</script>
<template>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Survey ({{ total }})</h1>
        <router-link
          to="/survey/create"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 float-right mt-2 mr-4 cursor-pointer"
          >Assign Survey</router-link
        >
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
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Start Time</th>
            <th scope="col" class="px-6 py-3">End Time</th>
            <th scope="col" class="px-6 py-3">Total Attempt</th>
            <th scope="col" class="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(exam, index) in exams"
            :key="index"
            class="bg-white border-b dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ index + 1 }}.</td>
            <td class="px-6 py-4">{{ exam.studentId.name }}</td>
            <td class="px-6 py-4">{{ exam.category.name }}</td>
            <td class="px-6 py-4">{{ exam.startTime ? formatDateTime(exam.startTime) : 'Not Yet' }}</td>
            <td class="px-6 py-4">{{ exam.endTime ? formatDateTime(exam.endTime) : 'Not Yet' }}</td>
            <td class="px-6 py-4">{{ exam.questions.length }}</td>
            <td class="px-6 py-4 text-right">
              <router-link
                :to="`/survey/detail/${exam._id}`"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right"
                >Details</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>