<script setup>
import useAuth from '@/composables/useAuth.js'

const { user } = useAuth()
</script>

<template>
  <header class="bg-white shadow-xs">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">
        Profile
      </h1>
    </div>
  </header>

  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

      <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
        <div class="flex items-center space-x-6 border-b border-gray-100 pb-6 mb-6">
          <div
            class="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold uppercase shadow-sm">
            {{ user?.name ? user.name.charAt(0) : 'U' }}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ user?.name }}</h2>
            <p class="text-sm text-gray-500">Authenticated Member</p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <span class="block text-xs font-semibold uppercase tracking-wider text-gray-400">Account ID</span>
            <span class="text-sm font-medium text-gray-900">#{{ user?.id }}</span>
          </div>

          <div>
            <span class="block text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</span>
            <span class="text-sm font-medium text-gray-900">{{ user?.email }}</span>
          </div>

          <div>
            <span class="block text-xs font-semibold uppercase tracking-wider text-gray-400">Account Created</span>
            <span class="text-sm font-medium text-gray-900">
              {{ user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month:
                  'long', day: 'numeric'
              }) : 'N/A' }}
            </span>
          </div>

          <div>
            <span class="block text-xs font-semibold uppercase tracking-wider text-gray-400">Session Status</span>
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
              Active Stateful Session
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
