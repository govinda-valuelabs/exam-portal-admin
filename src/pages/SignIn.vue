<script>
import axios from 'axios';
import GuestLayout from '../layouts/GuestLayout.vue';
export default {
  components: { GuestLayout },
  data() {
    return {
      email: '',
      password: '',
      empty: false
    };
  },
  methods: {
    async submitForm() {
      if (this.email === '' || this.password === '') {
        this.empty = true;
        return;
      } else {
        this.empty = false;
        try {
          const result = await axios.post('http://localhost:8080/user/signin', { userEmail: this.email, password: this.password });
          if (result.status == 200) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('email', result.data.email);
            this.$router.push('/');
          }
        } catch (error) {

        }
      }
    }
  }
};
</script>
<template>
  <GuestLayout>
    <div class="login-container">
      <div class="login-form p-shadow-8">
        <h2>Sign In</h2>
        <div class="p-field">
          <label for="username">Email</label>
          <InputText id="username" v-model="email" />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <Password id="password" v-model="password" />
        </div>
        <div class="p-field mt-4">
          <Button label="Login" @click="submitForm()" />
        </div>
      </div>
    </div>
  </GuestLayout>
</template>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
}

.login-form {
  width: 300px;
  padding: 20px;
  border-radius: 5px;
}
</style>
  