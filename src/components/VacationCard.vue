<template>
  <div class="absence-item ">
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
  flex: 0 0 24%;
  min-width: 280px;
  height: auto;
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 0.75rem;
  border-left: 3px solid #667eea;
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
  margin-bottom: 0.5rem;
}

.absence-type {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
}

.status-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.65rem;
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
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.detail-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  flex-shrink: 0;
}

.detail-value {
  font-size: 0.8rem;
  color: #333;
  font-weight: 500;
  text-align: right;
  word-break: break-word;
}

.document-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 400;
  font-size: 0.8rem;
}

.document-link:hover {
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .absence-item {
    flex: 0 0 33.33%;
  }
}

@media (max-width: 900px) {
  .absence-item {
    flex: 0 0 50%;
  }
}

@media (max-width: 768px) {
  .absence-item {
    flex: 0 0 100%;
    min-width: 250px;
  }
}
</style>
