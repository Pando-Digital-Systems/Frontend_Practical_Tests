<template>
  <v-card class="mx-auto my-4" @click="openDialog">
    <v-avatar class="mx-auto" size="150"> 
      <div class="avatar-image-wrapper">
        <img :src="photoUrl" alt="User Photo" @error="handleImageError" class="user-photo" />
      </div>
    </v-avatar>
    <v-card-title>{{ user.name }}</v-card-title>
    <v-card-subtitle>{{ user.username }}</v-card-subtitle>
    <v-card-text>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>Company: {{ user.company.name }}</p>
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
  methods: {
    handleImageError(event) {
      event.target.src = 'path/to/default-image.png'; // Set a default image path
    },
  },
};
</script>

<style scoped>
.v-card {
  cursor: pointer;
}

.avatar-image-wrapper {
  width: 100%; /* Ensure it fills the avatar */
  height: 100%; /* Ensure it fills the avatar */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Hide overflow to maintain circular design */
  border-radius: 50%; /* Make it circular */
}

.user-photo {
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain; 
}
</style>
