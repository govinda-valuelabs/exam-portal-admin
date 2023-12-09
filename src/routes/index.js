import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import User from '../pages/User.vue';
import Student from '../pages/Student.vue';
import Question from '../pages/Question.vue';
import StudentForm from '../views/StudentForm.vue';

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: Home },
        { path: '/user', name: 'user', component: User },
        {
            path: '/student',
            name: 'student',
            component: Student
        },
        {path: '/student/create', name: 'createstudent', component: StudentForm},
        { path: '/question', name: 'question', component: Question },
    ]
});

export default routes;