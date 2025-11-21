import { useState } from 'react';
import './CalendarPicker.css';

export default function CalendarPicker({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const selectDate = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth.getMonth() &&
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth.getMonth() &&
           today.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className="calendar-picker">
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-nav">‹</button>
        <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={nextMonth} className="calendar-nav">›</button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-day-name">Sun</div>
        <div className="calendar-day-name">Mon</div>
        <div className="calendar-day-name">Tue</div>
        <div className="calendar-day-name">Wed</div>
        <div className="calendar-day-name">Thu</div>
        <div className="calendar-day-name">Fri</div>
        <div className="calendar-day-name">Sat</div>

        {[...Array(startingDayOfWeek)].map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => selectDate(day)}
              className={`calendar-day ${isSelected(day) ? 'selected' : ''} ${isToday(day) ? 'today' : ''}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <p className="selected-date-display">
          Selected: {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      )}
    </div>
  );
}
