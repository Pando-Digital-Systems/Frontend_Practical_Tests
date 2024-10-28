<template>
  <v-dialog :model-value="isDialogOpen" @update:model-value="updateDialogState" max-width="600px">
    <v-card>
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-text>
        <v-tabs v-model="activeTab">
          <v-tab>Contact Info</v-tab>
          <v-tab>Company</v-tab>
          <v-tab>Address</v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <div>
              <p>Email: {{ user.email }}</p>
              <p>Phone: {{ user.phone }}</p>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div>
              <p>Company: {{ user.company.name }}</p>
              <p>Catchphrase: {{ user.company.catchPhrase }}</p>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div>
              <p>Address: {{ user.address.street }}, {{ user.address.city }}</p>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    user: Object,
    isDialogOpen: Boolean,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close'); // Emit the close event
    },
    updateDialogState(value) {
      this.$emit('update:isDialogOpen', value); // Emit the updated dialog state
    },
  },
};
</script>

