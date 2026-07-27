<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="text-center mb-6">
          
          <h2 class="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p class="text-gray-500 text-sm mt-1">Login to your Shopora account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          <div v-if="authError" class="p-2 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ authError }}</p>
          </div>

          <button
            type="submit"
            :disabled="authLoading"
            class="w-full bg-gold-500 hover:bg-gold-600 text-black py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authLoading" class="inline-block animate-spin mr-2">⏳</span>
            {{ authLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <p class="text-center text-xs text-gray-400 mt-4">
          Demo: kminchelle / 0lbltgg
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
    closeModal()
    form.value = { username: '', password: '' }
    alert('Login successful! Welcome to Horologe! 🎉')
  }
}

const closeModal = () => {
  emit('update:isOpen', false)
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    form.value = { username: '', password: '' }
  }
})
</script>

<style scoped>
.bg-gold-500 {
  background-color: #F59E0B;
}
.hover\:bg-gold-600:hover {
  background-color: #D97706;
}
.focus\:ring-gold-500:focus {
  --tw-ring-color: #F59E0B;
}
</style>