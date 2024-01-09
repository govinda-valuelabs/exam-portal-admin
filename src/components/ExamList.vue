<script>
import ConfirmModal from "../components/ConfirmModal.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";
import moment from 'moment';
import IconTrash from '../components/icons/IconTrash.vue';
import IconEdit from '../components/icons/IconEdit.vue';
import IconPlusCircle from '../components/icons/IconPlusCircle.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';

export default {
  components: { ConfirmModal, Loader, IconTrash, IconEdit, IconPlusCircle, DataTable: Vue3EasyDataTable },
  name: "ExamList",
  data: () => {
    return {
        exams: [],
        loading: false,
        examId: null,
        showModal: false,
        total: 0,
        itemsSelected: [],
    }
  },
  computed: {
    headers() {
      return [
        { text: "USER", value: "user" },
        { text: "CATEGORY", value: "category"},
        { text: "TOTAL ATTEMPT", value: "total"},
        { text: "ACTION", value: "action"},
      ];
    },
    items() {
      return this.exams.map((item) => {
        return {
          user: item.studentId.name,
          category: item.category.name,
          total: item.questions.length,
          action: item._id
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
        <h1 class="float-left text-[32px]">Survey ({{ total }})</h1>
        <router-link
          to="/survey/create"
          class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 border-2 border-blue-400 float-right mt-2 mr-4 cursor-pointer"
          ><IconPlusCircle /></router-link
        >
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
        :to="`/survey/detail/${item.action}`"
          class="text-white rounded-lg text-sm px-3 py-1.5 mt-2 mb-2 border-2 border-blue-400 focus:outline-none float-right"
          ><IconEdit /></router-link>
      </template>
      </DataTable>
    </div>
</template>