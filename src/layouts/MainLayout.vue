<template>
  <div class="page-background">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="headerclass">
        <q-toolbar>
          <q-toolbar-title shrink>
            <div class="logo">
              <div class="logo-icon">PC</div>
              People Central
            </div>
          </q-toolbar-title>
          <q-tabs class="absolute-center">
            <q-route-tab to="/username" label="Home" />
            <q-route-tab to="/absences" label="Absences" />
            <q-route-tab to="/calendar" label="My Calendar" />
            <q-route-tab to="/team" label="My Team" />
            <!-- <q-route-tab to="/tasks" label="Timesheet" /> -->
          </q-tabs>
          <q-tabs class="absolute-right">
            <q-btn-dropdown
              dropdown-icon="img:https://cdn.quasar.dev/img/avatar1.jpg"
              dense
              size="30px"
              no-icon-animation
            >
              <div class="row no-wrap q-pa-md">
                <q-list class="profile-menu">
                  <q-item clickable v-ripple @click="goToProfile" class="menu-item">
                    <q-item-section avatar>
                      <q-icon name="person" color="indigo-6" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>My Profile</q-item-label>
                      <q-item-label caption>View and edit profile</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple @click="goToSettings" class="menu-item">
                    <q-item-section avatar>
                      <q-icon name="settings" color="blue-6" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Settings</q-item-label>
                      <q-item-label caption>Preferences and configuration</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple @click="goToNotifications" class="menu-item">
                    <q-item-section avatar>
                      <q-icon name="notifications" color="orange-6" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Notifications</q-item-label>
                      <q-item-label caption>Manage notifications</q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="notificationCount > 0">
                      <q-badge color="red" rounded>{{ notificationCount }}</q-badge>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-btn-dropdown>
            <q-tab name="help" icon="help" />
            <q-route-tab to="/" icon="logout" @click="logout" />
          </q-tabs>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { ref } from 'vue';

const notificationCount = ref(3);
const userStore = useUserStore();
function logout() {
  userStore.logout();
}

function goToProfile() {
  console.log('go to profile');
}
function goToSettings() {
  console.log('go to goToSettings');
}
function goToNotifications() {
  console.log('go to goToNotifications');
}
</script>

<style scoped>
.page-background {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.headerclass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.menu-item {
  padding: 3px 4px;
  border-radius: 2%;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #f8f9fa;
}
</style>
