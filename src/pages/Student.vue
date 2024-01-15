<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from "axios";
import { FilterMatchMode } from 'primevue/api';
import TableOperation from '../mixins/TableOperation';

export default {
  components: { AuthenticatedLayout },
  name: "Student",
  mixins: [TableOperation],
  data: () => {
    return {
      students: [],
      loading: true,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
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
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Users
          <RouterLink to="user/create" class="foat-right">
            <Button class="button-add" icon="pi pi-plus-circle" severity="info" link v-tooltip.top="'Add User'" />
          </RouterLink>
        </h1>
      </div>
      <DataTable filterDisplay="row" :value="students" v-model:filters="filters" ref="dt" dataKey="id"
        tableStyle="min-width: 50rem" class="border-b-2" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="name" header="Name" sortable filter>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              placeholder="Name" @keydown.enter="filterCallback()" class="p-column-filter" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column field="email" header="Email" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Email" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column field="_id" header="Action">
          <template #body="{ data }">
            <router-link :to="`/user/edit/${data._id}`">
              <Button icon="pi pi-pencil" v-tooltip.top="'Edit'" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>