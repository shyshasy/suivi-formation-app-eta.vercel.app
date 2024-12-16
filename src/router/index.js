import { createRouter, createWebHistory } from "vue-router";

// Import des composants liés aux étudiants
import StudentParent from "@/components/students/StudentParent.vue";
import AddStudent from "@/components/students/AddStudent.vue";
import EditStudent from "@/components/students/EditStudent.vue";
import ListStudent from "@/components/students/ListStudent.vue";
import DetailStudent from "@/components/students/DetailStudent.vue";

// Import des composants liés aux modules
import ModuleParent from "@/components/modules/ModuleParent.vue";
import AddModule from "@/components/modules/AddModule.vue";
import EditModule from "@/components/modules/EditModule.vue";
import ListModule from "@/components/modules/ListModule.vue";
import DetailModule from "@/components/modules/DetailModule.vue";

// Import des composants liés aux inscriptions
import RegistrationParent from "@/components/registrations/RegistrationParent.vue";
import AddRegistration from "@/components/registrations/AddRegistration.vue";
import EditRegistration from "@/components/registrations/EditRegistration.vue";
import ListRegistration from "@/components/registrations/ListRegistration.vue";
import DetailRegistration from "@/components/registrations/DetailRegistration.vue";

// Import des composants liés aux paiements
import PaymentParent from "@/components/payments/PaymentParent.vue";
import AddPayment from "@/components/payments/AddPayment.vue";
import EditPayment from "@/components/payments/EditPayment.vue";
import ListPayment from "@/components/payments/ListPayment.vue";
// import DetailPayment from "@/components/payments/DetailPayment.vue";

const routes = [
    // Routes pour les étudiants
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
    // Routes pour les modules
    {
        path: "/module",
        component: ModuleParent, // Composant parent pour gérer les enfants
        children: [
            {
                path: "",
                name: "list-module",
                component: ListModule,
            },
            {
                path: "new",
                name: "add-module",
                component: AddModule,
            },
            {
                path: "edit/:id",
                name: "edit-module",
                component: EditModule,
            },
            {
                path: "show/:id",
                name: "detail-module",
                component: DetailModule,
            },
        ],
    },

    {
        path: "/registration",
        component: RegistrationParent,
        children: [
            {
                path: "",
                name: "list-registration",
                component: ListRegistration,
            },
            {
                path: "new",
                name: "add-registration",
                component: AddRegistration,
            },
            {
                path: "edit/:id",
                name: "edit-registration",
                component: EditRegistration,
            },
            {
                path: "show/:id",
                name: "detail-registration",
                component: DetailRegistration,
            },
        ],
    },
    {
        path: "/payment",
        component: PaymentParent,
        children: [
            { path: "", name: "list-payment", component: ListPayment },
            { path: "new", name: "add-payment", component: AddPayment },
            { path: "edit/:id", name: "edit-payment", component: EditPayment },
            // { path: "show/:id", name: "detail-payment", component: DetailPayment },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
