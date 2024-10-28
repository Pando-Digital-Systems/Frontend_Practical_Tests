<script setup>
import { ref } from "vue";
import api from "@/services/api";
const search = ref(null);
const isDescriptionModalOpen = ref(false);
const dialogTab = ref("contact");
const isCardView = ref(true);
const dialogIndex = ref(null);
const error = ref(null);
const showDescriptionDialog = (index) => {
  dialogIndex.value = index;
  isDescriptionModalOpen.value = true;
};
const searchedUserList = ref(null);
const usersList = ref([]);
const fetchUsers = async () => {
  await api
    .get("/users")
    .then((res) => {
      console.log(res.data);
      usersList.value = res.data;
      searchedUserList.value = usersList.value;
    })
    .catch((err) => {
      error.value = err.data.message;
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
      <v-toolbar-title>User Directory</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Search Field -->
      <v-text-field
        v-model="search"
        placeholder="Search by name"
        prepend-inner-icon="mdi-magnify"
        outlined
        dense
        hide-details
        @input="searchUser"
      ></v-text-field>
    </v-app-bar>
    <v-container>
      <!-- Toggle Switch -->
      <v-switch
        v-model="isCardView"
        :label="isCardView ? 'Card View' : 'List View'"
      ></v-switch>
      <!-- Conditional Rendering for Card or List -->
      <v-alert v-if="error" type="error" dismissible>
        {{ error }}
      </v-alert>
      <div v-if="isCardView">
        <!-- Card View -->
        <v-row align="center" dense>
          <v-col cols="12" md="4" v-for="(user, index) in searchedUserList">
            <v-card
              class="mx-auto"
              :subtitle="user.username"
              :title="user.name"
              @click="showDescriptionDialog(index)"
            >
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
      </div>

      <div v-else>
        <!-- List View -->
        <v-list>
          <v-list-item
            v-for="(user, index) in searchedUserList"
            :key="user.id"
            @click="showDescriptionDialog(index)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-container>

    <v-dialog v-model="isDescriptionModalOpen" width="1024">
      <v-card>
        <v-tabs v-model="dialogTab" bg-color="primary">
          <v-tab value="contact">Contact Info</v-tab>
          <v-tab value="company">Company</v-tab>
          <v-tab value="address">Address</v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="dialogTab">
            <v-tabs-window-item value="contact">
              <v-card
                class="mx-auto"
                :subtitle="usersList[dialogIndex].username"
                :title="usersList[dialogIndex].name"
              >
                <template v-slot:prepend>
                  <!-- <v-icon color="primary" icon="mdi-account"></v-icon> -->
                  <img
                    :src="`https://randomuser.me/api/portraits/women/${usersList[dialogIndex].id}.jpg`"
                    height="50px"
                    width="50px"
                    class="rounded-xl"
                  />
                </template>
                <v-card-text>
                  email: {{ usersList[dialogIndex].email }}
                  <br />
                  phone: {{ usersList[dialogIndex].phone }}
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="company">
              <v-card
                class="mx-auto"
                :subtitle="usersList[dialogIndex].username"
                :title="usersList[dialogIndex].name"
              >
                <template v-slot:prepend>
                  <!-- <v-icon color="primary" icon="mdi-account"></v-icon> -->
                  <img
                    :src="`https://randomuser.me/api/portraits/women/${usersList[dialogIndex].id}.jpg`"
                    height="50px"
                    width="50px"
                    class="rounded-xl"
                  />
                </template>
                <v-card-text>
                  company: {{ usersList[dialogIndex].company.name }},
                  {{ usersList[dialogIndex].company.catchPhrase }},
                  {{ usersList[dialogIndex].company.bs }}
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="address">
              <v-card
                class="mx-auto"
                :subtitle="usersList[dialogIndex].username"
                :title="usersList[dialogIndex].name"
              >
                <template v-slot:prepend>
                  <!-- <v-icon color="primary" icon="mdi-account"></v-icon> -->
                  <img
                    :src="`https://randomuser.me/api/portraits/women/${usersList[dialogIndex].id}.jpg`"
                    height="50px"
                    width="50px"
                    class="rounded-xl"
                  />
                </template>
                <v-card-text>
                  <v-chip color="green" label>
                    {{ usersList[dialogIndex].address.street }},
                    {{ usersList[dialogIndex].address.suite }},
                    {{ usersList[dialogIndex].address.city }},
                    {{ usersList[dialogIndex].address.zipcode }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-dialog>
  </main>
</template>
