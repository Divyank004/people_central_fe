<template>
  <div class="col">
    <q-card class="my-employee-card justify-center">
      <q-card-section class="q-pa-md q-ma-md row  justify-center items-center">
        <div class="q-ma-md column items-center" flat bordered>
          <q-avatar
          size="100px"
          class="overlapping"
          >
          <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`">
          </q-avatar>
          <p class="text-h6 text-center q-ma-none">{{ employee.name }}</p>
          <p class="text-subtitle1 text-center">{{ employee.role }}</p>
        </div>
    </q-card-section>
    <q-card-section class="q-pa-md q-ma-md row ">
      <div class="q-ma-md column  items-center" style="width: 250px; height: 250px; background-color: aliceblue; border-radius: 12.5%;">
        <p class="text-h6 q-mt-md">
            Vacation Days
        </p>
        <div class="q-mt-md  row justify-center items-center" style="width: 140px; height: 140px; border-radius: 50%;background: #4563;">
          <p class="text-h6">
            {{ employee.vacations }}
          </p>
        </div>
      </div>

      <div class="row justify-center q-ma-md" style="width: 250px; height: 250px;background-color: aliceblue; border-radius: 12.5%;">
        <p class="text-h6 q-mt-md">
          My Documents
        </p>
      </div>

      <div class="row justify-center q-ma-md" style="width: 250px; height: 250px;background-color: aliceblue; border-radius: 12.5%;">
        <p class="text-h6 q-mt-md">
          Timsheets
        </p>
      </div>
      <q-date
              class="q-ma-md"
              v-model="date"
              :events="eventsFn"
              :event-color="(date) => date && (Number(date.charAt(8)) % 2 === 0) ? 'teal' : 'orange'"
            />
      </q-card-section>
  </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Employee } from './models';

const employee: Employee = {
  id: 1,
  name: 'Divyank Dhadi',
  role: 'Full stack software developer',
  year: 2025,
  vacations: 10
}
const date = ref('2025/02/01')
// const events =  [ '2019/02/01', '2019/02/05', '2019/02/06', '2019/02/09', '2019/02/23' ]

function eventsFn (date: string) {
        if (date === '2025/02/01' ||
          date === '2025/02/05' ||
          date === '2025/02/06' ||
          date === '2025/02/09' ||
          date === '2025/02/23') {
          return true
        }
        return false
      }
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 200px
  height: 100px

.my-employee-card
  width: 100%
  max-width: 1800px
  height: 90%
</style>