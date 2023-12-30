<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import Loader from "../components/Loader.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import Toaster from "../components/Toaster.vue";
import axios from "axios";
export default {
  components: { AuthenticatedLayout, Loader, ConfirmModal, Toaster },
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
      }
    };
  },
  mounted() {
    this.getStudents();
  },
  methods: {
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
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Users</h1>
        <router-link
          to="/user/create"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 float-right mt-2 mr-4 cursor-pointer"
          >Add User</router-link
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
          <tr v-for="(student, index) in students" :key="index"  class="bg-white border-b dark:border-gray-700">
            <td class="px-6 py-4">{{ student.name }}</td>
            <td class="px-6 py-4">{{ student.email }}</td>
            <td class="px-6 py-4 text-right">
              <router-link
                :to="`/user/edit/${student._id}`"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >Edit</router-link
              >
              <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="onClickDelete(student._id)">Delete</button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AuthenticatedLayout>
</template>