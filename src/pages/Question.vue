<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import IconTrash from '../components/icons/IconTrash.vue';
import IconEdit from '../components/icons/IconEdit.vue';
import IconPlusCircle from '../components/icons/IconPlusCircle.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import AdminFilter from "../components/AdminFilter.vue";

export default {
  components: {
    AuthenticatedLayout,
    ConfirmModal,
    Loader,
    IconTrash,
    IconEdit,
    IconPlusCircle,
    DataTable: Vue3EasyDataTable,
    AdminFilter
  },

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
      types: ['boolean', 'checkbox', 'radio', 'text'],
      total: 0,
      filter: {
        title: null,
        category: null,
        type: null,
        attachment: null
      },
      items: []
    }
  },
  computed: {
    headers() {
      return [
        { text: "TITLE", value: "title", sortable: true },
        { text: "CATEGORY", value: "category", sortable: true },
        { text: "TYPE", value: "type", sortable: true },
        { text: "ATTACHMENT REQUIRED", value: "attachment" },
        { text: "ACTION", value: "action" },
      ];
    },
  },
  mounted() {
    this.getCategories();
    this.getQuestions();
  },
  methods: {
    listItems() {
      const items = [];
      this.questions.forEach((item) => {
        let match = true;
        let titlePattern = new RegExp(this.filter.title, 'i');
        let categoryPattern = new RegExp(this.filter.category, 'i');
        let typePattern = new RegExp(this.filter.type, 'i');
        if (this.filter.title && item.title.match(titlePattern) == null) {
          match = false;
        }

        if (this.filter.category && item.category.name.match(categoryPattern) == null) {
          match = false;
        }

        if (this.filter.type && item.type.match(typePattern) == null) {
          match = false;
        }

        if ([true, false].includes(this.filter.attachment) && item.attachment !== this.filter.attachment) {
          match = false;
        }

        if (match) {
          items.push({
            title: item.title,
            category: item.category.name,
            type: item.type.toUpperCase(),
            attachment: item.attachment,
            action: item._id
          })
        }
      })
      this.items = items;
    },
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
          this.listItems();
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
    updateSort(item) {
      console.log('update sort item : ', item);
    },
    clearFilter() {
      this.filter = {
        title: null,
        category: null,
        type: null,
        attachment: null
      }
      this.listItems();
    }
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <ConfirmModal v-if="showModal" @confirm="confirmDelete()" @cancel="showModal = false">
      <p class="text-sm text-gray-500">Are you sure want to delete question?</p>
    </ConfirmModal>
    <AdminFilter @filter="listItems()" @clear="clearFilter()">
      <div class="mb-5">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write question title"
          @keyup="filter.title = $event.target.value"
          :value="filter.title"
        >
      </div>
      <div class="mb-5">
        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <input
          type="text"
          id="category"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type category name"
          @keyup="filter.category = $event.target.value"
          :value="filter.category"
        >
      </div>
      <div class="mb-5">
        <label for="types" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
        <select
          id="types"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="filter.type = $event.target.value"
          :value="filter.type"
        >
          <option value="">Select a type</option>
          <option v-for="t in types" :key="`option-${t}`" :value="t">{{ t.toUpperCase() }}</option>
        </select>
      </div>
      <div class="mb-5">
        <label for="types" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attachment Required</label>
        <select
          id="types"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="filter.attachment = $event.target.value != '#' ? Boolean($event.target.value) : null"
          :value="filter.attachment"
        >
          <option value="#"></option>
          <option value="">FALSE</option>
          <option value="true">TRUE </option>
        </select>
      </div>
    </AdminFilter>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Questions ({{ total }})</h1>
        <router-link to="/question/create" title="Add Question"
          class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 border-2 border-blue-400 float-right mt-2 mr-4 cursor-pointer">
          <IconPlusCircle />
        </router-link>
      </div>
      <Loader v-if="loading" />
      <DataTable buttons-pagination v-model:items-selected="itemsSelected" :headers="headers" :items="items"
        :checkbox-column-width="40" show-index :index-column-width="10" border-cell alternating @update-sort="updateSort">
        <template #item-action="item">
          <router-link :to="`/question/edit/${item.action}`" title="Edit"
            class="text-white rounded-lg text-sm px-3 py-1.5 mt-2 mb-2 border-2 border-blue-400 focus:outline-none float-right">
            <IconEdit />
          </router-link>
        </template>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>