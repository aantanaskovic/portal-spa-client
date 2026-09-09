import axios from "axios";
import router from "@/router";
import useAuth from "@/composables/useAuth.js";

axios.defaults.baseURL = "http://portal-server.test";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            !error.config.url.includes("/api/user")
        ) {
            const { logout } = useAuth();
            logout();
            router.push({ name: "login" });
        }

        return Promise.reject(error);
    },
);

export default axios;
