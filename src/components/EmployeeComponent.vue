<template>
  <div>
    <div class="text-h5 text-center q-ma-md">
      Welcome Back,
      <transition
        appear
        enter-active-class="animated fadeInRightBig slower delay-1s"
        leave-active-class="animated fadeOut"
      >
        <span class="text-h5 text-center text-italic">{{ userStore.user?.name }}</span>
      </transition>
    </div>
    <div class="row justify-center">
      <div class="dashboard-card q-ma-md column" style="width: 350px; height: 350px">
        <div class="card-header">
          <p class="card-title">Vacation Days</p>
          <div class="card-icon">📅</div>
        </div>
        <div class="vacation-circle">
          {{ employee.noVacationDaysLeft }}
        </div>
        <p style="text-align: center; color: #666">Available</p>
      </div>
      <div class="dashboard-card rows q-ma-md" style="width: 350px; height: 350px">
        <div class="row justify-between">
          <p class="card-title">Leaves {{ new Date().getFullYear() }}</p>
          <div class="card-icon">🏖️</div>
        </div>
        <div class="row">
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar class="leave-badge approved">
                  {{ vacations[0]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Approved Vacation Days</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar class="leave-badge approved">
                  {{ vacations[1]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Approved Sick Days</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar class="leave-badge unpaid">
                  {{ vacations[2]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Approved Unpaid Vacation Days</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar class="leave-badge pending">
                  {{ vacations[3]?.noOfDaysTaken }}
                </q-avatar>
              </q-item-section>
              <q-item-section>Request waiting for approval</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="dashboard-card rows q-ma-md" style="width: 350px; height: 350px">
        <div class="row justify-between">
          <p class="card-title">Apply for Leave</p>
          <div class="card-icon">✉️</div>
        </div>
        <div class="q-mt-md">
          <p class="form-label">Absence Type</p>
          <q-select class="" dense standout v-model="absenceType" :options="absenceOptions" />
          <div class="row q-mt-md justify-between">
            <div class="column">
              <p class="form-label">From</p>
              <q-input
                style="width: 130px"
                dense
                filled
                v-model="vacationFromDate"
                mask="date"
                :rules="['date']"
              >
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
              <p class="form-label">To</p>
              <q-input
                style="width: 130px"
                dense
                filled
                v-model="vacationToDate"
                mask="date"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="vacationToDate" @update:model-value="checkFromDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div v-if="singleDayVacation">
              <q-checkbox v-model="halfDay" label="Half day" color="teal" />
            </div>
          </div>
        </div>
        <q-btn class="apply-btn" label="Quick Apply" @click="showVacationReqDialog" />
      </div>
      <div class="dashboard-card column q-ma-md" style="width: 350px; height: 350px">
        <div class="row justify-between">
          <p class="card-title">My Documents</p>
          <div class="card-icon">📄</div>
        </div>
        <div class="row">
          <q-list :separator="true">
            <q-item v-for="(item, index) in documents" :key="item.id" clickable v-ripple>
              <q-item-section>{{ index + 1 + '. ' + item.filename }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
    <ConfirmDialog
      dialogHeader="Confirm Leave Request"
      :dialogMessage="`Are you sure you want to apply for leave during the period
          ${new Date(vacationFromDate).toDateString()} to ${new Date(vacationToDate).toDateString()} ?`"
      :showConfirmDialog="showConfirmDialog"
      v-on:close-modal="closeConfirmDialog"
      v-on:confirm-req="quickApplyVacation"
    >
    </ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { EmployeeDocument } from '../types/employeeDashboard';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import type { UserProfile } from '../types/auth';
import { authService } from 'src/api/services';
import { date } from 'quasar';
import ConfirmDialog from './ConfirmDialog.vue';
import type { VacationType } from 'src/types/vacation';

const userStore = useUserStore();
const vacationFromDate = ref(new Date().toISOString());
const vacationToDate = ref(new Date().toISOString());
const absenceOptions = [
  { label: 'Paid Leave', value: 'PAID' },
  { label: 'Unpaid Leave', value: 'UNPAID' },
  { label: 'Sick Leave', value: 'SICK' },
];
const absenceType = ref<VacationType>((absenceOptions[0]?.value as VacationType) ?? 'PAID');
const halfDay = ref(false);
const singleDayVacation = ref(false);
const showConfirmDialog = ref(false);
const employee = ref<UserProfile>({
  employeeId: 0,
  userId: 0,
  orgName: '',
  userName: '',
  name: '',
  employeeRole: '',
  noVacationDaysLeft: 0,
});
const vacations = ref([
  {
    id: 1,
    vacationType: 'Paid',
    noOfDaysTaken: 0,
  },
  {
    id: 2,
    vacationType: 'UnPaid',
    noOfDaysTaken: 0,
  },
  {
    id: 3,
    vacationType: 'Sick',
    noOfDaysTaken: 0,
  },
  {
    id: 4,
    vacationType: 'pending',
    noOfDaysTaken: 0,
  },
]);

onMounted(async () => {
  const userId = Number(localStorage.getItem('userId'));
  if (!userId) {
    console.error('User ID not found in localStorage');
    userStore.logout();
  }
  await userStore.fetchUserData(userId);
  if (userStore.user !== null) {
    employee.value = userStore.user;
    console.log('Employee Data:', employee);
  }

  vacations.value = await authService.getVacationsCount(userId);
});

const documents: EmployeeDocument[] = [
  {
    id: 1,
    filename: 'Fulltime Contract',
  },
  {
    id: 2,
    filename: 'Keys Contract',
  },
];
function checkFromDate() {
  const diff = date.getDateDiff(vacationFromDate.value, vacationToDate.value);
  if (diff > 0) {
    alert('to date is less than from date');
  }
  if (diff == 0) {
    singleDayVacation.value = true;
  }
}

function showVacationReqDialog() {
  showConfirmDialog.value = true;
  console.log(
    'Applying vacation from',
    vacationFromDate.value,
    'to',
    vacationToDate.value,
    'with type',
    absenceType.value,
    'and half day:',
    halfDay.value,
  );
}

function quickApplyVacation() {
  showConfirmDialog.value = false;
  console.log(
    'Applying vacation from',
    vacationFromDate.value,
    'to',
    vacationToDate.value,
    'with type',
    absenceType.value,
    'and half day:',
    halfDay.value,
  );
}
function closeConfirmDialog() {
  showConfirmDialog.value = false;
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 200px;
  height: 100px;
}

.my-employee-card {
  width: 100%;
  max-width: 100%;
  height: 90%;
  max-height: 100%;
}

.profile-name {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.profile-title {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dashboard-card.calendar {
  padding: 0rem;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.card-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.vacation-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.leave-badge {
  font-weight: bold;
  color: white;
}

.leave-badge.approved {
  background: #28a745;
}

.leave-badge.pending {
  background: #ffc107;
  color: #333;
}

.leave-badge.unpaid {
  background: #17a2b8;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-select {
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.apply-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.apply-btn:hover {
  transform: translateY(-2px);
}
</style>
