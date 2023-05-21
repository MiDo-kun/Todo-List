// Automatic to Update Date in the Todo List

// Set day, if day is less than 10 add 0 to make it 01 to 09 else let it be;  
let day = new Date();
day = new Date().getDate() - 1 < 10 ? day.innerHTML = '0' + (new Date().getDate() - 1) : day.innerHTML = new Date().getDate();

// Get Weekday
const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
let week = weekday[new Date().getDay()];

// Get month
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
    'December'
];
let month = months[new Date().getMonth()];

// Get year
let year = new Date().getFullYear();

document.querySelector('.date-section').innerHTML = `<div class="date">
                                                        <p id="day">${day}</p>
                                                        <div class="date-flex">
                                                            <p id="month">${month}</p>
                                                            <p id="year">${year}</p>
                                                        </div>
                                                        </div>
                                                    <div id="today">${week}</div>`;