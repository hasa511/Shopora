<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
    <!-- Backdrop with blur - changes with dark mode -->
    <div class="fixed inset-0 transition-opacity duration-300" :class="isDark ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-50 backdrop-blur-sm'"></div>
    
    <!-- Modal Container -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100"
           :class="isDark ? 'bg-gray-800' : 'bg-white'">
        
        <!-- Close Button -->
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 transition-colors z-10 w-8 h-8 rounded-full flex items-center justify-center"
          :class="isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Content Container -->
        <div class="p-8">
          
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-gradient-to-br from-[#634A61] to-[#483146] rounded-full flex items-center justify-center">
                <span class="text-3xl">🛍️</span>
              </div>
            </div>
            <h2 class="text-2xl font-bold mb-2 transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">
              {{ isLoginMode ? 'Welcome back!' : 'Create account' }}
            </h2>
            <p class="text-sm transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              {{ isLoginMode ? 'Sign in to continue shopping' : 'Join Shopora for exclusive deals' }}
            </p>
          </div>

          <!-- Mode Switch Tabs -->
          <div class="flex gap-2 mb-6 rounded-lg p-1 transition-colors duration-300" :class="isDark ? 'bg-gray-700' : 'bg-gray-100'">
            <button
              @click="setMode('login')"
              class="flex-1 py-2 rounded-lg font-medium transition-all duration-200"
              :class="isLoginMode 
                ? (isDark ? 'bg-[#634A61] text-white shadow-md' : 'bg-[#634A61] text-white shadow-md') 
                : (isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200')"
            >
              Sign In
            </button>
            <button
              @click="setMode('register')"
              class="flex-1 py-2 rounded-lg font-medium transition-all duration-200"
              :class="!isLoginMode 
                ? (isDark ? 'bg-[#634A61] text-white shadow-md' : 'bg-[#634A61] text-white shadow-md') 
                : (isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200')"
            >
              Register
            </button>
          </div>

          <!-- Protected Info Banner -->
          <div class="mb-6 p-3 rounded-lg flex items-center gap-2 transition-colors duration-300" 
               :class="isDark ? 'bg-green-900 border border-green-800' : 'bg-green-50 border border-green-200'">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <p class="text-xs" :class="isDark ? 'text-green-300' : 'text-green-800'">
              Your information is protected and encrypted
            </p>
          </div>

          <!-- Login Form -->
          <form v-if="isLoginMode" @submit.prevent="handleLogin" class="space-y-4">
            <!-- Email/Username -->
            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Email or Username
              </label>
              <input
                v-model="loginForm.username"
                type="text"
                required
                placeholder="Enter your email or username"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Password
              </label>
              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Enter your password"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="text-xs mt-1 hover:underline transition-colors"
                :class="isDark ? 'text-[#634A61]' : 'text-[#634A61]'"
              >
                {{ showPassword ? 'Hide' : 'Show' }} password
              </button>
            </div>

            <!-- Forgot Password Link -->
            <div class="text-right">
              <button type="button" @click="handleForgotPassword" 
                      class="text-xs hover:underline transition-colors"
                      :class="isDark ? 'text-[#634A61]' : 'text-[#634A61]'">
                Trouble signing in?
              </button>
            </div>

            <!-- Error Message -->
            <div v-if="authError" class="p-2 rounded-lg transition-colors duration-300"
                 :class="isDark ? 'bg-red-900 border border-red-800' : 'bg-red-50 border border-red-200'">
              <p class="text-red-600 text-sm" :class="isDark ? 'text-red-400' : 'text-red-600'">{{ authError }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="authLoading"
              class="w-full py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              :class="isDark ? 'bg-[#634A61] hover:bg-[#7a5e78] text-white' : 'bg-[#634A61] hover:bg-[#483146] text-white'"
            >
              <span v-if="authLoading" class="inline-block animate-spin mr-2">⏳</span>
              {{ authLoading ? 'Signing in...' : 'Continue' }}
            </button>
          </form>

          <!-- Register Form -->
          <form v-else @submit.prevent="handleRegister" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Full Name
              </label>
              <input
                v-model="registerForm.name"
                type="text"
                required
                placeholder="Enter your full name"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Email
              </label>
              <input
                v-model="registerForm.email"
                type="email"
                required
                placeholder="Enter your email"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
            </div>

            <!-- Username -->
            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Username
              </label>
              <input
                v-model="registerForm.username"
                type="text"
                required
                placeholder="Choose a username"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-1 transition-colors duration-300" 
                     :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                Password
              </label>
              <input
                v-model="registerForm.password"
                :type="showRegisterPassword ? 'text' : 'password'"
                required
                placeholder="Create a password"
                class="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
              />
              <button 
                type="button"
                @click="showRegisterPassword = !showRegisterPassword"
                class="text-xs mt-1 hover:underline transition-colors"
                :class="isDark ? 'text-[#634A61]' : 'text-[#634A61]'"
              >
                {{ showRegisterPassword ? 'Hide' : 'Show' }} password
              </button>
            </div>

            <!-- Register Error -->
            <div v-if="registerError" class="p-2 rounded-lg transition-colors duration-300"
                 :class="isDark ? 'bg-red-900 border border-red-800' : 'bg-red-50 border border-red-200'">
              <p class="text-sm" :class="isDark ? 'text-red-400' : 'text-red-600'">{{ registerError }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="registerLoading"
              class="w-full py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              :class="isDark ? 'bg-[#634A61] hover:bg-[#7a5e78] text-white' : 'bg-[#634A61] hover:bg-[#483146] text-white'"
            >
              <span v-if="registerLoading" class="inline-block animate-spin mr-2">⏳</span>
              {{ registerLoading ? 'Creating account...' : 'Create Account' }}
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t transition-colors duration-300" :class="isDark ? 'border-gray-700' : 'border-gray-300'"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 transition-colors duration-300" :class="isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'">
                Or continue with
              </span>
            </div>
          </div>

          <!-- Social Login Buttons -->
          <div class="space-y-2">
            <button class="w-full border py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    :class="isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button class="w-full border py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    :class="isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'">
              <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
              </svg>
              Facebook
            </button>
          </div>

          <!-- Location Selector -->
          <div class="mt-6 pt-4 border-t transition-colors duration-300" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
            <div class="flex items-center justify-between text-xs transition-colors duration-300" 
                 :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              <div class="flex items-center gap-1">
                <span>📍</span>
                <span>Location:</span>
                <select class="border-none bg-transparent font-medium focus:outline-none transition-colors duration-300"
                        :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  <option :class="isDark ? 'bg-gray-800' : 'bg-white'">Sri Lanka ▼</option>
                  <option :class="isDark ? 'bg-gray-800' : 'bg-white'">United States</option>
                  <option :class="isDark ? 'bg-gray-800' : 'bg-white'">United Kingdom</option>
                  <option :class="isDark ? 'bg-gray-800' : 'bg-white'">Canada</option>
                  <option :class="isDark ? 'bg-gray-800' : 'bg-white'">Australia</option>
                </select>
              </div>
              <button class="hover:underline transition-colors" :class="isDark ? 'text-[#634A61]' : 'text-[#634A61]'">
                Why choose a location?
              </button>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="mt-4 text-center">
            <p class="text-[10px] leading-relaxed transition-colors duration-300" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
              By continuing, you confirm that you are an adult and have read and accepted our 
              <button type="button" @click="showTerms" class="hover:underline transition-colors" :class="isDark ? 'text-[#634A61]' : 'text-[#634A61]'">
                Free Membership Agreement
              </button> 
              and 
              <button type="button" @click="showPrivacy" class="hover:underline transition-colors" :class="isDark ? 'text-[#634A61]' : 'text-[#634A61]'">
                Privacy Policy
              </button>.
            </p>
          </div>

          <!-- Demo Credentials Helper -->
          <div class="mt-6 p-3 rounded-lg transition-colors duration-300"
               :class="isDark ? 'bg-blue-900 border border-blue-800' : 'bg-blue-50 border border-blue-200'">
            <p class="text-xs font-semibold mb-1" :class="isDark ? 'text-blue-300' : 'text-blue-800'">
              🎯 Demo Credentials:
            </p>
            <p class="text-xs" :class="isDark ? 'text-blue-300' : 'text-blue-700'">
              Username: <span class="font-mono">kminchelle</span> | Password: <span class="font-mono">0lbltgg</span>
            </p>
            <p class="text-xs mt-1" :class="isDark ? 'text-blue-300' : 'text-blue-600'">
              💡 Tip: Use these for quick testing!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useDarkMode } from '../composables/useDarkMode'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const { login, isLoading: authLoading, error: authError } = useAuth()
const { isDark } = useDarkMode()

// Mode state
const isLoginMode = ref(true)

// Form states
const loginForm = ref({
  username: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  username: '',
  password: ''
})

// UI states
const showPassword = ref(false)
const showRegisterPassword = ref(false)
const registerLoading = ref(false)
const registerError = ref('')

// Set mode
const setMode = (mode: 'login' | 'register') => {
  isLoginMode.value = mode === 'login'
  // Clear errors when switching
  if (authError.value) authError.value = null
  registerError.value = ''
}

// Handle Login
const handleLogin = async () => {
  const result = await login({
    username: loginForm.value.username,
    password: loginForm.value.password
  })
  
  if (result.success) {
    closeModal()
    loginForm.value = { username: '', password: '' }
    alert('Login successful! Welcome back to Shopora! 🎉')
  }
}

// Handle Register (Simulated)
const handleRegister = async () => {
  registerLoading.value = true
  registerError.value = ''
  
  setTimeout(() => {
    if (registerForm.value.username && registerForm.value.password && registerForm.value.email) {
      login({
        username: registerForm.value.username,
        password: registerForm.value.password
      }).then(result => {
        if (result.success) {
          closeModal()
          alert(`Welcome ${registerForm.value.name}! Your account has been created successfully! 🎉`)
          registerForm.value = { name: '', email: '', username: '', password: '' }
        } else {
          registerError.value = 'Registration failed. Please try a different username.'
        }
      })
    } else {
      registerError.value = 'Please fill in all fields'
    }
    registerLoading.value = false
  }, 1000)
}

const handleForgotPassword = () => {
  alert('Please contact support@shopora.com to reset your password')
}

const showTerms = () => {
  alert('Membership Agreement: By using Shopora, you agree to our terms of service...')
}

const showPrivacy = () => {
  alert('Privacy Policy: We protect your data and never share with third parties...')
}

const closeModal = () => {
  emit('update:isOpen', false)
}

// Reset forms when modal closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    loginForm.value = { username: '', password: '' }
    registerForm.value = { name: '', email: '', username: '', password: '' }
    if (authError.value) authError.value = null
    registerError.value = ''
    isLoginMode.value = true
  }
})
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
</style>