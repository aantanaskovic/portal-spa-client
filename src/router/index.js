import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import useAuth from "@/composables/useAuth.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("@/views/ProfileView.vue"),
            meta: { auth: true },
        },
        {
            path: "/posts",
            name: "posts",
            component: () => import("@/views/PostsView.vue"),
            meta: { auth: true },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue"),
            meta: { guest: true, hideNavbar: true },
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/RegisterView.vue"),
            meta: { guest: true, hideNavbar: true },
        },
    ],
});

router.beforeEach(async (to, from) => {
    const { authenticated, attempt, initialized } = useAuth();

    if (!initialized.value) {
        await attempt();
    }

    if (to.meta.auth && !authenticated.value) {
        return { name: "login" };
    }

    if (to.meta.guest && authenticated.value) {
        return { name: "home" };
    }

    // Other requests are getting through
});

export default router;
