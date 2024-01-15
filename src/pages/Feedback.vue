<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import TableOperation from '../mixins/TableOperation';
export default {
  components: { AuthenticatedLayout },
  name: "Feedback",
  mixins: [TableOperation],
  data: () => {
    return {
        feedbacks: [],
        loading: false,
        total: 0,
        filters: {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
          'student.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
          comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
        },
    }
  },
  mounted() {
    this.getFeedbacks();
  },
  methods: {
    async getFeedbacks() {
        this.loading = true;
      try {
        const results = await axios.get("http://localhost:8080/review");
        if (results.status == 200) {
          this.feedbacks = results.data;
          this.total = results.data.length
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
      this.loading = false;
    },
    renderDescription(rowData) {
      console.log('rowData ', rowData);
    }
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="table w-full">
      <div class="table-header-group">
        <h1 class="float-left text-[32px]">Feedback ({{ total }})</h1>
      </div>
      <DataTable filterDisplay="row" :value="feedbacks" v-model:filters="filters" ref="dt" dataKey="id"
        tableStyle="min-width: 50rem" class="border-b-2" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="student.name" header="User Name" sortable filter>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              placeholder="Name" @keydown.enter="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="comment" header="Comment" sortable :body="renderDescription" style="max-width: 420px;">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text"
              @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Comment" />
          </template>
          <template #body="rowData">
            <div v-html="rowData.data.comment"></div>
          </template>
        </Column>
        <Column field="_id" header="Action">
          <template #body="{ data }">
            <router-link :to="`/feedback/detail/${data._id}`">
              <Button icon="pi pi-eye" v-tooltip.top="'Detail'" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>