<script setup lang="ts">
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

const props = defineProps<{
  isOpen: boolean
  product: Product | null  // Make sure this has | null
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const { addItem } = useCart()

const closeModal = () => {
  emit('update:isOpen', false)
}

const addToCart = () => {
  if (props.product) {
    addItem(props.product)
    closeModal()
  }
}
</script>