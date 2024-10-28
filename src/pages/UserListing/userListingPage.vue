<script setup>
import { ref } from "vue";
import api from "@/services/api";
const searchUser = ref(null);
const fetchUsers = async () => {
  await api.get("/users").then((res) => {
    console.log(res);
  });
};
await fetchUsers();
</script>
<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>User Directory</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Search Field -->
    <v-text-field
      v-model="searchUser"
      placeholder="Search by name or company"
      prepend-inner-icon="mdi-magnify"
      outlined
      dense
      hide-details
    ></v-text-field>
  </v-app-bar>
</template>
