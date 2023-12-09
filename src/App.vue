<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Header />
  <div class="container flex">
    <div class="sidebar mr-4">
      <Sidebar />
    </div>
    <router-view></router-view>
  </div>
  <Footer />
</template>

