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
        <div class="space-y-12 ml-6 w-full">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mt-4">
                    {{ heading }} Survey
                </h2>
                <Loader v-if="loading" class="mt-10" />
                <div v-else class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="min-w-full">
                        <label for="category" class="text-sm font-medium leading-6 text-gray-900">Category</label>
                        <div class="mt-2 mb-4">
                            <div class="flex rounded-md">
                                <select v-model="survey.category" id="category"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option v-for="(cat, ind) in categories" :value="cat._id">{{ cat.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="min-w-full">
                        <label for="studentId" class="text-sm font-medium leading-6 text-gray-900">User</label>
                        <div class="mt-2 mb-4">
                            <div class="flex rounded-md">
                                <select v-model="survey.studentId" id="studentId"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option v-for="(student, ind) in students" :value="student._id">{{ student.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-full">
                        <div class="mt-2">
                            <div class="mt-6 flex items-center justify-end gap-x-6">
                                <router-link to="/survey"
                                    class="text-xs font-semibold leading-6 text-gray-900 bg-slate-500 px-3 py-2 rounded-md">
                                    Cancel
                                </router-link>
                                <button type="button"
                                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                                    @click="saveSurvey()">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
