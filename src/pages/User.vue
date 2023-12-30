<script>
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import Loader from "../components/Loader.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import Toaster from "../components/Toaster.vue";
import axios from "axios";
export default {
    components: { AuthenticatedLayout, Loader, ConfirmModal, Toaster },
    name: 'User',
    data: function() {
        return {
            users: [],
            loading: true,
            showModal: false,
            userId: null,
            toaster: {
                type: '',
                message: ''
            }
        }
    },
    mounted() {
    this.getUsers();
  },
  methods: {
    onClickDelete(userId) {
      this.userId = userId;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        const result = await axios.delete('http://localhost:8080/user/' + this.userId);
        if (result.status == 204) {
          this.showModal = false;
          this.toaster.type = 'success';
          this.toaster.message = 'Successfully deleted user!'
          this.getUsers()
        }
      } catch (error) {
        
      }
    },
    async getUsers() {
      this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/user");
        if (results.status == 200) {
          this.users = results.data;
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
      this.loading = false;
    },
  },
}
</script>
<template>
    <AuthenticatedLayout>
    <ConfirmModal v-if="showModal" @confirm="confirmDelete()" @cancel="showModal = false">
      <p class="text-sm text-gray-500">Are you sure want to delete user?</p>
    </ConfirmModal>
    <Toaster v-if="toaster.message" :type="toaster.type" :message="toaster.message" />
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Admin</h1>
        <router-link
          to="/admin/create"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 float-right mt-2 mr-4 cursor-pointer"
          >Add Admin</router-link
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
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index"  class="bg-white border-b dark:border-gray-700">
            <td class="px-6 py-4">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4 text-right">
              <router-link
                :to="`/admin/edit/${user._id}`"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >Edit</router-link
              >
              <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="onClickDelete(user._id)">Delete</button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AuthenticatedLayout>
</template>