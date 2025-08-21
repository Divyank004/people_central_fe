<template>
  <q-page class="column items-center">
    <div class="calendar-card">
      <!-- Calendar Header -->
      <div class="calendar-header column items-center">
        <div class="year-navigation">
          <button class="nav-button" @click="changeYear(-1)">‹</button>
          <div class="current-year">{{ currentYear }}</div>
          <button class="nav-button" @click="changeYear(1)">›</button>
        </div>
      </div>

      <!-- Year Calendar -->
      <div class="year-calendar">
        <div v-for="(month, index) in months" :key="index" class="month-row">
          <div class="month-label">{{ month }}</div>
          <div class="days-container">
            <div
              v-for="day in 31"
              :key="day"
              :class="getDayClasses(index, day)"
              class="day-cell"
              @click="handleDayClick(index, day)"
              :title="getDayTooltip(index, day)"
            >
              {{ getDayDisplay(index, day) }}
            </div>
          </div>
        </div>
      </div>
      <div class="header-right q-mt-md">
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
            <div class="legend-color vacation"></div>
            <span>Vacation</span>
          </div>
          <div class="legend-item">
            <div class="legend-color sick"></div>
            <span>Sick Leave</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {});

const currentYear = ref(2025);
const currentDate = new Date();

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

// Sample leave data
interface LeaveMonth {
  month: number;
  days: number[];
}

interface LeaveYearData {
  vacation: LeaveMonth[];
  sick: LeaveMonth[];
}

const leaveData = ref<Record<number, LeaveYearData>>({
  2025: {
    vacation: [
      { month: 2, days: [15, 16, 17, 18, 19] }, // March
      { month: 5, days: [10, 11, 12] }, // June
      { month: 7, days: [20, 21, 22, 23, 24] }, // August
      { month: 11, days: [23, 24, 25, 26, 27] }, // December
    ],
    sick: [
      { month: 1, days: [8] }, // February
      { month: 4, days: [15] }, // May
      { month: 9, days: [3, 4] }, // October
    ],
  },
});

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const isWeekend = (day: number, month: number, year: number) => {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

const isToday = (day: number, month: number, year: number) => {
  return (
    day === currentDate.getDate() &&
    month === currentDate.getMonth() &&
    year === currentDate.getFullYear()
  );
};

const isVacationDay = (day: number, month: number) => {
  const yearData: LeaveYearData | undefined = leaveData.value[currentYear.value];
  if (!yearData || !yearData.vacation) return false;

  const monthVacations = yearData.vacation.find((v) => v.month === month);
  return monthVacations ? monthVacations.days.includes(day) : false;
};

const isSickDay = (day: number, month: number) => {
  const yearData = leaveData.value[currentYear.value];
  if (!yearData || !yearData.sick) return false;

  const monthSick = yearData.sick.find((s) => s.month === month);
  return monthSick ? monthSick.days.includes(day) : false;
};

const getDayClasses = (monthIndex: number, day: number) => {
  const daysInMonth = getDaysInMonth(monthIndex, currentYear.value);

  if (day > daysInMonth) {
    return ['inactive'];
  }

  const classes = [];

  if (isToday(day, monthIndex, currentYear.value)) {
    classes.push('today');
  } else if (isVacationDay(day, monthIndex)) {
    classes.push('vacation');
  } else if (isSickDay(day, monthIndex)) {
    classes.push('sick');
  } else if (isWeekend(day, monthIndex, currentYear.value)) {
    classes.push('weekend');
  }

  return classes;
};

const getDayDisplay = (monthIndex: number, day: number) => {
  const daysInMonth = getDaysInMonth(monthIndex, currentYear.value);
  return day <= daysInMonth ? day : '';
};

const getDayTooltip = (monthIndex: number, day: number) => {
  const daysInMonth = getDaysInMonth(monthIndex, currentYear.value);
  if (day > daysInMonth) return '';

  const date = new Date(currentYear.value, monthIndex, day);
  const dateStr = date.toLocaleDateString();

  if (isVacationDay(day, monthIndex)) {
    return `${dateStr} - Vacation Day`;
  } else if (isSickDay(day, monthIndex)) {
    return `${dateStr} - Sick Leave`;
  } else if (isWeekend(day, monthIndex, currentYear.value)) {
    return `${dateStr} - Weekend`;
  } else if (isToday(day, monthIndex, currentYear.value)) {
    return `${dateStr} - Today`;
  }

  return dateStr;
};

const changeYear = (direction: number) => {
  currentYear.value += direction;
};

const handleDayClick = (monthIndex: number, day: number) => {
  const daysInMonth = getDaysInMonth(monthIndex, currentYear.value);
  if (day <= daysInMonth) {
    const date = new Date(currentYear.value, monthIndex, day);
    console.log(`Clicked on: ${date.toLocaleDateString()}`);
  }
};
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

.calendar-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.year-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: #5a6fd8;
  transform: scale(1.05);
}

.current-year {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  min-width: 80px;
  text-align: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2rem;
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
  font-size: 1rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.weekend {
  background: #c7e4f8;
}
.legend-color.vacation {
  background: #e8f5e8;
}
.legend-color.sick {
  background: #fff3e0;
}
.legend-color.today {
  background: #667eea;
}

.year-calendar {
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.month-row {
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.month-row:last-child {
  border-bottom: none;
}

.month-label {
  min-width: 80px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  padding-right: 1rem;
}

.days-container {
  display: grid;
  grid-template-columns: repeat(31, 1fr);
  gap: 10px;
  flex: 1;
}

.day-cell {
  width: 25px;
  height: 25px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 500;
  background: #f2f3f4;
  color: #0e0d0d;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.day-cell:hover {
  transform: scale(1.1);
  z-index: 10;
}

.day-cell.today {
  background: #667eea;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 0 2px #667eea;
}

.day-cell.weekend {
  background: #e3f2fd;
  color: #1976d2;
}

.day-cell.vacation {
  background: #e8f5e8;
  color: #2e7d32;
  font-weight: bold;
}

.day-cell.sick {
  background: #fff3e0;
  color: #f57c00;
  font-weight: bold;
}

.day-cell.inactive {
  background: transparent;
  color: transparent;
  cursor: default;
}

.day-cell.inactive:hover {
  transform: none;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .days-container {
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

  .calendar-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-right {
    justify-content: space-between;
  }

  .days-container {
    grid-template-columns: repeat(31, 14px);
  }

  .day-cell {
    width: 14px;
    height: 14px;
    font-size: 0.5rem;
  }

  .month-label {
    min-width: 60px;
    font-size: 0.7rem;
  }
}
</style>
