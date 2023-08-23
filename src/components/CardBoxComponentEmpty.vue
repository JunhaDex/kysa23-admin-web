<template>
  <div class="text-center py-24 text-gray-500 dark:text-slate-400">
    <p>{{ message }}</p>
  </div>
</template>
<script setup>
defineProps({
  message: {
    type: String,
    default: "",
  },
});
</script>
