<template>
  <div class="flex justify-center">
    <q-card class="my-employee-card justify-center q-mt-md">
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
      <div class="q-ma-md column  items-center" style="width: 300px; height: 300px; background-color: aliceblue; border-radius: 12.5%;">
        <p class="text-h6 q-mt-md">
            Vacation Days
        </p>
        <div class="q-mt-md  row justify-center items-center" style="width: 140px; height: 140px; border-radius: 50%;background: #4563;">
          <p class="text-h6">
            {{ employee.vacations }}
          </p>
        </div>
      </div>

      <div class="column  q-ma-md" style="width: 300px; height: 300px;background-color: aliceblue; border-radius: 12.5%;">
        <p class="row text-h6 justify-center q-mt-md q-mb-none row-2">
          My Documents
        </p>
        <div class="row q-ml-md" style="max-width: 350px">
          <q-list >
            <q-item v-for="(item, index) in documents" :key="item.id" clickable v-ripple>
              <q-item-section>{{index + 1 + '. ' + item.filename }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="row justify-center q-ma-md" style="width: 300px; height: 300px;background-color: aliceblue; border-radius: 12.5%;">
        <p class="text-h6 q-mt-md">
          Leaves 2025
        </p>
        <q-list >
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ vacations[0]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Approved Vacation Days</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ vacations[1]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Approved Sick Days</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ vacations[2]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Approved Unpaid Vacation Days</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ vacations[3]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Request waiting for approval</q-item-section>
            </q-item>
          </q-list>
      </div>
      <div class="column q-ma-md" style="width: 320px; height: 300px;background-color: aliceblue; border-radius: 12.5%;">
        <p class="row justify-center text-h6 q-mt-md">
          Apply for Leave
        </p>
        <div class="q-mx-lg">
          <p class="text-subtitle1 q-ma-none">Absence Type</p>
          <q-select dense standout v-model="absenceType" :options="absenceOptions" />
          <div class="row q-mt-md justify-between">
            <div class="column">
              From
            <q-input style="width: 130px" dense filled v-model="vacationFromDate" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="vacationFromDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            </div>
            <div class="column">
              To
            <q-input style="width: 130px" dense filled v-model="vacationToDate" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="vacationToDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          </div>
        </div>
        <q-btn class="q-mx-lg self-end" style="width: 60px" color="primary" label="Apply" />
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
import type { Employee, EmployeeDocument, Vacations } from './models';

const vacationFromDate = ref('2025/06/01')
const vacationToDate = ref('2025/06/01')
const absenceOptions = [
  'Paid Leave',
  'Unpaid Leave',
  'Sick Leave',
]
const absenceType = ref(absenceOptions[0])
const employee: Employee = {
  id: 1,
  name: 'Divyank Dhadi',
  role: 'Full stack software developer',
  year: 2025,
  vacations: 10
}
const date = ref('2025/02/01')
// const events =  [ '2019/02/01', '2019/02/05', '2019/02/06', '2019/02/09', '2019/02/23' ]
const documents: EmployeeDocument[] = [
  {
    id: 1,
    filename: 'Fulltime Contract'
  },
  {
    id: 2,
    filename: 'Keys Contract'
  }
]

const vacations: Vacations[] = [
  {
    id: 1,
    vacationType: 'Paid',
    noOfDaysTaken: 12
  },
  {
    id: 2,
    vacationType: 'UnPaid',
    noOfDaysTaken: 0
  },
  {
    id: 3,
    vacationType: 'Sick',
    noOfDaysTaken: 2
  },
  {
    id: 4,
    vacationType: 'pending',
    noOfDaysTaken: 1
  }
]
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
  max-width: 100%
  height: 90%
  max-height: 100%
</style>