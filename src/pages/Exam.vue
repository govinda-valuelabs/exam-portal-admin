<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ExamList from "../components/ExamList.vue";
export default {
  components: { AuthenticatedLayout, ExamList },
  name: "Exam",
};
</script>
<template>
  <AuthenticatedLayout>
    <ExamList />
  </AuthenticatedLayout>
</template>