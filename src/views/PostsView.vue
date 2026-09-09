<script setup>
import { ref, onMounted } from 'vue'
import usePosts from '@/composables/usePosts.js'
import useAuth from '@/composables/useAuth.js'

const { posts, loading, errors, pagination, fetchPosts, storePost, updatePost, deletePost } = usePosts()
const { user } = useAuth()

const isModalOpen = ref(false)

const form = ref({
    id: null,
    title: '',
    content: ''
})

onMounted(() => {
    fetchPosts()
})

const openCreateModal = () => {
    form.value = { id: null, title: '', content: '' }
    errors.value = {}
    isModalOpen.value = true
}

const openEditModal = (post) => {
    errors.value = {}
    form.value = {
        id: post.id,
        title: post.title,
        content: post.content
    }
    isModalOpen.value = true
}

const handleSubmit = async () => {
    if (form.value.id) {
        await updatePost(form.value.id, {
            title: form.value.title,
            content: form.value.content
        })
    } else {
        await storePost(form.value)
    }

    if (!errors.value || Object.keys(errors.value).length === 0) {
        isModalOpen.value = false
    }
}

const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
        await deletePost(id)
    }
}
</script>

<template>
    <header class="bg-white shadow-xs">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">
                Posts
            </h1>
        </div>
    </header>

    <div class="py-12 bg-gray-50 min-h-screen">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-6 bg-white overflow-hidden shadow-xl sm:rounded-lg">

                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">All Posts</h1>
                    <button @click="openCreateModal"
                        class="inline-flex items-center px-4 py-2 bg-indigo-600 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 transition cursor-pointer">
                        New Post
                    </button>
                </div>

                <div v-if="loading" class="text-gray-500 text-center py-4">
                    Loading posts...
                </div>

                <div v-else-if="posts.length === 0" class="text-gray-500 text-center py-4">
                    No posts published yet.
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                    <div v-for="post in posts" :key="post.id"
                        class="border border-gray-200 rounded-lg p-5 shadow-xs bg-white flex flex-col justify-between">
                        <div>
                            <h2 class="font-semibold text-lg text-gray-900 mb-2">{{ post.title }}</h2>
                            <p class="text-gray-600 text-sm line-clamp-3 mb-4">{{ post.content }}</p>
                        </div>

                        <div class="pt-3 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                Author: {{ post.user?.name || 'Registered User' }}
                            </span>

                            <div class="flex space-x-2">
                                <button @click="openEditModal(post)"
                                    class="text-xs text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer">
                                    Edit
                                </button>
                                <button @click="handleDelete(post.id)"
                                    class="text-xs text-red-600 hover:text-red-900 font-medium cursor-pointer">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="pagination.last_page > 1"
                    class="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-4 gap-4">
                    <div class="text-sm text-gray-700">
                        Showing <span class="font-medium">{{ pagination.from }}</span> to <span class="font-medium">{{
                            pagination.to
                        }}</span> of <span class="font-medium text-indigo-600">{{ pagination.total }}</span> results
                        (<span class="font-medium">{{ pagination.per_page }}</span> posts per page)
                    </div>

                    <div class="inline-flex rounded-md shadow-xs -space-x-px" aria-label="Pagination">
                        <button @click="fetchPosts(pagination.current_page - 1)"
                            :disabled="pagination.current_page === 1"
                            class="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            <svg class="h-5 w-5" xmlns="http://w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <button v-for="page in pagination.last_page" :key="page" @click="fetchPosts(page)" :class="[
                            page === pagination.current_page
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 font-semibold'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                            'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                        ]">
                            {{ page }}
                        </button>

                        <button @click="fetchPosts(pagination.current_page + 1)"
                            :disabled="pagination.current_page === pagination.last_page"
                            class="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            <svg class="h-5 w-5" xmlns="http://w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    {{ form.id ? 'Edit Post' : 'Create New Post' }}
                </h2>

                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input id="title" type="text" v-model="form.title" required
                            class="mt-1 block w-full rounded-md border-gray-300 p-2 border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                        <p v-if="errors.title" class="mt-1 text-xs text-red-600">{{ errors.title[0] }}</p>
                    </div>

                    <div class="mb-4">
                        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                        <textarea id="content" rows="4" v-model="form.content" required
                            class="mt-1 block w-full rounded-md border-gray-300 p-2 border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"></textarea>
                        <p v-if="errors.content" class="mt-1 text-xs text-red-600">{{ errors.content[0] }}</p>
                    </div>

                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="isModalOpen = false"
                            class="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 cursor-pointer">
                            {{ form.id ? 'Update' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
