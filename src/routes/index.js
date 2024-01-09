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
import Category from '../pages/Category.vue';
import CategoryForm from '../views/CategoryForm.vue';
import SurveyForm from '../views/SurveyForm.vue';
import Feedback from '../pages/Feedback.vue'
import FeedbackDetail from '../views/FeedbackDetail.vue'
import NotFound from '../pages/NotFound.vue';

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
        { path: '/category', name: 'category', component: Category },
        { path: '/category/create', name: 'createcategory', component: CategoryForm },
        { path: '/category/edit/:id', name: 'editcategory', component: CategoryForm },
        { path: '/question', name: 'question', component: Question },
        { path: '/question/create', name: 'createquestion', component: QuestionForm },
        { path: '/question/edit/:id', name: 'editquestion', component: QuestionForm },
        { path: '/survey', name: 'survey', component: Exam },
        { path: '/survey/create', name: 'createsurvey', component: SurveyForm },
        { path: '/survey/detail/:id', name: 'editsurvey', component: ExamDetail },
        { path: '/feedback', name: 'feedback', component: Feedback },
        { path: '/feedback/detail/:id', name: 'feedbackdetail', component: FeedbackDetail },
        { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
    ]
});

export default routes;