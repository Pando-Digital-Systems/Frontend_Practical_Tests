<script setup>
import { ref } from "vue";
const search = ref(null);
</script>
<template>
  <v-card>
    <v-layout>
      <Navigation />
      <v-main> Dashboard </v-main>
    </v-layout>
  </v-card>
</template>
