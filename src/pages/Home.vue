<script>
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
export default {
    components: { AuthenticatedLayout },
    mounted() {
        console.log('Welcome Home');
    }
}
</script>
<template>
    <AuthenticatedLayout>
        <h1>Home Page</h1>
    </AuthenticatedLayout>
</template>