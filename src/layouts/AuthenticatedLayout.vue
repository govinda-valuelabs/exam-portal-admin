<script>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
export default {
  components: {Header, Sidebar, Footer},
  name: 'AuthenticatedLayout',
  async mounted() {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post("http://localhost:8080/user/is-logged", { token });
      if (result.status != 200) {
        this.$router.push("/signin");
      }
      
    } catch (error) {
      console.log('error ', error);
      this.$router.push("/signin");
    }
  },
}
</script>

<template>
  <Header />
  <div class="container flex">
    <div class="sidebar mr-4">
      <Sidebar />
    </div>
    <slot />
  </div>
  <Footer />
</template>
