<script setup>
import { ref } from 'vue'
import useAuth from '@/composables/useAuth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false
})

const { register: registerAction, errors } = useAuth()

const handleRegister = async () => {
    await registerAction(form.value)

    if (!errors.value || Object.keys(errors.value).length === 0) {
        router.push({ name: 'home' })
    }
}
</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
            <RouterLink to="/">
                <svg class="w-20 h-20 fill-current text-indigo-600" viewBox="0 0 62 65" xmlns="http://w3.org">
                    <path
                        d="M61.82 15.29L31.24 0 0.65 15.29v30.57L31.24 61.2l30.58-15.33V15.29zM31.24 6.13l23.73 11.86v23.72L31.24 53.6 7.5 41.71V17.99L31.24 6.13z" />
                </svg>
            </RouterLink>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <form @submit.prevent="handleRegister">
                <div>
                    <label for="name" class="block font-medium text-sm text-gray-700">Name</label>
                    <input id="name" type="text" v-model="form.name" required autofocus
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2 border" />
                    <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name[0] }}</p>
                </div>

                <div class="mt-4">
                    <label for="email" class="block font-medium text-sm text-gray-700">Email</label>
                    <input id="email" type="email" v-model="form.email" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2 border" />
                    <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email[0] }}</p>
                </div>

                <div class="mt-4">
                    <label for="password" class="block font-medium text-sm text-gray-700">Password</label>
                    <input id="password" type="password" v-model="form.password" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2 border" />
                    <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password[0] }}</p>
                </div>

                <div class="mt-4">
                    <label for="password_confirmation" class="block font-medium text-sm text-gray-700">Confirm
                        password</label>
                    <input id="password_confirmation" type="password" v-model="form.password_confirmation" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2 border" />
                </div>

                <div class="block mt-4">
                    <label class="flex items-center">
                        <input type="checkbox" v-model="form.terms" required
                            class="rounded-sm border-gray-300 text-indigo-600 shadow-xs focus:ring-indigo-500" />
                        <span class="ms-2 text-sm text-gray-600">
                            I agree to the <a href="#" class="underline hover:text-gray-900">Terms of Service</a> and <a
                                href="#" class="underline hover:text-gray-900">Privacy Policy</a>
                        </span>
                    </label>
                    <p v-if="errors.terms" class="mt-2 text-sm text-red-600">{{ errors.terms[0] }}</p>
                </div>

                <div class="flex items-center justify-end mt-4">
                    <RouterLink to="/login" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md">
                        Already registered?
                    </RouterLink>

                    <button type="submit"
                        class="ms-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
