import { ref, computed } from 'vue'
import axios from 'axios'
import type { User, LoginCredentials } from '../types'

export function useAuth() {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30, // Token expires in 30 minutes
      })
      
      const userData: User = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        gender: response.data.gender,
        image: response.data.image,
        token: response.data.token
      }
      
      user.value = userData
      
      // Store in localStorage
      localStorage.setItem('auth_token', userData.token)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      
      return { success: true, data: userData }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
      console.error('Login failed:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    // Optional: Reload page to reset all states
    window.location.href = '/'
  }

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (token && savedUser) {
      try {
        user.value = JSON.parse(savedUser)
        return true
      } catch (e) {
        console.error('Failed to parse saved user')
        localStorage.removeItem('auth_user')
        return false
      }
    }
    return false
  }

  // Auto-check authentication on composable initialization
  checkAuth()

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth
  }
}