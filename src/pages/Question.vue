<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
export default {
  components: { AuthenticatedLayout, ConfirmModal, Loader },
  name: "Question",
  data: () => {
    return {
        questions: [],
        loading: false,
        questionId: null,
        showModal: false,
        total: 0
    }
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
        this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/question");
        if (results.status == 200) {
          this.questions = results.data;
          this.total = results.data.length
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
      this.loading = false;
    },
    onClickDelete(questionId) {
      this.questionId = questionId;
      this.showModal = true;
    },
    getAnswer(question) {
      let option = question.options.find((op) => op._id == question.answer);
      return option ? option.value : '';
    },
    async confirmDelete() {
      try {
        const result = await axios.delete('http://localhost:8080/question/' + this.questionId);
        if (result.status == 204) {
          this.showModal = false;
          this.toaster.type = 'success';
          this.toaster.message = 'Successfully deleted question!'
          this.getQuestions()
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    },
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Questions ({{ total }})</h1>
        <router-link
          to="/question/create"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 float-right mt-2 mr-4 cursor-pointer"
          >Add Question</router-link
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
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Answer</th>
            <th scope="col" class="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(question, index) in questions"
            :key="index"
            class="bg-white border-b dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ index + 1 }}.</td>
            <td class="px-6 py-4">{{ question.title }}</td>
            <td class="px-6 py-4">{{ getAnswer(question) }}</td>
            <td class="px-6 py-4 text-right">
              <router-link
                :to="`/question/edit/${question._id}`"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >Edit</router-link
              >
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                @click="onClickDelete(student._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AuthenticatedLayout>
</template>