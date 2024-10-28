<script setup>
import { ref } from "vue";
import api from "@/services/api";
const search = ref(null);
const searchedUserList = ref(null);
const usersList = ref([]);
const fetchUsers = async () => {
  await api.get("/users").then((res) => {
    console.log(res.data);
    usersList.value = res.data;
    searchedUserList.value = usersList.value;
  });
};
const searchUser = () => {
  searchedUserList.value = usersList.value.filter((user) =>
    user.name.toLowerCase().includes(search.value.toLowerCase())
  );
};
await fetchUsers();
</script>
<template>
  <main class="mt-10">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>User Directory {{ search }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Search Field -->
      <v-text-field
        v-model="search"
        placeholder="Search by name or company"
        prepend-inner-icon="mdi-magnify"
        outlined
        dense
        hide-details
        @input="searchUser"
      ></v-text-field>
    </v-app-bar>
    <v-row align="center" dense>
      <v-col cols="12" md="4" v-for="user in searchedUserList">
        <v-card class="mx-auto" :subtitle="user.username" :title="user.name">
          <template v-slot:prepend>
            <!-- <v-icon color="primary" icon="mdi-account"></v-icon> -->
            <img
              :src="`https://randomuser.me/api/portraits/women/${user.id}.jpg`"
              height="50px"
              width="50px"
              class="rounded-xl"
            />
          </template>
          <v-card-text>
            <v-chip color="green" label> {{ user.address.city }} </v-chip>
            <br />
            email: {{ user.email }}
            <br />
            phone: {{ user.phone }}
            <br />
            company: {{ user.company.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </main>
</template>
