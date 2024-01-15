<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';

export default {
  name: "QuestionForm",
  components: { AuthenticatedLayout },
  data: () => {
    return {
      category: {
        name: '',
        description: ''
      },
      loading: false
    };
  },
  computed: {
    heading() {
      return this.$route.params.id ? 'Edit category' : 'Add Category';
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getCategory();
    }
  },
  methods: {
    async getCategory() {
      try {
        const result = await axios.get('http://localhost:8080/category/' + this.$route.params.id);
        if (result.status == 200) {
          this.category = result.data;
        }
      } catch (error) {

      }
    },
    async saveCategory() {
      this.loading = true;
      try {
        let result;
        if (this.$route.params.id) {
          result = await axios.patch('http://localhost:8080/category/' + this.$route.params.id, this.category);
        } else {
          result = await axios.post('http://localhost:8080/category', this.category);
        }
        if (result.status == 201) {
          this.$router.push('/category')
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
      this.loading = false;
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="block m-auto">
      <h1>{{ heading }}</h1>
      <div class="card flex mb-6">
        <span class="p-float-label">
          <InputText id="name" v-model="category.name"  placeholder="Enter name"/>
          <label for="name">Name</label>
        </span>
      </div>
      <div class="card flex">
        <span class="p-float-label">
          <Textarea v-model="category.description" rows="5" cols="30"  placeholder="Enter description"/>
          <label>Description</label>
        </span>
      </div>
      <div class="card flex justify-content-center flex-wrap gap-3">
        <Button label="Save" severity="success" @click="saveCategory()"/>
        <RouterLink to="/category">
          <Button label="Cancel" severity="secondary" />
        </RouterLink>
      </div>
    </div>
  </AuthenticatedLayout>
</template>