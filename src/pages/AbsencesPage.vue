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
                  <div v-for="absence in absences" :key="absence.id">
                    <AbsenceCard :absence="absence">

                    </AbsenceCard>
                  </div>

          </div>
      </q-scroll-area>
      <button class="apply-button" onclick="openApplicationForm()">
                Apply for Leave
      </button>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AbsenceCard from 'src/components/AbsenceCard.vue'
import type { absenceType } from '../types/absence'

const absences: absenceType[] = [
{
    id: 1,
    fromDate: 'March 15, 2025',
    toDate: 'March 22, 2025',
    document: 'vacation_request.pdf',
    duration: '3d',
    leaveType: 'Paid',
    status: 'Approved'
  },
  {
    id: 2,
    fromDate: 'July 8, 2025',
    toDate: 'July 10, 2025',
    document: 'medical_certificate.pdf',
    duration: '3d',
    leaveType: 'Sick',
    status: 'Pending',
  },
  {
    id: 3,
    fromDate: 'June 1, 2025',
    toDate: 'June 30, 2025',
    document: 'extended_leave_request.pdf',
    duration: '30d',
    leaveType: 'Unpaid',
    status: 'Rejected',
  },
  {
    id: 4,
    fromDate: 'January 10, 2025',
    toDate: 'April 10, 2025',
    document: 'maternity_certificate.pdf',
    duration: '90d',
    leaveType: 'Maternity',
    status: 'Approved',
  },
]
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
