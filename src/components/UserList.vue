<template>
  <v-container>
    <ListViewToggle @update:viewType="updateViewType" />

    <v-alert v-if="error" type="error" dismissible>
      Failed to load user data. Please try again.
    </v-alert>

    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>

    <v-row v-if="!loading && !error && viewType === 'grid'">
      <v-col v-for="user in filteredUsers" :key="user.id" cols="12" md="4" class="mb-4">
        <UserCard 
          :user="user" 
          :photoUrl="getPhotoUrl(user.id)" 
          :openDialog="openUserDialog" 
        />
      </v-col>
    </v-row>

    <v-list v-if="!loading && !error && viewType === 'list'">
      <v-list-item-group>
        <v-list-item v-for="user in filteredUsers" :key="user.id" @click="openUserDialog(user)">
          <v-list-item-avatar>
            <div class="avatar-image-wrapper">
              <img :src="getPhotoUrl(user.id)" alt="User Photo" class="user-photo" @error="handleImageError" />
            </div>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
            <p>Email: {{ user.email }}</p>
            <p>Phone: {{ user.phone }}</p>
            <p>Company: {{ user.company.name }}</p>
            <v-chip>{{ user.address.city }}</v-chip>
          </v-list-item-content>
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
import UserCard from './UserCard.vue';
import UserDialog from './UserDialog.vue';

export default {
  components: { ListViewToggle, UserCard, UserDialog },
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
.user-photo {
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain; 
}
</style>
