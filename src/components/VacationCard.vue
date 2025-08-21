<template>
  <div class="absence-item">
    <div class="absence-header">
      <div class="absence-type">{{ props.vacation.vacationType }} Leave</div>
      <div :class="`${statusClass} status-badge`">
        {{ props.vacation.status }}
      </div>
    </div>
    <div class="absence-details">
      <div class="detail-item">
        <div class="detail-label">From Date</div>
        <div class="detail-value">{{ props.vacation.fromDate }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">To Date</div>
        <div class="detail-value">{{ props.vacation.toDate }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Duration</div>
        <div class="detail-value">{{ props.vacation.duration }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Document</div>
        <div class="detail-value">
          <a href="#" class="document-link">{{ props.vacation.document }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Vacation, VacationStatus } from '../types/vacation';

const props = defineProps<{ vacation: Vacation }>();

const statusClassMap: Record<VacationStatus, string> = {
  APPROVED: 'status-approved',
  REJECTED: 'status-rejected',
  PENDING: 'status-pending',
};

const statusClass: string = statusClassMap[props.vacation.status];
</script>

<style scoped>
.absence-item {
  background: #f8f9fa;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.absence-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.absence-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.absence-type {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-approved {
  background: #d4edda;
  color: #155724;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-rejected {
  background: #f8d7da;
  color: #721c24;
}

.absence-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.document-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.document-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .absence-details {
    grid-template-columns: 1fr;
  }
}
</style>
