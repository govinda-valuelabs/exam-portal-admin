<script setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const visible = ref(false);
const router = useRouter()
onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.post("http://localhost:8080/user/is-logged", { token });
    if (result.status != 200) {
      this.$router.push("/signin");
    }

  } catch (error) {
    console.log('error ', error);
    router.push("/signin");
  }
});
</script>

<template>
  <Header @sidebar:open="visible = true"/>
  <Sidebar :visible="visible" @sidebar:close="visible = false"/>
  <div class="container flex p-4" style="min-height: calc(100vh - 146px);">
    <slot />
  </div>
  <Footer />
</template>
