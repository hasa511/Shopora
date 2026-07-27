import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
} else if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark')
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
}