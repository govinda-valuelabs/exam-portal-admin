<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import Loader from "../components/Loader.vue";
import axios from 'axios';
export default {
    components: { AuthenticatedLayout, Loader },
    name: "SurveyForm",
    data: () => {
        return {
            survey: {
                studentId: "",
                category: ""
            },
            students: [],
            categories: [],
            heading: 'Create ',
            loading: false,
        };
    },
    mounted() {
        this.getStudents();
        this.getCategories();
        if (this.$route.params.id) {
            this.heading = 'Update ';
            this.getSurvey();
        }
    },
    methods: {
        async getStudents() {
            try {
                const results = await axios.get('http://localhost:8080/student');
                if (results.data) {
                    this.students = results.data;
                }
            } catch (error) {
                console.log('Error users ', error.message);
            }
        },
        async getCategories() {
            try {
                const results = await axios.get('http://localhost:8080/category');
                if (results.data) {
                    this.categories = results.data;
                }
            } catch (error) {
                console.log('Error categories ', error.message);
            }
        },
        async getSurvey() {
            const result = await axios.get('http://localhost:8080/exam/' + this.$route.params.id);
            if (result.status == 200) {
                this.survey = result.data;
            }
        },
        async saveSurvey() {
            this.loading = true;
            let result;
            try {
                if (this.$route.params.id) {
                    result = await axios.patch('http://localhost:8080/exam/' + this.$route.params.id, this.survey);
                } else {
                    result = await axios.post('http://localhost:8080/exam', this.survey);
                }

                if (result.status == 201 || result.data.success) {
                    this.$router.push('/survey');
                }
            } catch (error) {
                console.log('Error ', error.message);
                this.loading = true;
            }
        }
    }
};
</script>
<template>
    <AuthenticatedLayout>
        <div class="block m-auto">
            <h1>Assign Survey</h1>
            <div class="card flex justify-content-center mb-6">
                <Dropdown v-model="survey.studentId" :options="students" optionLabel="name" placeholder="Select a user"
                    class="w-full md:w-14rem" />
            </div>
            <div class="card flex justify-content-center mb-6">
                <Dropdown v-model="survey.category" :options="categories" optionLabel="name" placeholder="Select a category"
                    class="w-full md:w-14rem" />
            </div>
            <div class="card flex justify-content-center flex-wrap gap-3">
            <Button label="Save" severity="success" @click="saveSurvey()"/>
            <RouterLink to="/survey">
              <Button label="Cancel" severity="secondary" />
            </RouterLink>
          </div>
        </div>
    </AuthenticatedLayout>
</template>
