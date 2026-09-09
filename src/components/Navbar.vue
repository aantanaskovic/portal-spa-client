<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth.js'

const router = useRouter()

const { authenticated, user, logout } = useAuth()

const isProfileDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)

const handleLogout = async () => {
    isProfileDropdownOpen.value = false
    isMobileMenuOpen.value = false

    await logout()
    router.push({ name: 'login' })
}
</script>

<template>
    <nav class="bg-white border-b border-gray-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">

                <div class="flex">
                    <div class="shrink-0 flex items-center">
                        <RouterLink to="/" @click="isMobileMenuOpen = false" class="flex items-center gap-2">
                            <svg class="w-9 h-9 fill-current text-indigo-600" viewBox="0 0 62 65"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M61.82 15.29L31.24 0 0.65 15.29v30.57L31.24 61.2l30.58-15.33V15.29zM31.24 6.13l23.73 11.86v23.72L31.24 53.6 7.5 41.71V17.99L31.24 6.13z" />
                            </svg>
                            <span class="font-bold text-xl tracking-tight text-gray-800">Portal SPA Client</span>
                        </RouterLink>
                    </div>

                    <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <RouterLink to="/"
                            class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out"
                            :class="$route.path === '/' ? 'border-indigo-400 text-gray-950' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
                            Home
                        </RouterLink>

                        <RouterLink v-if="authenticated" to="/posts"
                            class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out"
                            :class="$route.path === '/posts' ? 'border-indigo-400 text-gray-950' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
                            Posts
                        </RouterLink>

                        <RouterLink v-if="authenticated" to="/profile"
                            class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out"
                            :class="$route.path === '/profile' ? 'border-indigo-400 text-gray-950' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
                            Profile
                        </RouterLink>
                    </div>
                </div>

                <div class="hidden sm:flex sm:items-center sm:ms-6">
                    <div v-if="authenticated" class="relative">
                        <button @click="isProfileDropdownOpen = !isProfileDropdownOpen"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none">
                            <span>{{ user?.name }}</span>
                            <svg class="ms-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        <div v-if="isProfileDropdownOpen"
                            class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black/5 z-50">
                            <div class="px-4 py-2 text-xs text-gray-400 border-b border-gray-100">Account options</div>
                            <button @click="handleLogout"
                                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium">Log
                                out
                            </button>
                        </div>
                    </div>

                    <div v-else class="space-x-4 flex items-center">
                        <RouterLink to="/login"
                            class="text-sm text-gray-600 hover:text-gray-900 font-medium transition duration-150 ease-in-out">
                            Log in
                        </RouterLink>

                        <RouterLink to="/register"
                            class="inline-flex items-center px-3 py-1.5 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 transition duration-150 ease-in-out">
                            Register
                        </RouterLink>
                    </div>
                </div>

                <div class="-me-2 flex items-center sm:hidden">
                    <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path :class="{ 'hidden': isMobileMenuOpen, 'inline-flex': !isMobileMenuOpen }"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                            <path :class="{ 'hidden': !isMobileMenuOpen, 'inline-flex': isMobileMenuOpen }"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
            class="sm:hidden bg-white border-t border-gray-200">
            <div class="pt-2 pb-3 space-y-1">
                <RouterLink to="/" @click="isMobileMenuOpen = false"
                    class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    :class="$route.path === '/' ? 'border-indigo-400 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-gray-600'">
                    Home
                </RouterLink>

                <RouterLink v-if="authenticated" to="/posts" @click="isMobileMenuOpen = false"
                    class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    :class="$route.path === '/posts' ? 'border-indigo-400 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-gray-600'">
                    Posts
                </RouterLink>

                <RouterLink v-if="authenticated" to="/profile" @click="isMobileMenuOpen = false"
                    class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    :class="$route.path === '/profile' ? 'border-indigo-400 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-gray-600'">
                    Profile
                </RouterLink>
            </div>

            <div class="pt-4 pb-1 border-t border-gray-200">
                <div v-if="authenticated" class="px-4">
                    <div class="font-medium text-base text-gray-800">{{ user?.name }}</div>
                    <div class="text-sm font-medium text-gray-500 mb-2">{{ user?.email }}</div>
                    <button @click="handleLogout"
                        class="block w-full text-left py-2 text-base font-medium text-red-600">Log out</button>
                </div>

                <div v-else class="px-4 py-2 space-y-3 flex flex-col">
                    <RouterLink to="/login" @click="isMobileMenuOpen = false"
                        class="text-base font-medium text-gray-600 hover:text-gray-900">
                        Log in
                    </RouterLink>

                    <RouterLink to="/register" @click="isMobileMenuOpen = false"
                        class="text-base font-medium text-indigo-600 hover:text-indigo-900">
                        Register
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>
