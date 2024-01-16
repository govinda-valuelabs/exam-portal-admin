import axios from "axios"

export default {
    methods: {
        async exportData(type='excel') {
            if (document.getElementById('export')) {
                document.body.removeChild(document.getElementById('export'))
            }
            const route = this.$route.name;
            const models = ['admin', 'user', 'category', 'question'];
            if (models.includes(route)) {
                const result = await axios.post('http://localhost:8080/export', { model: route, type});
                if (result.data && result.data.path) {
                    const a = document.createElement('a');
                    a.id = 'export';
                    a.href = result.data.path;
                    a.download = true;
                    a.click();
                }
            }
        }
    }
}