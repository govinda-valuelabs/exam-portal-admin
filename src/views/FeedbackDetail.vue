<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import { isProxy, toRaw } from 'vue'

export default {
  name: "FeedbackDetail",
  components: { AuthenticatedLayout },
  data: () => {
    return {
      feedback: [],
      loading: false,
    };
  },
  mounted() {
    this.getFeedbackDetails();
  },
  methods: {
    async getFeedbackDetails() {
      try {
        const result = await axios.get('http://localhost:8080/review/' + this.$route.params.id);
        if (result.status == 200 && result.data) {

          this.feedback.push({
            column: 'User Name',
            value: result.data.student.name
          });

          this.feedback.push({
            column: 'User Email',
            value: result.data.student.email
          });

          this.feedback.push({
            column: 'Comment',
            value: result.data.comment
          });

        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="card w-full">
      <div class="border-bpb-12">
        <h2 class="text-[32px] font-semibold leading-7mb-4 mt-4">
          Feedback Details
          <RouterLink to="/feedback">
            <Button label="Back" severity="secondary" style="float: right;" />
          </RouterLink>
        </h2>
        <hr class="mt-6" />
        <DataTable :value="feedback" tableStyle="min-width: 50rem">
          <Column field="column" header="Column"></Column>
          <Column field="value" header="Value">
            <template #body="rowData">
            <div v-html="rowData.data.value"></div>
          </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </AuthenticatedLayout>
</template>