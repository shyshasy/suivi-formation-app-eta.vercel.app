import { createRouter, createWebHistory } from "vue-router";

// import Home from '@/components/Home.vue';
import AddStudent from '@/components/students/AddStudent.vue';
import EditStudent from '@/components/students/EditStudent.vue';
import ListStudent from '@/components/students/ListStudent.vue';
import DetailStudent from "@/components/students/DetailStudent.vue";



const routes = [
    // {
    //     path: "/",
    //     name: 'home',
    //     component: Home,
    // },
    {
        path: "/student",
        children: [
            {
                path: "",
                name: 'list-student',
                component: ListStudent.vue,
            },
            {
                path: "new",
                name: 'add-student',
                component: AddStudent.vue,
            },
            {
                path: "edit/:id",
                name: 'edit-student',
                component: EditStudent.vue,
            },
            {
                path: "show/:id",
                name: 'detail-student',
                component: DetailStudent.vue,
            }
        ]
    },
   
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
