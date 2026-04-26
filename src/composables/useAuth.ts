import { ref, computed } from 'vue'
import axios from 'axios'
import type { User } from '../types'

export function useAuth() {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password
      })
      
      user.value = response.data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: 'Invalid credentials' }
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  checkAuth()

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}