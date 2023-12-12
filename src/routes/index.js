import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import User from '../pages/User.vue';
import Student from '../pages/Student.vue';
import Question from '../pages/Question.vue';
import StudentForm from '../views/StudentForm.vue';
import SignUp from '../pages/SignUp.vue';
import SignIn from '../pages/SignIn.vue';
import QuestionForm from '../views/QuestionForm.vue';

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: Home },
        { path: '/signup', name: 'signup', component: SignUp },
        { path: '/signin', name: 'signin', component: SignIn },
        { path: '/user', name: 'user', component: User },
        {
            path: '/student',
            name: 'student',
            component: Student
        },
        {path: '/student/create', name: 'createstudent', component: StudentForm},
        {path: '/student/edit/:id', name: 'editstudent', component: StudentForm},
        { path: '/question', name: 'question', component: Question },
        { path: '/question/create', name: 'createquestion', component: QuestionForm },
        { path: '/question/edit/:id', name: 'editquestion', component: QuestionForm },
    ]
});

export default routes;