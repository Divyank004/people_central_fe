<template>
  <q-page class="column items-center">
    <div class="row q-gutter-md">
      <div class="team-card" style="width: 1000px; height: 500px">
        <div class="calendar-header">
          <div class="month-navigation">
            <button class="nav-button" @click="changeMonth(-1)">‹</button>
            <div class="current-month" id="currentMonth">July 2025</div>
            <button class="nav-button" @click="changeMonth(1)">›</button>
          </div>

          <div class="legend">
            <div class="legend-item">
              <div class="legend-color today"></div>
              <span>Today</span>
            </div>
            <div class="legend-item">
              <div class="legend-color weekend"></div>
              <span>Weekend</span>
            </div>
            <div class="legend-item">
              <div class="legend-color holiday"></div>
              <span>Holiday</span>
            </div>
            <div class="legend-item">
              <div class="legend-color vacation"></div>
              <span>Vacation</span>
            </div>
          </div>
        </div>
        <div class="calendar-timeline" id="calendarTimeline">
          <!-- Calendar generated here -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  renderCalendar();
});

const teamMembers = [
  {
    name: 'Sarah Mitchell',
    role: 'Engineering Manager',
    avatar: 'SM',
    vacations: [],
    holidays: [4],
  },
  {
    name: 'Michael Johnson',
    role: 'Senior Lead',
    avatar: 'MJ',
    vacations: [],
    holidays: [4],
  },
  {
    name: 'Lisa Chen',
    role: 'Frontend Lead',
    avatar: 'LC',
    vacations: [5, 6, 7, 8],
    holidays: [4],
  },
  {
    name: 'Divyank Dhadi',
    role: 'Full Stack Dev',
    avatar: 'DD',
    vacations: [15, 16, 17, 18, 19],
    holidays: [4],
  },
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const currentDate = new Date(2025, 6, 18); // July 18, 2025
let displayMonth = 6; // July (0-indexed)
let displayYear = 2025;

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function isWeekend(day: number, month: number, year: number) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
}
function renderCalendar() {
  const timeline = document.getElementById('calendarTimeline');
  const monthElement = document.getElementById('currentMonth');
  if (monthElement) {
    monthElement.textContent = `${months[displayMonth]} ${displayYear}`;
  }

  const daysInMonth = getDaysInMonth(displayMonth, displayYear);
  let html = '';

  teamMembers.forEach((member) => {
    html += `
              <div class="timeline-member">
                  <div class="member-info">
                      <div class="member-avatar">${member.avatar}</div>
                      <div class="member-details">
                          <div class="member-name">${member.name}</div>
                          <div class="member-role">${member.role}</div>
                      </div>
                  </div>
                  <div class="calendar-days">
          `;

    for (let day = 1; day <= daysInMonth; day++) {
      const classes = ['day-cell'];

      // Check if it's today
      if (
        day === currentDate.getDate() &&
        displayMonth === currentDate.getMonth() &&
        displayYear === currentDate.getFullYear()
      ) {
        classes.push('today');
      }
      // Check if it's a weekend
      else if (isWeekend(day, displayMonth, displayYear)) {
        classes.push('weekend');
      }
      // Check if it's a holiday
      else if (member.holidays.includes(day)) {
        classes.push('holiday');
      }
      // Check if it's a vacation day
      else if (member.vacations.includes(day)) {
        classes.push('vacation');
      }

      html += `<div class="${classes.join(' ')}">${day}</div>`;
    }

    // Fill remaining cells if needed
    const remainingCells = 31 - daysInMonth;
    for (let i = 0; i < remainingCells; i++) {
      html += `<div class="day-cell inactive"></div>`;
    }

    html += `
                  </div>
              </div>
          `;
  });
  if (timeline) {
    timeline.innerHTML = html;
  }
}

function changeMonth(direction: number) {
  displayMonth += direction;

  if (displayMonth > 11) {
    displayMonth = 0;
    displayYear++;
  } else if (displayMonth < 0) {
    displayMonth = 11;
    displayYear--;
  }

  renderCalendar();
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-menu a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-menu a.active {
  background: rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid white;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.team-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 1rem;
}

/* Calendar Header */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.month-navigation {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.nav-button {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: #5a6fd8;
}

.current-month {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  min-width: 150px;
  text-align: center;
}

.legend {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.today {
  background: #667eea;
}
.legend-color.weekend {
  background: #e3f2fd;
}
.legend-color.holiday {
  background: #ffebee;
}
.legend-color.vacation {
  background: #fff3e0;
}

/* Calendar Timeline */
.calendar-timeline {
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
}

.timeline-member {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.timeline-member:last-child {
  border-bottom: none;
}

.member-info {
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-right: 0.8rem;
}

.member-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.7rem;
}

.member-details {
  flex: 1;
}

.member-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.1rem;
}

.member-role {
  font-size: 0.65rem;
  color: #666;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(31, 1fr);
  gap: 1px;
  padding-left: 0.8rem;
  flex: 1;
}

.day-cell {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 500;
  background: #f8f9fa;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.day-cell:hover {
  transform: scale(1.1);
}

.day-cell.today {
  background: #667eea;
  color: white;
  font-weight: bold;
}

.day-cell.weekend {
  background: #e3f2fd;
  color: #1976d2;
}

.day-cell.holiday {
  background: #ffebee;
  color: #d32f2f;
}

.day-cell.vacation {
  background: #fff3e0;
  color: #f57c00;
  font-weight: bold;
}

.day-cell.inactive {
  background: transparent;
  color: #ccc;
}

/* Team Hierarchy */
.hierarchy-container {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
}

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.hierarchy-level {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.team-member {
  text-align: center;

  transition: all 0.3s ease;
  position: relative;
}

.team-member:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hierarchy-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.7rem;
  margin: 0 auto 0.5rem;
}

.hierarchy-name {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.hierarchy-role {
  font-size: 0.65rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .calendar-days {
    grid-template-columns: repeat(31, 16px);
  }

  .day-cell {
    width: 16px;
    height: 16px;
    font-size: 0.55rem;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .main-content {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .member-info {
    min-width: 100px;
  }

  .calendar-days {
    grid-template-columns: repeat(31, 14px);
  }

  .day-cell {
    width: 14px;
    height: 14px;
    font-size: 0.5rem;
  }

  .hierarchy-level {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .team-member {
    min-width: 180px;
  }
}
</style>
