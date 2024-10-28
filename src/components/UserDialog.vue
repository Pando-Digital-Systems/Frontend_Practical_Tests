<template>
  <v-dialog :value="dialog" max-width="600px" @input="$emit('update:dialog', $event)">
    <v-card>
      <v-card-title>
        <span class="headline">{{ user.name }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-tabs v-model="tab" color="primary">
        <v-tab>Contact Info</v-tab>
        <v-tab>Company</v-tab>
        <v-tab>Address</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <v-card-text>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Phone:</strong> {{ user.phone }}</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <p><strong>Company Name:</strong> {{ user.company.name }}</p>
              <p><strong>Company Catchphrase:</strong> {{ user.company.catchPhrase }}</p>
              <p><strong>BS:</strong> {{ user.company.bs }}</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <p><strong>Street:</strong> {{ user.address.street }}</p>
              <p><strong>Suite:</strong> {{ user.address.suite }}</p>
              <p><strong>City:</strong> {{ user.address.city }}</p>
              <p><strong>Zipcode:</strong> {{ user.address.zipcode }}</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    user: Object,
    dialog: Boolean,
  },
  data() {
    return {
      tab: null, // For tracking the active tab
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close');
      this.$emit('update:dialog', false); // Emit the update event when closing
    },
  },
};
</script>

<style scoped>

</style>
