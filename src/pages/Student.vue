<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import Loader from "../components/Loader.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import Toaster from "../components/Toaster.vue";
import axios from "axios";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import AdminFilter from "../components/AdminFilter.vue";
import IconEdit from '../components/icons/IconEdit.vue';
import IconPlusCircle from '../components/icons/IconPlusCircle.vue';

export default {
  components: {
    AuthenticatedLayout,
    Loader,
    ConfirmModal,
    Toaster,
    IconEdit,
    IconPlusCircle, 
    DataTable: Vue3EasyDataTable,
    AdminFilter
  },
  name: "Student",
  data: () => {
    return {
      students: [],
      loading: true,
      showModal: false,
      studentId: null,
      toaster: {
        type: '',
        message: ''
      },
      itemsSelected: [],
      filter: {
        name: null,
        email: null
      },
      items: []
    };
  },
  computed: {
    headers() {
      return [
        { text: "NAME", value: "name", sortable: true, direction: 'right'},
        { text: "EMAIL", value: "email", sortable: true},
        { text: "ACTION", value: "action"},
      ];
    },
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    clearFilter() {
      this.filter = {
        title: null,
        category: null,
        type: null,
        attachment: null
      }
      this.listItems();
    },
    listItems() {
      const items = [];
      this.students.forEach((item) => {
        let match = true;
        let namePattern = new RegExp(this.filter.name, 'i');
        let emailPattern = new RegExp(this.filter.email, 'i');
        
        if (this.filter.name && item.name.match(namePattern) == null) {
          match = false;
        }

        if (this.filter.email && item.email.match(emailPattern) == null) {
          match = false;
        }

        if (match) {
          items.push({
            name: item.name,
            email: item.email,
            action: item._id
          })
        }
      })
      this.items = items;
    },
    onClickDelete(studentId) {
      this.studentId = studentId;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        const result = await axios.delete('http://localhost:8080/student/' + this.studentId);
        if (result.status == 204) {
          this.showModal = false;
          this.toaster.type = 'success';
          this.toaster.message = 'Successfully deleted student!'
          this.getStudents()
        }
      } catch (error) {
        
      }
    },
    async getStudents() {
      this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/student");
        if (results.status == 200) {
          this.students = results.data;
          this.listItems()
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
      this.loading = false;
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <ConfirmModal v-if="showModal" @confirm="confirmDelete()" @cancel="showModal = false">
      <p class="text-sm text-gray-500">Are you sure want to delete student?</p>
    </ConfirmModal>
    <Toaster v-if="toaster.message" :type="toaster.type" :message="toaster.message" />
    <AdminFilter @filter="listItems()" @clear="clearFilter()">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write name"
          @keyup="filter.name = $event.target.value"
          :value="filter.name"
        >
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          type="text"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type email"
          @keyup="filter.email = $event.target.value"
          :value="filter.email"
        >
      </div>
    </AdminFilter>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Users</h1>
        <router-link to="/user/create" title="Add User"
          class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 border-2 border-blue-400 float-right mt-2 mr-4 cursor-pointer">
          <IconPlusCircle />
        </router-link>
      </div>
      <Loader v-if="loading" />
      <DataTable buttons-pagination v-model:items-selected="itemsSelected" :headers="headers" :items="items"
        :checkbox-column-width="40" show-index :index-column-width="10" border-cell alternating>
        <template #item-action="item">
          <router-link :to="`/user/edit/${item.action}`"
            class="text-white rounded-lg text-sm px-3 py-1.5 mt-2 mb-2 border-2 border-blue-400 focus:outline-none float-right">
            <IconEdit />
          </router-link>
        </template>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>