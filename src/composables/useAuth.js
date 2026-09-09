import { computed, reactive, ref } from "vue";
import axios from "@/axios.js";

const state = reactive({
    authenticated: false,
    user: {},
    initialized: false,
});

const errors = ref({});

export default function useAuth() {
    const authenticated = computed(() => state.authenticated);

    const setAuthenticated = function (authenticated) {
        state.authenticated = authenticated;
    };

    const user = computed(() => state.user);

    const setUser = (user) => {
        state.user = user;
    };

    const initialized = computed(() => state.initialized);

    const attempt = async () => {
        try {
            let response = await axios.get("/api/user");

            setAuthenticated(true);
            setUser(response.data);

            return response;
        } catch (e) {
            setAuthenticated(false);
            setUser({});
        } finally {
            state.initialized = true;
        }
    };

    const login = async (credentials) => {
        await axios.get("/sanctum/csrf-cookie");

        try {
            await axios.post("/login", credentials);

            errors.value = {};

            return attempt();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                errors.value = e.response.data.errors || {};
            } else {
                errors.value = { email: ["There was an error during login."] };
            }

            console.log(e.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/logout");
        } catch (e) {
            console.log(e);
        } finally {
            setAuthenticated(false);
            setUser({});
        }
    };

    const register = async (userData) => {
        await axios.get("/sanctum/csrf-cookie");

        try {
            await axios.post("/register", userData);

            errors.value = {};

            return attempt();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                errors.value = e.response.data.errors || {};
            } else {
                errors.value = {
                    email: ["There was an error during registration."],
                };
            }
        }
    };

    return {
        errors,
        authenticated,
        user,
        initialized,
        attempt,
        login,
        logout,
        register,
    };
}
