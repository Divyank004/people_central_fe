<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title shrink>
          People Central
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/absences" label="Absences" />
          <q-route-tab to="/team" label="My Team" />
          <q-route-tab to="/tasks" label="Tasks" />
        </q-tabs>
        <q-tabs class="absolute-right">
          <q-tab name="help" icon="help" />
          <q-tab name="help" icon="logout" />
        </q-tabs>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
          <div class="text-subtitle1 self-end">v{{ appVersion?.replaceAll('"', '') }}</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const appVersion = ref(process.env.APP_VERSION);

</script>
