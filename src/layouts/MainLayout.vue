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
            <q-avatar
              size="40px"
              class="overlapping"
              >
            <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`">
            </q-avatar>
            <q-tab name="help" icon="help" />
            <q-route-tab to="/" icon="logout" @click='logout'/>
          </q-tabs>

        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
        <!-- <div class="text-subtitle1 self-end">v{{ appVersion?.replaceAll('"', '') }}</div> -->
      </q-page-container>


    </q-layout>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// const appVersion = ref(process.env.APP_VERSION);
function logout() {
   localStorage.removeItem('token')
   localStorage.removeItem('user')
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
</style>
