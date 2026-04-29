import { ref, onMounted, watchEffect } from 'vue'

// Global reactive state (outside the function - shared across all components)
const isDark = ref(false)

export function useDarkMode() {
  
  // Function to apply theme to DOM
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Initialize dark mode
  const initDarkMode = () => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      isDark.value = true
      applyTheme(true)
    } else if (savedTheme === 'light') {
      isDark.value = false
      applyTheme(false)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      applyTheme(prefersDark)
    }
  }

  // Toggle function - changes value immediately
  const toggleDarkMode = () => {
    console.log('Toggling dark mode - current:', isDark.value)
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  // Watch for changes and apply theme
  watchEffect(() => {
    applyTheme(isDark.value)
  })

  // Initialize on mount
  onMounted(() => {
    initDarkMode()
  })

  return {
    isDark,        // This is reactive globally
    toggleDarkMode,
    initDarkMode
  }
}