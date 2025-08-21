<template>
  <div class="dashboard-card rows q-ma-md" style="width: 350px; height: 350px">
    <div class="row justify-between">
      <p class="card-title">Leaves 2025</p>
      <div class="card-icon">🏖️</div>
    </div>
    <div class="row">
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="leave-badge approved">
              {{ props.vacations[0]?.noOfDaysTaken }}
            </q-avatar>
          </q-item-section>
          <q-item-section>Approved Vacation Days</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="leave-badge approved">
              {{ props.vacations[1]?.noOfDaysTaken }}
            </q-avatar>
          </q-item-section>
          <q-item-section>Approved Sick Days</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="leave-badge unpaid">
              {{ props.vacations[2]?.noOfDaysTaken }}
            </q-avatar>
          </q-item-section>
          <q-item-section>Approved Unpaid Vacation Days</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="leave-badge pending">
              {{ props.vacations[3]?.noOfDaysTaken }}
            </q-avatar>
          </q-item-section>
          <q-item-section>Request waiting for approval</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Vacations } from '../types/employeeDashboard';

const props = defineProps<{ vacations: Vacations[] }>();
</script>
