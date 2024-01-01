<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import IconTrash from '../components/icons/IconTrash.vue';
import IconEdit from '../components/icons/IconEdit.vue';
export default {
  components: { AuthenticatedLayout, ConfirmModal, Loader, IconTrash, IconEdit },
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
    getAnswer(q) {

    }
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <ConfirmModal v-if="showModal" @confirm="confirmDelete()" @cancel="showModal = false">
      <p class="text-sm text-gray-500">Are you sure want to delete student?</p>
    </ConfirmModal>
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
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Answer</th>
            <th scope="col" class="px-6 py-3">Attachment Required</th>
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
            <td class="px-6 py-4">{{ question.type.toUpperCase() }}</td>
            <td class="px-6 py-4">{{ question.options.find((o) => o._id == question.answer)?.value }}</td>
            <td class="px-6 py-4">{{ question.attachment }}</td>
            <td class="px-3 py-2 text-right">
              <router-link
                :to="`/question/edit/${question._id}`"
                class="text-white float-left"
                ><IconEdit /></router-link
              >
              <button
                type="button"
                class="focus:outline-none text-white float-right"
                @click="onClickDelete(question._id)"
              >
                <IconTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AuthenticatedLayout>
</template>