import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import User from '../pages/User.vue';
import UserForm from '../views/UserForm.vue';
import Student from '../pages/Student.vue';
import Question from '../pages/Question.vue';
import StudentForm from '../views/StudentForm.vue';
import SignUp from '../pages/SignUp.vue';
import SignIn from '../pages/SignIn.vue';
import QuestionForm from '../views/QuestionForm.vue';
import Exam from '../pages/Exam.vue';
import ExamDetail from '../views/ExamDetail.vue';

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: Dashboard },
        { path: '/signup', name: 'signup', component: SignUp },
        { path: '/signin', name: 'signin', component: SignIn },
        { path: '/admin', name: 'admin', component: User },
        { path: '/admin/create', name: 'createuser', component: UserForm },
        { path: '/admin/edit/:id', name: 'edituser', component: UserForm },
        {
            path: '/user',
            name: 'user',
            component: Student
        },
        {path: '/user/create', name: 'createstudent', component: StudentForm},
        {path: '/user/edit/:id', name: 'editstudent', component: StudentForm},
        { path: '/question', name: 'question', component: Question },
        { path: '/question/create', name: 'createquestion', component: QuestionForm },
        { path: '/question/edit/:id', name: 'editquestion', component: QuestionForm },
        { path: '/survey', name: 'survey', component: Exam },
        { path: '/survey/detail/:id', name: 'editsurvey', component: ExamDetail }
    ]
});

export default routes;