<template>
  <v-card class="mx-auto my-4" @click="openDialog">
    <v-avatar class="mx-auto" size="100">
      <img :src="photoUrl" alt="User Photo" />
    </v-avatar>
    <v-card-title>{{ user.name }}</v-card-title>
    <v-card-subtitle>{{ user.username }}</v-card-subtitle>
    <v-card-text>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
      <v-chip>{{ user.address.city }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    user: Object,
    photoUrl: String,
    openDialog: Function,
  },
};
</script>

<style scoped>
.v-card {
  cursor: pointer;
}
</style>

