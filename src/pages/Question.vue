<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import IconTrash from '../components/icons/IconTrash.vue';
import IconEdit from '../components/icons/IconEdit.vue';
import IconPlusCircle from '../components/icons/IconPlusCircle.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
export default {
  components: { AuthenticatedLayout, ConfirmModal, Loader, IconTrash, IconEdit, IconPlusCircle, DataTable: Vue3EasyDataTable },
  name: "Question",
  data: () => {
    return {
      questions: [],
      loading: false,
      questionId: null,
      showModal: false,
      category: null,
      cateogries: [],
      itemsSelected: [],
      total: 0
    }
  },
  computed: {
    headers() {
      return [
        { text: "TITLE", value: "title" },
        { text: "CATEGORY", value: "category"},
        { text: "TYPE", value: "type"},
        { text: "ATTACHMENT REQUIRED", value: "attachment"},
        { text: "ACTION", value: "action"},
      ];
    },
    items() {
      return this.questions.map((item) => {
        return {
          title: item.title,
          category: item.category.name,
          type: item.type.toUpperCase(),
          attachment: item.attachment,
          action: item._id
        }
      })
    }
  },
  mounted() {
    this.getCategories();
    this.getQuestions();
  },
  methods: {
    async getCategories() {
      const result = await axios.get('http://localhost:8080/category');
      if (result.data) {
        this.cateogries = result.data;
      }
    },
    async getQuestions() {
      this.loading = true;
      let url = "http://localhost:8080/question";
      if (this.category) {
        url += '?category=' + this.category;
      }
      try {
        const results = await axios.get(url);
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
      <p class="text-sm text-gray-500">Are you sure want to delete question?</p>
    </ConfirmModal>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Questions ({{ total }})</h1>
        <router-link to="/question/create"
          class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 border-2 border-blue-400 float-right mt-2 mr-4 cursor-pointer"><IconPlusCircle /></router-link>
      </div>
      <Loader v-if="loading" />
      <DataTable
        buttons-pagination
        v-model:items-selected="itemsSelected"
        :headers="headers"
        :items="items"
        :checkbox-column-width="40"
        show-index
        :index-column-width="10"
        border-cell
        alternating
      >
      <template #item-action="item">
        <router-link
          :to="`/question/edit/${item.action}`"
          class="text-white rounded-lg text-sm px-3 py-1.5 mt-2 mb-2 border-2 border-blue-400 focus:outline-none float-right"
          ><IconEdit /></router-link>
      </template>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>