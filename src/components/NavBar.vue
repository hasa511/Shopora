<template>
  <nav class="shadow-md sticky top-0 z-50 transition-colors duration-300" :class="isDark ? 'bg-gray-900' : 'bg-[#483146]'">
    <div class="px-4 py-3 flex justify-between items-center">
      
      <router-link to="/" class="flex items-center space-x-2">
        <h1 class="text-3xl font-bold transition-colors duration-300" :class="isDark ? 'text-white' : 'text-white'">
          Shopora
        </h1>
      </router-link>

      <div class="flex items-center gap-6">
        <router-link 
          to="/" 
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-[#483146] text-white hover:bg-[#634A61]'"
        >
          Home
        </router-link>
        
        <router-link 
          to="/cart" 
          class="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300"
          :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-[#483146] text-white hover:bg-[#634A61]'"
        >
          <span>🛒 Cart</span>
          <span 
            v-if="cartCount > 0"
            class="bg-yellow-400 text-pink-700 rounded-full px-2 py-0.5 text-xs font-bold"
          >
            {{ cartCount }}
          </span>
        </router-link>

        <!-- Dark Mode Toggle Button -->
        <button
          @click="toggleDarkMode"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-[#483146] text-white hover:bg-[#634A61]'"
        >
          {{ isDark ? 'Dark' : 'Light' }}
        </button>

        <!-- Login Button -->
        <button 
          v-if="!isAuthenticated"
          @click="showAuthModal = true"
          class="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-[#483146] text-white hover:bg-[#634A61]'"
        >
          Login
        </button>

        <!-- User Menu with Logout -->
        <div v-else class="relative">
          <button 
            @click="toggleDropdown"
            class="flex items-center gap-2 transition-colors duration-300 focus:outline-none"
          >
            <img 
              :src="user?.image" 
              :alt="user?.firstName"
              class="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover"
              @error="handleImageError"
            />
            <span class="text-sm hidden md:inline" :class="isDark ? 'text-gray-200' : 'text-white'">
              {{ user?.firstName }}
            </span>
            <span class="text-xs" :class="isDark ? 'text-gray-400' : 'text-white'">▼</span>
          </button>
          
          <!-- Dropdown Menu -->
          <div v-if="isDropdownOpen" 
               class="absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-50 py-2"
               :class="isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'"
               @click.stop>
            <div class="px-4 py-2 border-b" :class="isDark ? 'border-gray-700' : 'border-gray-100'">
              <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-700'">
                {{ user?.firstName }} {{ user?.lastName }}
              </p>
              <p class="text-xs mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                {{ user?.email }}
              </p>
            </div>
            
            <!-- Logout Button -->
            <button 
              @click="handleLogout"
              class="w-full text-left px-4 py-2 text-sm transition-colors mt-1 flex items-center gap-2"
              :class="isDark ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'"
            >
           
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <AuthModal :isOpen="showAuthModal" @update:isOpen="showAuthModal = $event" />
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useCart } from '../composables/useCart';
import { useAuth } from '../composables/useAuth';
import { useDarkMode } from '../composables/useDarkMode';
import AuthModal from './AuthModal.vue';

const { totalItems } = useCart();
const { isAuthenticated, user, logout } = useAuth();
const { isDark, toggleDarkMode } = useDarkMode();

const cartCount = computed(() => totalItems.value);
const showAuthModal = ref(false);
const isDropdownOpen = ref(false);

// Toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown when clicking outside
const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isDropdownOpen.value = false;
  }
};

// Handle logout
const handleLogout = () => {
  console.log('🖱️ Logout button clicked');
  
  if (confirm('Are you sure you want to logout?')) {
    isDropdownOpen.value = false;
    logout();
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = `https://ui-avatars.com/api/?background=634A61&color=fff&bold=true&name=${user.value?.firstName || 'User'}`;
};

// Add click outside listener
onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>