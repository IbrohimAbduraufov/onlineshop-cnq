<template>
  <div class="pagination">
    <button
      class="pagination__btn back"
      :disabled="currentPage == 1"
      @click="$emit('page', currentPage - 1)"
    >
      <
    </button>
    <span class="pagination__line">{{ currentPage }} | {{ totalPages }}</span>
    <button
      class="pagination__btn next"
      :disabled="currentPage == totalPages"
      @click="$emit('page', currentPage + 1)"
    >
      >
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["currentPage", "totalPages"]);
</script>
