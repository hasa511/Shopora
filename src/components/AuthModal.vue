<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
    <div class="fixed inset-0 transition-opacity duration-300" :class="isDark ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-50 backdrop-blur-sm'"></div>
    
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100"
           :class="isDark ? 'bg-gray-800' : 'bg-white'">
        
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 transition-colors z-10 w-8 h-8 rounded-full flex items-center justify-center"
          :class="isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="p-8">
          <div class="text-center mb-8">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                <span class="text-3xl">⌚</span>
              </div>
            </div>
            <h2 class="text-2xl font-bold mb-2 transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">
              Welcome Back!
            </h2>
            <p class="text-sm transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              Sign in to continue shopping at Horologe
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Username
              </label>
              <input
                v-model="username"
                type="text"
                required
                placeholder="Enter your username"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Password
              </label>
              <input
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
            </div>

            <div v-if="errorMessage" class="p-2 rounded-lg" :class="isDark ? 'bg-red-900' : 'bg-red-50'">
              <p class="text-red-600 text-sm">{{ errorMessage }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <span v-if="loading" class="inline-block animate-spin mr-2">⏳</span>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <div class="mt-6 p-3 rounded-lg" :class="isDark ? 'bg-blue-900' : 'bg-blue-50'">
            <p class="text-xs font-semibold mb-1" :class="isDark ? 'text-blue-300' : 'text-blue-800'">
              🎯 Demo Credentials:
            </p>
            <p class="text-xs" :class="isDark ? 'text-blue-300' : 'text-blue-700'">
              Username: <span class="font-mono">kminchelle</span> | Password: <span class="font-mono">0lbltgg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useDarkMode } from '../composables/useDarkMode'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const { login, isLoading, error } = useAuth()
const { isDark } = useDarkMode()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  const result = await login({
    username: username.value,
    password: password.value
  })
  
  loading.value = false
  
  if (result.success) {
    closeModal()
    username.value = ''
    password.value = ''
    alert('Login successful! Welcome to Horologe! 🎉')
  } else {
    errorMessage.value = error.value || 'Login failed. Please check your credentials.'
  }
}

const closeModal = () => {
  emit('update:isOpen', false)
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.relative {
  animation: fadeIn 0.2s ease-out;
}

.bg-yellow-500 {
  background-color: #F59E0B;
}

.bg-yellow-600 {
  background-color: #D97706;
}

.hover\:bg-yellow-600:hover {
  background-color: #D97706;
}

.focus\:ring-yellow-500:focus {
  --tw-ring-color: #F59E0B;
}
</style>