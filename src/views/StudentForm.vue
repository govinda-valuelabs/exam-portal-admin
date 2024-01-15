<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import Loader from "../components/Loader.vue";
import axios from 'axios';
export default {
  components: { AuthenticatedLayout, Loader },
  name: "StudentForm",
  data: () => {
    return {
      student: {
        name: "",
        email: "",
        password: "",
      },
      heading: 'Create ',
      loading: false,
    };
  },
  computed: {
    heading() {
      return this.$route.params.id ? 'Edit User' : 'Add User';
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.heading = 'Update ';
      this.getStudent();
    }
  },
  methods: {
    async getStudent() {
      const result = await axios.get('http://localhost:8080/student/' + this.$route.params.id);
      if (result.status == 200) {
        this.student = result.data;
      }
    },
    async saveStudent() {
        this.loading = true;
        let result;
        try {
          if (this.$route.params.id) {
            result = await axios.patch('http://localhost:8080/student/' + this.$route.params.id, this.student);
          } else {
            result = await axios.post('http://localhost:8080/student', this.student);
          }

          if (result.status == 201 || result.data.success) {
              this.$router.push('/user');
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
    <div class="block m-auto">
      <h1>{{ heading }}</h1>
      <div class="card flex mb-6">
        <span class="p-float-label">
          <InputText id="name" v-model="student.name"  placeholder="Enter name"/>
          <label for="name">Name</label>
        </span>
      </div>
      <div class="card flex mb-6">
        <span class="p-float-label">
          <InputText id="email" v-model="student.email"  placeholder="Enter email"/>
          <label>Email</label>
        </span>
      </div>
      <div class="card flex mb-6">
        <span class="p-float-label">
          <Password v-model="student.password" :feedback="false"  placeholder="Enter password"/>
          <label>Password</label>
        </span>
      </div>
      <div class="card flex justify-content-center flex-wrap gap-3">
        <Button label="Save" severity="success" @click="saveStudent()" />
        <RouterLink to="/user">
          <Button label="Cancel" severity="secondary" />
        </RouterLink>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
