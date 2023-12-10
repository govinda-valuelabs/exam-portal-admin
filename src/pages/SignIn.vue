<script>
import axios from 'axios';
export default {
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
          const result = await axios.post('http://localhost:8080/user/signin', { email: this.email, password: this.password });
          console.log('result ', result);
          if (result.status == 201) {
            this.$router.push('/');
          }
        } catch (error) {
          
        }
      }

      // Send the data to the server or perform any other actions
      console.log('Form submitted:', this.email, this.password);

      // Reset the form fields
      this.email = '';
      this.password = '';
    }
  }
};
</script>
<template>
  <GuestLayout class="sign-in">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold text-center">Sign in</h1>
      <form class="mt-8" @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input type="email" id="email" v-model="email" class="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Enter email" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2">Password</label>
          <input type="password" id="password" v-model="password" class="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Enter password" required>
        </div>
        <div v-if="empty" class="mb-4">
          <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert">
            <span class="font-medium">Warning !</span> Please fill the required field.
          </div>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
      </form>
    </div>
  </GuestLayout></template>
  