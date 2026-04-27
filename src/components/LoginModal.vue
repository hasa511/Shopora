<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- Modal -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <!-- Close Button -->
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Header -->
        <div class="text-center mb-6">
          <div class="text-5xl mb-3"></div>
          <h2 class="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p class="text-gray-500 text-sm mt-1">Login to your Shopora account</p>
        </div>

       

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
              placeholder="Enter username"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          <!-- Error Message -->
          <div v-if="authError" class="p-2 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ authError }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authLoading"
            class="w-full bg-[#634A61] hover:bg-[#483146] text-white py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authLoading" class="inline-block animate-spin mr-2">⏳</span>
            {{ authLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Footer Note -->
        <p class="text-center text-xs text-gray-400 mt-4">
          This is a demo. No real data is stored.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const { login, isLoading: authLoading, error: authError } = useAuth()

const form = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  const result = await login(form.value)
  
  if (result.success) {
    // Close modal on success
    closeModal()
    // Reset form
    form.value = { username: '', password: '' }
    // Show success message
    alert('Login successful! Welcome back to Shopora! 🎉')
  }
}

const closeModal = () => {
  emit('update:isOpen', false)
}

// Reset error when modal closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    // Modal closed, reset form and error
    form.value = { username: '', password: '' }
  }
})
</script>