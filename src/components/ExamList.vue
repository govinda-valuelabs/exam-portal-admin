<script>
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import moment from 'moment';
import { FilterMatchMode } from 'primevue/api';
import TableOperation from '../mixins/TableOperation';

export default {
  name: "ExamList",
  mixins: [TableOperation],
  data: () => {
    return {
        exams: [],
        loading: false,
        examId: null,
        showModal: false,
        total: 0,
        filters: {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
          user: { value: null, matchMode: FilterMatchMode.CONTAINS },
          email: { value: null, matchMode: FilterMatchMode.CONTAINS },
          category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        },
    }
  },
  computed: {
    items() {
      return this.exams.map((item) => {
        return {
          user: item.studentId.name,
          email: item.studentId.email,
          category: item.category.name,
          total: item.questions.length,
          _id: item._id
        }
      })
    }
  },
  mounted() {
    this.getExams();
  },
  methods: {
    async getExams() {
        // this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/exam");
        if (results.status == 200) {
          this.exams = results.data;
          this.total = results.data.length
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
      this.loading = false;
    },
    formatDateTime(datestring) {
      return moment(datestring).format('YYYY-MM-DD HH:mm:ss a');
    },
    onClickDelete(examId) {
      this.examId = examId;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        const result = await axios.delete('http://localhost:8080/exam/' + this.examId);
        if (result.status == 204) {
          this.showModal = false;
          this.toaster.type = 'success';
          this.toaster.message = 'Successfully deleted exam!'
          this.getExams()
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    },
  }
};
</script>
<template>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Survey ({{ total }})
          <RouterLink to="survey/create" class="foat-right">
            <Button class="button-add" icon="pi pi-plus-circle" severity="info" link v-tooltip.top="'Create Survey'" />
          </RouterLink>
        </h1>
      </div>
      <DataTable filterDisplay="row" :value="items" v-model:filters="filters" ref="dt" dataKey="id"
        tableStyle="min-width: 50rem" class="border-b-2" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="user" header="User Name" sortable filter>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              placeholder="User Name" @keydown.enter="filterCallback()" class="p-column-filter" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column field="email" header="User Email" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Email" />
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
        <Column field="total" header="Total Attempt" sortable>
        </Column>
        <Column field="_id" header="Action">
          <template #body="{ data }">
            <router-link :to="`/survey/detail/${data._id}`">
              <Button icon="pi pi-eye" v-tooltip.top="'Edit'" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
</template>