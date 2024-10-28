<script setup>
import { ref } from "vue";
const search = ref(null);
</script>
<template>
  <v-card>
    <v-layout>
      <Navigation />
      <v-main>
        <v-app>
          <!-- Toolbar at the top -->
          <v-app-bar app color="primary" dark>
            <v-toolbar-title>User Directory {{ search }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- Search Field -->
            <v-text-field
              v-model="search"
              placeholder="Search by name or company"
              prepend-inner-icon="mdi-magnify"
              outlined
            ></v-text-field>
          </v-app-bar>

          <!-- Main layout with optional sidebar -->
          <v-container fluid>
            <v-row>
              <!-- Sidebar (optional) -->
              <v-col cols="12" md="3">
                <v-card class="pa-4">
                  <!-- Any sidebar content (e.g., filters, settings) -->
                  <v-switch
                    v-model="listView"
                    label="Toggle List/Grid View"
                    inset
                  ></v-switch>
                </v-card>
              </v-col>

              <!-- Main content area for User Cards -->
              <v-col cols="12" md="9">
                <v-row :dense="listView">
                  <v-col
                    v-for="user in filteredUsers"
                    :key="user.id"
                    :cols="listView ? 12 : 4"
                  >
                    <!-- User Card Component (use a custom component here) -->
                    <v-card @click="openUserDialog(user)">
                      <v-card-title>{{ user.name }}</v-card-title>
                      <v-card-subtitle>{{ user.company.name }}</v-card-subtitle>
                      <v-card-text>
                        <v-chip color="primary" dark>{{
                          user.address.city
                        }}</v-chip>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>

          <!-- User Detail Dialog -->
          <v-dialog v-model="dialog" max-width="600">
            <v-card>
              <v-card-title>{{ selectedUser?.name }}</v-card-title>
              <v-card-subtitle>{{
                selectedUser?.company?.name
              }}</v-card-subtitle>
              <v-card-text>
                <v-tabs v-model="tab">
                  <v-tab>Contact Info</v-tab>
                  <v-tab>Company</v-tab>
                  <v-tab>Address</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <div>
                      <p>Email: {{ selectedUser?.email }}</p>
                      <p>Phone: {{ selectedUser?.phone }}</p>
                    </div>
                  </v-tab-item>
                  <v-tab-item>
                    <div>
                      <p>Company Name: {{ selectedUser?.company?.name }}</p>
                      <p>
                        Catchphrase: {{ selectedUser?.company?.catchPhrase }}
                      </p>
                    </div>
                  </v-tab-item>
                  <v-tab-item>
                    <div>
                      <p>
                        Address: {{ selectedUser?.address.street }},
                        {{ selectedUser?.address.city }}
                      </p>
                    </div>
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Loading and Error Handling -->
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <v-alert v-if="error" type="error">Failed to load data</v-alert>
        </v-app>
      </v-main>
    </v-layout>
  </v-card>
</template>
