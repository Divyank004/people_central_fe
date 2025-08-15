<template>
  <q-page class="row">
    <div class="absolute-center" style="height:100%;width:90%">

      <q-scroll-area class="absences-container"
        style="height:75%;">
          <div>
                  <p class="section-title">
                      <span class="section-icon">📋</span>
                      Leave History
                  </p>
                  <div v-for="vacation in vacations" :key="vacation.id">
                    <VacationCard :vacation="vacation">

                    </VacationCard>
                  </div>

          </div>
      </q-scroll-area>
      <button class="apply-button" @click="showLeaveModal = true">
                Apply for Leave
      </button>
    </div>
       <!-- Leave Application Modal -->
    <div v-if="showLeaveModal" class="leave-modal" @click.self="showLeaveModal = false">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Request for Leave</h2>
                <button class="close-btn" @click="showLeaveModal = false">&times;</button>
            </div>

            <form @submit.prevent="submitLeaveRequest">
                <div class="form-group">
                    <label class="form-label">Leave Type</label>
                    <select v-model="leaveForm.type" class="form-select" required>
                        <option value="">Select leave type</option>
                        <option value="vacation">Vacation</option>
                        <option value="sick">Sick Leave</option>
                        <option value="personal">Personal Leave</option>
                        <option value="emergency">Emergency Leave</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input v-model="leaveForm.startDate" type="date" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label">End Date</label>
                    <input v-model="leaveForm.endDate" type="date" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Reason (Optional)</label>
                    <textarea v-model="leaveForm.reason" class="form-textarea" placeholder="Enter reason for leave..."></textarea>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn-secondary" @click="showLeaveModal = false">Cancel</button>
                    <button type="submit" class="btn-primary">Submit Request</button>
                </div>
            </form>
        </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import VacationCard from 'src/components/VacationCard.vue'
import type { Vacation } from '../types/vacation.ts'
import { ref } from 'vue';

const showLeaveModal = ref(false);

const vacations: Vacation[] = [
{
    id: 1,
    fromDate: 'March 15, 2025',
    toDate: 'March 22, 2025',
    document: 'vacation_request.pdf',
    duration: '3d',
    vacationType: 'PAID',
    status: 'APPROVED'
  },
  {
    id: 2,
    fromDate: 'July 8, 2025',
    toDate: 'July 10, 2025',
    document: 'medical_certificate.pdf',
    duration: '3d',
    vacationType: 'SICK',
    status: 'PENDING',
  },
  {
    id: 3,
    fromDate: 'June 1, 2025',
    toDate: 'June 30, 2025',
    document: 'extended_leave_request.pdf',
    duration: '30d',
    vacationType: 'UNPAID',
    status: 'REJECTED',
  },
  {
    id: 4,
    fromDate: 'January 10, 2025',
    toDate: 'April 10, 2025',
    document: 'maternity_certificate.pdf',
    duration: '90d',
    vacationType: 'MATERNITY',
    status: 'APPROVED',
  },
]

  const leaveForm = ref({
      type: '',
      startDate: '',
      endDate: '',
      reason: ''
  });
 const submitLeaveRequest = () => {
      if (!leaveForm.value.type || !leaveForm.value.startDate || !leaveForm.value.endDate) {
          alert('Please fill in all required fields');
          return;
      }

      // Here you would typically send the request to your backend
      console.log('Leave request submitted:', leaveForm.value);
      alert('Leave request submitted successfully!');

      // Reset form and close modal
      leaveForm.value = { type: '', startDate: '', endDate: '', reason: '' };
      showLeaveModal.value = false;
  };
</script>

<style scoped>
  .page-header {
            text-align: center;
            margin-bottom: 1rem;
        }

        .page-title {
            font-size: 2.5rem;
            color: white;
            margin-bottom: 0rem;
        }

        .page-subtitle {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.8);
        }

        .absences-container {
            background: rgba(150, 145, 241, 0.95);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .section-title {
            font-size: 1rem;
            color: #333;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .section-icon {
            width: 24px;
            height: 24px;
            background: #667eea;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.8rem;
        }
        .apply-button {
            position: fixed;
            bottom: 102%;
            right: 2%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 5px 20px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .apply-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .apply-button::before {
            content: '+';
            font-size: 1.2rem;
            font-weight: bold;
        }

        .no-absences {
            text-align: center;
            padding: 3rem;
            color: #666;
        }

        .no-absences-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }

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

        .form-input, .form-select, .form-textarea {
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
