<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import IconTrash from '../components/icons/IconTrash.vue';
import IconEdit from '../components/icons/IconEdit.vue';
export default {
  components: { AuthenticatedLayout, ConfirmModal, Loader, IconTrash, IconEdit },
  name: "Category",
  data: () => {
    return {
        categories: [],
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
        const results = await axios.get("http://localhost:8080/category");
        if (results.status == 200) {
          this.categories = results.data;
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
        const result = await axios.delete('http://localhost:8080/category/' + this.questionId);
        if (result.status == 204) {
          this.showModal = false;
          this.toaster.type = 'success';
          this.toaster.message = 'Successfully deleted category!'
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
      <p class="text-sm text-gray-500">Are you sure want to delete category?</p>
    </ConfirmModal>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Category ({{ total }})</h1>
        <router-link
          to="/category/create"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 float-right mt-2 mr-4 cursor-pointer"
          >Add category</router-link
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
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(category, index) in categories"
            :key="index"
            class="bg-white border-b dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ index + 1 }}.</td>
            <td class="px-6 py-4">{{ category.name }}</td>
            <td class="px-3 py-2 text-right">
              <router-link
                :to="`/category/edit/${category._id}`"
                class="text-white float-left"
                ><IconEdit /></router-link
              >
              <button
                type="button"
                class="focus:outline-none text-white float-right"
                @click="onClickDelete(category._id)"
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