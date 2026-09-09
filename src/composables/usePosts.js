import { ref } from "vue";
import axios from "@/axios.js";

const posts = ref([]);
const errors = ref({});
const loading = ref(false);

const pagination = ref({
    current_page: 1,
    last_page: 1,
});

export default function usePosts() {
    const fetchPosts = async (page = 1) => {
        loading.value = true;
        errors.value = {};
        try {
            const response = await axios.get(`/api/posts?page=${page}`);

            posts.value = response.data.data;

            pagination.value = response.data.meta || {
                current_page: 1,
                last_page: 1,
            };
        } catch (e) {
            console.error("Error fetching posts:", e);
        } finally {
            loading.value = false;
        }
    };

    const storePost = async (formData) => {
        loading.value = true;
        errors.value = {};
        try {
            await axios.post("/api/posts", formData);

            await fetchPosts();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                errors.value = e.response.data.errors || {};
            } else {
                console.error("Error storing post:", e);
            }
        } finally {
            loading.value = false;
        }
    };

    const updatePost = async (id, formData) => {
        loading.value = true;
        errors.value = {};
        try {
            await axios.put(`/api/posts/${id}`, formData);
            await fetchPosts();
        } catch (e) {
            if (e.response && e.response.status === 422) {
                errors.value = e.response.data.errors || {};
            } else {
                console.error("Error updating post:", e);
            }
        } finally {
            loading.value = false;
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`/api/posts/${id}`);

            await fetchPosts(pagination.value.current_page);
        } catch (e) {
            console.error("Error deleting post:", e);
        }
    };

    return {
        posts,
        errors,
        loading,
        pagination,
        fetchPosts,
        storePost,
        updatePost,
        deletePost,
    };
}
