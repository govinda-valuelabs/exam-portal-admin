<script>
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import BarChart from '../components/BarChart.vue'
export default {
    name: 'Dashboard',
    components: { AuthenticatedLayout, BarChart },
    data: () => {
        return {
            students: []
        }
    },
    mounted() {
        console.log('Welcome Home');
    }
}
</script>
<template>
    <AuthenticatedLayout>
        <BarChart />
    </AuthenticatedLayout>
</template>