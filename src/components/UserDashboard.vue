<template>
  <v-container class="my-5">
    <ListViewToggle @update:viewType="updateViewType" />

    <!-- Search Bar -->
    <v-text-field
      v-model="searchQuery"
      placeholder="Search Users"
      prepend-icon="mdi-magnify"
      class="mb-4"
    />

    <v-alert v-if="error" type="error" dismissible>
      Failed to load user data. Please try again.
    </v-alert>

    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>

    <v-row v-if="!loading && !error && viewType === 'grid'">
      <v-col v-for="user in filteredUsers" :key="user.id" cols="12" md="4" class="mb-4">
        <v-card @click="openUserDialog(user)" class="user-card">
          <v-card-title>
            <v-avatar>
              <img :src="getPhotoUrl(user.id)" alt="User Photo" />
            </v-avatar>
            <span class="ml-2">{{ user.name }}</span>
          </v-card-title>
          <v-card-subtitle>
            <strong>Username:</strong> {{ user.username }}<br />
            <strong>Email:</strong> {{ user.email }}<br />
            <strong>Phone:</strong> {{ user.phone }}<br />
          </v-card-subtitle>
          <v-card-text>
            <v-chip>{{ user.address.city }}</v-chip>
            <span>{{ user.company.name }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-list v-if="!loading && !error && viewType === 'list'">
      <v-list-item-group>
        <v-list-item v-for="user in filteredUsers" :key="user.id" @click="openUserDialog(user)">
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar>
            <img :src="getPhotoUrl(user.id)" alt="User Photo" />
          </v-list-item-avatar>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <UserDialog v-if="selectedUser" :user="selectedUser" :dialog="dialog" @close="dialog = false" />
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { fetchUsers, getPhotoUrl } from '@/services/dashboard-service.js';
import ListViewToggle from './ListViewToggle.vue';
import UserDialog from './UserDialog.vue';

export default {
  components: { ListViewToggle, UserDialog },
  setup() {
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const searchQuery = ref('');
    const dialog = ref(false);
    const selectedUser = ref(null);
    const viewType = ref('grid'); // Default view type

    const filteredUsers = computed(() =>
      users.value.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );

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

    const openUserDialog = (user) => {
      selectedUser.value = user;
      dialog.value = true;
    };

    const updateViewType = (newViewType) => {
      viewType.value = newViewType; // Update view type based on toggle
    };

    onMounted(fetchUserData);

    return {
      users,
      loading,
      error,
      searchQuery,
      filteredUsers,
      dialog,
      selectedUser,
      openUserDialog,
      getPhotoUrl,
      viewType,
      updateViewType,
    };
  },
};
</script>

<style scoped>
.user-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.user-card:hover {
  transform: scale(1.02);
}

/* scrolling if content overflows */
.v-container {
  overflow-y: auto;
  max-height: 80vh; /* Height adjustment*/
}
</style>
