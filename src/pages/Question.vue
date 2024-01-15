<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import TableOperation from '../mixins/TableOperation.js';
import ExportData from '../mixins/ExportData.js'
export default {
  components: { AuthenticatedLayout },
  mixins: [TableOperation, ExportData],
  name: "Question",
  data: () => {
    return {
      questions: [],
      loading: false,
      questionId: null,
      showModal: false,
      cateogries: [],
      total: 0,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        attachment: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      items: []
    }
  },
  mounted() {
    this.getCategories();
    this.getQuestions();
  },
  methods: {
    listItems() {
      const items = [];
      this.questions.forEach((item) => {
        items.push({
          title: item.title,
          category: item.category.name,
          type: item.type.toUpperCase(),
          attachment: item.attachment,
          action: item._id
        })
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
      try {
        const results = await axios.get(url);
        if (results.status == 200) {
          this.questions = results.data;
          this.total = results.data.length
          this.listItems();
        }
      } catch (error) {
        console.log("Error ", error);
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
    }
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Questions ({{ total }})
          <RouterLink to="question/create" class="foat-right">
            <Button class="button-add" icon="pi pi-plus-circle" severity="info" link v-tooltip.top="'Add Question'" />
          </RouterLink>
        </h1>
      </div>
      <DataTable filterDisplay="row" :value="items" v-model:filters="filters" ref="dt" dataKey="id" class="border-b-2" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]">
        <template #header>
          <div style="text-align: left">
            <Button icon="pi pi-external-link" label="Export Excel" @click="exportData('excel')" class="mr-2"/>
            <Button icon="pi pi-external-link" label="Export PDF" @click="exportData('pdf')" severity="success" />
          </div>
        </template>
        <Column field="title" header="Title" sortable filter>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              placeholder="Title" @keydown.enter="filterCallback()" class="p-column-filter" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column field="category" header="Category" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Category" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column field="type" header="Type" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              placeholder="Type" @keydown.enter="filterCallback()" class="p-column-filter" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column field="attachment" header="Attachment"></Column>
        <Column field="action" header="Action">
          <template #body="{ data }">
            <router-link :to="`/question/edit/${data.action}`">
              <Button icon="pi pi-pencil" v-tooltip.top="'Edit'" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>