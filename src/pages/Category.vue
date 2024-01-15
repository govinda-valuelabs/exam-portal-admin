<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import TableOperation from '../mixins/TableOperation';

export default {
  components: { AuthenticatedLayout },
  mixins: [TableOperation],
  name: "Category",
  data: () => {
    return {
      categories: [],
      loading: false,
      total: 0,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
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
          this.getCategories()
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    }
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Category ({{ total }})
          <RouterLink to="category/create" class="foat-right">
            <Button class="button-add" icon="pi pi-plus-circle" severity="info" link v-tooltip.top="'Add Category'" />
          </RouterLink>
        </h1>
      </div>
      <DataTable filterDisplay="row" :value="categories" v-model:filters="filters" ref="dt" dataKey="id"
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
        <Column field="description" header="Description" sortable filter>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              placeholder="Description" @keydown.enter="filterCallback()" class="p-column-filter" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column field="_id" header="Action">
          <template #body="{ data }">
            <router-link :to="`/category/edit/${data._id}`">
              <Button icon="pi pi-pencil" v-tooltip.top="'Edit'" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>