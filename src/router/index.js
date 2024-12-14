import { createRouter, createWebHistory } from "vue-router";

import StudentParent from "@/components/students/StudentParent.vue";
import AddStudent from "@/components/students/AddStudent.vue";
import EditStudent from "@/components/students/EditStudent.vue";
import ListStudent from "@/components/students/ListStudent.vue";
import DetailStudent from "@/components/students/DetailStudent.vue";

const routes = [
    {
        path: "/student",
        component: StudentParent, // Composant parent pour gérer les enfants
        children: [
            {
                path: "",
                name: "list-student",
                component: ListStudent,
            },
            {
                path: "new",
                name: "add-student",
                component: AddStudent,
            },
            {
                path: "edit/:id",
                name: "edit-student",
                component: EditStudent,
            },
            {
                path: "show/:id",
                name: "detail-student",
                component: DetailStudent,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
