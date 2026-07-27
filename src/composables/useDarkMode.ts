import { ref, onMounted, watchEffect } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

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

  const toggleDarkMode = () => {
    console.log('Toggling dark mode - current:', isDark.value)
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  watchEffect(() => {
    applyTheme(isDark.value)
  })

  onMounted(() => {
    initDarkMode()
  })

  return {
    isDark,
    toggleDarkMode,
    initDarkMode
  }
}