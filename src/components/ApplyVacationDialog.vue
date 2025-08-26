<template>
  <q-dialog v-model="modal" class="leave-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Request for Leave</h2>
        <button class="close-btn" @click="$emit('closeModal')">&times;</button>
      </div>

      <form @submit.prevent="submitVacationRequest">
        <div class="form-group">
          <label class="form-label">Leave Type</label>
          <q-select
            v-model="vacation.vacationType"
            class="form-select"
            required
            :options="absenceOptions"
          >
          </q-select>
        </div>

        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input
            v-model="vacation.startDate"
            type="date"
            class="form-input"
            required
            :class="{ error: validationErrors.startDate }"
          />
          <span v-if="validationErrors.startDate" class="error-message">{{
            validationErrors.startDate
          }}</span>
        </div>

        <div class="form-group">
          <label class="form-label">End Date</label>
          <input
            v-model="vacation.endDate"
            type="date"
            class="form-input"
            required
            :class="{ error: validationErrors.endDate }"
          />
          <span v-if="validationErrors.endDate" class="error-message">{{
            validationErrors.endDate
          }}</span>
        </div>

        <div class="form-group">
          <label class="form-label">Reason (Optional)</label>
          <q-input
            v-model="vacation.comments"
            filled
            type="textarea"
            label="Enter reason for leave..."
          />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('closeModal')">Cancel</button>
          <button type="submit" class="btn-primary">Submit Request</button>
        </div>
      </form>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import type { VacationRequest } from '../types/vacation';
import { validate, sanitize, messages } from '../utils/validation';

const absenceOptions = [
  { label: 'Paid Leave', value: 'PAID' },
  { label: 'Unpaid Leave', value: 'UNPAID' },
  { label: 'Sick Leave', value: 'SICK' },
];

const props = defineProps<{
  vacationReq: VacationRequest;
  showLeaveModal: boolean;
}>();

const vacation = props.vacationReq;
const modal = ref(props.showLeaveModal);
const validationErrors = reactive<Record<string, string>>({});

watchEffect(() => {
  modal.value = props.showLeaveModal;
});

function validateForm(): boolean {
  // Clear previous errors
  Object.keys(validationErrors).forEach((key) => delete validationErrors[key]);

  let isValid = true;

  // Validate vacation type
  if (!vacation.vacationType) {
    validationErrors.vacationType = messages.required;
    isValid = false;
  }

  // Validate start date
  if (!validate.required(vacation.startDate)) {
    validationErrors.startDate = messages.required;
    isValid = false;
  } else if (!validate.isValidDate(vacation.startDate)) {
    validationErrors.startDate = messages.invalidDate;
    isValid = false;
  } else if (!validate.isFutureDate(vacation.startDate)) {
    validationErrors.startDate = messages.pastDate;
    isValid = false;
  }

  // Validate end date
  if (!validate.required(vacation.endDate)) {
    validationErrors.endDate = messages.required;
    isValid = false;
  } else if (!validate.isValidDate(vacation.endDate)) {
    validationErrors.endDate = messages.invalidDate;
    isValid = false;
  } else if (new Date(vacation.endDate) < new Date(vacation.startDate)) {
    validationErrors.endDate = 'End date must be after start date';
    isValid = false;
  }

  return isValid;
}

function submitVacationRequest() {
  if (!validateForm()) {
    return;
  }

  // Sanitize inputs
  const sanitizedRequest = {
    ...vacation,
    comments: vacation.comments ? sanitize.input(vacation.comments) : '',
  };

  console.log('vacationReq', sanitizedRequest);
  // TODO: Submit request to API
}
</script>
<style scoped>
.leave-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn-secondary {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.error-message {
  color: #dc2525;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-input.error,
.form-select.error {
  border-color: #dc2525;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .apply-button {
    font-size: 0.5rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
  }
  .main-content {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .apply-button {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
