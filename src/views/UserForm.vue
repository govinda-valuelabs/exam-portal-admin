<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import Loader from "../components/Loader.vue";
import axios from 'axios';
export default {
  components: { AuthenticatedLayout, Loader },
  name: "UserForm",
  data: () => {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      heading: 'Create ',
      loading: false,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.heading = 'Update ';
      this.getUser();
    }
  },
  methods: {
    async getUser() {
      const result = await axios.get('http://localhost:8080/user/' + this.$route.params.id);
      if (result.status == 200) {
        this.user = result.data;
      }
    },
    async saveUser() {
        this.loading = true;
        let result;
        try {
          if (this.$route.params.id) {
            result = await axios.patch('http://localhost:8080/user/' + this.$route.params.id, this.user);
          } else {
            result = await axios.post('http://localhost:8080/user', this.user);
          }

          if (result.status == 201 || result.data.success) {
              this.$router.push('/admin');
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
    <div class="space-y-12 ml-6">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mt-4">
          {{ user.name ? user.name : 'Admin' }}
        </h2>
        <Loader v-if="loading" class="mt-10" />
        <div
          v-else
          class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div class="sm:col-span-4">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Name</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="user.name"
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="name"
                  class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith"
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="user.email"
                  type="text"
                  name="email"
                  id="email"
                  autocomplete="email"
                  class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith@gmail.com"
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="user.password"
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="password"
                  class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Write your password here"
                />
              </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
              <router-link
                to="/admin"
                class="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </router-link>
              <button
                type="button"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="saveUser()"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
