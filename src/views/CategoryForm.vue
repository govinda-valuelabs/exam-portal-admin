<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";

export default {
  name: "QuestionForm",
  components: { AuthenticatedLayout, Loader },
  data: () => {
    return {
      category: {
        name: "",
      },
      loading: false
    };
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
    <div class="space-y-12 ml-6 w-1/2">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mt-4">
          Category
        </h2>
        <Loader v-if="loading" class="mt-10" />
        <div v-else class="w-full">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            
            <div class="min-w-full">
              <label for="name" class="text-sm font-medium leading-6 text-gray-900">Name</label>
              <div class="mt-2">
                <div class="flex rounded-md">
                  <input v-model="category.name" type="text" name="name" id="name" autocomplete="name"
                    class="py-2 px-4 text-gray-900 placeholder:text-gray-400 w-full input-text"
                    placeholder="Category Name" @keypress.enter="saveCategory()"/>
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <div class="mt-2">
                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <router-link to="/category"
                    class="text-xs font-semibold leading-6 text-gray-900 bg-slate-500 px-3 py-2 rounded-md">
                    Cancel
                  </router-link>
                  <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                    @click="saveCategory()">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>