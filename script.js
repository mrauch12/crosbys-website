var buttons = document.querySelectorAll("button");

var display = document.getElementById("display");

function getRandomColor(){
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var value = this.textContent;
    
    if(value !== "c"){
      this.style.backgroundColor = getRandomColor();
    }
    

    if (value === "c") {
      display.value = "";
      
      buttons.forEach(function(btn){
        btn.style.backgroundColor = "";
      });
      
    } else if (value === "Add") {
      display.value += "+";
    } else if (value === "Subtract") {
      display.value += "-";
    } else if (value === "=" || value === "Equals") {
      try {
        display.value = eval(display.value);
      } catch (e) {
        display.value = "Error";
      }
    } else {
      display.value += value;
    }
  });
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let d = new Date();
let currentMonth = d.getMonth();
let currentYear = d.getFullYear();

let events = {}; // key: 'YYYY-MM-DD', value: event title


function renderCalendar(monthIndex, year) {
  const monthName = months[monthIndex];
  document.getElementById('month').innerHTML = monthName;
  document.getElementById('year').innerHTML = year;

  const calendarDays = document.getElementById('calendar-days');
  calendarDays.innerHTML = ''; // Clear previous days

  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // last day of month

  // Add blank divs for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    const blank = document.createElement('div');
    blank.classList.add('day');
    calendarDays.appendChild(blank);
  }

  // Add day numbers and highlight current date
  const today = new Date();
  const isCurrentMonth = (monthIndex === today.getMonth() && year === today.getFullYear());

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.innerText = day;

    // Highlight today if month and year match and day matches today
    if (isCurrentMonth && day === today.getDate()) {
      dayDiv.classList.add('today');
    }

 // Build date key
  const key = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Show event if it exists
  if (events[key]) {
    const eventEl = document.createElement('div');
    eventEl.classList.add('event');
    eventEl.innerText = events[key];
    dayDiv.appendChild(eventEl);
  }

  // Add click listener for modal
  dayDiv.addEventListener('click', function () {
    document.getElementById('event-modal').style.display = 'block';
    document.getElementById('event-date').innerText = `${months[monthIndex]} ${day}, ${year}`;
    document.getElementById('event-title').value = events[key] || ''; // Pre-fill if exists
  });
    
    calendarDays.appendChild(dayDiv);
  }
}


document.getElementById('next-month').addEventListener('click', function() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

document.getElementById('prev-month').addEventListener('click', function() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

document.getElementById('next-year').addEventListener('click', function() {
  currentYear++;
  renderCalendar(currentMonth, currentYear);
});

document.getElementById('prev-year').addEventListener('click', function() {
  currentYear--;
  renderCalendar(currentMonth, currentYear);
});

document.getElementById('today').addEventListener('click', function() {
  d = new Date();
  currentMonth = d.getMonth();
  currentYear = d.getFullYear();
  renderCalendar(currentMonth, currentYear);
});

// Modal close button
document.getElementById('close-modal').addEventListener('click', function () {
  document.getElementById('event-modal').style.display = 'none';
});

// Optional: close modal when clicking outside it
window.addEventListener('click', function (e) {
  const modal = document.getElementById('event-modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Save event (you can expand this to actually store/display it)
document.getElementById('save-event').addEventListener('click', function () {
  const title = document.getElementById('event-title').value;
  const dateText = document.getElementById('event-date').innerText;
  const dateObj = new Date(dateText);
  const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  
  events[key] = title;
  document.getElementById('event-modal').style.display = 'none';
  renderCalendar(currentMonth, currentYear); // Re-render to show event
});



// Initial render
renderCalendar(currentMonth, currentYear);
