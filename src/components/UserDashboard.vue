<template>
  <v-container>
    <!-- Error Alert -->
    <v-alert v-if="error"
      type="error"
      dismissible>
      Failed to load user data. Please try again.
    </v-alert>

    <!-- Loading Indicator -->
    <v-progress-circular v-if="loading"
      indeterminate
      color="primary"></v-progress-circular>

    <!-- User Cards -->
    <v-row v-if="!loading && !error">
      <v-col cols="12"
        md="4"
        v-for="user in users"
        :key="user.id">
        <UserCard :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchUsers } from '@/services/dashboard-service.js';
import UserCard from './UserCard.vue';

export default {
  components: { UserCard },
  setup() {
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchUserData = async () => {
      loading.value = true;
      try {
        users.value = await fetchUsers();
      } catch (err) {
        error.value = 'Failed to load user data.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchUserData);

    return {
      users,
      loading,
      error,
    };
  },
};
</script>
