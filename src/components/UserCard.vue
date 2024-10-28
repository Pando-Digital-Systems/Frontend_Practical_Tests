<template>
  <v-card @click="$emit('click')" :class="listView ? 'user-list' : ''">
    <v-card-title>
      <v-avatar>
        <img :src="user.avatarUrl" alt="User Avatar" />
      </v-avatar>
      <span class="ml-4">{{ user.name }}</span>
    </v-card-title>
    <v-card-subtitle v-if="!listView">
      <p>{{ user.username }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
    </v-card-subtitle>
    <v-card-actions>
      <v-chip color="primary" text-color="white">{{ user.address.city }}</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    listView: { type: Boolean, default: false },
  },
};
</script>
