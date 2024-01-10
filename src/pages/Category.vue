<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import IconEdit from '../components/icons/IconEdit.vue';
import IconTrash from '../components/icons/IconTrash.vue';
import IconPlusCircle from '../components/icons/IconPlusCircle.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
export default {
  components: { AuthenticatedLayout, ConfirmModal, Loader, IconTrash, IconEdit, IconPlusCircle, DataTable: Vue3EasyDataTable },
  name: "Category",
  data: () => {
    return {
        categories: [],
        loading: false,
        questionId: null,
        showModal: false,
        total: 0,
        itemsSelected: [],
        items: [],
        filter: {
          name: null
        }
    }
  },
  computed: {
    headers() {
      return [
        { text: "NAME", value: "name", sortable: true},
        { text: "ACTION", value: "action"},
      ];
    },
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    listItems() {
      const items = [];
      this.categories.forEach((item) => {
        let match = true;
        let namePattern = new RegExp(this.filter.name, 'i');
        if (this.filter.name && item.name.match(namePattern) == null) {
          match = false;
        }

        if (match) {
          items.push({
            name: item.name,
            action: item._id
          })
        }
      })
      this.items = items;
    },
    async getCategories() {
        this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/category");
        if (results.status == 200) {
          this.categories = results.data;
          this.total = results.data.length
          this.listItems()
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
          this.getCategories()
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
        <router-link to="/category/create"
          class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 border-2 border-blue-400 float-right mt-2 mr-4 cursor-pointer"><IconPlusCircle /></router-link>
      </div>
      <Loader v-if="loading" />
      <DataTable
        v-else
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
          :to="`/category/edit/${item.action}`"
          class="text-white rounded-lg text-sm px-3 py-1.5 mt-2 mb-2 border-2 border-blue-400 focus:outline-none float-right"
          ><IconEdit /></router-link>
      </template>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>