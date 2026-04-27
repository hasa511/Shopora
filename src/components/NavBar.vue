<template>
  <nav class="shadow-md sticky top-0 z-50" style="background-color: #483146;">
    <div class="px-4 py-3 flex justify-between items-center">
      
      <!-- Logo - Link to home -->
      <router-link to="/" class="flex items-center space-x-2">
        <h1 class="text-xl font-bold text-white">Shopora</h1>
      </router-link>

      <!-- Navigation Links -->
      <div class="flex items-center gap-6">
        <router-link to="/" class="text-white hover:text-yellow-200 transition">
          Home
        </router-link>
        
        <router-link to="/cart" class="text-white hover:text-yellow-200 transition flex items-center gap-2">
          <span>🛒 Cart</span>
          <span 
            v-if="cartCount > 0"
            class="bg-yellow-400 text-pink-700 rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center"
          >
            {{ cartCount }}
          </span>
        </router-link>

        <!-- Auth Section - Desktop -->
        <div v-if="isAuthenticated" class="relative group">
          <button class="flex items-center gap-2 text-white hover:text-yellow-200 transition">
            <img 
              :src="user?.image" 
              :alt="user?.firstName"
              class="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover"
              @error="handleImageError"
            />
            <span class="text-sm hidden md:inline">{{ user?.firstName }}</span>
          </button>
          
          <!-- Dropdown Menu -->
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="p-2">
              <div class="px-3 py-2 border-b border-gray-100">
                <p class="text-sm font-semibold text-gray-700">{{ user?.firstName }} {{ user?.lastName }}</p>
                <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
              </div>
              <button 
                @click="handleLogout"
                class="w-full text-left px-3 py-2 text-sm text-black hover:bg-[#C4B7C1] rounded-lg transition mt-1"
              >
                <span class="mr-2"></span> Logout
              </button>
            </div>
          </div>
        </div>

        <!-- Login Button -->
        <button 
          v-else
          @click="showLoginModal = true"
          class="bg-black text-[#FFFFFF] px-4 py-2 rounded-lg font-medium  transition transform hover:scale-105"
        >
          Login
        </button>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal 
      :isOpen="showLoginModal"
      @update:isOpen="showLoginModal = $event"
    />
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useCart } from '../composables/useCart';
import { useAuth } from '../composables/useAuth';
import LoginModal from './LoginModal.vue';

const { totalItems } = useCart();
const { isAuthenticated, user, logout } = useAuth();

const cartCount = computed(() => totalItems.value);
const showLoginModal = ref(false);

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    logout();
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://via.placeholder.com/32?text=User';
};
</script>