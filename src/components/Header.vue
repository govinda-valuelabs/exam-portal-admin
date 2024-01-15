<template>
  <div class="card">
      <Toast />
      <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 0;background-image: linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))">
          <template #start>
            <Button class="button-sidebar" icon="pi pi-bars" @click="openSidebar()" />
          </template>
          <template #end>
              <div class="flex align-items-center gap-2">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                  <span class="font-bold text-bluegray-50">Amy Elsner</span>
              </div>
          </template>
      </Toolbar>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(['sidebar:open']);
function openSidebar() {
  emit('sidebar:open', true)
} 
const visible = ref(false);
</script>
