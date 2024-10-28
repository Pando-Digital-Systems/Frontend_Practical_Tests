<template>
  <v-switch
    v-model="isListView"
    :label="isListView ? 'List View' : 'Grid View'"
    @change="toggleView"
  />
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:viewType']);
const isListView = ref(false);

const toggleView = () => {
  emit('update:viewType', isListView.value ? 'list' : 'grid');
};
</script>

<style scoped>
/* Add any styles you want here */
</style>
