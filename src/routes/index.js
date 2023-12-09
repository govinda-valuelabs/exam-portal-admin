import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import User from '../pages/User.vue';
import Student from '../pages/Student.vue';
import Question from '../pages/Question.vue';

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/user', component: User },
        { path: '/student', component: Student },
        { path: '/question', component: Question },
    ]
});

export default routes;